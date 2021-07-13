import {
  MutationTree,
} from "vuex";
import {
  MutationConstants,
} from "./constants";
import { DistrictState } from './state';
import { StockroomItem, Status } from '@/store/modules/base/state'

export interface Mutations {
  [MutationConstants.HANDLE_DISTRICT_ITEMS] (state: DistrictState, items: StockroomItem[]): void;
  [MutationConstants.UPDATE_STATUS] (state: DistrictState, status: Status): void;
}

export const mutations: MutationTree<DistrictState> & Mutations = {
  [MutationConstants.HANDLE_DISTRICT_ITEMS] (state: DistrictState, items: StockroomItem[]) {
    console.log("HANDLE_DISTRICT_ITEMS state = ", JSON.parse(JSON.stringify(state)), " items = ", JSON.parse(JSON.stringify(items)))
    state.items = items;
  },
  [MutationConstants.UPDATE_STATUS] (state: DistrictState, status: Status) {
    console.log("HANDLE_DISTRICT_ITEMS UPDATE_STATUS state = ", JSON.parse(JSON.stringify(state)), " items = ", JSON.parse(JSON.stringify(status)))
    state.status = Object.assign({}, state.status, status);
  }
};
