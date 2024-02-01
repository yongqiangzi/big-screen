<!--
 * @Author: ziyongqiang
 * @Date: 2023-12-26 09:07:43
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-15 14:54:33
 * @FilePath: \src\pages\index\components\ModuleRightBar\components\radarChart.vue
 * @Description:
-->
<template>
  <div class="radar-chart" id="radar-chart"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  dataList: {
    type: Array,
    default: () => [40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
  },
});

// 图表相关
const radarChart = ref<any>();
const chartOption = ref<any>({
  tooltip: {
    trigger: 'item',
  },
  radar: {
    // shape: 'circle',
    radius: '54%',
    axisName: {
      fontSize: 9,
      padding: -10,
    },
    splitLine: {
      lineStyle: {
        color: 'rgb(21 148 255 / 70%)', // 背景外圈线条颜色设置
      },
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(255,255,255,0.7)',
      },
    },
    indicator: [
      { name: '甬江', max: 100, axisLabel: { show: true } },
      { name: '奉化江', max: 100 },
      { name: '余姚江', max: 100 },
      { name: '月湖', max: 100 },
      { name: '三塘横江', max: 100 },
      { name: '隐溪河', max: 100 },
      { name: '祥河', max: 100 },
      { name: '沿山大河', max: 100 },
      { name: '剂江', max: 100 },
      { name: '三眼桥江', max: 100 },
    ],
    // 坐标轴刻度
    axisLabel: {
      show: false,
      color: '#b6b1c3',
      position: 'bottom',
      fontSize: 8,
      margin: 2,
    },
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          symbol: 'emptyCircle',
          symbolSize: 6,
          value: props.dataList,
          name: '河湖健康评价',
          itemStyle: {
            // 拐点空心圆空心圆
            normal: {
              color: '#1594FF',
              // borderColor: '#1594FF',
              // borderWidth: 1.8,
            },
          },
          // 背景色
          areaStyle: {
            color: 'rgba(34,118,252,0.5)',
          },
        },
      ],
    },
  ],
});

/**
 * 初始化图表
 * @returns {void}
 */
const initCharts = (): void => {
  const container = document.getElementById('radar-chart') as HTMLElement;

  radarChart.value = echarts.init(container);
};

watch(
  () => props.dataList,
  () => {
    chartOption.value.series[0].data[0].value = props.dataList;
    radarChart.value.setOption(chartOption.value);
  },
);

onMounted(() => {
  initCharts();
  radarChart.value.setOption(chartOption.value);
  window.onresize = () => {
    // const { padding } = chartOption.value.radar.axisName;
    // chartOption.value.radar.axisName.padding = padding === -10 ? -13 : -10;
    // radarChart.value.setOption(chartOption.value);
    radarChart.value?.resize();
  };
});

onUnmounted(() => {
  window.onresize = null;
  echarts.dispose(radarChart.value);
  radarChart.value = {};
});
</script>

<style lang="scss" scoped>
.radar-chart {
  width: 1.7rem;
  height: 1.7rem;
}
</style>
