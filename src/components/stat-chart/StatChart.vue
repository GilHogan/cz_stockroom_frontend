<template>
  <div class="query-condition">
    <el-select v-model="queryType" placeholder="请选择" @change="queryTypeSelectOnChange">
      <el-option v-for="item in queryTypeSelectOptions" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="statType" placeholder="请选择" @change="statTypeSelectOnChange">
      <el-option v-for="item in statTypeSelectOptions" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-date-picker v-model="datePickerData" type="daterange" unlink-panels start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" @change="queryData" />
    <!-- <el-button type="primary" plain :disabled="loading" @click="queryData">查询</el-button> -->
  </div>
  <div class="chart-container">
    <LineChart :id="lineChartId" height="100%" width="100%" :areaRgbaColors="areaRgbaColors" :dataset="dataset" :yAxisTitle="yAxisTitle" :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed, toRefs, PropType } from 'vue'
import moment, { Moment } from 'moment'
import LineChart, { Dataset } from '@/components/charts/LineCart.vue'
import Constants from '@/constant/constants'
import { ElMessage } from 'element-plus'
import { useStore } from "@/store";
import { AppMutationTypes } from "@/store/modules/app/mutation-types";

export default defineComponent({
  name: "StatChart",

  props: {
    dataset: { type: Object as PropType<Dataset>, required: true },
    loading: { type: Boolean, default: false },
    lineChartId: { type: String, default: 'lineChartsComponents' },
    queryTypeProp: { type: String as PropType<string>, default: Constants.QueryType.number },
    statTypeProp: { type: String as PropType<string>, default: Constants.StatType.day }
  },

  components: {
    LineChart
  },

  emits: ["queryTypeChange", "statTypeChange", "fetch"],

  setup (props, context) {

    const store = useStore();

    // 初始时选择最近三个月的时间进行查询
    const defaultEnd = computed(() => store.state.app.params.endAt || moment().format("YYYY-MM-DD"));
    const defaultStart = computed(() => store.state.app.params.startAt || moment(defaultEnd.value).subtract(3, 'months').format("YYYY-MM-DD"));

    const dataMap: any = reactive({
      areaRgbaColors: Constants.ChartColor.AREA_RGBA,
      queryType: props.queryTypeProp,
      queryTypeSelectOptions: [{
        value: Constants.QueryType.number,
        label: '成交套数'
      }, {
        value: Constants.QueryType.area,
        label: '成交面积'
      }],
      statType: props.statTypeProp,
      statTypeSelectOptions: [{
        value: Constants.StatType.month,
        label: '按月统计'
      }, {
        value: Constants.StatType.day,
        label: '按天统计'
      }],
      queryTypeSelectOnChange (value: string) {
        context.emit('queryTypeChange', value);
      },
      statTypeSelectOnChange (value: string) {
        context.emit('statTypeChange', value);
        dataMap.queryData();
      },
      yAxisTitle: computed(() => dataMap.queryType === Constants.QueryType.area ? '成交面积(㎡)' : '成交套数(套)'),
      shortcuts: [{
        text: '最近一周',
        value: (() => {
          const end = moment();
          const start = moment(end).subtract(1, 'weeks');
          return [start, end]
        })()
      }, {
        text: '最近一个月',
        value: (() => {
          const end = moment();
          const start = moment(end).subtract(1, 'months');
          return [start, end]
        })()
      }, {
        text: '最近三个月',
        value: (() => {
          const end = moment();
          const start = moment(end).subtract(3, 'months');
          return [start, end]
        })()
      }, {
        text: '最近一年',
        value: (() => {
          const end = moment();
          const start = moment(end).subtract(1, 'years');
          return [start, end]
        })()
      }],
      datePickerData: [defaultStart.value, defaultEnd.value],
      queryData () {
        if (dataMap.datePickerData && dataMap.datePickerData.length > 1) {
          const start: Moment = moment(dataMap.datePickerData[0]);
          if (start.isBefore('2021-02-21')) {
            ElMessage.warning("2021-02-21之前暂无统计数据");
            return;
          }
          const end: Moment = moment(dataMap.datePickerData[1]);
          const diffDays: number = end.diff(start, "days");
          if (diffDays > 366) {
            ElMessage.warning("时间跨度不能超过1年");
            return;
          }

          const params = { startAt: start.format("YYYY-MM-DD"), endAt: end.format("YYYY-MM-DD"), statType: dataMap.statType }
          store.commit(AppMutationTypes.UPDATE_QUERY_PARAMS, params);
          context.emit('fetch', { params: params });
        }
      }
    });

    onMounted(() => {
      context.emit('fetch', { params: { startAt: defaultStart.value, endAt: defaultEnd.value, statType: dataMap.statType } });
    })

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
  height: 40px;
}

.chart-container {
  position: relative;
  width: 100%;
  height: calc(92vh - 50px - 60px);
}
</style>
