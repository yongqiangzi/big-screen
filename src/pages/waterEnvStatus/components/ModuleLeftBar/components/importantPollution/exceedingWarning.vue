<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-30 17:08:37
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-31 16:34:11
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\importantPollution\exceedingWarning.vue
 * @Description:
-->
<template>
  <section class="exceeding-warning">
    <CommonModuleHeader title="各区县市超标预警情况"> </CommonModuleHeader>
    <section class="content">
      <span class="unit">单位:次</span>
      <BarChart
        chartId="project-num-chart"
        :xAxisData="xAxisData"
        :pieChartData="chartData"
        :chartStyle="{ width: '4rem', height: '2.02rem' }"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';
import BarChart from '@/components/Chart/barChart.vue';
import { computed } from 'vue';

const props = defineProps(['dataList']);

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
const chartData = computed(() => props.dataList || []);
</script>

<style lang="scss" scoped>
.exceeding-warning {
  width: 4.5rem;
  height: 2.34rem;

  .content {
    position: relative;
    box-sizing: border-box;
    padding: 0.1rem 0.2rem;

    .unit {
      position: absolute;
      top: 0.08rem;
      left: 0.18rem;
      font-size: 0.11rem;
      color: rgb(255 255 255 / 85%);
    }
  }
}
</style>
