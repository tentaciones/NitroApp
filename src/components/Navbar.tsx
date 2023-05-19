import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/logo/nitroLogo.svg";
import { BsThreeDots } from "react-icons/bs";
import { ConnectKitButton } from "connectkit";
import styles from "@/styles/Home.module.css";
import { IoWalletOutline } from "react-icons/io5";
type Props = {};

const Navbar = (props: Props) => {
  const [currentChainName, setCurrentChainName] = useState<string>();
  return (
    <div className="w-screen h-20 fixed flex justify-between bg-background  px-20 text-white">
      <div className="flex items-center gap-1 ">
        <Image
          src={logo.src}
          alt=""
          height={0}
          width={0}
          className="h-10 w-10"
        />
        <p className="font-bold text-xl">NitroFinance</p>
      </div>
      <div className="flex items-center gap-5">
        <div className="hover:cursor-pointer hover:bg-[#00fdee0f] hover:text-[#00FDEE]   rounded-sm px-5 py-1">
          <p>Trade</p>
        </div>
        <div className="hover:cursor-pointer hover:bg-[#00fdee0f] hover:text-[#00FDEE]   rounded-sm px-5 py-1">
          <p>Pool</p>
        </div>
        <div className="hover:cursor-pointer hover:bg-[#00fdee0f] hover:text-[#00FDEE]   rounded-sm px-5 py-1">
          <p>Liquidity</p>
        </div>
        <div className="hover:cursor-pointer hover:bg-[#00fdee0f] hover:text-[#00FDEE]   rounded-sm px-5 py-1">
          <BsThreeDots />
        </div>
        <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 px-[0.8px] py-[0.8px]  h-[50px] w-[180px]">
          <div className="bg-background  h-full w-full flex items-center justify-center">
            {currentChainName ? (
              <p className="">{currentChainName}</p>
            ) : (
              <p className="">! Connected</p>
            )}
          </div>
        </div>
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
            setCurrentChainName(chain?.name);
            return (
              <button onClick={show} className={styles.connectWallet}>
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
      </div>
    </div>
  );
};

export default Navbar;
