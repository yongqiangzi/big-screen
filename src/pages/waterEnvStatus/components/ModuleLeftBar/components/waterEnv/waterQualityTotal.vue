<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-09 15:58:57
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-20 16:45:55
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\waterEnv\waterQualityTotal.vue
 * @Description:
-->
<template>
  <section class="water-quality-total">
    <CommonModuleHeader :title="title"> </CommonModuleHeader>
    <section class="content">
      <section id="water-quality-total-chart"></section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';

const props = defineProps(['title', 'dataList']);

let waterQualityTotalChart: any = null;
const legendList = ['I类', 'II类', 'III类', 'IV类', 'V类', '劣V类', '无类别'];
const emphasisStyle = {
  itemStyle: {
    shadowBlur: 10,
    shadowColor: 'rgba(0,0,0,0.3)',
  },
};
const barOption = {
  legend: {
    data: legendList,
    top: -5,
    right: 0,
    textStyle: {
      color: '#E1F2FF',
      fontSize: 10,
    },
    itemWidth: 8,
    itemHeight: 8,
    selectedMode: true,
  },
  tooltip: {
    show: true,
    trigger: 'axis',
  },
  xAxis: {
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
      fontSize: 10, // 设置横轴字体大小
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    show: true,
    name: '',
    type: 'value',
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
      name: 'I类',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: [],
      itemStyle: {
        // 设置柱状图颜色
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#00FFFF' }, // 起始颜色
          { offset: 1, color: '#00F26F' }, // 结束颜色
        ]),
      },
      barWidth: 10,
    },
    {
      name: 'II类',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: [],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#00D1FF' }, // 起始颜色
          { offset: 1, color: '#016CEA' }, // 结束颜色
        ]),
      },
      barWidth: 10,
    },
    {
      name: 'III类',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: [],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#FFB800' }, // 起始颜色
          { offset: 1, color: '#FAFF00' }, // 结束颜色
        ]),
      },
      barWidth: 10,
    },
    {
      name: 'IV类',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: [],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#F69402' }, // 起始颜色
          { offset: 1, color: '#FF5C00' }, // 结束颜色
        ]),
      },
      barWidth: 10,
    },
    {
      name: 'V类',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: [],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#0066FF' }, // 起始颜色
          { offset: 1, color: '#0255F6' }, // 结束颜色
        ]),
      },
      barWidth: 10,
    },
    {
      name: '劣V类',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: [],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#F60202' }, // 起始颜色
          { offset: 1, color: '#FF5C00' }, // 结束颜色
        ]),
      },
      barWidth: 10,
    },
    {
      name: '无类别',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: [],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#DCDCDC' }, // 起始颜色
          { offset: 1, color: '#A0A0A0' }, // 结束颜色
        ]),
      },
      barWidth: 10,
    },
  ],
};

const reSize = () => {
  waterQualityTotalChart?.resize();
};

// 改变图表数据重新渲染
const renderChart = (data: any) => {
  barOption.series[0].data = data['I类'];
  barOption.series[1].data = data['II类'];
  barOption.series[2].data = data['III类'];
  barOption.series[3].data = data['IV类'];
  barOption.series[4].data = data['V类'];
  barOption.series[5].data = data['劣V类'];
  barOption.series[6].data = data['无类别'];
  waterQualityTotalChart.setOption(barOption);
};

watch(
  () => props.dataList,
  (data: any) => {
    renderChart(data);
  },
);

onMounted(() => {
  waterQualityTotalChart = echarts.init(document.getElementById('water-quality-total-chart'));
  setTimeout(() => {
    renderChart(props.dataList);
  }, 200);
  window.addEventListener('resize', reSize);
});
onUnmounted(() => {
  echarts.dispose(waterQualityTotalChart);
  waterQualityTotalChart = {};
  window.removeEventListener('resize', reSize);
});
</script>

<style lang="scss" scoped>
.water-quality-total {
  box-sizing: border-box;
  width: 4.5rem;
  height: 1.71rem;
  margin-top: 0.05rem;

  .header {
    position: relative;
    display: flex;
    width: 4.8rem;
    height: 0.32rem;
    background: url('@/assets/images/mainScreen/bg_module_title.png');
    background-size: cover;

    .title-text {
      position: absolute;
      margin-left: 0.35rem;
      font-family: Source-KeynoteartHans, sans-serif;
      font-size: 0.19rem;
      font-style: italic;
      font-weight: 400;
      line-height: 0.26rem;
      color: #fff;
      text-shadow: 0 0 10px rgb(0 0 0 / 56%);
    }
  }

  .content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    // gap: 0.09rem;
    justify-content: center;
    width: 98%;
    padding: 0 0.09rem;
    margin: 0 auto;
    margin-top: 0.05rem;

    // background: linear-gradient(158deg, rgb(78 165 245 / 10%) 0%, rgb(79 167 248 / 0%) 100%);

    #water-quality-total-chart {
      width: 100%;
      height: 1.35rem;
      padding: 0.05rem 0;
    }
  }
}
</style>
