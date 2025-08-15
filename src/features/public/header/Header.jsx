import Image from "next/image";
import TopBar from "./TopBar";
import "./header.css";

const Header = () => {
  return (
    <header className="pt-[70px] bg-cover bg-center bg-no-repeat header-bg-url bg-white bg-origin-content">
      <TopBar />
      <div className="flex items-center justify-center">
        <div className="relative  h-[100px] sm:h-[130px] w-full">
          <Image
            src="/664dc770e960d.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
