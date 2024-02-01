<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-30 16:49:34
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-31 09:41:14
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\importantPollutionLeftBar.vue
 * @Description:
-->
<template>
  <section class="important-pollution-left-bar">
    <Basic :dataList="pollutionBasicData" />
    <UpToStandard :dataList="exceedingStandardData" />
    <UpToStandardWarning :dataList="exceedingWarningData" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { queryImportantPollutionScreenData } from '@/api/mainScreen/mainScreen';

import Basic from './components/importantPollution/basic.vue';
import UpToStandard from './components/importantPollution/exceedingStandard.vue';
import UpToStandardWarning from './components/importantPollution/exceedingWarning.vue';

const pollutionBasicData = ref<any>();
const exceedingStandardData = ref<any>();
const exceedingWarningData = ref<any>();
const queryData = async () => {
  const res = await queryImportantPollutionScreenData('');
  const { data } = res;
  const { pollutionBasic, ExceedingStandard, ExceedingWarning } = data;
  pollutionBasicData.value = pollutionBasic;
  exceedingStandardData.value = ExceedingStandard;
  exceedingWarningData.value = ExceedingWarning;
};
queryData();
</script>

<style lang="scss" scoped>
.important-pollution-left-bar {
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
