export enum GetterConstants {
  GET_AREA_ITEMS = "AREA/GET_ITEMS",
  GET_AREA_CHART_SOURCE = "AREA/GET_CHART_SOURCE",
}

export enum MutationConstants {
  HANDLE_AREA_ITEMS = "AREA/HANDLE_ITEMS",
  UPDATE_STATUS = "AREA/UPDATE_STATUS",
}

export enum ActionConstants {
  AREA_FETCH = "AREA/FETCH",
}

export enum AreaType {
  Le60 = 0, // ≤60㎡
  Between60_80 = 1, // 60-80㎡
  Between80_90 = 2, // 80-90㎡
  Between90_100 = 3, // 90-100㎡
  Between100_120 = 4, // 100-120㎡
  Between120_144 = 5, // 120-144㎡
  Between144_180 = 6, // 144-180㎡
  Ge180 = 7, // ≥180㎡
}
