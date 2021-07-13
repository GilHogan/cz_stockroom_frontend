import {
  GetterTree,
} from "vuex";
import { RootState } from "@/store";
import {
  GetterConstants,
  DistrictType,
} from "./constants";
import Constants from "@/constant/constants";
import { DistrictState, DistrictChartSourceClass } from './state';

export type Getters = {
  [GetterConstants.GET_DISTRICT_CHART_SOURCE] (state: DistrictState): (type: string) => DistrictChartSourceClass[];
};

export const getters: GetterTree<DistrictState, RootState> & Getters = {
  [GetterConstants.GET_DISTRICT_CHART_SOURCE]: state => (type = Constants.QueryType.number) => {
    const chartDataList: DistrictChartSourceClass[] = [];

    state.items.forEach(item => {
      let chartData: DistrictChartSourceClass | null = null;
      // 查询同一天的所有类型的数据归为一条数据
      for (let i = 0; i < chartDataList.length; i++) {
        if (chartDataList[i].date === item.date) {
          chartData = chartDataList[i];
          chartData.更新时间 = item.update_at;
          break;
        }
      }
      if (!chartData) {
        chartData = new DistrictChartSourceClass();
        chartData.date = item.date;
        chartDataList.push(chartData);
      }

      const value: number = type == Constants.QueryType.number ? item.number : item.area;
      switch (item.type) {
        case DistrictType.TianNing:
          chartData.天宁区 = value;
          break;
        case DistrictType.ZhongLou:
          chartData.钟楼区 = value;
          break;
        case DistrictType.XinBei:
          chartData.新北区 = value;
          break;
        case DistrictType.WuJin:
          chartData.武进区 = value;
          break;
      }
    });
    return chartDataList;
  }
};
