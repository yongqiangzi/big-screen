<template>
  <section class="sec">
    <div :id="chartId" class="chart"></div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import { TinyColor } from '@ctrl/tinycolor';

const colorArr = [
  '#5B8FF9',
  '#73DEB3',
  '#F7C739',
  '#7585A2',
  '#ff7f50',
  '#87cefa',
  '#da70d6',
  '#32cd32',
  '#6495ed',
  '#ff69b4',
  '#ba55d3',
  '#cd5c5c',
  '#ffa500',
  '#40e0d0',
  '#1e90ff',
  '#ff6347',
  '#7b68ee',
  '#00fa9a',
  '#ffd700',
  '#6699FF',
  '#ff6666',
  '#3cb371',
  '#b8860b',
];

const props = defineProps(['chartData', 'chartId', 'chartType']);

const initChart = (prop) => {
  const chartDom = document.getElementById(prop.chartId);
  if (!chartDom) return;
  const myEcharts = echarts.init(chartDom);
  const { xlist, yparamList } = prop.chartData;
  const legendArr: any[] = [];
  const seriesData: { unit: any }[] = [];
  yparamList.map((item: any, idx: number) => {
    seriesData.push({
      type: prop.chartType ?? 'line',
      showSymbol: true,
      name: item.name,
      unit: item.unit,
      // smooth: true,
      lineStyle: {
        normal: {
          width: 2,
        },
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: new TinyColor(colorArr[idx]).setAlpha(0.8).toRgbString(),
              },
              {
                offset: 0.8,
                color: new TinyColor(colorArr[idx]).setAlpha(0.0).toRgbString(),
              },
            ],
            false,
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10,
        },
      },
      itemStyle: {
        normal: {
          color: new TinyColor(colorArr[idx]).toRgbString(),
        },
      },
      data: item.ylist,
    });
    legendArr.push(item.name);
    return '';
  });

  myEcharts.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#57617B',
        },
      },
    },
    legend: {
      type: 'scroll',
      pageIconColor: '#fff',
      pageTextStyle: {
        color: '#fff',
      },
      orient: 'horizontal',
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 5,
      itemGap: 13,
      data: null, // legendArr,
      right: '4%',
      textStyle: {
        fontSize: 12,
        color: '#F1F1F3',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '10%',
      bottom: '20%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            type: 'dashed',
            color: '#57617B',
          },
        },
        axisLabel: {
          color: 'rgba(255,255,255,0.85)',
          textStyle: {
            fontSize: 12,
            fontFamily: 'PingFang SC',
          },
        },
        data: xlist || [],
      },
    ],
    yAxis: [
      {
        name: seriesData[0].unit,
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff',
          },
        },
        axisLabel: {
          margin: 12,
          textStyle: {
            fontSize: 10,
            fontFamily: 'D-DIN-DIN',
            fontWeight: 'bold',
          },
        },
        splitLine: {
          // show: false,
          lineStyle: {
            color: '#57617B',
          },
        },
      },
    ],
    series: seriesData,
  });
  window.onresize = () => {
    myEcharts.resize();
  };
};

watch(
  () => props,
  (newVal) => {
    if (newVal) {
      initChart(newVal);
    }
  },
  { deep: true },
);

onMounted(() => {
  initChart({});
});
</script>

<style lang="scss" scoped>
.chart {
  width: 2.9rem;
  height: 3rem;
}
</style>
