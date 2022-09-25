import { Modal } from '../Modal';
import { useAuth } from '../../utils/auth';

type Props = {
  onClose: VoidFunction;
  isOpened: boolean;
};

const WALLETS = [
  {
    title: 'Plug',
    value: 'plug',
  },
  {
    title: 'Internet identity',
    value: 'ii',
  },
];

export const AuthModal = ({ isOpened, onClose }: Props) => {
  const auth = useAuth();

  const onClickAuth = (key: string) => () => {
    if (key === 'ii') {
      auth.useInternetIdentity();
    } else if (key === 'plug') {
      auth.usePlug();
    }

    onClose();
  };

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <div className="flex flex-col bg-neutral-800 h-full w-full rounded-[16px] p-5">
        <span className="text-xl font-bold text-white">Select wallet</span>
        <div className="flex flex-col mt-2.5">
          {WALLETS.map(({ title, value }) => (
            <span
              onClick={onClickAuth(value)}
              key={value}
              className="p-2.5 text-white text-lg mb-2.5 rounded bg-neutral-600 cursor-pointer"
            >
              {title}
            </span>
          ))}
        </div>
      </div>
    </Modal>
  );
};
