import {
  MutationTree,
} from "vuex";
import {
  MutationConstants,
} from "./constants";
import { PriceState } from './state';
import { StockroomItem, Status } from '@/store/modules/base/state'

export interface Mutations {
  [MutationConstants.HANDLE_PRICE_ITEMS] (state: PriceState, items: StockroomItem[]): void;
  [MutationConstants.UPDATE_STATUS] (state: PriceState, status: Status): void;
}

export const mutations: MutationTree<PriceState> & Mutations = {
  [MutationConstants.HANDLE_PRICE_ITEMS] (state: PriceState, items: StockroomItem[]) {
    state.items = items;
  },
  [MutationConstants.UPDATE_STATUS] (state: PriceState, status: Status) {
    state.status = Object.assign({}, state.status, status);
  }
};
