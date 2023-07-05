import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import SlideInput from "./SlideInput";
import {
  useAddLiquidityInputState,
  useAddLiquidityPreviewState,
  useLiquidyState,
} from "@/hooks/stores/addLiquidityStore";
import { useSuccessState } from "@/hooks/stores/successStore";
import {
  useBorrowRangeState,
  useBorrowSideState,
  useBorrowSlideInputState,
  useBorrowState,
  useTokenPriceState,
} from "@/hooks/stores/borrowstores";
import { useSelectedTokenstate } from "@/hooks/stores/tokenStore";
import { getPriceFromId } from "../helper/price";
import { usePairDataContractState } from "@/hooks/stores/contractStore";
import {
  TAddLiquidityInputState,
  TBorrowSideState,
  TPairDataContractState,
  TRangeState,
  TSlideInputState,
  TTokenPriceState,
} from "../helper/types";
import { PAIR_BIN_STEP } from "@/constants/constants";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ethers } from "ethers";
import IERC20Abi from "@/constants/abis/IERC20.json";
import { NITRO_ROUTER } from "@/constants/addresses";
import { useAccount } from "wagmi";
type Props = {};

const SetPriceRange = (props: Props) => {
  const {
    lowerRangeInput,
    setLowerRangeInput,
    higherRangeInput,
    setHigherRangeInput,
  } = useBorrowRangeState() as TRangeState;
  const { isPreview, setIsPreview }: any = useBorrowState();
  const { isBelowPriceRange, setIsBelowPriceRange } =
    useBorrowSideState() as TBorrowSideState;
  const { range, setRange } = useBorrowSlideInputState() as TSlideInputState;
  const { isSuccessfull, setIsSuccessfull }: any = useSuccessState();
  const { isAddLiquidity }: any = useLiquidyState();
  const {
    selectedTokenX,

    selectedTokenY,
  }: any = useSelectedTokenstate();
  const [isApproved, setisApproved] = useState(false);
  const { price, setPrice } = useTokenPriceState() as TTokenPriceState;
  const { tokenXAmount, tokenYAmount } =
    useAddLiquidityInputState() as TAddLiquidityInputState;
  const { activeId } = usePairDataContractState() as TPairDataContractState;
  const { address } = useAccount();
  //sets lowerRangeInput  and higherRangeInput at at 0.05% of  the active price on mount
  useEffect(() => {
    if (isBelowPriceRange) {
      setLowerRangeInput(Number(price) - Number(price) * 0.05);
      setHigherRangeInput(Number(price) - Number(price) * 0.03);
      setRange([0, 10]);
    } else {
      setLowerRangeInput(Number(price) + Number(price) * 0.03);
      setHigherRangeInput(Number(price) + Number(price) * 0.05);
      setRange([100, 90]);
    }
  }, [price, isBelowPriceRange]);

  //changes the values of the lowerRangeInput  as the range changes
  useEffect(() => {
    const updateLowerRangeInput = () => {
      setLowerRangeInput(lowerRangeInput * 1.0005);
    };

    updateLowerRangeInput();
  }, [range[0]]);

  //changes the values of the higherRangeInput as the range changes
  useEffect(() => {
    const updateHigherRangeInput = () => {
      setHigherRangeInput(higherRangeInput * 1.0005);
    };
    updateHigherRangeInput();
  }, [range[1]]);
  useEffect(() => {
    const price = getPriceFromId(Number(activeId), PAIR_BIN_STEP);
    setPrice(price);
  }, [activeId]);
  //checks if a user needs approval
  useEffect(() => {
    if (window.ethereum) {
      const checkIfApproved = async () => {
        let tempProvider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        let tempSigner = tempProvider.getSigner();
        let ERC2OContract = new ethers.Contract(
          selectedTokenX.address,
          IERC20Abi,
          tempSigner
        );
        const approvedAmount = await ERC2OContract.allowance(
          tempSigner.getAddress(),
          NITRO_ROUTER
        );

        if (Number(approvedAmount) > Number(tokenXAmount)) {
          setisApproved(true);
        } else if (Number(approvedAmount) < Number(tokenXAmount)) {
          setisApproved(false);
        }
      };

      checkIfApproved();
    }
  }, [tokenXAmount, selectedTokenX, address]);

  const handleApproval = async () => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let ERC2OContract = new ethers.Contract(
      selectedTokenX.address,
      IERC20Abi,
      tempSigner
    );
    await ERC2OContract.approve(NITRO_ROUTER, tokenXAmount);
    setisApproved(true);
  };

  const handlePreview = async () => {};
  return (
    <div className="w-full md:px-5 mt-5">
      {isAddLiquidity && (
        <>
          <div className="flex justify-between">
            <p>SetPriceRange</p>
            <div className="flex gap-2 items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onClick={() => setIsBelowPriceRange(!isBelowPriceRange)}
                />
                <div className="w-11 h-6 bg-[#00FDEE] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00FDEE] dark:peer-focus:ring-[#00FDEE] rounded-full peer dark:bg-[#00FDEE] peer-checked:after:translate-x-full peer-checked:after:border-[#045651] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#045651] after:border-[#045651] after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-[#045651] peer-checked:bg-[#00FDEE]"></div>
              </label>
              {isBelowPriceRange ? (
                <p className="text-sm text-[#D7DEEA]">Below Price</p>
              ) : (
                <p className="text-sm text-[#D7DEEA]">Above Price</p>
              )}
            </div>
          </div>
          <div className="text-sm text-[#D7DEEA] flex gap-3 justify-center mt-5">
            <p> Current Price:</p>
            {price == 0 ? (
              <div className="flex  items-center px-5 gap-2">
                <AiOutlineLoading3Quarters className="animate-spin " />
                <p>fetching price</p>
              </div>
            ) : (
              <p> {Math.floor(Number(price) * 100) / 100}</p>
            )}

            <p>
              {selectedTokenX.name} per {selectedTokenY.name}
            </p>
          </div>

          <div className=" mt-5">
            <SlideInput />
          </div>

          <div className="flex justify-between w-full gap-3 mt-10">
            <div className="flex flex-col items-center  justify-between rounded-md border  border-[#383D48] w-1/2 h-[100px] py-2">
              <p className="font-thin text-[#9DA5B4] text-sm ">Min Price</p>
              <div className="flex justify-between px-5">
                <div
                  className="flex items-center justify-center hover:cursor-pointer hover:bg-green-900 bg-[#091E33] rounded-full  h-5 w-5"
                  onClick={() => {
                    setLowerRangeInput(Number(lowerRangeInput) + 1);
                  }}
                >
                  <p className=" ">+</p>
                </div>
                <input
                  type="number"
                  className="outline-none bg-[#061727]  w-4/6 text-center"
                  value={lowerRangeInput}
                  onChange={(e: any) => setLowerRangeInput(e.target.value)}
                />
                <div
                  className="flex items-center justify-center hover:cursor-pointer hover:bg-green-900 bg-[#091E33] rounded-full  h-5 w-5"
                  onClick={() => {
                    setLowerRangeInput(Number(lowerRangeInput) - 1);
                  }}
                >
                  <p className=" ">-</p>
                </div>
              </div>
              <p className="font-thin text-[#9DA5B4] text-sm ">
                {" "}
                {selectedTokenX.name} per {selectedTokenY.name}
              </p>
            </div>
            <div className="flex flex-col items-center  justify-between rounded-md border  border-[#383D48] w-1/2 h-[100px] py-2">
              <p className="font-thin text-[#9DA5B4] text-sm ">Max Price</p>
              <div className="flex justify-between px-5">
                <div
                  className="flex items-center justify-center hover:cursor-pointer hover:bg-green-900 bg-[#091E33] rounded-full  h-5 w-5"
                  onClick={() => {
                    setHigherRangeInput(Number(higherRangeInput) + 1);
                  }}
                >
                  <p className=" ">+</p>
                </div>
                <input
                  type="number"
                  className="outline-none bg-[#061727]  w-4/6 text-center"
                  value={higherRangeInput}
                  onChange={(e: any) => setHigherRangeInput(e.target.value)}
                />
                <div
                  className="flex items-center justify-center hover:cursor-pointer hover:bg-green-900 bg-[#091E33] rounded-full  h-5 w-5"
                  onClick={() => {
                    setHigherRangeInput(Number(higherRangeInput) - 1);
                  }}
                >
                  <p className=" ">-</p>
                </div>
              </div>
              <p className="font-thin text-[#9DA5B4] text-sm ">
                {" "}
                {selectedTokenX.name} per {selectedTokenY.name}{" "}
              </p>
            </div>
          </div>
        </>
      )}
      {isApproved ? (
        <button
          className={`${styles.button} w-full mt-10`}
          onClick={() => {
            setIsSuccessfull(false);
            setIsPreview(true);
          }}
        >
          Preview
        </button>
      ) : (
        <button
          className={`${styles.button} w-full mt-10`}
          onClick={() => {
            handleApproval();
          }}
        >
          Approve
        </button>
      )}
    </div>
  );
};

export default SetPriceRange;
