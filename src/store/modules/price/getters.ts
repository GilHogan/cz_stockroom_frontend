import {
  GetterTree,
} from "vuex";
import { RootState } from "@/store";
import {
  GetterConstants,
  PriceType,
} from "./constants";
import Constants from "@/constant/constants";
import { PriceState, PriceChartSourceClass } from './state';

export type Getters = {
  [GetterConstants.GET_PRICE_CHART_SOURCE] (state: PriceState): (type: string) => PriceChartSourceClass[];
};

export const getters: GetterTree<PriceState, RootState> & Getters = {
  [GetterConstants.GET_PRICE_CHART_SOURCE]: state => (type = Constants.QueryType.number) => {
    const chartDataList: PriceChartSourceClass[] = [];
    console.log("GET_PRICE_CHART_SOURCE item = ", state)
    state.items.forEach(item => {
      let chartData: PriceChartSourceClass | null = null;
      // 查询同一天的所有类型的数据归为一条数据
      for (let i = 0; i < chartDataList.length; i++) {
        if (chartDataList[i].date === item.date) {
          chartData = chartDataList[i];
          break;
        }
      }
      if (!chartData) {
        chartData = new PriceChartSourceClass();
        chartData.date = item.date;
        chartData.更新时间 = item.update_at;
        chartDataList.push(chartData);
      }

      const value: number = type == Constants.QueryType.number ? item.number : item.area;
      switch (item.type) {
        case PriceType.Le20:
          chartData["≤20万"] = value;
          break;
        case PriceType.Between20_30:
          chartData["20-30万"] = value;
          break;
        case PriceType.Between30_40:
          chartData["30-40万"] = value;
          break;
        case PriceType.Between40_60:
          chartData["40-60万"] = value;
          break;
        case PriceType.Between60_100:
          chartData["60-100万"] = value;
          break;
        case PriceType.Ge100:
          chartData["≥100万"] = value;
          break;
      }
    });
    return chartDataList;
  }
};
