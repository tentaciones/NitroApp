import React from "react";
import eth from "@/assets/Eth logo.svg";
import usdt from "@/assets/tether-seeklogo.com 2.svg";
import Image from "next/image";
import { demoPoolData } from "@/constants/pooldata";
type Props = {};

const AllPoolMobile = (props: Props) => {
  return (
    <div className="w-full h-[600px] md:hidden overflow-y-scroll pt-10">
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
              className="h-[150px]  w-full rounded-xl border-[0.1px] border-greyishBlue bg-[#061727] mb-5"
              key={TokenX}
            >
              <div className="flex gap-5 mt-7">
                <div className="flex px-10 items-center ">
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
                <div className="flex gap-1">
                  <p className="text-[#B7BECD]">TVL:</p>
                  <p> {TVL}</p>
                </div>
              </div>
              <div className="flex justify-between text-[10px] mt-10 px-5">
                <div className="flex flex-col gap-2">
                  <p className="text-[#B7BECD]">Reserve X</p>
                  <p> {TokenX}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[#B7BECD]">Reserve Y</p>
                  <p> {TokenY}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[#B7BECD]">Trading Volume</p>
                  <p> {TradingVolumes}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[#B7BECD]">Debt Ratio </p>
                  <p> {DebtRatio}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[#B7BECD]">NIP Generated </p>
                  <p> {NitroPointsGenerated}</p>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default AllPoolMobile;
