<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-11 16:52:34
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-30 14:05:00
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\polluteWaterRightBar.vue
 * @Description: 污水零直排右侧面版
-->

<template>
  <section class="pollute-water-right-bar">
    <ProjectNums :dataList="projectNumsData" />
    <ProjectTypes :dataList="projectTypesData" />
    <ProjectMoney :dataList="projectMoneyData" />
    <ProjectRanking :dataList="projectRankingData" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { queryPolluteWaterScreenData } from '@/api/mainScreen/mainScreen';

import ProjectNums from './components/polluteWater/projectNums.vue';
import ProjectTypes from './components/polluteWater/projectTypes.vue';
import ProjectMoney from './components/polluteWater/projectMoney.vue';
import ProjectRanking from './components/polluteWater/projectRanking.vue';

const projectNumsData = ref<any>();
const projectTypesData = ref<any>();
const projectMoneyData = ref<any>();
const projectRankingData = ref<any>();
const queryData = async () => {
  const res = await queryPolluteWaterScreenData('');
  const { data } = res;
  const { projectNums, projectTypes, projectMoney, projectRanking } = data;
  projectNumsData.value = projectNums;
  projectTypesData.value = projectTypes;
  projectMoneyData.value = projectMoney;
  projectRankingData.value = projectRanking;
};
queryData();
</script>

<style lang="scss" scoped>
.pollute-water-right-bar {
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
