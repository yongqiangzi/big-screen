<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-29 17:39:24
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-30 16:12:00
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\components\polluteWater\projectMoney.vue
 * @Description:
-->
<template>
  <section class="project-money">
    <CommonModuleHeader title="专项资金"> </CommonModuleHeader>
    <section class="content">
      <section id="project-money-chart"></section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps(['dataList']);

const barOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    textStyle: {
      color: '#E1F2FF',
      fontSize: 10,
    },
    orient: 'horizontal', // 设置图例水平布局
    left: 'center', // 居中显示
    top: 180,
    itemWidth: 11,
    itemHeight: 6,
  },
  grid: {
    top: -10,
    left: 0,
    right: 20,
    bottom: 60,
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: [],
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
        fontSize: 10, // 设置横轴字体大小
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: false, // 设置刻度线不显示
      },
      axisLabel: {
        color: '#fff', // 设置纵轴字体颜色
        fontSize: 10, // 设置纵轴字体大小
      },
    },
  ],
  series: [
    {
      name: '中央库资金',
      type: 'bar',
      emphasis: {
        focus: 'series',
      },
      data: [],
      tooltip: {
        valueFormatter: (value: any) => {
          return `${value}万元`;
        },
      },
      itemStyle: {
        // color: '#B46016', // 设置柱状图颜色
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#15FFFF' }, // 起始颜色
          { offset: 0.1, color: '#326F5A' }, // 中间颜色
          { offset: 0.6, color: '#1CCECB' }, // 中间颜色
          { offset: 1, color: '#0AEEEC' }, // 结束颜色
        ]),
      },
      barWidth: 10,
    },
    {
      name: '省级库资金',
      type: 'bar',
      data: [],
      emphasis: {
        focus: 'series',
      },
      tooltip: {
        valueFormatter: (value: any) => {
          return `${value}万元`;
        },
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#FF7615' }, // 起始颜色
          { offset: 0.1, color: '#8E6738' }, // 中间颜色
          { offset: 0.6, color: '#B6661D' }, // 中间颜色
          { offset: 1, color: '#EE6F13' }, // 结束颜色
        ]),
      },
      barWidth: 10,
    },
  ],
};

let barChart: any = null;

const reSize = () => {
  barChart?.resize();
};

watch(
  () => props.dataList,
  (list: any) => {
    if (list && barChart) {
      barOption.xAxis[0].data = list?.xAxisData;
      barOption.series[0].data = list?.centerMoney;
      barOption.series[1].data = list?.provinceMoney;
      barChart.setOption(barOption);
    }
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  barChart = echarts.init(document.getElementById('project-money-chart'));
  window.addEventListener('resize', reSize);
});
onUnmounted(() => {
  echarts.dispose(barChart);
  barChart = {};
  window.removeEventListener('resize', reSize);
});
</script>

<style lang="scss" scoped>
.project-money {
  width: 4.5rem;
  height: 2.4rem;

  #project-money-chart {
    width: 4.5rem;
    height: 2.3rem;
  }
}
</style>
