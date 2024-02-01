<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-29 17:39:24
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-30 09:53:50
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\components\polluteWater\projectNums.vue
 * @Description:
-->
<template>
  <section class="project-nums">
    <CommonModuleHeader title="项目数量"> </CommonModuleHeader>
    <section class="content">
      <BarChart
        chartId="project-num-chart"
        :xAxisData="xAxisData"
        :pieChartData="chartData"
        :chartStyle="{ width: '4rem', height: '1.3rem' }"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import BarChart from '@/components/Chart/barChart.vue';

const xAxisData = [
  '海曙区',
  '江北区',
  '北仑区',
  '镇海区',
  '鄞州区',
  '奉化区',
  '象山县',
  '宁海县',
  '余姚市',
  '慈溪市',
];
const chartData = [86, 121, 115, 49, 36, 73, 97, 61, 84, 78];
</script>

<style lang="scss" scoped>
.project-nums {
  width: 4.5rem;
  height: 1.6rem;

  .content {
    transform: translate(20px, -10px);
  }
}
</style>
