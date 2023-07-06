import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useState } from "react";

import { AiOutlineLoading3Quarters, AiOutlineSetting } from "react-icons/ai";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import {
  useCustomSlippageState,
  usePreviewParamsState,
  usePreviewSwapState,
  useSelectedSwapTokenstate,
  useSettingsState,
  useSwapInputState,
  useSwapTokenstate,
  useSwapTxnHahState,
} from "@/hooks/stores/swapStore";
import SwapSetting from "./SwapSetting";
import ReviewSwapModal from "./ReviewSwapModal";
import { SuccessCard } from "../success";
import { useSuccessState } from "@/hooks/stores/successStore";
import { ethers } from "ethers";
import nitroRouterAbi from "@/constants/abis/NitroRouter.json";
import TokenlistModal from "./TokenlistModal";
import { NITRO_ROUTER } from "@/constants/addresses";
import {
  TCustomSlippageState,
  TPreviewParamsState,
  TSelectedSwapTokenstate,
  TTokenInputState,
  TSwapTxnHahState,
  TSuccessState,
} from "../helper/types";
import IERC20Abi from "@/constants/abis/IERC20.json";
import { useAccount } from "wagmi";
import { timeStamp } from "console";
type Props = {};

const SwapBase = (props: Props) => {
  const AVERAGE_BLOCK_TIME = 15;
  const AVERAGE_SLIPPAGE = 5;
  const [estimatedTimestamp, setEstimatedTimestamp] = useState<any>();
  const { customSlippage, setCustomSlippage } =
    useCustomSlippageState() as TCustomSlippageState;
  const { isSettingOpen, setIsSettingOpen }: any = useSettingsState();
  const { isPreviewSwap, setIsPreviewSwap }: any = usePreviewSwapState();
  const { isSuccessfull } = useSuccessState() as TSuccessState;
  const { tokenX, setTokenX, tokenY, setTokenY } =
    useSwapInputState() as TTokenInputState;
  const [] = useState<any>();
  const [isBestPriceFetched, setIsBestPriceFetched] = useState(false);

  const [approve, setApprove] = useState(false);
  const [tokenXBalance, setTokenXBalance] = useState("");
  const [tokenYBalance, setTokenYBalance] = useState("");
  const { previewParams, setPreviewParams } =
    usePreviewParamsState() as TPreviewParamsState;
  const { txnHash } = useSwapTxnHahState() as TSwapTxnHahState;
  const { showTokenX, setShowTokenX, showTokenY, setShowTokenY }: any =
    useSwapTokenstate();
  const {
    selectedTokenX,
    setSelectedTokenX,
    selectedTokenY,
    setSelectedTokenY,
  } = useSelectedSwapTokenstate() as TSelectedSwapTokenstate;
  const [tokenYbalanceFetched, setTokenYBalanceFetched] = useState(false);
  const [tokenXbalanceFetched, setTokenXBalanceFetched] = useState(false);
  const [switched, setSwitched] = useState(true);
  const { address } = useAccount();
  const switchHandler = () => {
    setTokenXBalance(tokenYBalance);
    setTokenYBalance(tokenXBalance);
    setSelectedTokenY(selectedTokenX);
    setSelectedTokenX(selectedTokenY);
    setSwitched(!switched);
    setTokenX(tokenY);
  };

  //Approve useeffect
  useEffect(() => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    console.log("approve token x", selectedTokenX.address);
    let IERC20Contract = new ethers.Contract(
      selectedTokenX.address,
      IERC20Abi,
      tempSigner
    );
    console.log(tempSigner);

    const getApprovedAmount = async () => {
      const approvedAmount = await IERC20Contract.allowance(
        tempSigner.getAddress(),
        NITRO_ROUTER
      );
      console.log("selectedTokenX approved amount", approvedAmount.toString());
      if (approvedAmount < tokenX) {
        setApprove(true);
      } else if (approvedAmount > tokenX) {
        setApprove(false);
      }
    };

    getApprovedAmount();
  }, [selectedTokenX.address]);

  //getBalance useEffect
  useEffect(() => {
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
  }, [selectedTokenY, selectedTokenX, address]);

  const handleApproval = async () => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let IERC20Contract = new ethers.Contract(
      selectedTokenX.address,
      IERC20Abi,
      tempSigner
    );
    try {
      const txn = IERC20Contract.approve(NITRO_ROUTER, tokenX);
      setApprove(true);
      console.log(txn);
    } catch (error) {
      console.log(error);
    }
  };

  //automatically fetches the swap value of token and sets it in the input box
  useEffect(() => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let swapContract = new ethers.Contract(
      NITRO_ROUTER,
      nitroRouterAbi,
      tempSigner
    );

    const swapOut = async () => {
      try {
        if (Number(tokenX) === 0) return;
        setIsBestPriceFetched(true);

        const txn = await swapContract.getSwapOut(
          "0xC4c0012CB56952dB52E1E34F244Ad653795b55Ba",
          tokenX,
          true
        );

        setTokenY(txn.amountOut.toString());
        setIsBestPriceFetched(false);
        console.log(
          "amountOut:",
          txn.amountOut.toString(),
          "fee:",
          txn.fee.toString()
        );
      } catch (error) {
        console.log(error);
      }
    };

    const swapIn = async () => {
      try {
        if (Number(tokenX) === 0) return;
        const txn = await swapContract.getSwapIn(
          "0xC4c0012CB56952dB52E1E34F244Ad653795b55Ba",
          tokenX,
          false
        );

        setTokenY(txn.amountIn.toString());
        console.log(
          "amountIn2222:",
          txn.amountIn.toString(),
          "fee:",
          txn.fee.toString()
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (switched) {
      swapOut();
      console.log("me1");
    } else {
      swapIn();
      console.log("me2");
    }
    swapOut();
  }, [tokenX]);

  const handlePreview = async () => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let swapContract = new ethers.Contract(
      "0x5d8165adD2156bFD51E6CcCb15293db07Fe8ba07",
      nitroRouterAbi,
      tempSigner
    );

    try {
      if (Number(tokenX) === 0) return;
      if (tokenX === "" || tokenY === "") {
        console.log("no input value for tokenX or tokenY");
        return;
      }
      setIsPreviewSwap(true);
      const exchangeRate = await swapContract.getSwapOut(
        "0xC4c0012CB56952dB52E1E34F244Ad653795b55Ba",
        1,
        true
      );
      const minReceived = await swapContract.getSwapOut(
        "0xC4c0012CB56952dB52E1E34F244Ad653795b55Ba",
        tokenX,
        true
      );

      const blockNumBefore = await tempProvider.getBlockNumber();
      const blockBefore = await tempProvider.getBlock(blockNumBefore);
      const timestampBefore = blockBefore.timestamp;
      //setEstimatedTimestamp(timestampBefore + 50);
      console.log("estimatedTimestamp", timestampBefore);
      console.log("c");
      const getSlippage = () => {
        if (customSlippage) {
          return 100 - Number(customSlippage);
        } else {
          return 100 - AVERAGE_SLIPPAGE;
        }
      };
      const amountOutWithSlippage = getSlippage();
      console.log(
        ethers.utils.parseUnits(tokenX),
        "ethers.utils.parseUnits(tokenX)"
      );
      const gasPrice = await ethers.getDefaultProvider().getGasPrice();
      const gasUnits = await swapContract.estimateGas.swapExactTokensForTokens(
        ethers.utils.parseUnits(tokenX).toString(),
        amountOutWithSlippage,
        [20],
        [
          "0x109D6A9A17306F6B8BB545F6061Bc9Aed3ae8463",
          "0x505981Cb786561bB626749Be0f133013D7B59513",
        ],
        tempSigner.getAddress(),
        String(timestampBefore + 50)
      );

      const transactionFee = gasPrice.mul(gasUnits);
      console.log("bbbbbb");
      console.log("transactionFee in wei: " + transactionFee.toString());
      setPreviewParams({
        ...previewParams,
        exchangeRate: exchangeRate.amountOut.toString(),
        mininumReceived: minReceived.amountOut.toString(),
        tokenXName: selectedTokenX.name,
        tokenYName: selectedTokenY.name,
        loaded: true,
        estimatedTimestamp: String(timestampBefore + 50),
        netWorkFee: ethers.utils.formatUnits(transactionFee, "ether"),
      });

      console.log(
        "transactionFee in ether: "
        //ethers.utils.formatUnits(transactionFee, "ether")
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full  h-full mt-[180px] flex justify-center items-center text-white md:px-0 px-1">
      <div className="bg-[#061727]  h-[500px] w-[500px] rounded-2xl relative">
        <div className="flex justify-between px-5 items-center pt-5">
          <div></div>
          <p className="font-bold text-xl">Swap</p>
          <AiOutlineSetting
            className="text-2xl hover:cursor-pointer"
            onClick={() => setIsSettingOpen(!isSettingOpen)}
          />
        </div>
        <div className="border-b border-[0.1px] border-[#21242C] mt-3"></div>

        <div className="px-5">
          <div className="h-[120px] flex-col rounded-2xl w-full bg-[#071E33] mt-5 hover:border-[#383D48] hover:border px-5 flex justify-center">
            <div className="w-full flex">
              <input
                type="number"
                className="w-[70%] bg-[#071E33] outline-none px-5 text-xl placeholder:text-[#6A84A0]"
                placeholder="0.0 "
                value={tokenX}
                onChange={(e: any) => {
                  setTokenX(e.target.value);
                }}
              />
              <div
                className="flex w-[30%] gap-1 hover:cursor-pointer bg-greenRbg border border-greenBorderRbg h-[40px] items-center justify-center rounded-3xl px-1"
                onClick={() => setShowTokenX(true)}
              >
                <Image
                  src={selectedTokenX.image}
                  alt=""
                  height={0}
                  width={0}
                  className="w-6 h-6"
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
                onClick={() => setTokenX(tokenXBalance)}
              >
                Max
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-3xl mt-3 text-[#00FDEE] hover:cursor-pointer">
          <div onClick={() => switchHandler()} className="flex">
            <FaLongArrowAltUp />
            <FaLongArrowAltDown className="-ml-3" />
          </div>
        </div>
        <div className="px-5">
          <div className="h-[120px] flex-col rounded-2xl w-full bg-[#071E33] mt-5 hover:border-[#383D48] hover:border px-5 flex justify-center">
            <div className="w-full flex">
              <input
                type="number"
                className="w-[70%] bg-[#071E33] outline-none px-5 text-xl placeholder:text-[#6A84A0]"
                placeholder="0.0 "
                value={tokenY}
                onChange={(e: any) => setTokenY(e.target.value)}
              />
              <div
                className="flex w-[30%] gap-1 hover:cursor-pointer bg-greenRbg border border-greenBorderRbg h-[40px] items-center justify-center rounded-3xl px-1"
                onClick={() => setShowTokenY(true)}
              >
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
                onClick={() => setTokenY(tokenYBalance)}
              >
                Max
              </button>
            </div>
          </div>
        </div>
        {isBestPriceFetched && (
          <div className="px-5">
            <div className="flex mt-4 items-center px-5 gap-2">
              <AiOutlineLoading3Quarters className="animate-spin " />
              <p>fetching best price</p>
            </div>
          </div>
        )}

        <div className="px-5">
          {approve ? (
            <button
              className={`${styles.button} w-full mt-4`}
              type="button"
              onClick={() => {
                handleApproval();
              }}
            >
              Approve
            </button>
          ) : (
            <button
              className={`${styles.button} w-full mt-4`}
              type="button"
              onClick={() => {
                handlePreview();
              }}
            >
              Preview
            </button>
          )}
        </div>

        {isSettingOpen && (
          <div className="flex justify-end px-5 w-full">
            <SwapSetting />
          </div>
        )}
      </div>
      {isPreviewSwap && (
        <div className="absolute top-0 w-full h-screen">
          <ReviewSwapModal />
        </div>
      )}
      {isSuccessfull && !isPreviewSwap && (
        <div className="absolute top-0 w-full h-screen">
          <SuccessCard
            text=""
            arbiscanLink={`https://testnet.arbiscan.io/tx/${txnHash}`}
          />
        </div>
      )}

      {showTokenX && (
        <div className="absolute top-0 w-full h-screen">
          <TokenlistModal />
        </div>
      )}
      {showTokenY && (
        <div className="absolute top-0 w-full h-screen">
          <TokenlistModal />
        </div>
      )}
    </div>
  );
};

export default SwapBase;
