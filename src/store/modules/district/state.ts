import { StockroomItem, BaseState, baseState } from '@/store/modules/base/state'
import deepClone from '@/utils/deepClone';

export type DistrictState = BaseState & {
  items: StockroomItem[];
};

export const state: DistrictState = Object.assign(deepClone(baseState), {
  items: [],
});

export class DistrictChartSourceClass {
  date?: string | null = null;
  "天宁区"?: number | null = null;
  "钟楼区"?: number | null = null;
  "新北区"?: number | null = null;
  "武进区"?: number | null = null;
  "更新时间"?: string | null = null;
}
