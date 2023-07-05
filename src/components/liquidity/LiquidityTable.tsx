import { tokenData } from "@/constants/pooldata";
import { useLottie } from "lottie-react";
import { ethers } from "ethers";
import Image from "next/image";
import frame from "@/assets/animations/loading.json";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgArrowsHAlt } from "react-icons/cg";
import {
  TLiquidityPositionDetailState,
  UseLiquidyState,
} from "../helper/types";
import {
  useLiquidityPositionDetailState,
  useLiquidyState,
} from "@/hooks/stores/addLiquidityStore";

import { useAccount } from "wagmi";
import { getAllUserLiquidity } from "../helper/graphQueries";
import EmptyLiquidityState from "./EmptyLiquidityState";
const LiquidityTable = () => {
  const [liquidityPosition, setLiquidityPosition] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const { liquidityPositionDetail, setLiquidityPositionDetail } =
    useLiquidityPositionDetailState() as TLiquidityPositionDetailState;
  const options = {
    animationData: frame,
    loop: true,
    autoplay: true,
  };
  const { isConnected } = useAccount();
  const { setIsAddLiquidity } = useLiquidyState() as UseLiquidyState;
  const { View, setSpeed } = useLottie(options);
  setSpeed(0.8);

  useEffect(() => {
    if (navigator.onLine) {
      const fetchData = async () => {
        const { filteredData } = await getAllUserLiquidity();
        setLiquidityPosition(filteredData);
        console.log("liquidityPosition", liquidityPosition);
        setIsFetched(true);
      };

      fetchData();
    } else {
      console.log("User is offline");
    }
  }, []);

  return (
    <>
      {liquidityPosition.length == 0 ? (
        <EmptyLiquidityState />
      ) : isFetched ? (
        <div className=" flex-col mt-5 w-[60%] md:flex hidden h-screen  ">
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
                      <th
                        scope="col"
                        className="px-6 py-4 w-[10%] font-[200]  "
                      >
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
                <div className="  overflow-y-scroll  ">
                  <table className="w-full">
                    <tbody className="bg-[#061727] rounded-md w-full overflow-y-scroll ">
                      {liquidityPosition.map(
                        ({
                          amountX,
                          amountY,
                          sender,
                          recipient,
                          NitroPair_id,
                          id,
                        }) => {
                          return (
                            <tr
                              className="border-b border-[#00040F] relative "
                              key={id}
                              onClick={() => {
                                setLiquidityPositionDetail({
                                  amountX,
                                  amountY,
                                  sender,
                                  recipient,
                                  NitroPair_id,
                                });
                                console.log(liquidityPositionDetail);
                                setIsAddLiquidity(false);
                              }}
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium w-[40%]">
                                <div className="flex px-5 items-center ">
                                  <Image
                                    src={tokenData[0].image}
                                    alt=""
                                    width="0"
                                    height="0"
                                    className="-mx-3 h-7 w-7"
                                  />
                                  <Image
                                    src={tokenData[1].image}
                                    alt=""
                                    width="0"
                                    height="0"
                                    className="  h-7 w-7"
                                  />
                                  <p className="px-2">
                                    {tokenData[0].name}/{tokenData[1].name}
                                  </p>
                                </div>
                                <div className="absolute  -mt-10 h-[70px] w-[200px] bg-[#091E33]  hover:opacity-100 opacity-0 transition duration-150 ease-in-out hover:cursor-pointer">
                                  <div className="flex px-5 items-center mt-2">
                                    <Image
                                      src={tokenData[0].image}
                                      alt=""
                                      width="0"
                                      height="0"
                                      className="-mx-2 h-5 w-5 "
                                    />
                                    <Image
                                      src={tokenData[1].image}
                                      alt=""
                                      width="0"
                                      height="0"
                                      className="  h-5 w-5"
                                    />
                                    <p className="px-2 text-sm font-thin">
                                      {tokenData[0].name}/{tokenData[1].name}
                                    </p>
                                  </div>
                                  <div className="flex flex-col px-3 mt-1">
                                    <div className="flex justify-between text-[10px] font-thin ">
                                      <p>{tokenData[0].name}</p>
                                      <p>{amountX}</p>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-thin ">
                                      <p>{tokenData[1].name}</p>
                                      <p>{amountY}</p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-2 py-4 w-[10%] ">
                                {/** {TVL}*/}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 w-[10%] ">
                                <CgArrowsHAlt className="text-2xl" />
                              </td>
                              <td className="whitespace-nowrap px-2 py-4 w-[10%] ">
                                {/**      {TokenY} */}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 w-[30%] ">
                                <div className="flex gap-2 items-center">
                                  <p>Active</p>
                                  <div className="rounded-full h-2 w-2 bg-[#2BCD3E]  "></div>
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
      ) : (
        <div className="flex-col  w-[60%] md:flex hidden items-center ">
          {" "}
          <div className="hidden  md:block h-[500px] w-[500px] ">{View}</div>
        </div>
      )}
    </>
  );
};

export default LiquidityTable;
