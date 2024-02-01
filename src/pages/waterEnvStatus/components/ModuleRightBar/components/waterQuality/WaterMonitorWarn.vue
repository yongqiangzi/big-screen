<!--
 * @Author: PanYunhong
 * @Date: 2024-01-20 15:32:02
 * @LastEditors: PanYunhong
 * @LastEditTime: 2024-01-22 16:44:04
 * @description: 配置文档 https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\components\waterQuality\WaterMonitorWarn.vue
-->
<template>
  <section class="water-monitor-warn">
    <CommonModuleHeader title="水质自动站监测预警"> </CommonModuleHeader>
    <section class="chart-container">
      <RingChart3D
        :dataList="dataList"
        :legendList="legendList"
        :chartStyle="chartStyle"
        :showDataLabels="false"
        :chartMargin="[-20, 0, 0, 50]"
        :bgStyle="bgStyle"
        :colorList="colorList"
        :chartId="'water-moniter-ring-chart'"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';
import RingChart3D from './ringChart3D.vue';

defineProps(['dataList']);

const chartStyle = {
  width: '3rem',
  height: '2rem',
};
const legendList = [
  {
    name: '一般预警 \u00a0 28个 \u00a0 21%',
    type: 'common',
  },
  {
    name: '关注提醒 \u00a0 44个 \u00a0 33%',
    type: 'special',
  },
  {
    name: '重点预警 \u00a0 62个 \u00a0 46%',
    type: 'focus',
  },
];
const bgStyle = {
  bottom: '0.43rem',
  left: '0.4rem',
  width: '2rem',
  height: '1rem',
};
const colorList = ['#564af1', '#5ac3ff', '#3cd495', '#48e5e5', '#2b8ef3'];
</script>

<style lang="scss" scoped>
.water-monitor-warn {
  box-sizing: border-box;
  width: 4.5rem;

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

    // box-sizing: border-box;
    // display: flex;
    // gap: 0.3rem;
    // justify-content: center;
    // width: 98%;

    // padding: 0 0.09rem;
    // margin: 0 auto;
    margin-top: 0.09rem;

    // background: linear-gradient(158deg, rgb(78 165 245 / 10%) 0%, rgb(79 167 248 / 0%) 100%);
  }
}
</style>
