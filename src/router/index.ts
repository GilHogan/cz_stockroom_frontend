import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/Index.vue'
import Home from '../views/Home.vue';
import HouseTypeStat from '@/views/HouseTypeStat.vue';
import PriceStat from '@/views/PriceStat.vue';
import AreaStat from '@/views/AreaStat.vue';
import DistrictStat from '@/views/DistrictStat.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', name: '', component: Layout,
    children: [
      { path: '', name: '首页', redirect: '/stat/house-type', meta: { icon: 'dashboard' } },
    ]
  },
  {
    path: '/stat', name: '分类统计', component: Layout, redirect: 'house-type', meta: { icon: 'statistics' },
    children: [
      { path: 'house-type', name: '房屋类型', component: HouseTypeStat },
      { path: 'area', name: '面积段', component: AreaStat },
      { path: 'price', name: '价格段', component: PriceStat },
      { path: 'district', name: '行政区域', component: DistrictStat },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
