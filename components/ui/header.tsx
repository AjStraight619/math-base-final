import Image from "next/image";

import logo from "@/public/logo.png";

type HeaderProps = {
  width: number;
  height: number;
  className?: string;
  textSize?: string;
};

const Header = ({ width, height, className, textSize }: HeaderProps) => {
  return (
    <header className="flex flex-row gap-2 items-center justify-start">
      <Image
        src={logo}
        alt="Math Base"
        width={width}
        height={height}
        className={`${className} rounded-full`}
      />
      <span className={`${textSize} font-semibold`}>Math Base</span>
    </header>
  );
};

export default Header;
