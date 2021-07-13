import {
  ActionContext,
  ActionTree,
  CommitOptions,
  DispatchOptions,
  GetterTree,
  Module,
  MutationTree,
  Store as VuexStore,
} from "vuex";
import { RootState } from "@/store";
import {
  GetterConstants,
  MutationConstants,
  ActionConstants,
} from "./constants";
import { request, ResponseType } from '@/utils/api';
import Constants from '@/constant/constants';
import { Stockroom, StockroomState, state } from './state';

export type { StockroomState }

type Getters = {
  [GetterConstants.GET_STOCKROOM_ITEMS] (state: StockroomState): Stockroom[];
};

const getters: GetterTree<StockroomState, RootState> & Getters = {
  [GetterConstants.GET_STOCKROOM_ITEMS]: state => state.items,
};

interface Mutations {
  [MutationConstants.HANDLE_STOCKROOM_ITEMS] (state: StockroomState, items: Stockroom[]): void;
}

const mutations: MutationTree<StockroomState> & Mutations = {
  [MutationConstants.HANDLE_STOCKROOM_ITEMS] (state: StockroomState, items: Stockroom[]) {
    state.items = items;
  }
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations> (
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<StockroomState, RootState>, "commit">;

interface Actions {
  [ActionConstants.STOCKROOM_FETCH] (
    { commit }: AugmentedActionContext,
    payload: { params: any },
  ): Promise<void>;
}

const actions: ActionTree<StockroomState, RootState> & Actions = {
  async [ActionConstants.STOCKROOM_FETCH] ({ commit }, payload) {

    const { params } = payload;
    const result: ResponseType<Stockroom[] | null> = await request('POST', params, '/api/stockroom');
    if (result.code === Constants.Code.SUCCESS) {
      let list: Stockroom[] = [];
      if (result.data && Array.isArray(result.data)) {
        list = result.data;
      }
      commit(MutationConstants.HANDLE_STOCKROOM_ITEMS, list);
    }
  },
};
export type StockroomStore<S = StockroomState> = Omit<
  VuexStore<S>,
  "getters" | "commit" | "dispatch"
> & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]> (
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions, P extends Parameters<Actions[K]>[1]> (
    key: K,
    payload: P,
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>;
};

export const StockroomModule: Module<StockroomState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
