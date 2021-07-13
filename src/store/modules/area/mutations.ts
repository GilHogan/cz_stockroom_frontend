import {
  MutationTree,
} from "vuex";
import {
  MutationConstants,
} from "./constants";
import { AreaState } from './state';
import { StockroomItem, Status } from '@/store/modules/base/state'

export interface Mutations {
  [MutationConstants.HANDLE_AREA_ITEMS] (state: AreaState, items: StockroomItem[]): void;
  [MutationConstants.UPDATE_STATUS] (state: AreaState, status: Status): void;
}

export const mutations: MutationTree<AreaState> & Mutations = {
  [MutationConstants.HANDLE_AREA_ITEMS] (state: AreaState, items: StockroomItem[]) {
    state.items = items;
  },
  [MutationConstants.UPDATE_STATUS] (state: AreaState, status: Status) {
    state.status = Object.assign({}, state.status, status);
  }
};
