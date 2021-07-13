/*
 * @Description: app state
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-23 10:30:35
 */
import { getSidebarStatus, getSize, getQueryType, getStatType } from '@/utils/cookies'
import Constants from '@/constant/constants'

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface QueryParamsDetail {
  startAt: string;
  endAt: string;
  statType: string;
}

export interface QueryParams {
  params: QueryParamsDetail;
}

export interface AppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  size: string
  queryType: string
  statType: string
  params: QueryParamsDetail
}

export const state: AppState = {
  device: DeviceType.Desktop,
  sidebar: {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
  size: getSize() || 'medium',
  queryType: getQueryType() || Constants.QueryType.number,
  statType: getStatType() || Constants.StatType.month,
  params: {
    startAt: '',
    endAt: '',
    statType: ''
  }
}
