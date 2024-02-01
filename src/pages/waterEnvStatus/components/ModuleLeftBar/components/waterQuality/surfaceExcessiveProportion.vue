<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-11 16:55:53
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-22 14:36:08
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\waterQuality\surfaceExcessiveProportion.vue
 * @Description:
-->
<template>
  <section class="surface-excessive-proportion">
    <CommonModuleHeader title="断面超标指标占比分布情况">
      <span class="year">2023年12月</span>
    </CommonModuleHeader>
    <section class="content">
      <RingChart3D
        :dataList="dataList"
        :legendList="legendList"
        :chartStyle="chartStyle"
        :showDataLabels="true"
        :chartMargin="[-20, 0, 0, 50]"
        :bgStyle="bgStyle"
        :colorList="colorList"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';
import RingChart3D from '@/components/Chart/ringChart3D.vue';

defineProps(['dataList']);
const legendList = [
  {
    name: '总磷',
    type: 'lin',
  },
  {
    name: '氨氮',
    type: 'andan',
  },
  {
    name: 'CODMn',
    type: 'codm',
  },
  {
    name: '溶解氧',
    type: 'yang',
  },
  {
    name: 'PH',
    type: 'ph',
  },
  {
    name: '总氮',
    type: 'dan',
  },
];
const chartStyle = {
  width: '2.9rem',
  height: '1.94rem',
};
const bgStyle = {
  bottom: '0.43rem',
  left: '1.03rem',
  width: '2rem',
  height: '1rem',
};
const colorList = ['#564af1', '#5ac3ff', '#3cd495', '#48e5e5', '#2b8ef3', '#27B9CC'];
</script>

<style lang="scss" scoped>
.surface-excessive-proportion {
  box-sizing: border-box;
  width: 4.5rem;
  height: 2.31rem;

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
    width: 4.38rem;
    padding: 0 0.09rem;
    margin: 0 auto;
    margin-top: 0.09rem;
    background: linear-gradient(158deg, rgb(78 165 245 / 10%) 0%, rgb(79 167 248 / 0%) 100%);
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
