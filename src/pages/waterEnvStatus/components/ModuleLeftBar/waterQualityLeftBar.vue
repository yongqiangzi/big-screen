<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-11 16:52:34
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-22 10:39:50
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\waterQualityLeftBar.vue
 * @Description: 水质智能研判左侧面版
-->

<template>
  <section class="water-quality-left-bar">
    <ExcessiveWarning :dataList="excessiveWarningData" />
    <SurfaceExcessiveProportion :dataList="surfaceExcessiveProportionData" />
    <section>
      <CommonModuleHeader title="汛期污染强度">
        <span class="year">2023年</span>
      </CommonModuleHeader>
      <EnvTable :headerData="headerData" :bodyData="polluteData" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { queryWaterQualityScreenData } from '@/api/mainScreen/mainScreen';
import { EnvTable } from '@/pages/waterEnvStatus/components/index';
import ExcessiveWarning from './components/waterQuality/excessiveWarning.vue';
import SurfaceExcessiveProportion from './components/waterQuality/surfaceExcessiveProportion.vue';

interface Header {
  [key: string]: any;
}
const excessiveWarningData = ref<any>();
const surfaceExcessiveProportionData = ref<any>();
const headerData: Header = {
  sort: {
    label: '序号',
    width: '9',
  },
  name: {
    label: '断面名称',
    width: '18',
  },
  location: {
    label: '所在水体',
    width: '16',
  },
  county: {
    label: '责任区县（市）',
    width: '22',
  },
  qiangdu: {
    label: '汛期污染强度',
    width: '20',
  },
  pollution: {
    label: '首要污染物',
    width: '18',
  },
};

const polluteData = ref<any>([]);
const queryData = async () => {
  const res = await queryWaterQualityScreenData('');
  const { data } = res;
  const { excessiveWarning, surfaceExcessiveProportion, pollutionIntensity } = data;
  excessiveWarningData.value = excessiveWarning;
  polluteData.value = pollutionIntensity;
  surfaceExcessiveProportionData.value = surfaceExcessiveProportion;
};
queryData();
</script>

<style lang="scss" scoped>
.water-quality-left-bar {
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
