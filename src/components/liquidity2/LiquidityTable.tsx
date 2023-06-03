import { demoPoolData } from "@/constants/pooldata";
import Image from "next/image";
import React from "react";
import { CgArrowsHAlt } from "react-icons/cg";
type Props = {};

const LiquidityTable = (props: Props) => {
  return (
    <div className=" flex-col mt-5 w-[60%] md:flex hidden ">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="  text-[#B7BECD] ">
                <tr>
                  <th scope="col" className="px-6 py-4 w-[40%] font-[200]">
                    Assets
                  </th>
                  <th scope="col" className="px-6 py-4 w-[10%] font-[200]">
                    Min
                  </th>
                  <th scope="col" className="px-6 py-4 w-[10%] font-[200]  ">
                    <CgArrowsHAlt className="text-2xl" />
                  </th>
                  <th scope="col" className="px-6 py-4 w-[10%] font-[200]">
                    Max
                  </th>

                  <th scope="col" className="px-6 py-4 w-[30%] font-[200]">
                    Status
                  </th>
                </tr>
              </thead>
            </table>
            <div className="max-h-[950px]  overflow-y-auto">
              <table className="w-full">
                <tbody className="bg-[#061727] rounded-md w-full overflow-y-scroll ">
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
                        <tr className="border-b border-[#00040F] " key={TokenX}>
                          <td className="whitespace-nowrap px-6 py-4 font-medium w-[40%]">
                            <div className="flex px-5 items-center ">
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
                                {assetXSymbol}/{assetYSymbol}
                              </p>
                            </div>
                            <div className="absolute -mt-10 h-[70px] w-[200px] bg-[#091E33]  hover:opacity-100 opacity-0 transition duration-150 ease-in-out hover:cursor-pointer">
                              <div className="flex px-5 items-center mt-2">
                                <Image
                                  src={assetXLogo.src}
                                  alt=""
                                  width="0"
                                  height="0"
                                  className="-mx-2 h-5 w-5 "
                                />
                                <Image
                                  src={assetYLogo.src}
                                  alt=""
                                  width="0"
                                  height="0"
                                  className="  h-5 w-5"
                                />
                                <p className="px-2 text-sm font-thin">
                                  {assetXSymbol}/{assetYSymbol}
                                </p>
                              </div>
                              <div className="flex flex-col px-3 mt-1">
                                <div className="flex justify-between text-[10px] font-thin ">
                                  <p>ETH</p>
                                  <p>0.555</p>
                                </div>
                                <div className="flex justify-between text-[10px] font-thin ">
                                  <p>USDT</p>
                                  <p>555</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-2 py-4 w-[10%] ">
                            {TVL}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 w-[10%] ">
                            <CgArrowsHAlt className="text-2xl" />
                          </td>
                          <td className="whitespace-nowrap px-2 py-4 w-[10%] ">
                            {TokenY}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 w-[30%] ">
                            <div className="flex gap-2 items-center">
                              <p>Active</p>
                              <div className="rounded-full h-2 w-2 bg-[#2BCD3E] animate-pulse"></div>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityTable;
