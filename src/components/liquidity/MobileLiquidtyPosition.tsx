import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import { useLottie } from "lottie-react";
import { demoPoolData } from "@/constants/pooldata";
import { CgArrowsHAlt } from "react-icons/cg";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { tokenData } from "@/constants/pooldata";
import frame from "@/assets/animations/loading.json";
import { getAllUserLiquidity } from "../helper/graphQueries";
import emptyState from "@/assets/Empty state.svg";
type Props = {};

const MobileLiquidtyPosition = (props: Props) => {
  const [liquidityPosition, setLiquidityPosition] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const router = useRouter();

  const options = {
    animationData: frame,
    loop: true,
    autoplay: true,
  };

  const { View, setSpeed } = useLottie(options);
  setSpeed(0.8);
  useEffect(() => {
    if (navigator.onLine) {
      const fetchData = async () => {
        const { filteredData } = await getAllUserLiquidity();
        setLiquidityPosition(filteredData);
        console.log("le", liquidityPosition.length);
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
        <div className="flex flex-col h-screen w-full justify-center items-center text-white">
          <Image src={emptyState} alt="" height={0} width={0} />
          <p className="text-gray-500">No Liquidity added</p>

          <button
            className={`${styles.button} w-[80%] mt-5`}
            onClick={() => router.push("/liquidity")}
          >
            Add
          </button>
        </div>
      ) : isFetched ? (
        <div className="w-full h-screen md:hidden overflow-y-scroll text-white ">
          <div className="mt-32">
            <p className="text-2xl px-5">Liquidity Positions</p>
          </div>
          <div className="w-full h-screen md:hidden overflow-y-scroll text-white px-5 mt-5">
            {liquidityPosition.map(
              ({ amountX, amountY, sender, recipient, NITRO_PAIR_id, id }) => {
                return (
                  <div
                    key={id}
                    className="h-[150px]  w-full rounded-xl border-[0.1px] border-greyishBlue bg-[#061727] mb-5"
                    onClick={() => router.push("/liquidity")}
                  >
                    <div className="flex justify-between mt-7 px-5">
                      <div className="flex  items-center ">
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
                      <div className="flex gap-2 items-center">
                        <p>Active</p>
                        <div className="rounded-full h-2 w-2 bg-[#2BCD3E] animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex gap-3 px-3 mt-5 text-sm">
                      <div className="flex gap-2">
                        <p className="text-[#B7BECD]">{tokenData[0].name}:</p>
                        <p>{amountX}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-[#B7BECD]">{tokenData[1].name}:</p>
                        <p>{amountY}</p>
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
      ) : (
        <div className="flex-col  w-[60%] md:flex hidden items-center ">
          <div className="hidden  md:block h-[500px] w-[500px] ">{View}</div>
        </div>
      )}
    </>
  );
};

export default MobileLiquidtyPosition;
