<!--
 * @Author: wanglei
 * @Date: 2023-12-22 14:37:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-19 13:09:47
 * @FilePath: \src\pages\index\components\ModuleLeftBar\WaterEnvStatus.vue
 * @Descripttion: 水环境状况
-->
<template>
  <section class="water-env-status">
    <CommonModuleHeader title="水环境状况">
      <span class="year">2023年</span>
    </CommonModuleHeader>
    <section class="water-env-status-wrapper">
      <section class="water-env-status-content">
        <section class="water-env-rank">
          <CommonSubHeader title="2023年全省水环境排名:">
            <span class="rank-level"></span>
            <span class="icon-improve"></span>
          </CommonSubHeader>
          <section class="water-env-rank-content">
            <section class="echarts-legend">
              <ul>
                <li v-for="(item, index) of waterEnvRankLegend" :key="index">
                  <span class="color" :style="{ background: item.color }" />
                  <span class="name">{{ item.name }}</span>
                </li>
              </ul>
            </section>
            <section class="echarts-list">
              <section class="echarts-item" v-for="(item, index) in waterDataArr" :key="index">
                <section :id="item.id" class="echarts-item-content"></section>
                <section class="echarts-item-title">{{ item.title }}</section>
              </section>
            </section>
          </section>
        </section>
        <section class="water-quality-compliance">
          <CommonSubHeader title="地表水断面水质优良率情况"> </CommonSubHeader>
          <section id="water-quality-compliance" class="water-quality-compliance-content"></section>
        </section>
        <section class="water-quality-type">
          <CommonSubHeader title="水质类别"> </CommonSubHeader>
          <section class="water-quality-type-content">
            <section class="echarts-legend">
              <ul>
                <li v-for="(item, index) of waterQualityTypeLegend" :key="index">
                  <span class="color" :style="{ background: item.color }" />
                  <span class="name">{{ item.name }}</span>
                </li>
              </ul>
            </section>
            <section class="check-content">
              <section class="check-section">
                <section class="left">
                  <ul>
                    <li>
                      <section>
                        <span class="left-icon" />
                        <span class="left-type-name">国控断面</span>
                      </section>
                      <span class="left-type-number">11</span>
                    </li>
                    <li>
                      <section>
                        <span class="left-icon" />
                        <span class="left-type-name">省控断面</span>
                      </section>
                      <span class="left-type-number">16</span>
                    </li>
                    <li>
                      <section>
                        <span class="left-icon" />
                        <span class="left-type-name">市控断面</span>
                      </section>
                      <span class="left-type-number">67</span>
                    </li>
                  </ul>
                </section>
                <!-- <section id="section-area" class="right"></section> -->
                <PieChat
                  class="right"
                  :chartData="sectionAreaArr"
                  :chartTotal="'考核断面'"
                  :chartText="'94个'"
                  :showLegend="false"
                  :chartUnit="'个'"
                />
              </section>
              <section class="check-branch">
                <section class="left">
                  <ul>
                    <li>
                      <section>
                        <span class="left-icon icon2" />
                        <span class="left-type-name">甬江</span>
                      </section>
                      <span class="left-type-number">78</span>
                    </li>
                    <li>
                      <section>
                        <span class="left-icon icon2" />
                        <span class="left-type-name">奉化江</span>
                      </section>
                      <span class="left-type-number">52</span>
                    </li>
                    <li>
                      <section>
                        <span class="left-icon icon2" />
                        <span class="left-type-name">余姚江</span>
                      </section>
                      <span class="left-type-number">36</span>
                    </li>
                  </ul>
                </section>
                <!-- <section id="tributary" class="right"></section> -->
                <PieChat
                  class="right"
                  :chartData="tributaryArr"
                  :chartTotal="'考核支流'"
                  :chartText="'166个'"
                  :showLegend="false"
                  :chartUnit="'个'"
                />
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import { deepCopy } from '@/utils/index';
import { queryWaterQualityData } from '@/api/mainScreen/mainScreen';
import { CommonModuleHeader, CommonSubHeader } from '../index';
import PieChat from './components/pieChat.vue';

// 地表水断面水质达标情况数据
const upToStandardData = ref<any>({
  dabiao: [],
  weidabiao: [],
  dabiaolv: [],
});

// 颜色列表
const colorList = ['#B5DEC8', '#53A3F1', '#6BDA41', '#FAE44D', '#E78131', '#B5261C', '#D7D7D7'];

const waterEnvRankLegend = [
  {
    color: '#2391FF',
    name: '考核要求',
  },
  {
    color: '#0AF9FF',
    name: '实际现状',
  },
];

const waterQualityTypeLegend = [
  {
    color: '#B5DEC8',
    name: 'Ⅰ类',
  },
  {
    color: '#53A3F1',
    name: 'II类',
  },
  {
    color: '#6BDA41',
    name: 'III类',
  },
  {
    color: '#FAE44D',
    name: 'IV类',
  },
  {
    color: '#E78131',
    name: 'V类',
  },
  {
    color: '#B5261C',
    name: '劣V类',
  },
  {
    color: '#D7D7D7',
    name: '无类别',
  },
];

const waterDataArr = ref([
  {
    title: '地表水监测断面水质优良率',
    id: 'surface',
    color: '#0AF9FF',
    value: [0.909, 0.963],
  },
  {
    title: '三江一级支流水质优良率',
    id: 'sanjiang',
    color: '#0AF9FF',
    value: [0.75, 0.568],
  },
  {
    title: '集中式饮用水源地水质达标率',
    id: 'centralized',
    color: '#0AF9FF',
    value: [1, 1],
  },
  {
    title: '近岸海域水质优良率',
    id: 'nearshore',
    color: '#0AF9FF',
    value: [0.78, 0.762],
  },
]);

// 实际现状、考核要求环状图配置
const optionCircle = {
  series: [
    {
      type: 'liquidFill',
      radius: '100%',
      // 水波
      color: ['#2391FF', '#0AF9FF'],
      data: [0, 0],
      center: ['50%', '50%'],
      label: {
        normal: {
          formatter: '',
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'Alibaba-PuHuiTi-Regular, sans-serif',
          color: '#72D1FB',
        },
      },
      itemStyle: {
        // opacity: 0.7, // 波浪的透明度
        shadowBlur: 0, // 波浪的阴影范围
      },
      emphasis: {
        itemStyle: {
          opacity: 0.8, // 鼠标经过波浪颜色的透明度
        },
      },
      outline: {
        borderDistance: 2,
        itemStyle: {
          borderWidth: 0,
          borderColor: '#ecebea',
          shadowBlur: 2,
        },
      },
      backgroundStyle: {
        color: 'rgba(0,0,0,0.3)',
      },
    },
  ],
};

const option = {
  toolbox: {
    show: false, // 将 show 属性设置为 false 来禁用工具箱（缩放按钮）
  },
  tooltip: {
    show: false, // 将 show 属性设置为 false 来禁用提示框
  },
  legend: {
    top: '5%',
    left: 'center',
    show: false,
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['65%', '100%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 2,
      },
      label: {
        position: 'center',
        show: true,
        // position: 'inside', // 将标签显示在内部
        // formatter: '{d}%', // 显示百分比
        formatter: (params: any) => {
          return `{a|${100 - Math.round(params.percent)}%}{c|/}\n{b|${Math.round(
            params.percent,
          )}%}`;
        },
        rich: {
          // 使用 rich 属性设置不同样式
          a: {
            color: '#2391FF',
            fontSize: 10,
          },
          b: {
            color: '#0AF9FF',
            fontSize: 10,
          },
          c: {
            color: '#FFFFFF',
            fontSize: 10,
          },
        },
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 10,
        },
        scale: false,
        // focus: 'self',//在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: '' },
        { value: 735, name: '' },
      ],
      color: colorList,
    },
  ],
};

const waterDataChart: any = {
  chat0: null,
  chat1: null,
  chat2: null,
  chat3: null,
};

// 考核断面
const sectionAreaArr = ref([
  { value: 4, name: 'Ⅰ类' },
  { value: 21, name: 'Ⅱ类' },
  { value: 60, name: 'Ⅲ类' },
  { value: 7, name: 'Ⅳ类' },
  { value: 2, name: 'Ⅴ类' },
  { value: 0, name: '劣Ⅴ类' },
]);
// 考核支流
const tributaryArr = ref([
  { value: 12, name: 'Ⅰ类' },
  { value: 37, name: 'Ⅱ类' },
  { value: 84, name: 'Ⅲ类' },
  { value: 21, name: 'Ⅳ类' },
  { value: 10, name: 'Ⅴ类' },
  { value: 2, name: '劣Ⅴ类' },
]);

const waterChart: any = {
  sectionArea: null,
  tributary: null,
};

let waterResourceQuantityObj: any = null;

/**
 * echats重绘
 * @returns {void}
 */
const reSize = () => {
  waterDataChart.chat0?.resize();
  waterDataChart.chat1?.resize();
  waterDataChart.chat2?.resize();
  waterDataChart.chat3?.resize();
  // waterChart.sectionArea?.resize();
  // waterChart.tributary?.resize();
  waterResourceQuantityObj?.resize();
};

const emphasisStyle = {
  itemStyle: {
    shadowBlur: 10,
    shadowColor: 'rgba(0,0,0,0.3)',
  },
};
const barOption = {
  legend: {
    data: ['优良断面', '未达优良断面', '优良率'],
    top: -5,
    left: 0,
    textStyle: {
      color: '#E1F2FF',
      fontSize: 10,
    },
    itemWidth: 8,
    itemHeight: 8,
  },
  tooltip: {
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
  yAxis: [
    {
      show: false,
      name: '',
      min: 60,
      max: 100,
      nameTextStyle: {
        color: '#E1F2FF', // 设置纵轴单位文字颜色
        fontSize: 10, // 设置横轴单位文字大小
        align: 'center',
        padding: [0, 25, 0, 0],
      },
      axisLabel: {
        color: '#fff', // 设置纵轴字体颜色
        fontSize: 10, // 设置纵轴字体大小
      },
      splitLine: {
        show: false,
      },
    },
    {
      type: 'value',
      name: '优良率',
      show: false,
      min: 88,
      max: 100,
      interval: 5,
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
  ],
  grid: {
    top: 20,
    right: 0,
    bottom: 20,
    left: 0,
  },
  series: [
    {
      name: '优良断面',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: [],
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
      name: '未达优良断面',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: [],
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
    {
      name: '优良率',
      yAxisIndex: 1,
      type: 'line',
      tooltip: {
        valueFormatter: (value: any) => {
          return `${value}%`;
        },
      },
      smooth: true,
      data: [],
      itemStyle: {
        color: '#008CFF', // 设置颜色
        opacity: 1, // 设置边框颜色
        borderWidth: 22,
      },
      symbolSize: 0, // 设置拐点圆圈的大小
      lineStyle: {
        width: 2,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0,140,255,0.5)' }, // 起始颜色
          { offset: 1, color: 'rgba(0,140,255,0)' }, // 结束颜色，使用透明度为0的颜色表示结束，即完全透明
        ]),
      },
    },
  ],
};

const queryData = async () => {
  const res = await queryWaterQualityData('');
  const { data } = res;
  upToStandardData.value = data?.upToStandardData;
  barOption.series[0].data = upToStandardData.value.dabiao;
  barOption.series[1].data = upToStandardData.value.weidabiao;
  barOption.series[2].data = upToStandardData.value.dabiaolv;
  waterResourceQuantityObj.setOption(barOption);
};
queryData();

onMounted(() => {
  // 2023年全省水环境排名
  waterDataArr.value.forEach((item: any, index: number) => {
    waterDataChart[`chat${index}`] = echarts.init(document.getElementById(item.id));
    const tempOption = deepCopy(optionCircle);

    tempOption.series[0].data = item.value;
    tempOption.series[0].label.normal.formatter = `${item.value[1] * 100}%/\n ${
      item.value[0] * 100
    }%`;
    waterDataChart[`chat${index}`].setOption(tempOption);
  });

  // // 水质类别
  // waterChart.sectionArea = echarts.init(document.getElementById('section-area'));
  // waterChart.tributary = echarts.init(document.getElementById('tributary'));

  // const sectionAreaOption = deepCopy(option);

  // const tributaryOption = deepCopy(option);
  // sectionAreaOption.series[0].data = sectionAreaArr.value;
  // sectionAreaOption.series[0].label.formatter = () => {
  //   return `94个\n考核断面`;
  // };
  // sectionAreaOption.series[0].label.fontSize = 10;
  // sectionAreaOption.series[0].label.color = '#FFFFFF';
  // sectionAreaOption.series[0].color = colorList;
  // waterChart.sectionArea.setOption(sectionAreaOption);

  // tributaryOption.series[0].data = tributaryArr.value;
  // tributaryOption.series[0].label.formatter = () => {
  //   return `166个\n考核支流`;
  // };
  // tributaryOption.series[0].label.fontSize = 10;
  // tributaryOption.series[0].label.color = '#FFFFFF';

  // tributaryOption.series[0].color = colorList;
  // waterChart.tributary.setOption(tributaryOption);

  // 地表水断面水质优良率情况
  waterResourceQuantityObj = echarts.init(document.getElementById('water-quality-compliance'));
  waterResourceQuantityObj.setOption(barOption);
  waterResourceQuantityObj.on('legendselectchanged', (params: any) => {
    const selectList = params.selected;
    if (selectList['未达优良断面'] && !selectList['优良断面']) {
      barOption.yAxis[0].min = 0;
      barOption.yAxis[0].max = 10;
    } else {
      barOption.yAxis[0].min = 60;
      barOption.yAxis[0].max = 100;
    }
    waterResourceQuantityObj.setOption(barOption);
  });

  window.addEventListener('resize', reSize);
});
</script>

<style lang="scss" scoped>
@import '@/styles/common';

.water-env-status {
  display: flex;
  flex-basis: 5.2rem;
  flex-direction: column;

  .common-module-header {
    gap: 0.1rem;
    justify-content: left;
  }

  .year {
    font-family: Alibaba-PuHuiTi-Regular, sans-serif;
    font-size: 0.13rem;
    font-weight: bold;
    line-height: 0.32rem;
    text-shadow: 0 0 10px rgb(0 0 0 / 56%);
    background: linear-gradient(180deg, #baddfc 0%, #fafdff 57%);
    background-clip: text;
  }

  .water-env-status-wrapper {
    padding: 0 0.06rem;

    .water-env-status-content {
      box-sizing: border-box;
      flex-basis: 4.8rem;
      padding: 0.12rem;
      background: linear-gradient(158deg, rgb(78 165 245 / 10%) 0%, rgb(79 167 248 / 0%) 100%);

      .water-env-rank {
        .rank-level {
          width: 0.32rem;
          height: 0.32rem;
          @include backgroud-image('@/assets/images/mainScreen/icon_rank_level1.png');
        }

        .icon-improve {
          width: 0.2rem;
          height: 0.2rem;
          margin-top: 0.1rem;
          @include backgroud-image('@/assets/images/mainScreen/icon_arrow_up.png');
        }

        .water-env-rank-content {
          padding: 0.12rem 0;

          .echarts-list {
            display: flex;
            padding: 0 0.12rem;
            margin-bottom: 0.02rem;
            text-align: center;

            .echarts-item {
              width: 0.72rem;
              margin-right: 0.4rem;

              &:last-child {
                margin-right: 0;
              }

              .echarts-item-content {
                box-sizing: border-box;
                width: 100%;
                height: 0.72rem;
                padding: 0.05rem;
              }

              .echarts-item-title {
                font-size: 0.1rem;
                color: rgb(255 255 255 / 87%);
              }
            }
          }
        }
      }

      .water-quality-compliance {
        .water-quality-compliance-content {
          height: 1.24rem;
          padding: 0.12rem 0;
        }
      }

      .water-quality-type {
        .water-quality-type-content {
          padding-top: 0.12rem;

          .check-content {
            display: flex;
            padding-top: 0.12rem;

            .check-section,
            .check-branch {
              display: flex;
              flex: 1;

              .left {
                width: 1.15rem;
                margin-right: 0.18rem;

                ul {
                  li {
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 0.2rem;
                    padding-left: 0.07rem;
                    margin-bottom: 0.1rem;
                    background: url('@/assets/images/mainScreen/icon_water_quality.png') no-repeat;
                    background-position-y: 0.17rem;

                    section {
                      display: flex;
                      align-items: center;

                      .left-icon {
                        display: inline-block;
                        width: 0.13rem;
                        height: 0.13rem;
                        margin-right: 0.04rem;

                        @include backgroud-image('@/assets/images/mainScreen/icon_house2.png');
                      }

                      .icon2 {
                        @include backgroud-image('@/assets/images/mainScreen/icon_house1.png');
                      }

                      .left-type-name {
                        font-size: 0.11rem;
                        color: #fff;
                      }
                    }

                    .left-type-number {
                      font-size: 0.14rem;
                      font-weight: bold;
                      text-shadow: 0 0 5px rgb(19 149 255 / 48%);
                    }
                  }
                }
              }

              .right {
                width: 0.8rem;
                height: 0.8rem;
              }
            }
          }
        }
      }

      .echarts-legend {
        margin-bottom: 0.05rem;

        ul {
          display: flex;

          li {
            display: flex;
            align-items: center;
            margin-right: 0.12rem;

            .color {
              width: 0.08rem;
              height: 0.08rem;
              margin-right: 0.03rem;
              border-radius: 0.02rem;
            }

            .name {
              font-size: 0.11rem;
              color: #e1f2ff;
            }
          }
        }
      }
    }
  }
}
</style>
