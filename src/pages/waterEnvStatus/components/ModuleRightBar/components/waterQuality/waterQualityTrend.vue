<!--
 * @Author: PanYunhong
 * @Date: 2023-11-23 14:56:54
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-22 17:33:16
 * @description: 水质趋势
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\components\waterQuality\waterQualityTrend.vue
-->
<template>
  <section class="water-quality-trend-container">
    <section id="water-trend" v-show="waterTrendChartShow" />
    <!-- <section class="part-laoding" v-if="isLoading">
      <partLaoding />
    </section> -->
    <!-- <section v-if="!waterTrendChartData.xAxisData.length && !isLoading" class="no-data">
      暂无数据
    </section> -->
  </section>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
// import { partLaoding } from '../index';
import dayjs from 'dayjs';

const props = defineProps(['waterTrendChartData', 'waterPolluteType']);

let chart: any = null;
const waterTrendChartShow = ref(false);

const option = {
  color: ['#80FFA5'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: [],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: 10,
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [''],
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: 'rgba(255,255,255,0.7)',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      // interval: 7,
      splitLine: {
        lineStyle: {
          color: ['#475163'],
          type: 'dashed',
        },
      },
      axisLabel: {
        color: 'rgba(255,255,255,0.7)',
      },
    },
  ],
  series: [
    {
      name: '',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 2,
      },
      itemStyle: {
        color: '#47CED8',
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0.5,
            color: 'rgba(71, 206, 216, 0.5)',
          },
          {
            offset: 1,
            color: 'rgba(71, 206, 216, 0)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [140, 232, 101, 264, 90, 340, 250],
    },
  ],
};

/**
 *  重置图表
 * @param {any} val value
 * @return {void}
 */
const reSize = (): any => {
  if (Object.keys(chart).length) {
    chart.resize();
  }
};

/**
 * 初始化图表
 * @returns {void}
 */
const initCharts = () => {
  const chartContainer = document.getElementById('water-trend') as HTMLElement;

  chart = echarts.init(chartContainer);
  window.addEventListener('resize', reSize);
};

/**
 *  配置线状图
 * @param {any} val 配置项
 * @return {void}
 */
const setChart = (val: any) => {
  nextTick(() => {
    if (val && Object.keys(chart).length) {
      // 不和之前的option合并
      chart.setOption(val, true);
      reSize();
    }
  });
};

watch(
  () => props.waterTrendChartData,
  (newVal) => {
    if (newVal) {
      waterTrendChartShow.value = true;
      // option.xAxis[0].data = newVal.xAxisData;
      option.xAxis[0].data = Object.keys(newVal).map((item) => dayjs(item).format('MM月'));
      option.series[0].data = newVal.seriesData;
      option.series[0].data = Object.values(newVal).map((item: any) => item.value);
      setChart(option);
    }
  },
  { deep: true, immediate: true },
);
/**
 * 挂载图表
 */
onMounted(() => {
  initCharts();
});
</script>

<style lang="scss" scoped>
.water-quality-trend-container {
  position: relative;
  width: 100%;
  height: 100%;
  color: #cdddf1;

  #water-trend {
    width: 100%;
    height: 100%;

    // padding-top: 0.2rem;
  }

  .part-laoding {
    position: absolute;
    top: 45%;
    left: 40%;
  }

  .no-data {
    position: absolute;
    top: 45%;
    left: 40%;
  }
}
</style>
