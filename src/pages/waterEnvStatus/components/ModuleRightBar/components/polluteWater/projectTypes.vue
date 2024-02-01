<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-29 17:39:24
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-31 11:17:21
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\components\polluteWater\projectTypes.vue
 * @Description:
-->
<template>
  <section class="project-types">
    <CommonModuleHeader title="项目类型"> </CommonModuleHeader>
    <section class="content">
      <PieChart
        :chartData="data1"
        :chartStyle="chartStyle"
        :containerStyle="containerStyle"
        :legendUlStyle="legendUlStyle"
        chartUnit="%"
        :legendColorStyle="legendColorStyle"
      />
      <PieChart
        :chartData="data2"
        :chartStyle="chartStyle2"
        :containerStyle="containerStyle"
        :showLegend="false"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import PieChart from '@/components/Chart/pieChart.vue';

const data1 = [
  { value: 70, name: '正常' },
  { value: 20, name: '预警' },
  { value: 10, name: '滞后' },
];
const data2 = [
  { value: 583, name: '中央库资金专项' },
  { value: 217, name: '省级资金库专项' },
];
const chartStyle = {
  legendTop: '25%',
  emphasisLineHeight: 15,
  colorList: ['#0AFF6C', '#0AF9FF', '#FFBA0A', '#0AFF6C', '#FF530A'],
  seriesFontsize: 10,
  seriesLineHeight: 0,
  chartWidth: '1rem',
  chartHeight: '1rem',
  liPaddingLeft: '0.1rem',
};
const chartStyle2 = {
  legendTop: '25%',
  emphasisLineHeight: 15,
  seriesFontsize: 10,
  seriesLineHeight: 0,
  chartWidth: '1.2rem',
  chartHeight: '1.2rem',
  liPaddingLeft: '0.1rem',
};
const containerStyle = {
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
};
const legendUlStyle = {
  width: '100%',
  display: 'flex',
  'justify-content': 'space-evenly',
  'margin-top': '10px',
};
const legendColorStyle = {
  width: '0.14rem',
  height: '0.07rem',
};
</script>

<style lang="scss" scoped>
.project-types {
  width: 4.5rem;
  height: 1.9rem;

  .content {
    display: flex;
    justify-content: space-between;
    padding-top: 0.15rem;
  }
}
</style>
