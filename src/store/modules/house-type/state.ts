import { StockroomItem, BaseState, baseState } from '@/store/modules/base/state'
import deepClone from '@/utils/deepClone';

export type HouseTypeState = BaseState & {
  items: StockroomItem[];
};

export const state: HouseTypeState = Object.assign(deepClone(baseState), {
  items: [],
});

export class HouseTypeChartSourceClass {
  date?: string | null = null;
  "住宅"?: number | null = null;
  "商业"?: number | null = null;
  "公寓"?: number | null = null;
  "别墅"?: number | null = null;
  "办公"?: number | null = null;
  "厂房"?: number | null = null;
  "商住"?: number | null = null;
  "车库"?: number | null = null;
  "其它"?: number | null = null;
  "累计"?: number | null = null;
  "更新时间"?: string | null = null;
}
