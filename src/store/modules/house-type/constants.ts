export enum GetterConstants {
  GET_HOUSE_TYPE_ITEMS = "HOUSE_TYPE/GET_ITEMS",
  GET_HOUSE_TYPE_CHART_SOURCE = "HOUSE_TYPE/GET_CHART_SOURCE",
}

export enum MutationConstants {
  HANDLE_HOUSE_TYPE_ITEMS = "HOUSE_TYPE/HANDLE_ITEMS",
  UPDATE_STATUS = "HOUSE_TYPE/UPDATE_STATUS",
}

export enum ActionConstants {
  HOUSE_TYPE_FETCH = "HOUSE_TYPE/FETCH",
}

export enum HouseTypeType {
  Residence = 0, // 住宅
  Business = 1, // 商业
  Apartment = 2, // 公寓
  Villa = 3, // 别墅
  Office = 4, // 办公
  Plant = 5, // 厂房
  CommercialAndResidential = 6, // 商住
  Garage = 7, // 车库
  Other = 8, // 其他
  Total = 9, // 今日累计成交
}
