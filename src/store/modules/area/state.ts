import { StockroomItem, BaseState, baseState } from '@/store/modules/base/state'
import deepClone from '@/utils/deepClone';

export type AreaState = BaseState & {
  items: StockroomItem[];
};

export const state: AreaState = Object.assign(deepClone(baseState), {
  items: [],
});

export class AreaChartSourceClass {
  date?: string | null = null;
  "≤60㎡"?: number | null = null;
  "60-80㎡"?: number | null = null;
  "80-90㎡"?: number | null = null;
  "90-100㎡"?: number | null = null;
  "100-120㎡"?: number | null = null;
  "120-144㎡"?: number | null = null;
  "144-180㎡"?: number | null = null;
  "≥180㎡"?: number | null = null;
  "180-220㎡"?: number | null = null;
  "220-260㎡"?: number | null = null;
  "≥260㎡"?: number | null = null;
  "更新时间"?: string | null = null;
}
