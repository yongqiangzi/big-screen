<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-11 16:55:53
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-23 11:29:18
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\waterQuality\excessiveWarning.vue
 * @Description:
-->
<template>
  <section class="excessive-warning">
    <CommonModuleHeader title="地表水环境三级三色预警">
      <span class="year">2023年12月</span>
    </CommonModuleHeader>
    <section class="content">
      <ul class="warning-statis-list">
        <li v-for="i in detailsV" :key="i.value">
          <section class="warning-type">
            <div :class="['warning-icon', `icon-${i.level}`]"></div>
            <span :class="['warning-text', `text-${i.level}`]">{{ i.name }}</span>
          </section>
          <section class="warning-count">
            <span class="count-num">{{ i.value }}</span>
            <span class="unit">{{ i.unit }}</span>
          </section>
        </li>
      </ul>
      <div ref="warningRef" @mouseenter="clear" @mouseleave="autoScroll">
        <ul class="list">
          <li class="item" v-for="(item, index) in copyDataList" :key="index">
            <div class="index">
              {{ index + 1 > dataList.length ? index + 1 - dataList.length : index + 1 }}
            </div>
            <div class="name">{{ item.name }}</div>
            <div class="level">{{ item.level }}</div>
            <div class="type">
              <div class="type-icon"></div>
              <span class="gray-text"> 指标：</span>
              <span class="light-text pollute">{{ item.type }} </span>
            </div>
            <div class="time">
              <div class="time-icon"></div>
              <span class="gray-text">时间：</span>
              <span class="light-text">{{ item.time }}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';

const props = defineProps(['dataList']);
const copyDataList = ref<any>([]);
watch(
  () => props.dataList,
  (list: any) => {
    if (list) {
      copyDataList.value = [...list];
    }
  },
);

const detailsV = [
  { value: '7', name: '一级预警', unit: '个', level: 'level1' },
  { value: '3', name: '二级预警', unit: '个', level: 'level2' },
  { value: '0', name: '三级预警', unit: '个', level: 'level3' },
];

const warningRef = ref<any>();
const flag = ref<boolean>(false);
// 计时器
let interval: any = null;
const tbodyHeight = ref<number>(40);

/**
 * 计时器自动滚动
 * @return {void}
 */
const autoScroll = (): void => {
  if (warningRef.value) {
    interval = setInterval(() => {
      const tbody = warningRef.value.querySelector('.list');
      const tr = warningRef.value.querySelector('.item');

      if (tbody && tr) {
        const { scrollTop, scrollHeight } = tbody;
        const { offsetHeight: trHeight } = tr;

        // 数据条数没有铺满时不轮播
        if (
          copyDataList.value &&
          copyDataList.value.length < Math.floor(tbodyHeight.value / trHeight)
        ) {
          clearInterval(interval);
          interval = null;

          return;
        }
        if (!flag.value && copyDataList.value) {
          copyDataList.value.push(...copyDataList.value);
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
  autoScroll();
});

onUnmounted(() => {
  clear();
});
</script>

<style lang="scss" scoped>
.excessive-warning {
  box-sizing: border-box;
  width: 4.5rem;
  height: 3.3rem;
  margin-top: 0.24rem;

  .header {
    position: relative;
    display: flex;
    width: 4.8rem;
    height: 0.32rem;
    background: url('@/assets/images/mainScreen/bg_module_title.png');
    background-size: cover;
  }

  .content {
    position: relative;
    box-sizing: border-box;

    // display: flex;
    gap: 0.3rem;
    justify-content: center;
    width: 98%;
    padding: 0 0.09rem;
    margin: 0 auto;
    margin-top: 0.09rem;

    // background: linear-gradient(158deg, rgb(78 165 245 / 10%) 0%, rgb(79 167 248 / 0%) 100%);

    .warning-statis-list {
      display: flex;
      justify-content: flex-start;
      height: 0.66rem;
      margin-bottom: 0.1rem;
      font-size: 9px;
      background: url('@/assets/images/waterEnvScreen/water_count_bg.png') no-repeat;
      background-size: 100% 100%;

      li {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 5px;
        justify-content: center;
        width: 1.38rem;

        &:not(:first-child) {
          padding-left: 0.3rem;
        }
      }

      .warning-type {
        display: flex;
        gap: 3px;
        align-items: center;
        margin-bottom: 0.03rem;

        .warning-icon {
          width: 0.15rem;
          height: 0.15rem;
        }

        .icon-level1 {
          background: url('@/assets/images/waterEnvScreen/icon_warning_level1.png') no-repeat center;
          background-size: 100% 100%;
        }

        .icon-level2 {
          background: url('@/assets/images/waterEnvScreen/icon_warning_level2.png') no-repeat center;
          background-size: 100% 100%;
        }

        .icon-level3 {
          background: url('@/assets/images/waterEnvScreen/icon_warning_level3.png') no-repeat center;
          background-size: 100% 100%;
        }

        .warning-text {
          font-family: Alibaba-PuHuiTi-Regular, sans-serif;
          font-size: 0.14rem;
          font-weight: normal;
          line-height: 0.14rem;
        }

        .text-level1 {
          color: #e90808;
        }

        .text-level2 {
          color: #ff6b00;
        }

        .text-level3 {
          color: #faff00;
        }
      }

      .warning-count {
        .count-num {
          margin-right: 0.03rem;
          font-family: D-DIN-DIN, sans-serif;
          font-size: 24px;
          font-weight: bold;
          line-height: 20px;
          color: #fff;
          text-shadow: 0 4px 4px rgb(0 0 0 / 25%);
        }

        .unit {
          font-family: 'PingFang SC', sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 14px;
          color: #7a8b96;
        }
      }
    }

    .list {
      // display: flex;
      // flex-direction: column;
      // gap: 0.02rem;
      height: 2rem;
      overflow-y: hidden;

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4.14rem;
        height: 0.36rem;
        margin-bottom: 0.04rem;
        background: url('@/assets/images/waterEnvScreen/bg_water_quality_row.png');
        background-size: cover;

        .index {
          width: 0.15rem;
          height: 0.17rem;
          margin-right: 0.06rem;
          font-size: 0.12rem;
          line-height: 0.16rem;
          text-align: center;
          background: url('@/assets/images/waterEnvScreen/bg_warning_statistic_index.png');
          background-size: cover;
        }

        .name {
          width: 0.58rem;
          margin-right: 0.09rem;
          font-family: 'PingFang SC', sans-serif;
          font-size: 0.14rem;
          font-weight: 500;
          line-height: 0.14rem;
          background: linear-gradient(180deg, #e2ffff 0%, #13fefe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .level {
          width: 0.32rem;
          height: 0.13rem;
          margin-right: 0.15rem;
          font-family: 'PingFang SC', sans-serif;
          font-size: 0.1rem;
          line-height: 0.13rem;
          color: #f5f5f5;
          text-align: center;
          background: linear-gradient(270deg, rgb(255 140 0 / 48%) 0%, rgb(251 138 0 / 12%) 100%);
          border: 0 solid #f29c33;
          border-radius: 0.02rem;
          box-shadow: 0 0 0.06rem 0 rgb(0 0 0 / 32%);
          opacity: 1;
        }

        .type {
          display: flex;
          align-items: center;
          margin-right: 0.15rem;
        }

        .time {
          display: flex;
          align-items: center;
        }

        .gray-text {
          margin-left: 0.02rem;
          font-family: 'PingFang SC', sans-serif;
          font-size: 0.11rem;
          font-weight: 400;

          // line-height: 0.12rem;
          color: rgb(255 255 255 / 30%);
          background: linear-gradient(180deg, #f3f9ff 0%, #bbdeff 100%);
          -webkit-background-clip: text;
        }

        .light-text {
          // height: 0.15rem;
          font-family: 'PingFang SC', sans-serif;
          font-size: 0.11rem;
          font-weight: 600;

          // line-height: 0.12rem;
          color: #fff;
          -webkit-background-clip: text;
        }

        .pollute {
          width: 0.4rem;
        }

        .type-icon,
        .time-icon {
          width: 0.16rem;
          height: 0.16rem;
        }

        .type-icon {
          background: url('@/assets/images/waterEnvScreen/bg_water_quality_zhibiao.png');
          background-size: cover;
        }

        .time-icon {
          background: url('@/assets/images/waterEnvScreen/bg_water_quality_time.png');
          background-size: cover;
        }
      }
    }
  }

  .year {
    margin-right: 0.15rem;
    font-family: Alibaba-PuHuiTi-Regular, sans-serif;
    font-size: 0.13rem;
    font-weight: normal;
    line-height: 0.34rem;
    text-shadow: 0 0 10px rgb(0 0 0 / 56%);
  }
}
</style>
