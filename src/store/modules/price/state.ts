import { StockroomItem, BaseState, baseState } from '@/store/modules/base/state'
import deepClone from '@/utils/deepClone';

export type PriceState = BaseState & {
  items: StockroomItem[];
};

export const state: PriceState = Object.assign(deepClone(baseState), {
  items: [],
});

export class PriceChartSourceClass {
  date?: string | null = null;
  "≤20万"?: number | null = null;
  "20-30万"?: number | null = null;
  "30-40万"?: number | null = null;
  "40-60万"?: number | null = null;
  "60-100万"?: number | null = null;
  "≥100万"?: number | null = null;
  "更新时间"?: string | null = null;
}
