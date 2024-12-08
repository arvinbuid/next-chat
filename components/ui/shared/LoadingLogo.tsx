import Image from 'next/image';

type Props = {
  size?: number;
};

const LoadingLogo = ({ size = 100 }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image
        src="/logo.svg"
        alt="Loading Logo"
        width={size}
        height={size}
        priority={true}
        className="animate-pulse duration-800"
      />
    </div>
  );
};

export default LoadingLogo;
