import React, { useEffect, useState } from "react";
import DebtCard from "./DebtCard";
import DebtCardBack from "./DebtCardBack";
import styles from "@/styles/Home.module.css";
import frame from "@/assets/animations/loading.json";
import { useLottie } from "lottie-react";
import {
  useDebtCardState,
  useDebtTxnHashState,
} from "@/hooks/stores/debtStore";
import RepayModal from "../repay/RepayModal";
import { useRepayState } from "@/hooks/stores/repayStore";
import { SuccessCard } from "../success";
import { useSuccessState } from "@/hooks/stores/successStore";
import { ethers } from "ethers";
import {
  NITRO_DEBT_MANAGER,
  NITRO_PAIR,
  NITRO_ROUTER,
} from "@/constants/addresses";
import nitroAbi from "@/constants/abis/NitroRouter.json";
import IERC20Abi from "@/constants/abis/IERC20.json";
import debtManagerAbi from "@/constants/abis/NitroDebtManager.json";
import { PAIR_BIN_STEP } from "@/constants/constants";
import { TDebtTxnHashState } from "../helper/types";
import { getAllBlackListed, getAllUserBorrow } from "../helper/graphQueries";
type Props = {};

type TAllDebtPosition = {
  amountIn: string;
  amountOut: string;
  sender: string;
  recipient: string;
  NitroPair_id: string;
  tokenId: string;
  id: string;
  _isXtoY: boolean;
};

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

interface DebtTimerResult {
  startTime: string;
  endTime: string;
}

const DebtBase = (props: Props) => {
  const [isAll, setIsAll] = useState(false);
  const { isFlipped, setIsFlipped }: any = useDebtCardState();
  const [isBlackListed, setIsBlackListed] = useState(true);
  const { isRepay, setIsRepay }: any = useRepayState();
  const { isSuccessfull, setIsSuccessfull }: any = useSuccessState();
  const [allDebtPosition, setAllDebtPosition] = useState<TAllDebtPosition[]>(
    []
  );
  const [myDebtPosition, setMyDebtPosition] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const { debtTxnHash, setdebtTxnHash } =
    useDebtTxnHashState() as TDebtTxnHashState;
  const [debtTimers, setDebtTimers] = useState<
    { startTime: string; endTime: string }[]
  >([]);
  const [blackListedtimers, setBlackListedTimer] = useState<
    { startTime: string; endTime: string }[]
  >([]);
  const [blackListedDebtPositions, setBlackListedDebtPositions] = useState([]);
  const options = {
    animationData: frame,
    loop: true,
    autoplay: true,
  };

  const { View, setSpeed } = useLottie(options);
  setSpeed(0.8);

  const getDebtTimer = async (tokenId: string, bin: string) => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let debtManagerContract = new ethers.Contract(
      NITRO_DEBT_MANAGER,
      debtManagerAbi,
      tempSigner
    );
    let a, b;

    try {
      let txn = await debtManagerContract.getDebtTimer(
        NITRO_PAIR,
        tokenId,
        bin
      );
      a = txn.EndTime.toString();
      b = txn.startTime.toString();
      console.log("txn", txn.EndTime.toString(), txn.startTime.toString());
      return {
        endTime: a,
        startTime: b,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {}, []);
  useEffect(() => {
    if (navigator.onLine) {
      const fetchData = async () => {
        const { data, filteredData } = await getAllUserBorrow();
        const { BlacklistedData } = await getAllBlackListed();
        setAllDebtPosition(data);
        setMyDebtPosition(filteredData);
        setBlackListedDebtPositions(BlacklistedData);
        setIsFetched(true);
        console.log("timers1");
        // Fetch debt timers
        const timers = await Promise.all(
          data.map(({ tokenId, NitroPair_id }: any) =>
            getDebtTimer(tokenId, NitroPair_id)
          )
        );
        const blackListedtimers = await Promise.all(
          BlacklistedData.map(({ tokenId, NitroPair_id }: any) =>
            getDebtTimer(tokenId, NitroPair_id)
          )
        );
        console.log("timers", timers);
        setBlackListedTimer(blackListedtimers);
        setDebtTimers(timers);
      };

      fetchData();
    } else {
      console.log("User is offline");
    }
  }, []);

  const handleBlacklist = async (tokenId: string, bin: string) => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let routerContract = new ethers.Contract(
      NITRO_ROUTER,
      nitroAbi,
      tempSigner
    );
    console.log("blacklisting");
    try {
      let txn = await routerContract.Blacklist(
        "0x109D6A9A17306F6B8BB545F6061Bc9Aed3ae8463",
        "0x505981Cb786561bB626749Be0f133013D7B59513",
        PAIR_BIN_STEP,
        tokenId,
        [bin]
      );
      console.log(txn);
      setdebtTxnHash(txn.hash);
      setIsSuccessfull(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRepayBlackListed = async (
    amount: string,
    tokenId: string,
    bin: string,
    isAbove: boolean
  ) => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let routerContract = new ethers.Contract(
      NITRO_ROUTER,
      nitroAbi,
      tempSigner
    );

    let IERC20Contract = new ethers.Contract(
      "0x505981Cb786561bB626749Be0f133013D7B59513",
      IERC20Abi,
      tempSigner
    );

    try {
      //let toApproveAmount = Math.ceil(Number(amount) / 10) * 10;
      let toApproveAmount = Number(amount) + 50;
      await IERC20Contract.approve(NITRO_ROUTER, toApproveAmount.toString());
      let txn = await routerContract.RepayBlackListed([
        isAbove,
        tempSigner.getAddress(),
        "0x109D6A9A17306F6B8BB545F6061Bc9Aed3ae8463",
        "0x505981Cb786561bB626749Be0f133013D7B59513",
        PAIR_BIN_STEP,
        amount,
        0,
        tokenId,
        [bin],
      ]);
      console.log("78");
      setdebtTxnHash(txn.hash);
      setIsSuccessfull(true);
      console.log(txn);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRepay = async (
    amount: number,
    tokenId: number,
    bin: string,
    isAbove: boolean
  ) => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let routerContract = new ethers.Contract(
      NITRO_ROUTER,
      nitroAbi,
      tempSigner
    );

    let IERC20Contract = new ethers.Contract(
      "0x505981Cb786561bB626749Be0f133013D7B59513",
      IERC20Abi,
      tempSigner
    );
    console.log("repaying");
    try {
      let toApproveAmount = Number(amount) + 50;
      await IERC20Contract.approve(NITRO_ROUTER, toApproveAmount.toString());
      console.log(toApproveAmount);
      console.log("repaying");
      let txn = await routerContract.Repay([
        isAbove,
        tempSigner.getAddress(),
        "0x109D6A9A17306F6B8BB545F6061Bc9Aed3ae8463",
        "0x505981Cb786561bB626749Be0f133013D7B59513",
        PAIR_BIN_STEP,
        String(amount),
        0,
        String(tokenId),
        [bin],
      ]);
      console.log("78");
      console.log(txn);
      setdebtTxnHash(txn.hash);
      setIsSuccessfull(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRollover = async (
    amount: string,
    tokenId: string,
    bin: string,
    isAbove: boolean
  ): Promise<void> => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let routerContract = new ethers.Contract(
      NITRO_ROUTER,
      nitroAbi,
      tempSigner
    );

    let IERC20Contract = new ethers.Contract(
      "0x505981Cb786561bB626749Be0f133013D7B59513",
      IERC20Abi,
      tempSigner
    );

    try {
      let toApproveAmount = Number(amount) + 50;
      await IERC20Contract.approve(NITRO_ROUTER, toApproveAmount.toString());
      console.log("rll");
      let txn = await routerContract.Rollover([
        isAbove,
        tempSigner.getAddress(),
        "0x109D6A9A17306F6B8BB545F6061Bc9Aed3ae8463",
        "0x505981Cb786561bB626749Be0f133013D7B59513",
        PAIR_BIN_STEP,
        amount,
        0,
        tokenId,
        [bin],
      ]);
      setIsSuccessfull(true);
      console.log("78");
      setdebtTxnHash(txn.hash);
      console.log(txn);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isFetched ? (
        <>
          {isSuccessfull ? (
            <div className="h-screen w-screen">
              <SuccessCard
                text=""
                arbiscanLink={`https://testnet.arbiscan.io/tx/${debtTxnHash}`}
              />
            </div>
          ) : (
            <>
              <div className=" w-full  h-full md:mt-[180px] mt-[100px]   text-white md:px-[60px] px-5 fixed">
                <div className="flex justify-between items-center w-full mb-10">
                  <p className="md:text-2xl text-base">Debt Positions</p>
                  <div className="flex text-sm bg-greenRbg p-[2px] rounded-md  ">
                    <div
                      className={`w-[100px] text-center h-[40px] flex items-center justify-center  text-[#B7BECD] rounded-l-[3px] bg-[#031120] hover:cursor-pointer ${
                        isBlackListed && "bg-greenRbg"
                      }`}
                      onClick={() => {
                        setIsAll(false);
                        setIsBlackListed(true);
                      }}
                    >
                      <p className={`${isBlackListed && "text-[#00FDEE]"}`}>
                        Blacklisted
                      </p>
                    </div>
                    <div
                      className={`w-[60px] text-center h-[40px] flex items-center justify-center  text-[#B7BECD] rounded-l-[3px] bg-[#031120] hover:cursor-pointer ${
                        isAll && "bg-greenRbg"
                      }`}
                      onClick={() => {
                        setIsBlackListed(false);
                        setIsAll(true);
                      }}
                    >
                      <p className={`${isAll && "text-[#00FDEE]"}`}>All</p>
                    </div>
                    <div
                      className={`w-[150px]  text-center h-[40px] flex items-center justify-center  text-[#B7BECD]   rounded-r-[3px] bg-[#031120] hover:cursor-pointer ${
                        !isAll && !isBlackListed && " bg-greenRbg"
                      }`}
                      onClick={() => {
                        setIsBlackListed(false);
                        setIsAll(false);
                      }}
                    >
                      <p
                        className={`${
                          !isAll && !isBlackListed && "text-[#00FDEE]"
                        }`}
                      >
                        My Debt Positions
                      </p>
                    </div>
                  </div>
                </div>
                <div className="overflow-y-scroll h-full">
                  {isBlackListed ? (
                    <div className="flex flex-wrap gap-2">
                      {blackListedDebtPositions.map(
                        (
                          {
                            amountIn,
                            amountOut,
                            NitroPair_id,
                            recipient,
                            _isXtoY,
                            tokenId,
                            id,
                          },
                          index
                        ) => {
                          const debtTimer = blackListedtimers[index];
                          return (
                            <div
                              className={styles.debtCardMainContainer}
                              key={id}
                            >
                              <div className={styles.theCard}>
                                <DebtCard
                                  amountIn={amountIn}
                                  amountOut={amountOut}
                                  borrowId={NitroPair_id}
                                  tokenId={tokenId}
                                  startTime={debtTimer?.startTime}
                                  endTime={debtTimer?.endTime}
                                />
                                <DebtCardBack
                                  handleBlacklist={() =>
                                    handleBlacklist(tokenId, NitroPair_id)
                                  }
                                  handleRepayBlackListed={() =>
                                    handleRepayBlackListed(
                                      amountIn,
                                      tokenId,
                                      NitroPair_id,
                                      _isXtoY
                                    )
                                  }
                                  handleRepay={() =>
                                    handleRepay(
                                      Number(amountIn),
                                      Number(tokenId),
                                      NitroPair_id,
                                      _isXtoY
                                    )
                                  }
                                  handleRollover={() =>
                                    handleRollover(
                                      amountIn,
                                      tokenId,
                                      NitroPair_id,
                                      _isXtoY
                                    )
                                  }
                                />
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : !isAll ? (
                    <div className="flex flex-wrap gap-2">
                      {myDebtPosition.map(
                        (
                          {
                            amountIn,
                            amountOut,
                            NitroPair_id,
                            recipient,
                            _isXtoY,
                            tokenId,
                            id,
                          },
                          index
                        ) => {
                          const debtTimer = debtTimers[index];
                          return (
                            <div
                              className={styles.debtCardMainContainer}
                              key={id}
                            >
                              <div className={styles.theCard}>
                                <DebtCard
                                  amountIn={amountIn}
                                  amountOut={amountOut}
                                  borrowId={NitroPair_id}
                                  tokenId={tokenId}
                                  startTime={debtTimer?.startTime}
                                  endTime={debtTimer?.endTime}
                                />
                                <DebtCardBack
                                  handleBlacklist={() =>
                                    handleBlacklist(tokenId, NitroPair_id)
                                  }
                                  handleRepayBlackListed={() =>
                                    handleRepayBlackListed(
                                      amountIn,
                                      tokenId,
                                      NitroPair_id,
                                      _isXtoY
                                    )
                                  }
                                  handleRepay={() =>
                                    handleRepay(
                                      Number(amountIn),
                                      Number(tokenId),
                                      NitroPair_id,
                                      _isXtoY
                                    )
                                  }
                                  handleRollover={() =>
                                    handleRollover(
                                      amountIn,
                                      tokenId,
                                      NitroPair_id,
                                      _isXtoY
                                    )
                                  }
                                />
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {allDebtPosition.map(
                        (
                          {
                            amountIn,
                            amountOut,
                            sender,
                            recipient,
                            NitroPair_id,
                            tokenId,
                            _isXtoY,
                            id,
                          },
                          index
                        ) => {
                          const debtTimer = debtTimers[index];
                          return (
                            <div
                              className={styles.debtCardMainContainer}
                              key={id}
                            >
                              <div className={styles.theCard}>
                                <DebtCard
                                  amountIn={amountIn}
                                  amountOut={amountOut}
                                  borrowId={NitroPair_id}
                                  tokenId={tokenId}
                                  startTime={debtTimer?.startTime}
                                  endTime={debtTimer?.endTime}
                                />
                                <DebtCardBack
                                  handleBlacklist={() =>
                                    handleBlacklist(tokenId, NitroPair_id)
                                  }
                                  handleRepayBlackListed={() =>
                                    handleRepayBlackListed(
                                      amountIn,
                                      tokenId,
                                      NitroPair_id,
                                      _isXtoY
                                    )
                                  }
                                  handleRepay={() =>
                                    handleRepay(
                                      Number(amountIn),
                                      Number(tokenId),
                                      NitroPair_id,
                                      _isXtoY
                                    )
                                  }
                                  handleRollover={() =>
                                    handleRollover(
                                      amountIn,
                                      tokenId,
                                      NitroPair_id,
                                      _isXtoY
                                    )
                                  }
                                />
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                  <div className="mb-[300px]"></div>
                </div>
              </div>
              {isRepay && (
                <div className="absolute top-0 w-full h-screen">
                  {" "}
                  <RepayModal />
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="flex-col  w-[60%] md:flex hidden items-center ">
          <div className="hidden  md:block h-[500px] w-[500px] ">{View}</div>
        </div>
      )}
    </>
  );
};

export default DebtBase;
