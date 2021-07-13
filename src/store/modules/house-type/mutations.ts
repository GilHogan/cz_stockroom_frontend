import {
  MutationTree,
} from "vuex";
import {
  MutationConstants,
} from "./constants";
import { HouseTypeState } from './state';
import { StockroomItem, Status } from '@/store/modules/base/state'

export interface Mutations {
  [MutationConstants.HANDLE_HOUSE_TYPE_ITEMS] (state: HouseTypeState, items: StockroomItem[]): void;
  [MutationConstants.UPDATE_STATUS] (state: HouseTypeState, status: Status): void;
}

export const mutations: MutationTree<HouseTypeState> & Mutations = {
  [MutationConstants.HANDLE_HOUSE_TYPE_ITEMS] (state: HouseTypeState, items: StockroomItem[]) {
    state.items = items;
  },
  [MutationConstants.UPDATE_STATUS] (state: HouseTypeState, status: Status) {
    state.status = Object.assign({}, state.status, status);
  }
};
