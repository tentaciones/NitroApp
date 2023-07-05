import x from "@/assets/Eth logo.svg";
import y from "@/assets/tether-seeklogo.com 2.svg";
import nitroLogo from "@/assets/logo/nitroLogo.svg";
export const demoPoolData = [
  {
    assetXLogo: x,
    assetYLogo: y,
    assetXSymbol: "ETH",
    assetYSymbol: "USDT",
    TVL: "$26.3M",
    TokenX: "10,0001",
    TokenY: "200",
    TradingVolumes: "$16.90",
    DebtRatio: "10%",
    NitroPointsGenerated: "10000 NP",
  },
];

export const tokenData = [
  {
    name: "NIT",
    image: nitroLogo,
    address: "0x109D6A9A17306F6B8BB545F6061Bc9Aed3ae8463",
  },
  {
    name: "WETH",
    image: x,
    address: "0x505981Cb786561bB626749Be0f133013D7B59513",
  },
];

export const PairAddress = [
  {
    tokenX: "NIT",
    tokenY: "WETH",
    address: "0xC4c0012CB56952dB52E1E34F244Ad653795b55Ba",
  },
];
