/*
 * @Description: cookies封装
 * @Author: ZY
 * @Date: 2020-12-17 16:06:33
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-17 17:23:14
 */
import Keys from '@/constant/key'
import Cookies from 'js-cookie'

export const getSidebarStatus = () => Cookies.get(Keys.sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(Keys.sidebarStatusKey, sidebarStatus)

export const getSize = () => Cookies.get(Keys.sizeKey)
export const setSize = (size: string) => Cookies.set(Keys.sizeKey, size)

export const getToken = () => Cookies.get(Keys.tokenKey)
export const setToken = (token: string) => Cookies.set(Keys.tokenKey, token)
export const removeToken = () => Cookies.remove(Keys.tokenKey)

export const getQueryType = () => Cookies.get(Keys.queryType)
export const setQueryType = (queryType: string) => Cookies.set(Keys.queryType, queryType)

export const getStatType = () => Cookies.get(Keys.statType)
export const setStatType = (statType: string) => Cookies.set(Keys.statType, statType)
