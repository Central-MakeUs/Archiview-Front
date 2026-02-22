import { Header } from './Header';
import Image from 'next/image';

export const LogoHeader = (): React.ReactElement => {
  return (
    <Header
      left={
        <span className="flex h-full shrink-0 items-center">
          <Image src="/images/ArchiviewLogoImage.svg" alt="logo" width={127} height={23.39} />
        </span>
      }
    />
  );
};
