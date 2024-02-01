<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-11 16:52:34
 * @LastEditors: PanYunhong
 * @LastEditTime: 2024-01-20 17:42:51
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\waterQualityRightBar.vue
 * @Description: 水质智能研判右侧面版
-->

<template>
  <section class="water-quality-right-bar">
    <StandardWarning :dataList="standardWarningData" />
    <SectionStatistics :dataList="sectionStatisticsData" />
    <OverStandardWarn :dataList="overStandardWarnData" />
    <WaterMonitorWarn :dataList="waterMonitorWarnData" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { queryWaterQualityScreenData } from '@/api/mainScreen/mainScreen';
import {
  StandardWarning,
  SectionStatistics,
  OverStandardWarn,
  WaterMonitorWarn,
} from '@/pages/waterEnvStatus/components/index';

const standardWarningData = ref<any>();
const pollutionIntensityData = ref<any>();
const sectionStatisticsData = ref<any>({
  countyDistribution: [],
  polDistribution: [],
});
const waterMonitorWarnData = ref<any>();
const overStandardWarnData = ref<any>();
const queryData = async () => {
  const res = await queryWaterQualityScreenData('');
  const { data } = res;
  const {
    standardWarning,
    pollutionIntensity,
    sectionStatistics,
    waterMonitorWarn,
    overStandardWarn,
  } = data;
  standardWarningData.value = standardWarning;
  pollutionIntensityData.value = pollutionIntensity;
  sectionStatisticsData.value = sectionStatistics;
  waterMonitorWarnData.value = waterMonitorWarn;
  overStandardWarnData.value = overStandardWarn;
};
queryData();
</script>

<style lang="scss" scoped>
.water-quality-right-bar {
  position: absolute;
  top: 0;
  right: 0;
  width: 4.8rem;
  height: calc(100% - 1.92rem);
  padding: 1.27rem 0.8rem 0.55rem 0;
  pointer-events: all;
  background: rgb(255 255 255 / 0%);
}
</style>
