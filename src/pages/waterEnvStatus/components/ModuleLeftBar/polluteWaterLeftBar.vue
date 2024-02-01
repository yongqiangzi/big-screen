<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-11 16:52:34
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-25 17:48:03
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\polluteWaterLeftBar.vue
 * @Description: 污水零直排左侧面版
-->

<template>
  <section class="pollute-water-left-bar">
    <PaiShuiHu :dataList="paiShuiHuData" />
    <ParkConstruction :dataList="parkConstructionData" />
    <Target :dataList="targetData" />
    <Task :dataList="taskData" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { queryPolluteWaterScreenData } from '@/api/mainScreen/mainScreen';

import PaiShuiHu from './components/polluteWater/paiShuiHu.vue';
import ParkConstruction from './components/polluteWater/parkConstruction.vue';
import Target from './components/polluteWater/target.vue';
import Task from './components/polluteWater/task.vue';

const paiShuiHuData = ref<any>();
const parkConstructionData = ref<any>();
const targetData = ref<any>();
const taskData = ref<any>();
const queryData = async () => {
  const res = await queryPolluteWaterScreenData('');
  const { data } = res;
  const { paiShuiHu, parkConstruction, target, task } = data;
  paiShuiHuData.value = paiShuiHu;
  parkConstructionData.value = parkConstruction;
  targetData.value = target;
  taskData.value = task;
};
queryData();
</script>

<style lang="scss" scoped>
.pollute-water-left-bar {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  // width: 5.6rem;
  height: 100%;
  padding: 1.27rem 0 0.55rem 0.95rem;
  overflow: auto;
  pointer-events: all;
}
</style>
