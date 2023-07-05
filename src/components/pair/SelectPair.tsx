import Image from "next/image";
import React, { useEffect, useState } from "react";
import eth from "@/assets/Eth logo.svg";
import usdt from "@/assets/tether-seeklogo.com 2.svg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import TokenListDropDown from "./TokenListDropDown";
import {
  useSelectedTokenstate,
  useTokenstate,
} from "@/hooks/stores/tokenStore";
import {
  useAddLiquidityInputState,
  useLiquidityPositionDetailState,
} from "@/hooks/stores/addLiquidityStore";
import {
  TAddLiquidityInputState,
  TBorrowSideState,
  TLiquidityPositionDetailState,
  TRangeState,
  TSelectedTokenstate,
  TTokenInputState,
} from "../helper/types";
import { ethers } from "ethers";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import IERC20Abi from "@/constants/abis/IERC20.json";
import { useRouter } from "next/router";

import { NITRO_PAIR, NITRO_ROUTER } from "@/constants/addresses";
import nitroAbi from "@/constants/abis/NitroRouter.json";
import {
  useBorrowRangeState,
  useBorrowSideState,
} from "@/hooks/stores/borrowstores";

import { getIdFromPrice } from "../helper/price";
type Props = {};

const SelectPair = (props: Props) => {
  const { showTokenX, setShowTokenX, showTokenY, setShowTokenY }: any =
    useTokenstate();
  const [tokenYbalanceFetched, setTokenYBalanceFetched] = useState(false);
  const [tokenXbalanceFetched, setTokenXBalanceFetched] = useState(false);
  const [tokenXBalance, setTokenXBalance] = useState("");
  const [tokenYBalance, setTokenYBalance] = useState("");
  const { isBelowPriceRange } = useBorrowSideState() as TBorrowSideState;
  const {
    selectedTokenX,

    selectedTokenY,
  } = useSelectedTokenstate() as TSelectedTokenstate;
  const {
    lowerRangeInput,
    setLowerRangeInput,
    higherRangeInput,
    setHigherRangeInput,
  } = useBorrowRangeState() as TRangeState;
  const { liquidityPositionDetail } =
    useLiquidityPositionDetailState() as TLiquidityPositionDetailState;
  const router = useRouter();
  const currentPath = router.pathname;

  const {
    tokenXAmount,
    tokenYAmount,

    setTokenXAmount,
    setTokenYAmount,
  } = useAddLiquidityInputState() as TAddLiquidityInputState;

  useEffect(() => {
    if (currentPath === "/liquidity" && liquidityPositionDetail) {
      setTokenYAmount(liquidityPositionDetail.amountY);
      setTokenXAmount(liquidityPositionDetail.amountX);
    }
  }, [liquidityPositionDetail]);

  // gets getBorrowOut
  useEffect(() => {
    if (currentPath === "/borrow" && tokenXAmount) {
      const getBorroAmountOut = async () => {
        let tempProvider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        let tempSigner = tempProvider.getSigner();

        let routerContract = new ethers.Contract(
          NITRO_ROUTER,
          nitroAbi,
          tempSigner
        );
        let id = getIdFromPrice(higherRangeInput, 20);
        console.log(id, "iid");

        let txn = await routerContract.getBorrowOut(
          NITRO_PAIR,
          "10000000000000000000000000000000000",
          isBelowPriceRange,
          [id]
        );
        setTokenYAmount(txn.amountOut.toString());
        console.log("txn.amountOut.toString()", txn.amountOut.toString());
      };
      getBorroAmountOut();
    }
  }, [tokenXAmount, isBelowPriceRange, higherRangeInput]);

  //getBalance useEffect
  useEffect(() => {
    if (
      selectedTokenX.address !== undefined &&
      selectedTokenY.address !== undefined
    ) {
      let tempProvider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      console.log(
        "1st selectedTokenX.address",
        selectedTokenX.address,
        selectedTokenY.address
      );
      let tempSigner = tempProvider.getSigner();

      let IERC20TokenXContract = new ethers.Contract(
        selectedTokenX.address,
        IERC20Abi,
        tempSigner
      );

      const getUserBalanceTokenX = async () => {
        if (!tokenXBalance) {
          setTokenXBalanceFetched(false);
        }

        try {
          const tokenXBalance = await IERC20TokenXContract.balanceOf(
            tempSigner.getAddress()
          );
          const tokenXBalInEthers = Number(
            ethers.utils.formatEther(tokenXBalance)
          );

          const balance = Math.floor(tokenXBalInEthers * 100) / 100;

          setTokenXBalance(balance.toString());
          setTokenXBalanceFetched(true);
          console.log(tokenXBalance.toString(), "ppppp");
        } catch (error) {
          console.log(error);
        }
      };

      getUserBalanceTokenX();

      let IERC20TokenYContract = new ethers.Contract(
        selectedTokenY.address,
        IERC20Abi,
        tempSigner
      );
      console.log(selectedTokenY.address);

      const getUserBalanceTokenY = async () => {
        if (!tokenYBalance) {
          setTokenYBalanceFetched(false);
        }

        try {
          const tokenYBalance = await IERC20TokenYContract.balanceOf(
            tempSigner.getAddress()
          );
          const tokenYBalInEthers = Number(
            ethers.utils.formatEther(tokenYBalance)
          );

          const balance = Math.floor(tokenYBalInEthers * 100) / 100;

          setTokenYBalance(balance.toString());
          setTokenYBalanceFetched(true);
          console.log(tokenYBalance.toString());
        } catch (error) {
          console.log(error);
        }
      };

      getUserBalanceTokenY();
    }
  }, [selectedTokenY, selectedTokenX]);

  return (
    <div className="w-full md:px-5 mt-5">
      <p>Select Pair</p>

      <div className="flex justify-between gap-5 w-full mt-5 ">
        <div
          className="h-[60px]  rounded-2xl flex bg-[#071E33] hover:bg-[#0B2B47] w-1/2 items-center justify-between px-5 hover:cursor-pointer"
          onClick={() => {
            setShowTokenY(false);
            setShowTokenX(true);
          }}
        >
          <div className="flex gap-2 ">
            <Image
              src={selectedTokenX.image}
              alt=""
              height={0}
              width={0}
              className="h-6 w-6"
            />
            <p>{selectedTokenX.name}</p>
          </div>
          <MdOutlineKeyboardArrowDown />
        </div>

        <div
          className="h-[60px]  rounded-2xl flex bg-[#071E33] hover:bg-[#0B2B47] w-1/2 items-center justify-between px-5 hover:cursor-pointer"
          onClick={() => {
            setShowTokenX(false);
            setShowTokenY(true);
          }}
        >
          <div className="flex gap-2 ">
            <Image
              src={selectedTokenY.image}
              alt=""
              height={0}
              width={0}
              className="h-6 w-6"
            />
            <p>{selectedTokenY.name}</p>
          </div>
          <MdOutlineKeyboardArrowDown />
        </div>
      </div>

      <div className="flex relative w-full">
        {showTokenX && (
          <div className=" ">
            <TokenListDropDown />
          </div>
        )}
        {showTokenY && (
          <div className="  ">
            <TokenListDropDown />
          </div>
        )}
      </div>

      <div className="h-[120px] flex-col rounded-2xl w-full bg-[#071E33] mt-5 hover:border-[#383D48] hover:border px-5 flex justify-center">
        <div className="w-full flex">
          <input
            type="number"
            className="w-[70%] bg-[#071E33] outline-none px-5 text-xl placeholder:text-[#6A84A0]"
            placeholder="0.0 "
            value={tokenXAmount}
            onChange={(e: any) => setTokenXAmount(e.target.value)}
          />
          <div className="flex w-[30%] gap-1 hover:cursor-pointer bg-greenRbg border border-greenBorderRbg h-[40px] items-center justify-center rounded-3xl px-1">
            <Image
              src={selectedTokenX.image}
              alt=""
              height={0}
              width={0}
              className="h-6 w-6"
            />
            <p className="text-sm">{selectedTokenX.name}</p>
          </div>
        </div>

        <div className="flex justify-between mt-2 text-sm font-thin">
          {!tokenXbalanceFetched ? (
            <div className="">
              <div className="flex  items-center px-5 gap-2">
                <AiOutlineLoading3Quarters className="animate-spin " />
                <p>fetching balance</p>
              </div>
            </div>
          ) : (
            <p className="px-5">Balance:{tokenXBalance} </p>
          )}
          <button
            className="text-[#212FE6] bg-[#8A93FF] px-2 font-bold rounded-xl"
            type="button"
            onClick={() => setTokenXAmount(tokenXBalance)}
          >
            Max
          </button>
        </div>
      </div>
      <div className="h-[120px] flex-col rounded-2xl w-full bg-[#071E33] mt-5 hover:border-[#383D48] hover:border px-5 flex justify-center">
        <div className="w-full flex">
          <input
            type="number"
            className="w-[70%] bg-[#071E33] outline-none px-5 text-xl placeholder:text-[#6A84A0]"
            placeholder="0.0 "
            value={tokenYAmount}
            onChange={(e: any) => setTokenYAmount(e.target.value)}
          />
          <div className="flex w-[30%] gap-1 bg-greenRbg border border-greenBorderRbg h-[40px] items-center justify-center rounded-3xl px-1 hover:cursor-pointer">
            <Image
              src={selectedTokenY.image}
              alt=""
              height={0}
              width={0}
              className="h-6 w-6"
            />
            <p className="text-sm">{selectedTokenY.name}</p>
          </div>
        </div>

        <div className="flex justify-between mt-2 text-sm font-thin">
          {!tokenYbalanceFetched ? (
            <div className="">
              <div className="flex  items-center px-5 gap-2">
                <AiOutlineLoading3Quarters className="animate-spin " />
                <p>fetching balance</p>
              </div>
            </div>
          ) : (
            <p className="px-5">Balance:{tokenYBalance} </p>
          )}
          <button
            className="text-[#212FE6] bg-[#8A93FF] px-2 font-bold rounded-xl"
            type="button"
            onClick={() => setTokenYAmount(tokenYBalance)}
          >
            Max
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectPair;
