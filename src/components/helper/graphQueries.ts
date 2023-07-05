import { NITRO_DEBT_MANAGER, NITRO_PAIR } from "@/constants/addresses";
import { ethers } from "ethers";
import debtManagerAbi from "@/constants/abis/NitroDebtManager.json";
const url = "https://api.studio.thegraph.com/query/47967/nitro/version/latest";

export const getAllUserBorrow = async () => {
  let tempProvider = new ethers.providers.Web3Provider(window.ethereum as any);
  let tempSigner = tempProvider.getSigner();
  const address = await tempSigner.getAddress();
  let filteredData, borrowData;
  const { blacklistedData } = await checkIfBlackListed();
  const { repayData } = await getAllRepay();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              query MyQuery {
                borrows {
                  _isXtoY
                  amountIn
                  amountOut
                  id
                  tokenId
                  recipient
                  NitroPair_id
                }
              }`,
      }),
    });

    if (!response.ok) {
      throw new Error("GraphQL request failed");
    }

    const responseData = await response.json();

    // Access the actual data within the response
    borrowData = responseData?.data?.borrows ?? [];

    console.log("repayData", repayData);
    console.log("booo", filteredData);

    const data = borrowData.filter((obj1: any) => {
      return (
        !repayData.some((obj2: any) => obj2.tokenId === obj1.tokenId) &&
        !blacklistedData.some((obj3: any) => obj3.Contract_id === obj1.tokenId)
      );
    });
    filteredData = data.filter((item: any) => {
      return item.recipient.toLowerCase() === address.toLowerCase();
    });

    return { data, filteredData };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllMintedId = async () => {
  let tempProvider = new ethers.providers.Web3Provider(window.ethereum as any);
  let tempSigner = tempProvider.getSigner();
  const address = await tempSigner.getAddress();
  let data;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              query MyQuery {
                transfers {
                  from
                  id
                  to
                  Contract_id
                }
              }`,
      }),
    });

    if (!response.ok) {
      throw new Error("GraphQL request failed");
    }

    const responseData = await response.json();

    data = responseData?.data?.transfers ?? [];
    console.log("dta", data);
    return { data };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllUserLiquidity = async () => {
  let filteredData, liquidityData;
  let tempProvider = new ethers.providers.Web3Provider(window.ethereum as any);
  let tempSigner = tempProvider.getSigner();
  const address = await tempSigner.getAddress();
  const { withdrawaldata } = await getAllUserLiquidityRemoved();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              query MyQuery {
                depositedToBins {
                  amountX
                  amountY
                  sender
                  recipient
                  NitroPair_id
                  id
                }
              }`,
      }),
    });

    if (!response.ok) {
      throw new Error("GraphQL request failed");
    }

    const responseData = await response.json();

    // Access the actual data within the response
    liquidityData = responseData?.data?.depositedToBins ?? [];
    const data = liquidityData.filter((obj1: any) => {
      return !withdrawaldata.some(
        (obj2: any) => obj2.NitroPair_id === obj1.NitroPair_id
      );
    });
    filteredData = liquidityData.filter((item: any) => {
      return item.recipient.toLowerCase() === address.toLowerCase();
    });

    return { filteredData, data };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllBlackListed = async () => {
  let filteredData, borrowData;
  let tempProvider = new ethers.providers.Web3Provider(window.ethereum as any);
  let tempSigner = tempProvider.getSigner();
  const address = await tempSigner.getAddress();
  const { blacklistedData } = await checkIfBlackListed();
  const { repayData } = await getAllRepay();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              query MyQuery {
                borrows {
                  _isXtoY
                  amountIn
                  amountOut
                  id
                  tokenId
                  recipient
                  NitroPair_id
                }
              }`,
      }),
    });

    if (!response.ok) {
      throw new Error("GraphQL request failed");
    }

    const responseData = await response.json();

    // Access the actual data within the response
    borrowData = responseData?.data?.borrows ?? [];

    const BlacklistedData = borrowData.filter((obj1: any) => {
      return (
        !repayData.some((obj2: any) => obj2.tokenId === obj1.tokenId) &&
        blacklistedData.some((obj3: any) => obj3.Contract_id === obj1.tokenId)
      );
    });
    console.log(BlacklistedData, "blacklistedData");
    filteredData = borrowData.filter((item: any) => {
      return item.recipient.toLowerCase() === address.toLowerCase();
    });

    return { filteredData, BlacklistedData };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const checkIfBlackListed = async () => {
  let blacklistedData;
  let tempProvider = new ethers.providers.Web3Provider(window.ethereum as any);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              query MyQuery {
                blackListedDebts {
  
                  Contract_id
                }
              }`,
      }),
    });

    if (!response.ok) {
      throw new Error("GraphQL request failed");
    }

    const responseData = await response.json();

    // Access the actual data within the response
    blacklistedData = responseData?.data?.blackListedDebts ?? [];

    return { blacklistedData };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllUserLiquidityRemoved = async () => {
  let filteredData, withdrawaldata;
  let tempProvider = new ethers.providers.Web3Provider(window.ethereum as any);
  let tempSigner = tempProvider.getSigner();
  const address = await tempSigner.getAddress();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              query MyQuery {
                withdrawnFromBins {
                  amountX
                  amountY
                  sender
                  recipient
                  NitroPair_id
                  id
                }
              }`,
      }),
    });

    if (!response.ok) {
      throw new Error("GraphQL request failed");
    }

    const responseData = await response.json();

    // Access the actual data within the response
    withdrawaldata = responseData?.data?.withdrawnFromBins ?? [];

    filteredData = withdrawaldata.filter((item: any) => {
      return item.recipient.toLowerCase() === address.toLowerCase();
    });

    return { filteredData, withdrawaldata };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllRepay = async () => {
  let repayData;
  let tempProvider = new ethers.providers.Web3Provider(window.ethereum as any);
  let tempSigner = tempProvider.getSigner();
  const address = await tempSigner.getAddress();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              query MyQuery {
                repays {
                  tokenId
                }
              }`,
      }),
    });

    if (!response.ok) {
      throw new Error("GraphQL request failed");
    }

    const responseData = await response.json();

    // Access the actual data within the response
    repayData = responseData?.data?.repays ?? [];

    return { repayData };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
