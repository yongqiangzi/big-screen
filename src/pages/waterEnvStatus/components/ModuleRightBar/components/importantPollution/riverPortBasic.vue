<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-30 17:17:17
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-02-01 14:55:12
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\components\importantPollution\riverPortBasic.vue
 * @Description:
-->
<template>
  <section class="river-port-basic">
    <CommonModuleHeader title="入河(海)排口基本情況"> </CommonModuleHeader>
    <section class="content">
      <section class="half top">
        <section class="half-left">
          <section class="row">
            <CommonSubHeader title="入河排口" textAlign="left" />
            <section class="block">
              <section class="block-half">
                <span class="text">{{ riverData[0]?.text }}</span>
                <span class="value">
                  <span class="special">{{ riverData[0]?.value }}</span>
                  <span class="unit">个</span>
                </span>
              </section>
              <section class="block-half">
                <span class="text">{{ riverData[1]?.text }}</span>
                <span class="value">
                  <span class="special">{{ riverData[1]?.value }}</span>
                  <span class="unit">万吨</span>
                </span>
              </section>
            </section>
          </section>
          <section class="row">
            <CommonSubHeader title="入海排口" textAlign="left" />
            <section class="block">
              <section class="block-half">
                <span class="text">{{ seaData[0]?.text }}</span>
                <span class="value">
                  <span class="special">{{ seaData[0]?.value }}</span>
                  <span class="unit">个</span>
                </span>
              </section>
              <section class="block-half">
                <span class="text">{{ seaData[1]?.text }}</span>
                <span class="value">
                  <span class="special">{{ seaData[1]?.value }}</span>
                  <span class="unit">万吨</span>
                </span>
              </section>
            </section>
          </section>
        </section>
        <section class="half-right">
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
      <section class="half bottom">
        <CommonSubHeader title="各区县入河（海）排口统计"> </CommonSubHeader>
        <section class="chart-container">
          <section id="river-port-chart"></section>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';
import CommonSubHeader from '@/components/CommonSubHeader/index.vue';
import PieChart from '@/components/Chart/pieChart.vue';

const props = defineProps(['dataList']);

const riverData = computed(() => props.dataList?.river || []);
const seaData = computed(() => props.dataList?.sea || []);

const pieChartData = [
  { value: 25, name: '生活源' },
  { value: 53, name: '工业源' },
  { value: 18, name: '农业源' },
  { value: 4, name: '集中式污染治理设施' },
];
const chartStyle = {
  legendTop: '25%',
  emphasisLineHeight: 15,
  colorList: ['#0AF9FF', '#FFBA0A', '#0AFF6C', '#930AFF'],
  seriesFontsize: 10,
  seriesLineHeight: 0,
  chartWidth: '1.2rem',
  chartHeight: '1.2rem',
  liPaddingLeft: '0',
  liPaddingRight: '0.4rem',
};
const containerStyle = {
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
};
const legendUlStyle = {
  width: '100%',
  display: 'flex',
  'margin-top': '10px',
  'flex-wrap': 'wrap',
  'padding-left': '22px',
};
const legendColorStyle = {
  width: '0.06rem',
  height: '0.06rem',
};

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
    bottom: 10,
    itemWidth: 11,
    itemHeight: 6,
  },
  grid: {
    top: 20,
    left: 0,
    right: 20,
    bottom: 40,
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
      name: '入河排口',
      type: 'bar',
      emphasis: {
        focus: 'series',
      },
      data: [],
      tooltip: {
        valueFormatter: (value: any) => {
          return `${value}个`;
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
      name: '入海排口',
      type: 'bar',
      data: [],
      emphasis: {
        focus: 'series',
      },
      tooltip: {
        valueFormatter: (value: any) => {
          return `${value}个`;
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

onMounted(() => {
  barChart = echarts.init(document.getElementById('river-port-chart'));
  setTimeout(() => {
    barOption.xAxis[0].data = props.dataList?.xAxisData;
    barOption.series[0].data = props.dataList?.centerMoney;
    barOption.series[1].data = props.dataList?.provinceMoney;
    barChart.setOption(barOption);
  }, 200);
  window.addEventListener('resize', reSize);
});
onUnmounted(() => {
  echarts.dispose(barChart);
  barChart = {};
  window.removeEventListener('resize', reSize);
});
</script>

<style lang="scss" scoped>
.river-port-basic {
  width: 4.5rem;
  height: 4.6rem;

  .content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: calc(100% - 0.32rem);
    padding: 0.1rem 0.2rem;

    .half {
      display: flex;
      width: 100%;
      height: 49%;

      .half-left,
      .half-right {
        width: 50%;
      }

      .half-left {
        display: flex;
        flex-direction: column;

        .row {
          height: 50%;

          .block {
            display: flex;
            width: 1.98rem;
            height: 0.5rem;
            margin-top: 0.08rem;
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
                background: url('@/assets/images/waterEnvScreen/bg_list_divider.png') no-repeat
                  center;
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
              }

              .special {
                background: linear-gradient(180deg, #fdfeff 0%, #94cfff 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }

              .unit {
                margin-left: 0.02rem;
                font-family: 'PingFang SC', sans-serif;
                font-size: 9px;
                font-weight: 400;
                line-height: 9px;
                color: #7a8b96;
              }
            }
          }
        }
      }
    }

    .bottom {
      flex-direction: column;
    }

    #river-port-chart {
      width: 4.5rem;
      height: 2rem;
    }
  }
}
</style>
