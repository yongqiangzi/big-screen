<!--
 * @Author: PanYunhong
 * @Date: 2024-01-20 15:31:21
 * @LastEditors: PanYunhong
 * @LastEditTime: 2024-01-22 17:05:00
 * @description: 配置文档 https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\components\waterQuality\OverStandardWarn.vue
-->
<template>
  <section class="pollution-intensity">
    <CommonModuleHeader title="水质自动站超标预警统计">
      <span class="sub-title">2023年</span>
    </CommonModuleHeader>
    <section class="chart-container">
      <section class="unit">次</section>
      <waterQualityTrend :waterTrendChartData="dataList" />
    </section>
  </section>
</template>

<script setup lang="ts">
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';
import waterQualityTrend from './waterQualityTrend.vue';

defineProps(['dataList']);
</script>

<style lang="scss" scoped>
.pollution-intensity {
  box-sizing: border-box;
  width: 4.5rem;
  margin-bottom: 0.15rem;

  // height: 3.51rem;

  .header {
    position: relative;
    display: flex;
    width: 4.8rem;
    height: 0.32rem;
    background: url('@/assets/images/mainScreen/bg_module_title.png');
    background-size: cover;
  }

  .chart-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 1.6rem;
    padding-top: 0.25rem;

    .unit {
      position: absolute;
      top: 0.05rem;
      left: 0.2rem;
      font-size: 0.13rem;
      color: #fff;
      opacity: 0.85;
    }
  }

  .sub-title {
    position: relative;
    right: 0.15rem;
    font-family: 'Alibaba PuHuiTi', sans-serif;
    font-size: 0.14rem;
    line-height: 0.3rem;
  }
}
</style>
