import {
  useAddLiquidityInputState,
  useAddLiquidityPreviewState,
  useLiquidityTxnHashState,
} from "@/hooks/stores/addLiquidityStore";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useSuccessState } from "@/hooks/stores/successStore";

import {
  TAddLiquidityInputState,
  TAddLiquidityPreviewState,
  TLiquidityTxnHashState,
  TPairDataContractState,
  TRangeState,
  TSelectedTokenstate,
  TSuccessState,
} from "../helper/types";
import { ethers } from "ethers";
import { usePairDataContractState } from "@/hooks/stores/contractStore";
import { NITRO_PAIR, NITRO_ROUTER } from "@/constants/addresses";
import IERC20Abi from "@/constants/abis/IERC20.json";
import {
  generateDeltaIds,
  getIdFromPrice,
  getPriceFromId,
} from "../helper/price";

import { useSelectedTokenstate } from "@/hooks/stores/tokenStore";
import { AVERAGE_BLOCK_TIME, PAIR_BIN_STEP } from "@/constants/constants";
import pairAbi from "@/constants/abis/NitroPair.json";
import nitroAbi from "@/constants/abis/NitroRouter.json";
import { useRangeState } from "@/hooks/stores/rangeStore";
const AddLiquidityModal = () => {
  const { setIsPreviewPositionAdd } =
    useAddLiquidityPreviewState() as TAddLiquidityPreviewState;
  const { setIsSuccessfull } = useSuccessState() as TSuccessState;
  const [approve, setApprove] = useState(false);
  const [toApprove, setToApprove] = useState("");
  const { setLiquidityTxnHash } =
    useLiquidityTxnHashState() as TLiquidityTxnHashState;
  const [activeIdDesired, setActiveIdDesired] = useState("");

  const [estimatedTimestamp, setEstimatedTimestamp] = useState<any>();
  const { activeId } = usePairDataContractState() as TPairDataContractState;
  const { selectedTokenX, selectedTokenY } =
    useSelectedTokenstate() as TSelectedTokenstate;
  const binstep = 20;
  const [price, SetPrice] = useState<Number>();
  const {
    lowerRangeInput,

    higherRangeInput,
  } = useRangeState() as TRangeState;
  const { tokenXAmount, tokenYAmount } =
    useAddLiquidityInputState() as TAddLiquidityInputState;

  //useEffect to get active price, to be deleted
  const XtokenAmount = ethers.utils.parseUnits(tokenXAmount.toString(), "18");
  const YtokenAmount = ethers.utils.parseUnits(tokenYAmount.toString(), "18");
  useEffect(() => {
    const getActiveId = async () => {
      let tempProvider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      let tempSigner = tempProvider.getSigner();
      let pairContract = new ethers.Contract(NITRO_PAIR, pairAbi, tempSigner);
      const txn = await pairContract.getReservesAndActiveID();
      setActiveIdDesired(txn.activeId.toString());
    };
    console.log("activeId", activeId);
    getActiveId().catch(console.error);
  }, [activeIdDesired]);

  //checks if the amount is greater than the approved amount
  useEffect(() => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let ERC2OXContract = new ethers.Contract(
      selectedTokenX.address,
      IERC20Abi,
      tempSigner
    );

    let ERC2OYContract = new ethers.Contract(
      selectedTokenY.address,
      IERC20Abi,
      tempSigner
    );

    const getApprovedAmount = async () => {
      const approvedXAmount = await ERC2OXContract.allowance(
        tempSigner.getAddress(),
        NITRO_ROUTER
      );
      const approvedYAmount = await ERC2OYContract.allowance(
        tempSigner.getAddress(),
        NITRO_ROUTER
      );
      console.log(
        "approvedXAmount.toString()",
        approvedYAmount.toString(),
        "approvedXAmount.toString()",
        approvedYAmount.toString(),
        "tokenXAmount",
        XtokenAmount.toString(),
        "tokenYAmount",
        YtokenAmount.toString()
      );

      if (
        approvedXAmount.toString() < XtokenAmount.toString() &&
        approvedYAmount.toString() < YtokenAmount.toString()
      ) {
        setApprove(false);
        setToApprove("both");
      }
      if (approvedXAmount.toString() < XtokenAmount.toString()) {
        setApprove(false);
        setToApprove("tokenX");
      }
      if (approvedYAmount.toString() < YtokenAmount.toString()) {
        setApprove(false);
        setToApprove("tokenY");
      }
      if (
        approvedXAmount.toString() >= XtokenAmount.toString() &&
        approvedYAmount.toString() >= YtokenAmount.toString()
      ) {
        setApprove(true);
      }
    };

    getApprovedAmount();
  }, [
    tokenXAmount,
    tokenYAmount,
    selectedTokenX.address,
    selectedTokenY.address,
  ]);

  const handleApproval = async () => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let ERC2OXContract = new ethers.Contract(
      selectedTokenX.address,
      IERC20Abi,
      tempSigner
    );

    let ERC2OYContract = new ethers.Contract(
      selectedTokenY.address,
      IERC20Abi,
      tempSigner
    );

    if (toApprove === "both") {
      await ERC2OXContract.approve(NITRO_ROUTER, XtokenAmount);
      await ERC2OYContract.approve(NITRO_ROUTER, YtokenAmount);

      setToApprove("");
    }

    if (toApprove === "tokenX") {
      await ERC2OXContract.approve(NITRO_ROUTER, XtokenAmount);

      setToApprove("");
    }
    if (toApprove === "tokenY") {
      await ERC2OYContract.approve(NITRO_ROUTER, YtokenAmount);
      setToApprove("");
    }
    setApprove(true);
  };

  console.log(tokenXAmount, tokenYAmount);
  console.log(activeId);

  const addLiquidityHandler = async (e: any) => {
    e.preventDefault();
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let routerContract = new ethers.Contract(
      NITRO_ROUTER,
      nitroAbi,
      tempSigner
    );

    let pairContract = new ethers.Contract(NITRO_PAIR, pairAbi, tempSigner);

    const txn = await pairContract.getReservesAndActiveID();
    const activeIdDesired = txn.activeId.toString();

    const minId = getIdFromPrice(lowerRangeInput, PAIR_BIN_STEP);
    const maxId = getIdFromPrice(higherRangeInput, PAIR_BIN_STEP);
    console.log("minId", minId, "maxId", maxId);

    const blockNumBefore = await tempProvider.getBlockNumber();
    const blockBefore = await tempProvider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;
    setEstimatedTimestamp(timestampBefore + 50);

    const to = await tempSigner.getAddress();

    const amountXMin =
      Math.floor((Number(XtokenAmount) - Number(XtokenAmount) * 0.1) * 100) /
      100;
    const amountYMin =
      Math.floor((Number(YtokenAmount) - Number(YtokenAmount) * 0.1) * 100) /
      100;
    console.log(
      "amountXMin",
      String(amountXMin),
      "amountYMin",
      String(amountYMin)
    );
    console.log("lk", XtokenAmount.toString());
    console.log("lk2", YtokenAmount.toString());

    try {
      const { deltaIds, distributionX, distributionY } = generateDeltaIds(
        minId,
        maxId,
        activeIdDesired,
        Number(XtokenAmount.toString()),
        Number(YtokenAmount.toString())
      );
      console.log(
        "deltaIds, distributionX, distributionY ",
        deltaIds,
        distributionX,
        distributionY
      );

      const addTxn = await routerContract.addLiquidity([
        "0x109D6A9A17306F6B8BB545F6061Bc9Aed3ae8463",
        "0x505981Cb786561bB626749Be0f133013D7B59513",
        PAIR_BIN_STEP,
        XtokenAmount.toString(),
        YtokenAmount.toString(),
        amountXMin.toString(),
        amountYMin.toString(),

        activeIdDesired.toString(),
        "25",
        deltaIds,

        distributionY,
        distributionX,

        to,
        estimatedTimestamp,
      ]);

      console.log(addTxn);
      setLiquidityTxnHash(addTxn.hash);
      setIsPreviewPositionAdd(false);

      setIsSuccessfull(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const price = getPriceFromId(Number(activeId), binstep);
    SetPrice(price);
  }, [activeId]);

  return (
    <>
      <div className="h-screen     px-2 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  flex items-center justify-center text-white ">
        <form
          onSubmit={addLiquidityHandler}
          className="h-[600px] w-[500px] bg-[#031120] px-10 rounded-2xl  "
        >
          <div>
            <div className="flex justify-between  mt-5  items-center">
              {" "}
              <div></div>
              <div>
                <p className="text-xl">Add Liquidity</p>
              </div>
              <IoClose
                className="text-2xl hover:cursor-pointer"
                onClick={() => setIsPreviewPositionAdd(false)}
              />
            </div>
            <div className="flex  mt-10">
              <div className="flex px-5 items-center ">
                <Image
                  src={selectedTokenX.image}
                  alt=""
                  width="0"
                  height="0"
                  className="-mx-2 h-7 w-7"
                />
                <Image
                  src={selectedTokenY.image}
                  alt=""
                  width="0"
                  height="0"
                  className="  h-7 w-7"
                />
                <div className="px-2 flex gap-1">
                  {" "}
                  <p> {selectedTokenX.name}</p> /<p> {selectedTokenY.name}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#091E33] h-32 w-full mt-5 rounded-2xl px-5 flex flex-col gap-5 justify-center items-center">
              <div className="flex justify-between  w-full ">
                <div className="flex gap-2 ">
                  <Image
                    src={selectedTokenX.image}
                    alt=""
                    width="0"
                    height="0"
                    className=" h-7 w-7"
                  />
                  <p> {selectedTokenY.name}</p>
                </div>
                <p>{tokenXAmount}</p>
              </div>
              <div className="flex justify-between  w-full ">
                <div className="flex gap-2 ">
                  <Image
                    src={selectedTokenY.image}
                    alt=""
                    width="0"
                    height="0"
                    className=" h-7 w-7"
                  />
                  <p> {selectedTokenY.name}</p>
                </div>
                <p>{tokenYAmount}</p>
              </div>
            </div>
            <p className="mt-5">Selected Range</p>
            <div className="w-full flex mt-3 gap-5">
              <div className="w-1/2 border-[0.1px] rounded-xl h-20 border-[#8690A2] flex justify-between items-center  flex-col py-2">
                <p className="font-thin text-[#9DA5B4] text-sm ">Min Price</p>
                <p>{`<${Math.floor(lowerRangeInput * 100) / 100}`}</p>
                <p className="font-thin text-[#9DA5B4] text-sm ">
                  USDT Per ETH
                </p>
              </div>
              <div className="w-1/2 border-[0.1px] rounded-xl h-20 border-[#8690A2] flex justify-between items-center  flex-col py-2">
                <p className="font-thin text-[#9DA5B4] text-sm ">Max Price</p>
                <p>{`<${Math.floor(higherRangeInput * 100) / 100}`}</p>
                <p className="font-thin text-[#9DA5B4] text-sm ">
                  USDT Per ETH
                </p>
              </div>
            </div>
            <div className="w-full border-[0.1px] mt-3 rounded-xl h-20 border-[#8690A2] flex justify-between items-center  flex-col py-2">
              <p className="font-thin text-[#9DA5B4] text-sm ">Current Price</p>
              <p>{`<${Math.floor(Number(price) * 100) / 100}`}</p>
              <p className="font-thin text-[#9DA5B4] text-sm ">USDT Per ETH</p>
            </div>
            {approve ? (
              <button className={`${styles.button} w-full mt-5`}>Add</button>
            ) : (
              <button
                className={`${styles.button} w-full mt-5`}
                type="button"
                onClick={() => handleApproval()}
              >
                Approve
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddLiquidityModal;
