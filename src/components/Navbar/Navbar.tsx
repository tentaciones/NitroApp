import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo/nitroLogo.svg";
import { BsThreeDots } from "react-icons/bs";
import { ConnectKitButton } from "connectkit";
import styles from "@/styles/Home.module.css";
import { IoWalletOutline } from "react-icons/io5";

import arbLogo from "@/assets/logo/Arbitrum Logo.svg";
import Dropdown from "./Dropdown";

import Link from "next/link";
import { useRouter } from "next/router";
import { BiMenu } from "react-icons/bi";
import { useMobileNavState } from "@/hooks/stores/mobileMenuStore";
type Props = {};

const Navbar = (props: Props) => {
  const [currentChainName, setCurrentChainName] = useState<string>();
  const [connected, setConnected] = useState(false);
  const { isMobileMenuOpen, setIsMobileMenuOpen }: any = useMobileNavState();
  const { setConnectedAddress }: any = useMobileNavState();
  const [isDropDown, setIsDropDown] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;
  console.log(currentPath);

  return (
    <div className="w-screen h-20 fixed flex justify-between bg-background px-5 md:px-20 text-white ">
      <div className="flex items-center gap-1 ">
        <Image
          src={logo.src}
          alt=""
          height={0}
          width={0}
          className="h-10 w-10"
        />
        <p className="font-bold md:text-xl ">NitroFinance</p>
      </div>
      <div className="flex items-center justify-end gap-5  h-full ">
        <div className="flex items-center justify-end ">
          <Link
            href="/swap"
            className={`${
              currentPath === "/swap" ? "bg-[#00fdee0f] text-[#00FDEE]" : ""
            } hover:cursor-pointer hover:bg-[#00fdee0f] hover:text-[#00FDEE] rounded-sm px-5 py-1 hidden md:block`}
          >
            <p>Trade</p>
          </Link>
          <Link
            href="/pool"
            className={`${
              currentPath === "/pool" ? "bg-[#00fdee0f] text-[#00FDEE]" : ""
            } hover:cursor-pointer hover:bg-[#00fdee0f] hover:text-[#00FDEE] rounded-sm px-5 py-1 hidden md:block`}
          >
            <p>Pool</p>
          </Link>
          <Link
            href="/liquidity"
            className={`${
              currentPath === "/liquidity"
                ? "bg-[#00fdee0f] text-[#00FDEE]"
                : ""
            } hover:cursor-pointer hover:bg-[#00fdee0f] hover:text-[#00FDEE] rounded-sm px-5 py-1 hidden md:block`}
          >
            <p>Liquidity</p>
          </Link>
          <div
            className={`hover:cursor-pointer hover:bg-[#00fdee0f] hover:text-[#00FDEE]   rounded-sm px-5 py-1 ${
              isDropDown && "bg-[#00fdee0f]"
            }`}
            onClick={() => setIsDropDown(!isDropDown)}
          >
            <div className="hidden md:block">
              <BsThreeDots className={`${isDropDown && "text-[#00FDEE] "}`} />
            </div>
          </div>
          <div>
            <Dropdown isDropDown={isDropDown} />
          </div>
        </div>
        {connected && (
          <div className=" bg-gradient-to-r rounded-md from-cyan-500 to-blue-500 px-[2px] py-[2px]  h-[50px] w-[90px]  hover:cursor-pointer hidden md:block">
            <div className="bg-background  rounded-md h-full w-full flex items-center justify-center gap-2">
              <p>0</p>
              <Image
                src={logo}
                alt=""
                height={0}
                width={0}
                className="h-[20px] w-[20px] "
              />
            </div>
          </div>
        )}

        <div className=" bg-gradient-to-r rounded-md from-cyan-500 to-blue-500 px-[2px] py-[2px]  h-[50px] w-[60px]  hover:cursor-pointer hidden md:block">
          <div className="bg-background  rounded-md h-full w-full flex items-center justify-center">
            <Image
              src={arbLogo}
              alt=""
              height={0}
              width={0}
              className="h-[30px] w-[30px] "
            />
          </div>
        </div>
        {connected && !isMobileMenuOpen && (
          <BiMenu
            className="text-3xl"
            onClick={() => setIsMobileMenuOpen(true)}
          />
        )}

        {!connected && (
          <ConnectKitButton.Custom>
            {({
              isConnected,
              isConnecting,
              show,
              hide,
              address,
              ensName,
              chain,
            }) => {
              if (isConnected) {
                setCurrentChainName(chain?.name);
                setConnected(isConnected);
                setConnectedAddress(address);
              }
              return (
                <button
                  onClick={() => {
                    show;
                  }}
                  className={`${styles.button} w-[200px]`}
                >
                  <div className="flex items-center justify-center gap-2 px-2">
                    <IoWalletOutline className="text-3xl" />
                    {isConnected ? (
                      <>
                        <p>
                          {address?.slice(0, 5)}...{address?.slice(-4)}
                        </p>{" "}
                      </>
                    ) : (
                      "Connect Wallet"
                    )}
                  </div>
                </button>
              );
            }}
          </ConnectKitButton.Custom>
        )}
      </div>
    </div>
  );
};

export default Navbar;
