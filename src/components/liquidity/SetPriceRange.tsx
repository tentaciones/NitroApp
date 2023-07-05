import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import SlideInput from "./SlideInput";
import {
  useAddLiquidityInputState,
  useAddLiquidityPreviewState,
  useLiquidyState,
  useSlideInputState,
} from "@/hooks/stores/addLiquidityStore";
import { useSuccessState } from "@/hooks/stores/successStore";
import { usePairDataContractState } from "@/hooks/stores/contractStore";
import {
  TAddLiquidityInputState,
  TAddLiquidityPreviewState,
  TLiquidyState,
  TPairDataContractState,
  TRangeState,
  TSelectedSwapTokenstate,
  TSlideInputState,
  TSuccessState,
} from "../helper/types";
import { getIdFromPrice, getPriceFromId } from "../helper/price";
import { PAIR_BIN_STEP } from "@/constants/constants";
import { FaUmbrellaBeach } from "react-icons/fa";
import { useSelectedTokenstate } from "@/hooks/stores/tokenStore";
import { useRangeState } from "@/hooks/stores/rangeStore";
type Props = {};

const SetPriceRange = (props: Props) => {
  const { range, setRange } = useSlideInputState() as TSlideInputState;
  const [price, SetPrice] = useState("");
  const {
    lowerRangeInput,
    setLowerRangeInput,
    higherRangeInput,
    setHigherRangeInput,
  } = useRangeState() as TRangeState;

  const {
    isPreviewPositionAdd,
    setIsPreviewPositionAdd,
    setIsPreviewPositionRemove,
  } = useAddLiquidityPreviewState() as TAddLiquidityPreviewState;
  const { activeId } = usePairDataContractState() as TPairDataContractState;
  const [setIsBelowPriceRange] = useState(false);

  const { setIsSuccessfull } = useSuccessState() as TSuccessState;
  const { isAddLiquidity } = useLiquidyState() as TLiquidyState;
  const {
    selectedTokenX,

    selectedTokenY,
  } = useSelectedTokenstate() as TSelectedSwapTokenstate;
  const {
    tokenXAmount,
    tokenYAmount,

    setMinPrice,
    setMaxPrice,
  } = useAddLiquidityInputState() as TAddLiquidityInputState;

  //sets lowerRangeInput  and higherRangeInput at at 0.05% of  the active price on mount
  useEffect(() => {
    setLowerRangeInput(Number(price) - Number(price) * 0.03);
    setHigherRangeInput(Number(price) + Number(price) * 0.03);
    setRange([40, 50]);
  }, [price]);

  //changes the values of the lowerRangeInput  as the range changes
  useEffect(() => {
    const updateLowerRangeInput = () => {
      setLowerRangeInput(lowerRangeInput * 1.0005);
    };

    updateLowerRangeInput();
  }, [range[0]]);

  //changes the values of the    higherRangeInput as the range changes
  useEffect(() => {
    const updateHigherRangeInput = () => {
      setHigherRangeInput(higherRangeInput * 1.0005);
    };
    updateHigherRangeInput();
  }, [range[1]]);

  useEffect(() => {
    try {
      const price = getPriceFromId(Number(activeId), PAIR_BIN_STEP);
      SetPrice(price.toString());
    } catch (error) {
      console.log(error);
    }
  }, [activeId]);
  const handleFullRange = () => {
    setRange([0, 100]);
  };
  return (
    <div className="w-full md:px-5 mt-5">
      {isAddLiquidity && (
        <>
          <div className="flex justify-between items-center ">
            <p>SetPriceRange</p>
            <div className="flex text-[10px] gap-2">
              <p>Active Price</p>
              <p>{price}</p>
            </div>
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
                    setMinPrice(lowerRangeInput.toString());
                  }}
                >
                  <p className=" ">+</p>
                </div>
                <input
                  type="number"
                  className="outline-none bg-[#061727]  w-4/6 text-center"
                  value={lowerRangeInput}
                  onChange={(e: any) => {
                    setLowerRangeInput(e.target.value);
                    setMinPrice(lowerRangeInput.toString());
                  }}
                />
                <div
                  className="flex items-center justify-center hover:cursor-pointer hover:bg-green-900 bg-[#091E33] rounded-full  h-5 w-5"
                  onClick={() => {
                    if (Number(lowerRangeInput) === 0) {
                    } else {
                      setLowerRangeInput(Number(lowerRangeInput) - 1);
                      setMinPrice(lowerRangeInput.toString());
                    }
                  }}
                >
                  <p className=" ">-</p>
                </div>
              </div>
              <p className="font-thin text-[#9DA5B4] text-sm ">
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
                    setMaxPrice(higherRangeInput.toString());
                  }}
                >
                  <p className=" ">+</p>
                </div>
                <input
                  type="number"
                  className="outline-none bg-[#061727]  w-4/6 text-center"
                  value={higherRangeInput}
                  onChange={(e: any) => {
                    setHigherRangeInput(e.target.value);
                    setMaxPrice(higherRangeInput.toString());
                  }}
                />
                <div
                  className="flex items-center justify-center hover:cursor-pointer hover:bg-green-900 bg-[#091E33] rounded-full  h-5 w-5"
                  onClick={() => {
                    if (Number(higherRangeInput) === 0) {
                    } else {
                      setHigherRangeInput(Number(higherRangeInput) - 1);
                      setMaxPrice(higherRangeInput.toString());
                    }
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
      {isAddLiquidity && (
        <button
          className="w-full h-10 border border-[#8690A2] mt-5 rounded-md"
          onClick={() => handleFullRange()}
        >
          Full Range
        </button>
      )}
      {tokenXAmount && tokenYAmount && (
        <button
          className={`${styles.button} w-full mt-10`}
          onClick={() => {
            if (Number(tokenXAmount) === 0) return null;
            if (isAddLiquidity) {
              setIsSuccessfull(false);
              setIsPreviewPositionAdd(true);
            } else {
              setIsSuccessfull(false);
              setIsPreviewPositionRemove(true);
            }
          }}
        >
          Preview
        </button>
      )}
    </div>
  );
};

export default SetPriceRange;
