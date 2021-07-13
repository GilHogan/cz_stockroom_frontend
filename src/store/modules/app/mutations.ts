/*
 * @Description: app Mutations
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-24 09:55:30
 */
import { MutationTree } from 'vuex'
import { AppState, DeviceType, QueryParamsDetail } from './state'
import { AppMutationTypes } from './mutation-types'
import { setSidebarStatus, setSize, setQueryType, setStatType } from '@/utils/cookies'

export type Mutations<S = AppState> = {
  [AppMutationTypes.TOGGLE_SIDEBAR] (state: S, withoutAnimation: boolean): void
  [AppMutationTypes.CLOSE_SIDEBAR] (state: S, withoutAnimation: boolean): void
  [AppMutationTypes.TOGGLE_DEVICE] (state: S, device: DeviceType): void
  [AppMutationTypes.SET_SIZE] (state: S, size: string): void
  [AppMutationTypes.QUERY_TYPE] (state: S, queryType: string): void
  [AppMutationTypes.STAT_TYPE] (state: S, statType: string): void
  [AppMutationTypes.UPDATE_QUERY_PARAMS] (state: S, params: QueryParamsDetail): void

}

export const mutations: MutationTree<AppState> & Mutations = {
  [AppMutationTypes.TOGGLE_SIDEBAR] (state: AppState, withoutAnimation: boolean) {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = withoutAnimation
    if (state.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  },

  [AppMutationTypes.CLOSE_SIDEBAR] (state: AppState, withoutAnimation: boolean) {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  },

  [AppMutationTypes.TOGGLE_DEVICE] (state: AppState, device: DeviceType) {
    state.device = device
  },

  [AppMutationTypes.SET_SIZE] (state: AppState, size: string) {
    state.size = size
    setSize(state.size)
  },

  [AppMutationTypes.QUERY_TYPE] (state: AppState, queryType: string) {
    state.queryType = queryType
    setQueryType(state.queryType)
  },

  [AppMutationTypes.STAT_TYPE] (state: AppState, statType: string) {
    state.statType = statType
    setStatType(state.statType)
  },

  [AppMutationTypes.UPDATE_QUERY_PARAMS] (state: AppState, params: QueryParamsDetail) {
    state.params = params
  }

}
