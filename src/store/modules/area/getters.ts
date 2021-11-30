import {
  GetterTree,
} from "vuex";
import { RootState } from "@/store";
import {
  GetterConstants,
  AreaType,
} from "./constants";
import Constants from "@/constant/constants";
import { AreaState, AreaChartSourceClass } from './state';
import moment from "moment";

export type Getters = {
  [GetterConstants.GET_AREA_CHART_SOURCE] (state: AreaState): (type: string) => AreaChartSourceClass[];
};

export const getters: GetterTree<AreaState, RootState> & Getters = {
  [GetterConstants.GET_AREA_CHART_SOURCE]: state => (type = Constants.QueryType.number) => {
    const chartDataList: AreaChartSourceClass[] = [];

    state.items.forEach(item => {
      let chartData: AreaChartSourceClass | null = null;
      // 查询同一天的所有类型的数据归为一条数据
      for (let i = 0; i < chartDataList.length; i++) {
        if (chartDataList[i].date === item.date) {
          chartData = chartDataList[i];
          chartData.更新时间 = item.update_at;
          break;
        }
      }
      if (!chartData) {
        chartData = new AreaChartSourceClass();
        chartData.date = item.date;
        chartDataList.push(chartData);
      }

      const value: number = type == Constants.QueryType.number ? item.number : item.area;
      switch (item.type) {
        case AreaType.Le60:
          chartData["≤60㎡"] = value;
          break;
        case AreaType.Between60_80:
          chartData["60-80㎡"] = value;
          break;
        case AreaType.Between80_90:
          chartData["80-90㎡"] = value;
          break;
        case AreaType.Between90_100:
          chartData["90-100㎡"] = value;
          break;
        case AreaType.Between100_120:
          chartData["100-120㎡"] = value;
          break;
        case AreaType.Between120_144:
          chartData["120-144㎡"] = value;
          break;
        case AreaType.Between144_180:
          chartData["144-180㎡"] = value;
          break;
        case AreaType.Ge180:
          if (moment(item.date).isBefore(moment('2021-11-29'))) {
            chartData["≥180㎡"] = value;
          }
          break;
        case AreaType.Between180_220:
          chartData["180-220㎡"] = value;
          break;
        case AreaType.Between220_260:
          chartData["220-260㎡"] = value;
          break;
        case AreaType.Ge260:
          chartData["≥260㎡"] = value;
          break;
      }
    });
    return chartDataList;
  }
};
