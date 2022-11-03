const DFX_NETWORK = 'ic'

export function getCanisterIds() {
  if (DFX_NETWORK === 'ic') {
    return {
      ledger: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
    }
  }
  return {
    ledger: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
  }
}
