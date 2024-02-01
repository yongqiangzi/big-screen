<template>
  <div :id="chartId" class="container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts';

const props = defineProps(['chartData', 'chartId']);

const getVirtualData = (month: string) => {
  const date = +echarts.time.parse(`${month}-01-01`);
  const end = +echarts.time.parse(`${+month + 1}-01-01`);
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 10),
    ]);
  }
  return data;
};
const initChart = () => {
  const dom = document.getElementById(props.chartId);
  if (!dom) return;
  const myChart = echarts.init(dom);

  const option = {
    tooltip: {
      position: 'top',
      formatter(p) {
        const format = echarts.time.format(p.data[0], '{yyyy}-{MM}-{dd}', false);
        return `${format}: ${p.data[1]}`;
      },
    },
    visualMap: {
      show: false,
      min: 0,
      max: 6,
      splitNumber: 6,
      calculable: true,
      orient: 'vertical',
      left: '670',
      top: 'center',
      inRange: {
        color: ['#34AB3E', '#006edd', '#0046FF', '#EFDC31', '#66BAF8', '#2673B2'],
        opacity: 1,
      },
    },
    calendar: [
      {
        left: 5,
        top: 30,
        cellSize: ['auto', 'auto'],
        orient: 'horizontal',
        range: ['2023-11', '2023-12-30'],
        yearLabel: { show: false },
        monthLabel: {
          show: true,
          formatter: '{yyyy}年{MM}月',
          color: '#fff',
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: 14,
        },
        dayLabel: { show: false },
      },
    ],
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data: getVirtualData('2023'),
      },
    ],
  };
  myChart.setOption(option);
  window.addEventListener('resize', myChart.resize());
};

onMounted(() => {
  initChart();
});
</script>

<style lang="scss" scoped>
.container {
  width: 6rem;
  height: 3.1rem;
}
</style>
