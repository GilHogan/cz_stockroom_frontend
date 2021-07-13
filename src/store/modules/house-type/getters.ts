import {
  GetterTree,
} from "vuex";
import { RootState } from "@/store";
import {
  GetterConstants,
  HouseTypeType,
} from "./constants";
import Constants from "@/constant/constants";
import { HouseTypeState, HouseTypeChartSourceClass } from './state';

export type Getters = {
  [GetterConstants.GET_HOUSE_TYPE_CHART_SOURCE] (state: HouseTypeState): (type: string) => HouseTypeChartSourceClass[];
};

export const getters: GetterTree<HouseTypeState, RootState> & Getters = {
  [GetterConstants.GET_HOUSE_TYPE_CHART_SOURCE]: state => (type = Constants.QueryType.number) => {
    const chartDataList: HouseTypeChartSourceClass[] = [];

    state.items.forEach(item => {
      let chartData: HouseTypeChartSourceClass | null = null;
      // 查询同一天的所有类型的数据归为一条数据
      for (let i = 0; i < chartDataList.length; i++) {
        if (chartDataList[i].date === item.date) {
          chartData = chartDataList[i];
          break;
        }
      }
      if (!chartData) {
        chartData = new HouseTypeChartSourceClass();
        chartData.date = item.date;
        chartData.更新时间 = item.update_at;
        chartDataList.push(chartData);
      }

      const value: number = type == Constants.QueryType.number ? item.number : item.area;
      switch (item.type) {
        case HouseTypeType.Residence:
          chartData.住宅 = value;
          break;
        case HouseTypeType.Business:
          chartData.商业 = value;
          break;
        case HouseTypeType.Apartment:
          chartData.公寓 = value;
          break;
        case HouseTypeType.Villa:
          chartData.别墅 = value;
          break;
        case HouseTypeType.Office:
          chartData.办公 = value;
          break;
        case HouseTypeType.Plant:
          chartData.厂房 = value;
          break;
        case HouseTypeType.CommercialAndResidential:
          chartData.商住 = value;
          break;
        case HouseTypeType.Garage:
          chartData.车库 = value;
          break;
        case HouseTypeType.Other:
          chartData.其它 = value;
          break;
        case HouseTypeType.Total:
          chartData.累计 = value;
          break;
      }
    });
    return chartDataList;
  }
};
