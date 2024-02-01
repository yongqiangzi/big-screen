<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-11 16:55:53
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-16 14:08:23
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\waterQuality\warningStatistic.vue
 * @Description:
-->
<template>
  <section class="warning-statistic">
    <CommonModuleHeader title="告警预警统计"> </CommonModuleHeader>
    <section class="content">
      <ul class="list">
        <li class="item" v-for="(item, index) in dataList" :key="index">
          <div
            class="icon"
            :style="{
              background: `url(${require(item.icon)}) no-repeat center center`,
              backgroundSize: 'contain',
            }"
          ></div>
          <div class="value">{{ item.value }}</div>
          <div class="text" v-html="item.text"></div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import require from '@/utils/require';
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';

defineProps(['dataList']);
</script>

<style lang="scss" scoped>
.warning-statistic {
  box-sizing: border-box;
  width: 4.5rem;
  height: 1.82rem;

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
    display: flex;
    gap: 0.3rem;
    justify-content: center;
    width: 98%;
    padding: 0 0.09rem;
    margin: 0.09rem auto;
    background: linear-gradient(158deg, rgb(78 165 245 / 10%) 0%, rgb(79 167 248 / 0%) 100%);

    .list {
      display: flex;
      gap: 0.24rem;
      margin: 0.12rem 0;

      .item {
        display: flex;
        flex-direction: column;
        gap: 0.14rem;
        align-items: center;
        width: 0.86rem;
        height: 1.28rem;
        background: url('@/assets/images/waterEnvScreen/bg_warning_statistic_item.png') no-repeat
          center;
        background-size: 100% 100%;

        .icon {
          width: 0.36rem;
          height: 0.36rem;
        }

        .value {
          /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
          font-family: D-DIN-DIN;
          font-size: 0.18rem;
          font-weight: bold;
          line-height: 0.15rem;
          background: linear-gradient(180deg, #f4fff3 0%, #f3a100 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .text {
          width: 0.46rem;
          height: 0.21rem;
          font-family: Alibaba-PuHuiTi-Regular, sans-serif;
          font-size: 0.09rem;
          font-weight: 500;
          line-height: 0.11rem;
          color: rgb(255 255 255 / 87%);
          text-align: center;
          -webkit-background-clip: text;
        }
      }
    }
  }
}
</style>
