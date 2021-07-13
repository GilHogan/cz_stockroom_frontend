export enum GetterConstants {
  GET_PRICE_ITEMS = "PRICE/GET_ITEMS",
  GET_PRICE_CHART_SOURCE = "PRICE/GET_CHART_SOURCE",
}

export enum MutationConstants {
  HANDLE_PRICE_ITEMS = "PRICE/HANDLE_ITEMS",
  UPDATE_STATUS = "PRICE/UPDATE_STATUS",
}

export enum ActionConstants {
  PRICE_FETCH = "PRICE/FETCH",
}

export enum PriceType {
  Le20 = 0, // ≤20万
  Between20_30 = 1, // 20-30万
  Between30_40 = 2, // 30-40万
  Between40_60 = 3, // 40-60万
  Between60_100 = 4, // 60-100万
  Ge100 = 5, // ≥100万
}
