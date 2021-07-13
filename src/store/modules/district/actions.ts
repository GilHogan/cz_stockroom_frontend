import {
  ActionContext,
  ActionTree,
} from "vuex";
import { RootState } from "@/store";
import {
  MutationConstants,
  ActionConstants,
} from "./constants";
import { request, ResponseType } from '@/utils/api';
import Constants from '@/constant/constants';
import { DistrictState, state } from './state';
import { StockroomItem } from '@/store/modules/base/state'
import { Mutations } from './mutations'
import { sign } from '@/utils/encrypt'

type AugmentedActionContext = {
  commit<K extends keyof Mutations> (
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<DistrictState, RootState>, "commit">;

export interface Actions {
  [ActionConstants.DISTRICT_FETCH] (
    { commit }: AugmentedActionContext,
    payload: { params: any },
  ): Promise<void>;
}

export const actions: ActionTree<DistrictState, RootState> & Actions = {
  async [ActionConstants.DISTRICT_FETCH] ({ commit }, payload) {

    const { params } = payload;
    // 更新状态
    commit(MutationConstants.UPDATE_STATUS, { fetching: true });
    const header = { [Constants.Sign.key]: sign() };
    let url = '/api/district/group';
    if (params && params.statType && params.statType == Constants.StatType.day) {
      url = '/api/district';
    }
    const result: ResponseType<StockroomItem[] | null> = await request('POST', params, url, header);
    if (result.code === Constants.Code.SUCCESS) {
      let list: StockroomItem[] = [];
      if (result.data && Array.isArray(result.data)) {
        list = result.data;
      }
      commit(MutationConstants.HANDLE_DISTRICT_ITEMS, list);
    }
    // 更新状态
    commit(MutationConstants.UPDATE_STATUS, { fetching: false });
  },
};
