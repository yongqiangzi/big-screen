<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-30 17:05:11
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-31 14:46:54
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\importantPollution\basic.vue
 * @Description:
-->
<template>
  <section class="pollution-basic">
    <CommonModuleHeader title="污染源基本情況"> </CommonModuleHeader>
    <section class="content">
      <section class="row">
        <section class="left">
          <CommonSubHeader title="污染源数量" textAlign="left" />
          <section class="list">
            <section class="block">
              <section class="block-half">
                <span class="text">{{ pollutionNums[0]?.text }}</span>
                <span class="value">{{ pollutionNums[0]?.value }}</span>
              </section>
              <section class="block-half">
                <span class="text">{{ pollutionNums[1]?.text }}</span>
                <span class="value">{{ pollutionNums[1]?.value }}</span>
              </section>
            </section>
            <section class="block">
              <section class="block-half">
                <span class="text">{{ pollutionNums[2]?.text }}</span>
                <span class="value">{{ pollutionNums[2]?.value }}</span>
              </section>
              <section class="block-half">
                <span class="text">{{ pollutionNums[3]?.text }}</span>
                <span class="value">{{ pollutionNums[3]?.value }}</span>
              </section>
            </section>
          </section>
        </section>
        <section class="right">
          <CommonSubHeader title="废水排放总量" textAlign="left" />
          <section class="chart-container">
            <section class="unit">t/a</section>
            <section id="pollute-water-total-chart" class="pollute-water-chart"></section>
          </section>
        </section>
      </section>
      <section class="row">
        <section class="left">
          <CommonSubHeader title="污染源类型" textAlign="left" />
          <section class="chart-container" style="padding-top: 0.15rem">
            <PieChart
              :chartData="pieChartData"
              :chartStyle="chartStyle"
              :containerStyle="containerStyle"
              :legendUlStyle="legendUlStyle"
              chartUnit="%"
              :legendColorStyle="legendColorStyle"
            />
          </section>
        </section>
        <section class="right">
          <CommonSubHeader title="污水污染物排放量" textAlign="left" />
          <section class="chart-container">
            <section class="check-box">
              <CheckboxGroup
                v-model:value="checkGroupValue"
                name="checkboxgroup"
                :options="checkOptions"
                @change="onCheckBoxChange"
              />
            </section>
            <section class="unit2">(t/a)</section>
            <ul class="legend-box">
              <li v-for="(item, index) in checkOptions" :key="index">
                <span class="left-type-color" :style="{ background: colorList[index] }" />
                <span class="left-type-name">{{ item }}</span>
              </li>
            </ul>
            <section id="pollute-water-out-chart" class="pollute-water-chart"></section>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { CheckboxGroup } from 'ant-design-vue';
import * as echarts from 'echarts';
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';
import CommonSubHeader from '@/components/CommonSubHeader/index.vue';
import PieChart from '@/components/Chart/pieChart.vue';

const props = defineProps(['dataList']);
const pollutionNums = computed(() => props.dataList?.pollutionNums || []);

const checkGroupValue = ref<any>(['CODcr']);
const checkOptions = ['CODcr', 'NH3-N', '总磷', '总氮'];

const pieChartData = [
  { value: 25, name: '生活源' },
  { value: 54, name: '工业源' },
  { value: 21, name: '农业源' },
  { value: 4, name: '集中式' },
];
const chartStyle = {
  legendTop: '25%',
  emphasisLineHeight: 15,
  colorList: ['#0AF9FF', '#FFBA0A', '#0AFF6C', '#930AFF'],
  seriesFontsize: 10,
  seriesLineHeight: 0,
  chartWidth: '1rem',
  chartHeight: '1rem',
  liPaddingLeft: '0.05rem',
};
const containerStyle = {
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
};
const legendUlStyle = {
  width: '100%',
  display: 'flex',
  'justify-content': 'space-evenly',
  'margin-top': '10px',
};
const legendColorStyle = {
  width: '0.06rem',
  height: '0.06rem',
};

const lineOption1 = {
  color: ['#80FFA5'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
    valueFormatter: (value: any) => {
      return `${value}万吨`;
    },
  },
  legend: {
    data: [],
  },
  grid: {
    left: '3%',
    right: '6%',
    bottom: '3%',
    top: 30,
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['2019', '2020', '2021', '2022', '2023'],
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 9, // 设置横轴字体大小
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
        fontSize: 9, // 设置横轴字体大小
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
        color: 'rgba(65,156,231,0.5)',
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0.5,
            color: 'rgba(65,156,231,0.2)',
          },
          {
            offset: 1,
            color: 'rgba(65,156,231,0)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [14321, 11895, 15827, 17726, 17266],
    },
  ],
};
const CODcrData = [321, 295, 327, 326, 266];
const NH3NData = [143, 118, 158, 177, 172];
const totalPData = [438, 389, 427, 356, 372];
const totalNData = [514, 511, 518, 537, 539];
const colorList = ['#564AF1', '#27B9CC', '#5AC3FF', '#3CD495'];
const lineOption2 = {
  color: ['#80FFA5'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
    valueFormatter: (value: any) => {
      return `${value}万吨`;
    },
  },
  legend: {
    data: [],
  },
  grid: {
    left: '1%',
    right: '3%',
    bottom: 20,
    top: 10,
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['9月', '10月', '11月', '12月', '1月'],
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 9, // 设置横轴字体大小
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
        fontSize: 9, // 设置横轴字体大小
      },
    },
  ],
  series: [
    {
      name: 'CODcr',
      type: 'line',
      stack: 'Total',
      lineStyle: {
        width: 2,
      },
      showSymbol: false,
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: '#564AF1', // 设置折线的颜色
      },
      data: CODcrData,
    },
    {
      name: 'NH3-N',
      type: 'line',
      stack: 'Total',
      lineStyle: {
        width: 2,
      },
      showSymbol: false,
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: '#27B9CC', // 设置折线的颜色
      },
      data: [],
    },
    {
      name: '总磷',
      type: 'line',
      stack: 'Total',
      lineStyle: {
        width: 2,
      },
      showSymbol: false,
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: '#5AC3FF', // 设置折线的颜色
      },
      data: [],
    },
    {
      name: '总氮',
      type: 'line',
      stack: 'Total',
      lineStyle: {
        width: 2,
      },
      showSymbol: false,
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: '#3CD495', // 设置折线的颜色
      },
      data: [],
    },
  ],
};

let lineChart1: any = null;
let lineChart2: any = null;

const reSize = (): any => {
  lineChart1?.resize();
  lineChart2?.resize();
};

const initCharts = () => {
  const chartContainer1 = document.getElementById('pollute-water-total-chart') as HTMLElement;
  const chartContainer2 = document.getElementById('pollute-water-out-chart') as HTMLElement;

  lineChart1 = echarts.init(chartContainer1);
  lineChart2 = echarts.init(chartContainer2);
  nextTick(() => {
    lineChart1.setOption(lineOption1);
    lineChart2.setOption(lineOption2);
  });
  window.addEventListener('resize', reSize);
};

const onCheckBoxChange = () => {
  if (checkGroupValue.value.includes('CODcr')) {
    lineOption2.series[0].data = CODcrData;
  } else {
    lineOption2.series[0].data = [];
  }
  if (checkGroupValue.value.includes('NH3-N')) {
    lineOption2.series[1].data = NH3NData;
  } else {
    lineOption2.series[1].data = [];
  }
  if (checkGroupValue.value.includes('总磷')) {
    lineOption2.series[2].data = totalPData;
  } else {
    lineOption2.series[2].data = [];
  }
  if (checkGroupValue.value.includes('总氮')) {
    lineOption2.series[3].data = totalNData;
  } else {
    lineOption2.series[3].data = [];
  }
  lineChart2.setOption(lineOption2);
};

onMounted(() => {
  initCharts();
});
onUnmounted(() => {
  echarts.dispose(lineChart1);
  echarts.dispose(lineChart2);
  lineChart1 = {};
  lineChart2 = {};
  window.removeEventListener('resize', reSize);
});
</script>

<style lang="scss" scoped>
.pollution-basic {
  width: 4.5rem;
  height: 3.51rem;

  .content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 3.21rem;
    padding: 0.1rem 0.2rem;

    .row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: calc(50% - 0.1rem);

      .left,
      .right {
        width: calc(50% - 0.1rem);
      }

      .list {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: calc(100% - 0.2rem);

        .block {
          display: flex;
          width: 1.98rem;
          height: 0.5rem;
          background: url('@/assets/images/waterEnvScreen/bg_pollute_basic.png') no-repeat center;
          background-size: 100% 100%;

          .block-half {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            width: 50%;

            &:first-child::after {
              position: absolute;
              display: block;
              width: 1px;
              height: 0.4rem;
              content: '';
              background: url('@/assets/images/waterEnvScreen/bg_list_divider.png') no-repeat center;
              background-size: 100% 100%;
              transform: translate(0.85rem, 0);
            }

            .text {
              font-family: Alibaba-PuHuiTi-Regular, sans-serif;
              font-size: 11px;
              font-weight: normal;
              line-height: 11px;
              color: #eef7ff;
            }

            .value {
              font-family: D-DIN-DIN, sans-serif;
              font-size: 15px;
              font-weight: bold;
              line-height: 15px;
              text-shadow: 0 3px 3px rgb(0 0 0 / 25%);
              background: linear-gradient(180deg, #fdfeff 0%, #94cfff 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
      }

      .chart-container {
        position: relative;
        width: 100%;
        height: calc(100% - 0.2rem);

        .unit {
          position: absolute;
          top: 0.05rem;
          left: 0.2rem;
          font-size: 0.11rem;
          color: rgb(255 255 255 / 85%);
        }

        .unit2 {
          position: absolute;
          top: 0.27rem;
          left: 0;
          font-size: 0.11rem;
          color: rgb(255 255 255 / 85%);
        }
      }

      .legend-box {
        display: flex;
        gap: 6px;
        padding-top: 10px;
        padding-left: 30px;
        font-family: Alibaba-PuHuiTi-Regular, sans-serif;
        font-size: 11px;
        font-weight: normal;
        line-height: 11px;
        color: #e1f2ff;

        li {
          display: flex;
          gap: 2px;
          align-items: center;
        }

        .left-type-color {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 2px;
        }
      }

      .pollute-water-chart {
        width: 100%;
        height: 100%;
      }
    }
  }

  :deep() {
    .ant-checkbox-group {
      flex-wrap: nowrap;
      column-gap: 0;
    }

    .ant-checkbox-inner {
      width: 9px;
      height: 9px;
      background: rgb(41 159 255 / 0%);
      border: 2px solid #90b6d4;
      border-radius: 2px;
      opacity: 1;
    }

    .ant-checkbox-inner::after {
      inset-inline-start: 0;
      width: 6px;
      height: 6px;
    }

    .ant-checkbox-wrapper-checked {
      background: linear-gradient(to right, rgb(67 157 231 / 70%), transparent);
    }

    .ant-checkbox-group-item {
      font-family: Alibaba-PuHuiTi-Regular, sans-serif;
      font-size: 11px;
      font-weight: normal;
      line-height: 11px;
      color: #e1f2ff;

      &:nth-child(1),
      &:nth-child(2) {
        width: 27%;
      }

      &:nth-child(3),
      &:nth-child(4) {
        width: 20%;
      }
    }
  }
}
</style>
