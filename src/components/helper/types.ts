export type TAddLiquidityPreviewState = {
  isPreviewPositionAdd: boolean;
  isPreviewPositionRemove: boolean;
  setIsPreviewPositionAdd: (value: boolean) => void;
  setIsPreviewPositionRemove: (value: boolean) => void;
};

export type TSuccessState = {
  isSuccessfull: boolean;
  setIsSuccessfull: (value: boolean) => void;
};

export type TAddLiquidityInputState = {
  tokenXAmount: string;
  tokenYAmount: string;
  minPrice: string;
  maxPrice: string;
  currentPrice: string;
  setTokenXAmount: (value: string) => void;
  setTokenYAmount: (value: string) => void;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  setCurrentPrice: (value: string) => void;
};

export type TContractState = {
  pairContract: any;
  setPairContract: (value: any) => void;
  routerContract: any;
  setRouterContract: (value: any) => void;
};

export type TPairDataContractState = {
  activeId: string;
  setActiveId: (value: any) => void;
};

export type TSlideInputState = {
  range: any[];
  setRange: (value: any) => void;
};

export type TLiquidityTxnHashState = {
  LiquidityTxnHash: string;
  setLiquidityTxnHash: (value: any) => void;
};

export type TTokenInputState = {
  tokenX: string;
  setTokenX: (value: string) => void;
  tokenY: string;
  setTokenY: (value: string) => void;
};

export type TSelectedSwapTokenstate = {
  selectedTokenX: any;
  setSelectedTokenX: (value: string) => void;
  selectedTokenY: any;
  setSelectedTokenY: (value: string) => void;
};

export type TPreviewParams = {
  exchangeRate: string;
  netWorkFee: string;
  priceImpact: string;
  mininumReceived: string;
  tokenXName: string;
  tokenYName: string;
  loaded: boolean;
  estimatedTimestamp: string;
};

export type TPreviewParamsState = {
  previewParams: TPreviewParams;
  setPreviewParams: (value: TPreviewParams) => void;
};

export type TCustomSlippageState = {
  customSlippage: string;
  setCustomSlippage: (value: string) => void;
};

export type UseLiquidyState = {
  isAddLiquidity: boolean;
  setIsAddLiquidity: (value: boolean) => void;
};

export type TSwapTxnHahState = {
  txnHash: string;
  setTxnHash: (value: string) => void;
};

export type TSelectedTokenstate = {
  selectedTokenX: TTokenData;
  setSelectedTokenX: (value: string) => void;
  selectedTokenY: TTokenData;
  setSelectedTokenY: (value: string) => void;
};

export type TTokenData = {
  name: string;
  image: any;
  address: string;
};

export type TRangeState = {
  lowerRangeInput: number;
  setLowerRangeInput: (value: number) => void;
  higherRangeInput: number;
  setHigherRangeInput: (any: number) => void;
};

export type TBorrowSideState = {
  isBelowPriceRange: boolean;
  setIsBelowPriceRange: (value: boolean) => void;
};

export type TTokenPriceState = {
  price: number;
  setPrice: (value: number) => void;
};

export type TLiquidyState = {
  isAddLiquidity: boolean;
  setIsAddLiquidity: (value: boolean) => void;
};

export type TLiquidityPositionInputState = {
  amountX: string;
  amountY: string;
  sender: string;
  recipient: string;
  NitroPair_id: string;
};
export type TLiquidityPositionDetailState = {
  liquidityPositionDetail: TLiquidityPositionInputState;
  setLiquidityPositionDetail: (value: TLiquidityPositionInputState) => void;
};

export type TBorrowTxnState = {
  borrowTxn: string;
  setBorrowTxnHash: (value: string) => void;
};

export type TDebtTxnHashState = {
  debtTxnHash: string;
  setdebtTxnHash: (value: string) => void;
};
