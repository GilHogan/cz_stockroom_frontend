import { StockroomItem } from '@/store/modules/base/state'

export type Stockroom = {
  id: string;
  date: string;
  update_at: string;
  house_type_items: StockroomItem[];
  area_segment_items: StockroomItem[];
  price_segment_items: StockroomItem[];
  district_items: StockroomItem[];
}

export type StockroomState = {
  items: Stockroom[];
};

export const state: StockroomState = {
  items: [],
};
