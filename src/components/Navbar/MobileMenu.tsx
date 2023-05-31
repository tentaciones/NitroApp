import Image from "next/image";
import React from "react";
import { IoClose, IoWalletOutline } from "react-icons/io5";
import logo from "@/assets/logo/nitroLogo.svg";
import styles from "@/styles/Home.module.css";
import { useMobileNavState } from "@/hooks/stores/mobileMenuStore";
type Props = {};

const MobileMenu = (props: Props) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, connectedAddress }: any =
    useMobileNavState();
  return (
    <div className="h-screen md:hidden text-white w-full">
      <div className="flex justify-between items-center  mt-5 px-5">
        <div className="flex items-center  gap-1 ">
          <Image
            src={logo.src}
            alt=""
            height={0}
            width={0}
            className="h-10 w-10"
          />
          <p className="font-bold md:text-xl ">NitroFinance</p>
        </div>
        <IoClose
          className="text-2xl hover:cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </div>
      <ul className="flex flex-col px-10 mt-20 gap-7 text-2xl ">
        <li>Trade</li>
        <li>Pool</li>
        <li>Liquidity</li>
        <li>Borrow</li>
        <li>Debt Position</li>
      </ul>
      <div className="px-5 mt-10 ">
        <div
          className={`${styles.button} flex gap-3 justify-center items-center`}
        >
          <IoWalletOutline className="text-3xl" />
          <p>
            {" "}
            {connectedAddress?.slice(0, 5)}...{connectedAddress?.slice(-4)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
