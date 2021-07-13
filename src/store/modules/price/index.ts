import {
  CommitOptions,
  DispatchOptions,
  Module,
  Store as VuexStore,
} from "vuex";
import { RootState } from "@/store";
import { PriceState, state } from './state';
import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { Actions, actions } from './actions'

export type { PriceState }

export type PriceStore<S = PriceState> = Omit<
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

export const PriceModule: Module<PriceState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
