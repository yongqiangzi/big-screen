<!--
 * @Author: wanglei
 * @Date: 2023-12-22 14:37:35
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2023-12-28 17:47:14
 * @FilePath: \src\pages\index\components\ModuleRightBar\WaterEvents.vue
 * @Descripttion: 水时间联动
-->
<template>
  <section class="water-events" ref="waterEventRef">
    <CommonModuleHeader title="水事件联动">
      <span class="year">{{ currentYear }}</span>
    </CommonModuleHeader>
    <section class="content">
      <section class="event-statistic">
        <div class="statistic-item" v-for="(value, key) in statisticData" :key="value">
          <div :class="['icon', `icon-${key}`]"></div>
          <div class="item-content">
            <span class="num">{{ value }}</span>
            <span class="text">{{ statusList[key] }}</span>
          </div>
        </div>
      </section>
      <section
        class="list-container"
        ref="waterEventList"
        @mouseenter="clear"
        @mouseleave="autoScroll"
      >
        <section class="list-body" v-if="dataSource && dataSource.length">
          <div class="list-row" v-for="item in dataSource" :key="item[0]">
            <img class="detail-img" :src="getImage(item.imageUrl)" alt="" />
            <div class="right-content">
              <div class="content-top">
                <span class="title">{{ item.title }}</span>
                <div :class="['status', `status-${item.status}`]">
                  {{ statusList[item.status] }}
                </div>
              </div>
              <div class="content-center">
                <span class="content-text">{{ item.content }}</span>
              </div>
              <div class="divider"></div>
              <div class="content-footer">
                <span class="address">
                  <div class="address-icon"></div>
                  {{ item.address }}
                </span>
                <span class="time">
                  <div class="time-icon"></div>
                  {{ dayjs().format('YYYY-MM-DD HH:mm') }}
                </span>
              </div>
            </div>
          </div>
        </section>
        <Spin v-else-if="dataSource === undefined" />
        <section v-else class="no-data">暂无数据</section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import dayjs from 'dayjs';
import { Spin } from 'ant-design-vue';
import { queryWaterEventData } from '@/api/mainScreen/mainScreen';
import { CommonModuleHeader } from '../index';

const props = defineProps(['currentYear']);

const waterEventRef = ref<any>();
const waterEventList = ref<any>();
const flag = ref<boolean>(false);
const statusList: any = {
  total: '事件总数',
  undo: '未处理',
  doing: '处理中',
  complete: '已完成',
};
// 数据
const dataSource = ref<any[] | undefined>(undefined);
const statisticData = ref<any>({});
// 获取列表数据
const getListData = async () => {
  const res = await queryWaterEventData('');
  const { data } = res;
  const { total, undo, doing, complete } = data.data['2022'];
  statisticData.value = { total, undo, doing, complete };
  dataSource.value = data.data['2022']?.list ?? [];
};
getListData();

const getImage = (url: string) => {
  return new URL(`../../../../assets/images/mainScreen/${url}`, import.meta.url).href;
};

// 计时器
let interval: any = null;
const tbodyHeight = ref<number>(180);

/**
 * 根据组件高度计算tbody高度
 * @return {void}
 */
const resize = (): void => {
  tbodyHeight.value = waterEventRef.value.offsetHeight - 88.2;
};
/**
 * 计时器自动滚动
 * @return {void}
 */
const autoScroll = (): void => {
  if (waterEventList.value) {
    interval = setInterval(() => {
      const tbody = waterEventList.value.querySelector('.list-body');
      const tr = waterEventList.value.querySelector('.list-row');

      if (tbody && tr) {
        const { scrollTop, scrollHeight } = tbody;
        const { offsetHeight: trHeight } = tr;

        // 数据条数没有铺满时不轮播
        if (
          dataSource.value &&
          dataSource.value.length < Math.floor(tbodyHeight.value / trHeight)
        ) {
          clearInterval(interval);
          interval = null;

          return;
        }
        if (!flag.value && dataSource.value) {
          dataSource.value.push(...dataSource.value);
          flag.value = true;
        }

        // 滚动到最上面
        if (scrollTop >= scrollHeight / 2) {
          tbody.scrollTo({
            top: 0,
          });

          return;
        }

        tbody.scrollTo({
          // top: scrollTop + trHeight,
          top: scrollTop + 2,
          behavior: 'smooth',
        });
      }
    }, 50);
  }
};

/**
 * 清除计时器
 * @return {void}
 */
const clear = (): void => {
  clearInterval(interval);
  interval = null;
};

onMounted(() => {
  window.addEventListener('resize', resize);
  resize();
  autoScroll();
});

onUnmounted(() => {
  clear();
  window.removeEventListener('resize', resize);
});
</script>

<style lang="scss" scoped>
.water-events {
  box-sizing: border-box;
  width: 4.8rem;
  height: 2.24rem;

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

    .more-btn {
      position: absolute;
      right: 0.05rem;
      display: flex;
      gap: 0.05rem;
      align-items: center;
      height: 0.24rem;
      padding: 0 0.02rem;
      margin-right: 0.21rem;
      line-height: 0.24rem;
      color: #fff;
      text-align: center;
      cursor: pointer;

      .anticon-right {
        color: #04a9ff;
      }

      .goal-year {
        font-family: Alibaba-PuHuiTi-Regular, sans-serif;
        font-size: 0.13rem;
        font-weight: 500;
        line-height: 0/16rem;
        text-shadow: 0 0 10px rgb(0 0 0 / 56%);
      }
    }
  }

  .content {
    position: relative;
    width: 93%;

    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    height: 100%;
    padding: 0 0.1rem;
    margin: 0 auto;
    overflow-y: hidden;
    background: linear-gradient(158deg, rgb(78 165 245 / 20%) 0%, rgb(79 167 248 / 0%) 100%);

    .event-statistic {
      display: flex;
      justify-content: space-around;

      .statistic-item {
        display: flex;
        gap: 0.08rem;
        align-items: center;
        width: 1.05rem;
        height: 0.42rem;
        padding-left: 0.1rem;
        background: url('@/assets/images/mainScreen/icon_statistic.png') no-repeat;
        background-size: 100% 100%;

        .icon {
          width: 0.29rem;
          height: 0.29rem;
        }

        .icon-total {
          background: url('@/assets/images/mainScreen/icon_total.png') no-repeat;
          background-size: 100% 100%;
        }

        .icon-undo {
          background: url('@/assets/images/mainScreen/icon_undo.png') no-repeat;
          background-size: 100% 100%;
        }

        .icon-doing {
          background: url('@/assets/images/mainScreen/icon_doing.png') no-repeat;
          background-size: 100% 100%;
        }

        .icon-complete {
          background: url('@/assets/images/mainScreen/icon_complete.png') no-repeat;
          background-size: 100% 100%;
        }

        .item-content {
          display: flex;
          flex-direction: column;
          gap: 0.02rem;

          .num {
            /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
            font-family: D-DIN-DIN;
            font-size: 0.14rem;
            font-weight: bold;
            line-height: 0.14rem;
            color: #f3a100;
          }

          .text {
            font-family: Alibaba-PuHuiTi-Regular, sans-serif;
            font-size: 0.1rem;
            font-weight: 500;
            line-height: 0.1rem;
            color: rgb(255 255 255 / 87%);
          }
        }
      }
    }

    .list-container {
      position: relative;
      height: 100%;
      margin-top: 0.1rem;
      font-size: 0.16rem;
      color: #cdddf1;

      .t-head {
        display: grid;
        grid-template-columns: 23% 12% 13% 13% 13% 13% 13%;
        height: 0.4rem;
        line-height: 0.2rem;
        background: rgb(40 126 255 / 30%);
        background-size: 100% 100%;

        li {
          box-sizing: border-box;
          height: 100%;
          padding-top: 0.04rem;
          padding-bottom: 0.02rem;
          line-height: 0.34rem;
          text-align: center;

          .unit {
            font-size: 0.12rem;
          }
        }
      }

      .list-body {
        height: 95%;
        overflow: hidden scroll;

        .list-row {
          display: flex;
          gap: 0.1rem;
          align-items: center;
          width: 4.32rem;
          height: 0.99rem;
          margin-bottom: 0.1rem;
          background: url('@/assets/images/mainScreen/bg_water_event_list.png') no-repeat;
          background-size: 100% 100%;

          .detail-img {
            width: 1.15rem;
            height: 0.8rem;
          }

          .right-content {
            display: flex;
            flex-direction: column;
            gap: 0.04rem;

            .content-top,
            .content-footer {
              display: flex;
              justify-content: space-between;
            }

            .content-center {
              font-family: Alibaba-PuHuiTi-Regular, sans-serif;
              font-size: 0.11rem;
              font-weight: 400;
              line-height: 0.16rem;
              color: #fff;
              opacity: 0.6;

              .content-text {
                display: -webkit-box;
                height: 0.3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                word-wrap: break-word;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }

            .divider {
              margin: 0.02rem 0;
              border-bottom: 1px solid rgb(255 255 255 / 20%);
            }

            .title {
              font-family: Alibaba-PuHuiTi-Regular, sans-serif;
              font-size: 0.11rem;
              font-weight: bold;
              line-height: 0.16rem;
              color: #fff;
              text-shadow: 0 3px 3px rgb(0 0 0 / 25%);
            }

            .status {
              width: 0.42rem;
              height: 0.13rem;
              font-size: 0.1rem;
              line-height: 0.13rem;
              text-align: center;
              border-radius: 2px;
              opacity: 1;
            }

            .status-complete {
              color: #0aff6c;
              border: 1px solid #0aff6c;
            }

            .status-doing {
              color: #0af9ff;
              border: 1px solid #0af9ff;
            }

            .status-undo {
              color: #ff7a00;
              border: 1px solid #ff7a00;
            }

            .address,
            .time {
              display: flex;
              gap: 0.02rem;
              align-items: center;
              font-family: Alibaba-PuHuiTi-Regular, sans-serif;
              font-size: 0.1rem;
              font-weight: 400;
              line-height: 0.13rem;
              color: #707070;
            }

            .address-icon,
            .time-icon {
              width: 0.13rem;
              height: 0.13rem;
            }

            .address-icon {
              background: url('@/assets/images/mainScreen/icon_address.png') no-repeat;
            }

            .time-icon {
              background: url('@/assets/images/mainScreen/icon_time.png') no-repeat;
            }
          }
        }
      }

      .no-data {
        padding-top: 0.8rem;
        text-align: center;
      }
    }
  }

  .year {
    margin-right: 0.2rem;
    font-family: Alibaba-PuHuiTi-Regular, sans-serif;
    font-size: 0.13rem;
    font-weight: bold;
    line-height: 0.32rem;
    text-shadow: 0 0 10px rgb(0 0 0 / 56%);
    background: linear-gradient(180deg, #baddfc 0%, #fafdff 57%);
    background-clip: text;
  }
}
</style>
