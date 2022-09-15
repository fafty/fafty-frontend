import { Actor, HttpAgent, Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { auth } from '../../auth';
import ledger_idl from '../canister/ledger.did';
import { getAccountId } from '../account';
import _SERVICE from '../canister/ledger_type';

const DFX_NETWORK = process.env.REACT_APP_DFX_NETWORK || 'ic';

const dfxConfig = {
  canisters: {
    icpunks: {
      build: './service/build.sh',
      candid: 'service/icpunks/icpunks.did',
      wasm: 'service/target/wasm32-unknown-unknown/release/icpunks.wasm',
      type: 'custom',
    },
    ledger_proxy: {
      main: 'service/motoko/ledger_proxy.mo',
      type: 'motoko',
    },
    icpunks_storage: {
      main: 'service/motoko/storage.mo',
      type: 'motoko',
    },
    icpunks_claim: {
      main: 'service/motoko/claim.mo',
      type: 'motoko',
    },
    icpunks_assets: {
      dependencies: ['icpunks'],
      frontend: {
        entrypoint: 'src/index.tsx',
      },
      source: ['build'],
      type: 'assets',
    },
  },
  dfx: '0.7.2',
  networks: {
    ic: {
      providers: ['https://boundary.ic0.app/'],
      type: 'persistent',
    },
    local: {
      bind: '127.0.0.1:8000',
      type: 'ephemeral',
    },
  },
  version: 1,
};

export function getHost() {
  if (DFX_NETWORK === 'ic') return dfxConfig.networks.ic.providers[0];

  return dfxConfig.networks.local.bind;
}

export interface WalletInterface {
  name: string;

  logIn: () => void;
  logOut: () => void;

  requestTransfer: (data: any) => any;

  getActor: <Type>(canisterId: string, idl: any) => Promise<Type | undefined>;

  getBalance: () => any;
}

const IDENTITY_URL = 'https://identity.ic0.app';

export default function internetIdentity() {
  let authClient: AuthClient | null = null;
  let identity: Identity | null = null;

  async function getActor<Type>(
    canisterId: string,
    idl: any
  ): Promise<Type | undefined> {
    const agent = auth.agent;

    const actor = Actor.createActor<Type>(idl, {
      agent,
      canisterId: canisterId,
    });

    return actor;
  }

  async function logIn() {
    if (authClient == null) authClient = await AuthClient.create();

    if (authClient != null) {
      const host = getHost();

      authClient.login({
        identityProvider: IDENTITY_URL,
        onSuccess: () => {
          const client = authClient as AuthClient;
          identity = client.getIdentity();

          const agent = new HttpAgent({ host, identity });
          auth.setAgent(agent);

          auth.setPrincipal(identity.getPrincipal());

          setTimeout(() => {
            getBalance();
          }, 0);

          console.log('Logged in with II');
        },
        onError: (str) => {
          console.log('Error while logging with II: ' + str);
        },
      });
    }
  }

  function logOut() {
    authClient?.logout();
    auth.setAgent(undefined);
    auth.setPrincipal(undefined);
  }

  async function getBalance(): Promise<any> {
    if (identity !== null) {
      const ledgerActor = await getActor<_SERVICE>(
        'ryjl3-tyaaa-aaaaa-aaaba-cai',
        ledger_idl
      );

      console.log(ledgerActor);

      const accountId = getAccountId(identity.getPrincipal().toString(), 0);

      const req = {
        account: accountId,
      };

      console.log(req);

      const raw_balance = await ledgerActor?.account_balance_dfx(req);

      if (raw_balance !== undefined) {
        const balance = raw_balance.e8s;

        auth.setBalance(balance);
      }
    }
  }

  return {
    name: 'ii',
    logIn,
    logOut,
    getActor,
    // requestTransfer,
    getBalance,
  };
}
