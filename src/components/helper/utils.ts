import { NITRO_POINT } from "@/constants/addresses";
import { ethers } from "ethers";
import nitroPairAbi from "@/constants/abis/NitroPoints.json";
export const getPointBalance = async () => {
  let tempProvider = new ethers.providers.Web3Provider(window.ethereum as any);
  let tempSigner = tempProvider.getSigner();
  let nitroPointContract = new ethers.Contract(
    NITRO_POINT,
    nitroPairAbi,
    tempSigner
  );

  try {
    let txn = await nitroPointContract.getPointBalance(
      await tempSigner.getAddress()
    );

    let balance = txn.toString();
    console.log(txn.toString());
    return { balance };
  } catch (error) {
    console.log(error);
    return { balance: 0 };
  }
};
