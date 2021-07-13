<!--
 * @Description: 曲线图表
-->
<template>
  <div :id="id" :class="className" :style="{height: height, width: width}" />
</template>

<script lang="ts">
import {
  defineComponent, onActivated, onBeforeUnmount, onDeactivated,
  onMounted, nextTick, toRefs, watch, PropType
} from 'vue'
import resize from './mixins/resize'
import { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { setRgbaAlpha } from '@/utils/color'
import { getWeek } from '@/utils/date'

export interface Dataset {
  source: Array<any>;
  dimensions: Array<string>;
}

export default defineComponent({
  props: {
    title: { type: String },
    dataset: { type: Object as PropType<Dataset>, required: true },
    xAxisData: { type: Array as PropType<Array<string>> },
    areaRgbaColors: { type: Array as PropType<Array<string>>, required: true },
    yAxisTitle: { type: String },
    xAxisTitle: { type: String },
    loading: { type: Boolean, default: false },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'lineChartsComponents'
    },
    width: {
      type: String,
      default: '200px',
      required: true
    },
    height: {
      type: String,
      default: '200px',
      required: true
    }
  },
  setup (props) {
    const {
      mounted,
      chart,
      beforeDestroy,
      activated,
      deactivated
    } = resize();

    const { dataset, title, areaRgbaColors, xAxisData, yAxisTitle, xAxisTitle } = toRefs(props);
    const { dimensions = [] } = dataset.value;
    // 记录是否正在加载
    let isShowLoading = false;

    const series: any = [];
    for (let i = 0; i < dimensions.length; i++) {
      if (i == 0) {
        continue;
      }

      series.push({
        type: "line",
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          width: 1
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: setRgbaAlpha(areaRgbaColors.value[i - 1], 0.3) // 0% 处的颜色
            }, {
              offset: 1, color: setRgbaAlpha(areaRgbaColors.value[i - 1], 0) // 100% 处的颜色
            }],
          },
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        },
        itemStyle: {
          color: setRgbaAlpha(areaRgbaColors.value[i - 1], 1),
          borderColor: setRgbaAlpha(areaRgbaColors.value[i - 1], 0.2),
          borderWidth: 12
        }
      });
    }

    const initOrUpdateChart = () => {
      const chartDom = document.getElementById(props.id);
      if (!chartDom) {
        return;
      }

      let barChart: echarts.ECharts | null = echarts.getInstanceByDom(chartDom);
      if (!barChart) {
        // 不存在图表则初始化
        barChart = echarts.init(chartDom as HTMLDivElement);
      }

      barChart.setOption({
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: title?.value,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params: any): string | HTMLElement[] => {
            let htmlStr = '';
            let updateAt = '';
            for (let i = 0; i < params.length; i++) {
              const param = params[i];
              const xName = param.name;//x轴的名称
              const seriesName = param.seriesName;//图例名称
              const value = param.value;//y轴值
              const color = param.color;//图例颜色
              const realValue = value[seriesName];//y轴值

              if (i === 0) {
                htmlStr += xName + "&nbsp;&nbsp;" + getWeek(xName, "YYYY-MM-DD") + '<br/>';//x轴的名称
                updateAt = value["更新时间"];
              }
              htmlStr += '<div>';
              // 正常显示的数据，走默认
              htmlStr += '<div style="margin: 3px 0; display: flex; justify-content: space-between; min-width: 120px;">';
              htmlStr += '<div>';
              htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';
              htmlStr += '<span">' + seriesName + '</span>';
              htmlStr += '</div>';
              htmlStr += '<span style="font-weight: bold;">' + (realValue === null ? '-' : realValue) + '</span>';
              htmlStr += '</div>';
              htmlStr += '</div>';
            }
            if (updateAt) {
              // 添加额外的“更新时间”数据
              htmlStr += '<span">' + updateAt + '</span>';
            }
            return htmlStr;
          },
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          name: xAxisTitle?.value,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: xAxisData
        }],
        yAxis: [{
          type: 'value',
          name: yAxisTitle?.value,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            fontSize: 14
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        dataset: dataset.value,
        series,
      } as EChartsOption)
      chart.value = barChart
    }

    onMounted(() => {
      mounted()
      nextTick(() => {
        initOrUpdateChart()
      })
    })

    onBeforeUnmount(() => {
      beforeDestroy();
      const chartDom = document.getElementById(props.id);
      if (!chartDom) {
        return;
      }

      const barChart = echarts.getInstanceByDom(chartDom);
      if (barChart) {
        barChart.clear();
        // 销毁图表
        barChart.dispose();
      }
    })

    onActivated(() => {
      activated()
    })

    onDeactivated(() => {
      deactivated()
    })

    watch(() => dataset, (newValue, oldValue) => {
      nextTick(() => {
        initOrUpdateChart()
      })
    }, { deep: true })

    watch(() => props.loading, (newValue, oldValue) => {
      nextTick(() => {
        if (!newValue) {
          hideLoading();
        } else {
          isShowLoading = true;
          showLoading();
        }
      })
    })

    /**
     * 隐藏loading动画
     */
    function hideLoading () {
      const chartDom = document.getElementById(props.id);
      if (!chartDom) {
        return;
      }
      const barChart = echarts.getInstanceByDom(chartDom);
      if (barChart && !isShowLoading) {
        // 隐藏loading动画
        barChart.hideLoading();
      } else {
        // echarts dom 还未更新完成， 这里做延迟递归处理
        setTimeout(() => {
          hideLoading();
        }, 100);
      }
    }

    /**
     * 显示loading动画
     */
    function showLoading () {
      const chartDom = document.getElementById(props.id);
      if (!chartDom) {
        isShowLoading = false;
        return;
      }

      const barChart = echarts.getInstanceByDom(chartDom);
      if (barChart) {
        // 显示loading动画
        barChart.showLoading({ text: 'loading...', maskColor: 'rgba(145, 145, 145, 0.6)', textColor: '#fff', fontSize: 16, });
        isShowLoading = false;
      } else {
        // echarts dom 还未更新完成， 这里做延迟递归处理
        setTimeout(() => {
          showLoading();
        }, 100);
      }
    }

    return {

    }
  }
})
</script>
