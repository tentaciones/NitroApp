import React from "react";
import eth from "@/assets/Eth logo.svg";
import usdt from "@/assets/tether-seeklogo.com 2.svg";
import Image from "next/image";
import { demoPoolData } from "@/constants/pooldata";
import { CgArrowsHAlt } from "react-icons/cg";
import { useRouter } from "next/router";

type Props = {};

const MobileLiquidtyPosition = (props: Props) => {
  const router = useRouter();
  return (
    <div className="w-full h-screen md:hidden overflow-y-scroll text-white">
      <div className="mt-32">
        <p className="text-2xl px-5">Liquidity Positions</p>
      </div>
      <div className="w-full h-screen md:hidden overflow-y-scroll text-white px-5 mt-5">
        {demoPoolData.map(
          ({
            assetXSymbol,
            assetYSymbol,
            assetXLogo,
            assetYLogo,
            TVL,
            TokenX,
            TokenY,
            TradingVolumes,
            DebtRatio,
            NitroPointsGenerated,
          }) => {
            return (
              <div
                key={TokenX}
                className="h-[150px]  w-full rounded-xl border-[0.1px] border-greyishBlue bg-[#061727] mb-5"
                onClick={() => router.push("/liquidity")}
              >
                <div className="flex justify-between mt-7 px-5">
                  <div className="flex  items-center ">
                    <Image
                      src={assetXLogo.src}
                      alt=""
                      width="0"
                      height="0"
                      className="-mx-3 h-7 w-7"
                    />
                    <Image
                      src={assetYLogo.src}
                      alt=""
                      width="0"
                      height="0"
                      className="  h-7 w-7"
                    />
                    <p className="px-2">
                      {" "}
                      {assetXSymbol}/{assetYSymbol}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p>Active</p>
                    <div className="rounded-full h-2 w-2 bg-[#2BCD3E] animate-pulse"></div>
                  </div>
                </div>
                <div className="flex gap-3 px-3 mt-5 text-sm">
                  <div className="flex gap-2">
                    <p className="text-[#B7BECD]">ETH:</p>
                    <p>0.999</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-[#B7BECD]">USDT:</p>
                    <p>0.999</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm px-3 mt-3 items-center">
                  <div className="flex">
                    <p className="text-[#B7BECD]">Min:</p>
                    <p>0 USDT per ETH</p>
                  </div>
                  <CgArrowsHAlt className="text-2xl" />
                  <div className="flex">
                    <p className="text-[#B7BECD]">Max:</p>
                    <p>0 USDT per ETH</p>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default MobileLiquidtyPosition;
