<!--
 * @Author: wanglei
 * @Date: 2023-12-22 14:37:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-05 15:49:56
 * @FilePath: \src\pages\index\components\ModuleLeftBar\WaterResource.vue
 * @Descripttion: 水资源格局
-->
<template>
  <section class="water-resource">
    <CommonModuleHeader title="水资源格局">
      <span class="year">2023年</span>
    </CommonModuleHeader>

    <section class="water-resource-wrapper">
      <section class="water-resource-content">
        <section class="water-resource-content1">
          <section class="water-resource-diversion">
            <CommonSubHeader title="生态引调水"></CommonSubHeader>
            <section class="water-resource-diversion-content">
              <section class="top">
                <section class="water-regulation">
                  <section class="title">
                    <section class="title-icon" />
                    <section class="title-name">生态调水量</section>
                  </section>
                  <section class="value">
                    <span class="num">6</span>
                    <span class="unit">亿m³</span>
                  </section>
                </section>
                <section class="water-utilization">
                  <section class="title">
                    <section class="title-icon icon2" />
                    <section class="title-name">再生水利用率</section>
                  </section>
                  <section class="value">
                    <span class="num">21.7</span>
                    <span class="unit">%</span>
                  </section>
                </section>
              </section>
              <section class="bottom">
                <section class="river-channel-water-utilization">
                  <section class="title">
                    <section class="title-icon icon3" />
                    <section class="title-name">河道补水的再生水利用量</section>
                  </section>
                  <section class="value">
                    <span class="num">1.8</span>
                    <span class="unit">亿m³</span>
                  </section>
                </section>
              </section>
            </section>
          </section>
          <section class="water-resource-quantity">
            <CommonSubHeader title="近6年水资源量"> </CommonSubHeader>
            <section id="water-resource-quantity" class="water-resource-quantity-content"></section>
          </section>
        </section>
        <section class="water-resource-development">
          <CommonSubHeader title="水资源开发利用"> </CommonSubHeader>
          <section class="water-resource-development-content">
            <section class="water-resource-type">
              <ul>
                <li
                  v-for="(item, index) of waterResourceType"
                  :key="index"
                  :class="item.isActive ? 'active' : ''"
                  @click="handleClickUseType(index)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </section>
            <section
              class="water-resource-type-content"
              v-if="chartDataList.length"
              @mouseenter="clear"
              @mouseleave="autoChangeType"
            >
              <Carousel ref="CarouselRef" :dots="false">
                <section v-for="(item, index) in chartDataList" :key="index">
                  <section class="carousel-item">
                    <PieChat
                      :chartData="item.chartData"
                      :chartTotal="`${item.chartTotal}亿m³`"
                      :chartText="item.chartText"
                      @stopAutoScroll="stopAutoScroll"
                      :chartUnit="'亿m³'"
                    />
                    <PieChat
                      :chartData="
                        chartDataList[index + 1]?.chartData
                          ? chartDataList[index + 1]?.chartData
                          : chartDataList[0]?.chartData
                      "
                      :chartTotal="
                        chartDataList[index + 1]?.chartTotal
                          ? chartDataList[index + 1]?.chartTotal + '亿m³'
                          : chartDataList[0]?.chartTotal
                      "
                      :chartText="
                        chartDataList[index + 1]?.chartText
                          ? chartDataList[index + 1]?.chartText
                          : chartDataList[0]?.chartText
                      "
                      @stopAutoScroll="stopAutoScroll"
                      :chartUnit="'亿m³'"
                    />
                  </section>
                </section>
              </Carousel>
            </section>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Carousel } from 'ant-design-vue';
import * as echarts from 'echarts';
import { queryWaterResourceData } from '@/api/mainScreen/mainScreen';
import { CommonModuleHeader, CommonSubHeader } from '../index';
import PieChat from './components/pieChat.vue';

const waterResourceType = ref<any>([
  { name: '供水量', isActive: true },
  { name: '用水量' },
  { name: '耗水量' },
  { name: '节水量' },
  { name: '污水处理量' },
]);
const waterChart: any = {
  waterConservation: null,
  sewage: null,
};
let waterResourceQuantityObj: any = null;

const CarouselRef = ref();

// 水资源开发利用数据
const waterResourceUseData = ref<any>();
const chartDataList = ref<any>([]);

const queryData = async () => {
  const res = await queryWaterResourceData('');
  const { data } = res;
  waterResourceUseData.value = data;
  // 图表数据构造
  for (const key of Object.keys(data)) {
    const list = data[key][0];
    chartDataList.value.push({
      chartData: list.data,
      chartTotal: list.total.toString(),
      chartText: key,
    });
  }
};
queryData();

/**
 * echats重绘
 * @returns {void}
 */
const reSize = () => {
  waterChart.waterConservation?.resize();
  waterChart.sewage?.resize();
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
    data: ['地表水资源', '地下水资源'],
    top: -5,
    right: 0,
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
    data: ['2017', '2018', '2019', '2020', '2021', '2022'],
    name: 'X Axis',
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
    name: '亿m³',
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
      show: false, // 设置刻度线不显示
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
      name: '地表水资源',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: [74.76, 66.6, 119.52, 75.87, 146.96, 89.07],
      itemStyle: {
        // color: '#B46016', // 设置柱状图颜色
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
      name: '地下水资源',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: [2.1, 2.12, 2.7, 4.81, 6.69, 5.13],
      itemStyle: {
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

let interval: any = null;
const activeIndex = ref<number>(0);

// 自动轮播年份切换数据
const autoChangeType = () => {
  if (interval) return;
  interval = setInterval(() => {
    if (activeIndex.value === waterResourceType.value.length - 1) {
      activeIndex.value = 0;
    } else {
      activeIndex.value += 1;
    }
    CarouselRef.value.next();
    waterResourceType.value.forEach((item: any, index: number) => {
      // eslint-disable-next-line no-param-reassign
      item.isActive = index === activeIndex.value;
    });
  }, 3000);
};

const clear = () => {
  clearInterval(interval);
  interval = null;
};

const stopAutoScroll = (isStop: boolean) => {
  if (isStop) {
    clear();
  } else {
    autoChangeType();
  }
};

const handleClickUseType = (typeIndex: number) => {
  activeIndex.value = typeIndex;
  waterResourceType.value.forEach((item: any, index: number) => {
    // eslint-disable-next-line no-param-reassign
    item.isActive = index === typeIndex;
  });
  stopAutoScroll(true);
  CarouselRef.value.goTo(typeIndex);
  setTimeout(() => {
    autoChangeType();
  }, 1000);
};

onMounted(() => {
  autoChangeType();
  // 近6年水资源量
  waterResourceQuantityObj = echarts.init(document.getElementById('water-resource-quantity'));
  waterResourceQuantityObj.setOption(barOption);

  window.addEventListener('resize', reSize);
});

onUnmounted(() => {
  clear();
});
</script>

<style lang="scss" scoped>
@import '@/styles/common';

.water-resource {
  display: flex;
  flex-basis: 3.6rem;
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

  .water-resource-wrapper {
    padding: 0 0.06rem;

    .water-resource-content {
      flex-basis: 3.3rem;
      padding: 0.13rem;
      padding-bottom: 0;
      background: linear-gradient(158deg, rgb(78 165 245 / 10%) 0%, rgb(79 167 248 / 0%) 100%);

      .water-resource-content1 {
        display: flex;
        padding-bottom: 0.12rem;

        .water-resource-diversion {
          flex: 1;
          margin-right: 0.2rem;

          .water-resource-diversion-content {
            height: 1.2rem;
            margin-top: 0.1rem;

            @include backgroud-image('@/assets/images/mainScreen/bg_water_resource_diversion.png');

            .top {
              display: flex;

              .water-regulation,
              .water-utilization {
                flex: 1;
              }
            }

            .water-regulation,
            .water-utilization,
            .river-channel-water-utilization {
              box-sizing: border-box;
              height: 0.6rem;
              padding-top: 0.12rem;
              padding-left: 0.12rem;

              .title {
                display: flex;
                align-items: center;

                .title-icon {
                  width: 0.16rem;
                  height: 0.18rem;
                  margin-right: 0.02rem;

                  @include backgroud-image('@/assets/images/mainScreen/icon_water1.png');
                }

                .icon2 {
                  @include backgroud-image('@/assets/images/mainScreen/icon_water2.png');
                }

                .icon3 {
                  @include backgroud-image('@/assets/images/mainScreen/icon_water3.png');
                }

                .title-name {
                  margin-bottom: 0.02rem;
                  font-size: 0.11rem;
                  color: #eef7ff;
                }
              }

              .value {
                .num {
                  margin-right: 0.02rem;
                  font-size: 0.16rem;
                  font-weight: bold;
                  line-height: 0.16rem;
                  text-shadow: 0 3px 3px rgb(0 0 0 / 45%);
                  background: linear-gradient(180deg, #fdfeff 0%, #94cfff 100%);
                  background-clip: text;
                  -webkit-text-fill-color: transparent;
                }

                .unit {
                  font-size: 0.1rem;
                  color: rgb(255 255 255 / 85%);
                }
              }
            }
          }
        }

        .water-resource-quantity {
          flex: 1;

          .water-resource-quantity-content {
            height: 1.2rem;
            margin-top: 0.1rem;
          }
        }
      }

      .water-resource-development {
        .water-resource-development-content {
          height: 1.2rem;
          padding-top: 0.12rem;

          .water-resource-type {
            margin-bottom: 0.15rem;

            ul {
              display: flex;

              li {
                width: 0.65rem;
                height: 0.23rem;
                margin-right: 0.07rem;
                font-size: 0.11rem;
                line-height: 0.22rem;
                color: #fff;
                text-align: center;
                cursor: pointer;

                @include backgroud-image(
                  '@/assets/images/mainScreen/bg_waterResource_title_bg.png'
                );

                &:last-child {
                  margin-right: 0;
                }

                &:hover {
                  @include backgroud-image(
                    '@/assets/images/mainScreen/bg_waterResource_title_bg_hover.png'
                  );
                }

                &.active {
                  @include backgroud-image(
                    '@/assets/images/mainScreen/bg_waterResource_title_bg_active.png'
                  );
                }
              }
            }
          }

          .water-resource-type-content {
            display: flex;

            .save-water,
            .waster-water {
              display: flex;
              flex: 1;

              .left {
                width: 0.8rem;
                height: 0.8rem;
              }

              .right {
                flex: 1;

                ul {
                  li {
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    height: 0.2rem;
                    padding-left: 0.07rem;
                    margin-bottom: 0.1rem;

                    // background: url('@/assets/images/mainScreen/');

                    .left-type-color {
                      display: inline-block;
                      width: 0.14rem;
                      height: 0.07rem;
                      margin-right: 0.04rem;
                      border-radius: 0.02rem;
                    }

                    .left-type-name {
                      font-size: 0.11rem;
                      color: #fff;
                    }
                  }
                }
              }
            }

            :deep(.ant-carousel) {
              height: 100%;
              overflow: hidden;

              .slick-slide {
                text-align: center;

                div {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            .carousel-item {
              box-sizing: border-box;
              display: flex !important;
              justify-content: space-between;
              margin: 0 auto;

              .item-detail {
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 0.04rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
