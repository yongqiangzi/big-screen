<!--
 * @Author: PanYunhong
 * @Date: 2024-01-12 10:54:25
 * @LastEditors: PanYunhong
 * @LastEditTime: 2024-01-20 14:37:18
 * @description: 配置文档 https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\components\waterEnv\waterLevelChart.vue
-->
<template>
  <section class="ring-chart-box">
    <RingChart3D class="top" :dataList="chartData" :opacity="1" :depth="2" :id="chartId" />
    <RingChart3D
      class="bottom"
      :id="`${chartId}-bak`"
      :dataList="chartData"
      :opacity="0.6"
      :depth="15"
    />
    <div class="chart-bg"></div>
  </section>
</template>

<script setup lang="ts">
import RingChart3D from './ringChart3D.vue';

defineProps(['chartId', 'chartData']);
</script>

<style lang="scss" scoped>
.ring-chart-box {
  position: relative;
  left: -0.3rem;
  margin: 0.05rem 0 0 0.5rem;

  .top {
    position: absolute;
    top: 0;
    left: -0.4rem;
  }

  .bottom {
    position: absolute;
    top: 0;
    left: -0.4rem;
  }

  .chart-bg {
    position: absolute;
    top: 0.2rem;
    left: 0.22rem;
    z-index: -1;
    width: 1.3rem;
    height: 0.8rem;
    background: url('@/assets/images/waterEnvScreen/bg_3D_chart.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
