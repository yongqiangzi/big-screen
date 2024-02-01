<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-30 17:25:28
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-02-01 14:08:07
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\importantPollutionRightBar.vue
 * @Description:
-->
<template>
  <section class="important-pollution-left-bar">
    <RiverPortBasic :dataList="riverPortBasicData" />
    <PollutionPort :dataList="pollutePortData" />
    <PolluteWaterDeal :dataList="pollutionWaterDealData" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { queryImportantPollutionScreenData } from '@/api/mainScreen/mainScreen';

import RiverPortBasic from './components/importantPollution/riverPortBasic.vue';
import PollutionPort from './components/importantPollution/pollutionPort.vue';
import PolluteWaterDeal from './components/importantPollution/polluteWaterDeal.vue';

const riverPortBasicData = ref<any>();
const pollutePortData = ref<any>();
const pollutionWaterDealData = ref<any>();
const queryData = async () => {
  const res = await queryImportantPollutionScreenData('');
  const { data } = res;
  const { riverPortBasic, pollutePort, pollutionWaterDeal } = data;
  riverPortBasicData.value = riverPortBasic;
  pollutePortData.value = pollutePort;
  pollutionWaterDealData.value = pollutionWaterDeal;
};
queryData();
</script>

<style lang="scss" scoped>
.important-pollution-left-bar {
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
