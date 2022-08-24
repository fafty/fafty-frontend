import Image from 'next/future/image';
interface ButtonProps {
  avatarUrl: string;
  balance: number;
  ticker: string;
}

const ProfileButton = ({
  avatarUrl,
  balance,
  ticker,
}: ButtonProps): JSX.Element => {
  return (
    <>
      <Image
        className="inline-block ml-1 h-8 w-8 rounded-full ring-1 ring-white mr-3"
        src={avatarUrl}
        alt=""
        // loading="lazy"
        // layout="raw"
        width="32"
        height="32"
      />
      <span className="pr-3 text-sm dark:text-gray-200">{balance}</span>
      <span className="text-sm text-green-600 pr-2">{ticker}</span>
    </>
  );
};

export default ProfileButton;
