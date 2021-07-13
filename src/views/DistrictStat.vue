<template>
  <StatChart lineChartId="districtStatLineChart" :dataset="dataset" :loading="fetching" :queryTypeProp="queryType" @fetch="queryData" @queryTypeChange="queryTypeChange" :statTypeProp="statType" @statTypeChange="statTypeChange" />
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from 'vue'
import StatChart from '@/components/stat-chart/StatChart.vue'
import { useStore } from "@/store";
import {
  GetterConstants,
  ActionConstants,
} from "@/store/modules/district/constants";
import { DistrictChartSourceClass } from "@/store/modules/district/state";
import { AppActionTypes } from '@/store/modules/app/action-types'

interface QueryParamsDetail {
  startAt: string;
  endAt: string;
  statType: string;
}

interface QueryParams {
  params: QueryParamsDetail;
}

export default defineComponent({
  name: "DistrictStat",

  components: {
    StatChart
  },

  setup () {
    const store = useStore();

    const dataMap = reactive({
      fetching: computed(() => store.state.district.status.fetching),
      queryType: computed(() => store.state.app.queryType),
      statType: computed(() => store.state.app.statType),
      dataset: {
        dimensions: Object.keys(new DistrictChartSourceClass()).filter(item => item != "更新时间"),
        source: computed((): DistrictChartSourceClass[] => store.getters[GetterConstants.GET_DISTRICT_CHART_SOURCE](dataMap.queryType))
      },
      queryData (param: QueryParams) {
        store.dispatch(ActionConstants.DISTRICT_FETCH, param);
      },
      queryTypeChange (queryType: string) {
        dataMap.queryType = queryType;
        store.dispatch(AppActionTypes.ACTION_QUERY_TYPE, queryType);
      },
      statTypeChange (statType: string) {
        dataMap.statType = statType;
        store.dispatch(AppActionTypes.ACTION_STAT_TYPE, statType);
      }
    });

    return {
      ...toRefs(dataMap),
    };
  }
})
</script>

<style lang="scss" scoped>
.query-condition {
  display: flex;
  margin: 10px 0;
  justify-content: flex-end;
  align-items: center;
}
</style>
