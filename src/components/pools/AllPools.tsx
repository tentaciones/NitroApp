import { demoPoolData } from "@/constants/pooldata";
import Image from "next/image";
import React from "react";
import eth from "@/assets/Eth logo.svg";
import nitro from "@/assets/logo/nitroLogo.svg";
import { useRouter } from "next/router";

const AllPools = () => {
  const router = useRouter();
  return (
    <div className=" flex-col mt-10 md:flex hidden px-5">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="  text-[#B7BECD] ">
                <tr>
                  <th scope="col" className="px-6 py-4 w-[25%] font-[200]">
                    Assets
                  </th>
                  <th scope="col" className="px-6 py-4 w-[10%] font-[200]">
                    TVL
                  </th>

                  <th scope="col" className="px-6 py-4 w-[15%] font-[200]">
                    Trading Volumes
                  </th>
                  <th scope="col" className="px-6 py-4 w-[10%] font-[200]">
                    Debt Ratio
                  </th>
                  <th scope="col" className="px-6 py-4 w-[20%] font-[200]">
                    Nitro Points Generated
                  </th>
                </tr>
              </thead>
            </table>
            <div className="max-h-[500px]  overflow-y-auto">
              <table className="w-full">
                <tbody className="bg-[#061727] rounded-md w-full overflow-y-scroll ">
                  {demoPoolData.map(({ TokenX }) => {
                    return (
                      <tr
                        className="border-b border-[#00040F] "
                        key={TokenX}
                        onClick={() => router.push("/liquidity")}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium w-[25%]">
                          <div className="flex px-5 items-center ">
                            <Image
                              src={eth}
                              alt=""
                              width="0"
                              height="0"
                              className="-mx-1 h-7 w-7"
                            />
                            <Image
                              src={nitro}
                              alt=""
                              width="0"
                              height="0"
                              className="  h-7 w-7"
                            />
                            <p className="px-2">WETH/NIT</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 w-[10%] animate-pulse">
                          <div className="w-full bg-[#031120]  h-10 rounded-xl"></div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 w-[10%] animate-pulse">
                          <div className="w-full bg-[#031120]  h-10 rounded-xl"></div>
                        </td>{" "}
                        <td className="whitespace-nowrap px-6 py-4 w-[10%] animate-pulse">
                          <div className="w-full bg-[#031120]  h-10 rounded-xl"></div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 w-[10%] animate-pulse">
                          <div className="w-full bg-[#031120]  h-10 rounded-xl"></div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPools;
