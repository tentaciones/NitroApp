import nitroRouterAbi from "@/constants/abis/NitroRouter.json";
import nitroPairAbi from "@/constants/abis/NitroPair.json";
import { NITRO_ROUTER, NITRO_PAIR } from "@/constants/addresses";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { TContractState, TPairDataContractState } from "./types";
import {
  useContractState,
  usePairDataContractState,
} from "@/hooks/stores/contractStore";

const UpdateManager = () => {
  const { routerContract, setRouterContract, pairContract, setPairContract } =
    useContractState() as TContractState;

  const { activeId, setActiveId } =
    usePairDataContractState() as TPairDataContractState;

  const [gotten, setGotten] = useState(false);

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();
    let routerContract = new ethers.Contract(
      NITRO_ROUTER,
      nitroRouterAbi,
      tempSigner
    );
    let pairContract = new ethers.Contract(
      NITRO_PAIR,
      nitroPairAbi,
      tempSigner
    );
    setPairContract(pairContract);

    setRouterContract(routerContract);
    setGotten(true);
    const txn = await pairContract.getReservesAndActiveID();
    setActiveId(txn.activeId.toString());
    console.log("running");
  };
  useEffect(() => {
    updateEthers();
    console.log(
      "pairContract:",
      pairContract,
      "routerContract:",
      routerContract
    );
  }, [gotten]);

  return null;
};

export default UpdateManager;
