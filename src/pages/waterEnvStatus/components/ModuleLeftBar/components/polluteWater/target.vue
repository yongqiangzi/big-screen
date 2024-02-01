<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-17 11:06:43
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-29 15:08:34
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\polluteWater\target.vue
 * @Description:
-->
<template>
  <section class="target">
    <CommonModuleHeader title="2025年管网改造目标">
      <span class="unit-text">市住建局</span>
    </CommonModuleHeader>
    <section class="content">
      <section class="list">
        <section class="list-item" v-for="(item, index) in dataList" :key="index">
          <span class="name">{{ item.name }}</span>
          <section class="progress">
            <a-slider v-model:value="item.value" :min="0" :max="item.target" :step="1" disabled />
          </section>
          <section class="text-block">
            <span class="current-text">当前值{{ item.value }}公里</span>
            <span class="target-text">目标值{{ item.target }}公里</span>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';
import { Slider as ASlider } from 'ant-design-vue';

defineProps(['dataList']);
</script>

<style lang="scss" scoped>
.target {
  width: 4.5rem;
  height: 1.6rem;

  .unit-text {
    margin-right: 0.1rem;
    font-family: Alibaba-PuHuiTi-Regular, sans-serif;
    font-size: 0.12rem;
    font-weight: normal;
    line-height: 24px;
    color: #d7d7d7;
  }

  .content {
    box-sizing: border-box;
    width: 100%;
    height: 1.28rem;
    padding: 0.1rem 0 0 0.15rem;

    .list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.15rem;
      width: 98%;

      .list-item {
        display: flex;
        flex-direction: column;
        width: calc(50% - 0.1rem);

        .name {
          font-family: Alibaba-PuHuiTi-Regular, sans-serif;
          font-size: 12px;
          font-weight: normal;
          line-height: 11px;
          color: #fff;
        }

        .text-block {
          display: flex;
          justify-content: space-between;
          font-family: Alibaba-PuHuiTi-Regular, sans-serif;
          font-size: 0.1rem;
          font-weight: normal;
          line-height: 0.11rem;
          color: #99dee6;
        }
      }
    }
  }

  :deep() {
    .ant-slider {
      margin: 0.03rem 0 0.08rem;
    }

    .ant-slider-disabled {
      cursor: auto;
    }

    .ant-slider.ant-slider-disabled .ant-slider-track {
      height: 0.08rem;
      margin-top: 0.01rem;
      background: linear-gradient(270deg, #3f95ce 0%, #1ee7e7 100%) !important;
      border-radius: 0.05rem;
    }

    .ant-slider.ant-slider-disabled .ant-slider-handle::after {
      display: none;
    }

    .ant-slider.ant-slider-disabled .ant-slider-rail {
      height: 0.1rem;
      background-color: rgb(255 255 255 / 12%) !important;
      border: 1px solid #20efff;
      border-radius: 0.05rem;
    }
  }
}
</style>
