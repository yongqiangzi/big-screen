<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-20 13:34:59
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-20 16:40:54
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\waterEnv\barChart.vue
 * @Description:
-->
<template>
  <div :id="chartId" class="pie-chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps(['chartId', 'seriesName', 'xAxisData', 'pieChartData']);

const emphasisStyle = {
  itemStyle: {
    shadowBlur: 10,
    shadowColor: 'rgba(0,0,0,0.3)',
  },
};
const barOption = {
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    data: props.xAxisData,
    name: 'XAxis',
    axisLine: {
      onZero: true,
      lineStyle: {
        width: 1, // 设置横轴线的粗细
        color: 'rgba(255,255,255,0.6)', // 设置横轴线的颜色
      },
    },
    splitLine: { show: false },
    splitArea: { show: false },
    axisLabel: {
      color: '#B0B7B4', // 设置横轴字体颜色
      fontSize: 9, // 设置横轴字体大小
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    show: true,
    name: '',
    nameTextStyle: {
      color: '#E1F2FF', // 设置纵轴单位文字颜色
      fontSize: 10, // 设置横轴单位文字大小
      align: 'center',
      padding: [0, 25, 0, 0],
    },
    axisLabel: {
      color: 'rgba(255,255,255,0.85)', // 设置纵轴字体颜色
      fontSize: 10, // 设置纵轴字体大小
    },
    splitLine: {
      show: false,
    },
  },
  grid: {
    top: 30,
    right: 0,
    bottom: 20,
    left: 25,
  },
  series: [
    {
      name: props.seriesName,
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: [],
      itemStyle: {
        // 设置柱状图颜色
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#15FFFF' }, // 起始颜色
          { offset: 0.1, color: '#326F5A' }, // 中间颜色
          { offset: 0.6, color: '#1CCECB' }, // 中间颜色
          { offset: 1, color: '#0AEEEC' }, // 结束颜色
        ]),
      },
      barWidth: 10,
    },
  ],
};

let pieChart: any = null;

const reSize = () => {
  pieChart?.resize();
};

// 改变图表数据重新渲染
const renderChart = (data: any) => {
  barOption.series[0].data = data;
  pieChart.setOption(barOption);
};

watch(
  () => props.pieChartData,
  (data: any) => {
    renderChart(data);
  },
);

onMounted(() => {
  pieChart = echarts.init(document.getElementById(props.chartId));
  setTimeout(() => {
    renderChart(props.pieChartData);
  }, 200);
  window.addEventListener('resize', reSize);
});
onUnmounted(() => {
  echarts.dispose(pieChart);
  pieChart = {};
  window.removeEventListener('resize', reSize);
});
</script>

<style lang="scss" scoped>
.pie-chart {
  width: 2.6rem;
  height: 1.15rem;
}
</style>
