import {
  useAddLiquidityInputState,
  useAddLiquidityPreviewState,
  useCreatePositionPreviewState,
  useLiquidityPositionDetailState,
  useLiquidityTxnHashState,
} from "@/hooks/stores/addLiquidityStore";
import React from "react";
import { IoClose } from "react-icons/io5";
import eth from "@/assets/Eth logo.svg";
import usdt from "@/assets/tether-seeklogo.com 2.svg";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useSuccessState } from "@/hooks/stores/successStore";
import { NITRO_PAIR, NITRO_ROUTER } from "@/constants/addresses";
import { ethers } from "ethers";
import nitroRouterAbi from "@/constants/abis/NitroRouter.json";
import pairAbi from "@/constants/abis/NitroPair.json";
import IERC1155Abi from "@/constants/abis/IERC1155.json";
import { useSelectedSwapTokenstate } from "@/hooks/stores/swapStore";
import {
  TAddLiquidityInputState,
  TAddLiquidityPreviewState,
  TLiquidityPositionDetailState,
  TLiquidityTxnHashState,
  TSelectedSwapTokenstate,
  TSuccessState,
} from "../helper/types";
import { PAIR_BIN_STEP } from "@/constants/constants";
type Props = {};

const RemoveLiquidityModal = (props: Props) => {
  const { setIsPreviewPositionRemove } =
    useAddLiquidityPreviewState() as TAddLiquidityPreviewState;
  const { setIsSuccessfull } = useSuccessState() as TSuccessState;

  const {
    selectedTokenX,

    selectedTokenY,
  } = useSelectedSwapTokenstate() as TSelectedSwapTokenstate;
  const { setLiquidityTxnHash } =
    useLiquidityTxnHashState() as TLiquidityTxnHashState;
  const { liquidityPositionDetail } =
    useLiquidityPositionDetailState() as TLiquidityPositionDetailState;
  const { tokenXAmount, tokenYAmount } =
    useAddLiquidityInputState() as TAddLiquidityInputState;
  console.log(liquidityPositionDetail, "liquidityPositionDetail");
  const handleRemoveLiquidity = async () => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();

    let routerContract = new ethers.Contract(
      NITRO_ROUTER,
      nitroRouterAbi,
      tempSigner
    );

    let IERC1155Contract = new ethers.Contract(
      NITRO_PAIR,
      IERC1155Abi,
      tempSigner
    );

    console.log(
      " selectedTokenY.address",
      selectedTokenY.address,
      "selectedTokenX.address",
      selectedTokenX.address
    );

    try {
      const approvedForAll = await IERC1155Contract.isApprovedForAll(
        tempSigner.getAddress(),
        NITRO_ROUTER
      );
      if (!approvedForAll) {
        await IERC1155Contract.setApprovalForAll(NITRO_ROUTER, true);
      } else {
        console.log("approved", approvedForAll);
      }

      const txn = await routerContract.removeLiquidity(
        selectedTokenX.address,
        selectedTokenY.address,
        PAIR_BIN_STEP,
        "0",
        "0",
        [liquidityPositionDetail.NitroPair_id],
        [liquidityPositionDetail.amountY],
        tempSigner.getAddress(),
        "1688543388"
      );
      console.log(txn);
      setLiquidityTxnHash(txn.hash);
      setIsPreviewPositionRemove(false);
      setIsSuccessfull(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="h-screen px-2  w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  flex items-center justify-center text-white ">
        <div className="h-[400px] w-[500px] bg-[#031120] px-10 rounded-2xl ">
          <div className="flex justify-between  mt-5  items-center">
            {" "}
            <div></div>{" "}
            <div>
              <p className="text-xl">Remove Liquidity</p>
            </div>
            <IoClose
              className="text-2xl hover:cursor-pointer"
              onClick={() => setIsPreviewPositionRemove(false)}
            />
          </div>
          <div className="flex  mt-10">
            <div className="flex px-5 items-center ">
              <Image
                src={selectedTokenX.image}
                alt=""
                width="0"
                height="0"
                className="-mx-3 h-7 w-7"
              />
              <Image
                src={selectedTokenY.image}
                alt=""
                width="0"
                height="0"
                className="  h-7 w-7"
              />
              <p className="px-2">
                {selectedTokenX.name}/{selectedTokenY.name}
              </p>
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
                <p>{selectedTokenX.name}</p>
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
                <p>{selectedTokenY.name}</p>
              </div>
              <p>{tokenYAmount}</p>
            </div>
          </div>

          <button
            className={`${styles.button} w-full mt-5`}
            onClick={() => {
              handleRemoveLiquidity();
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default RemoveLiquidityModal;
