<!--
 * @Author: PanYunhong
 * @Date: 2024-01-09 15:47:41
 * @LastEditors: PanYunhong
 * @LastEditTime: 2024-01-23 10:37:10
 * @description: 配置文档 https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\components\waterEnv\InshoreWater.vue
-->
<template>
  <section class="water-env-status">
    <EnvHeader title="近岸海域水质状况" />
    <section class="water-information-continer">
      <!--水质等级&达标情况-->
      <section class="chart-section">
        <section class="chart-section-left">
          <CommonSubHeader title="水质等级" :textAlign="'center'" />
          <waterLevelChart :chartId="'inshore-water-chart'" :chartData="waterLevelV" />
        </section>
        <section class="chart-section-right">
          <CommonSubHeader title="达标情况" :textAlign="'center'" />
          <section class="radar-chart-box">
            <PieChat
              :chartValue="standardSituationV.current"
              :chartText="standardSituationV"
              :showLegend="false"
              size="big"
            />
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { querySeaWater } from '@/api/waterEnvScreen';
import { CommonSubHeader, EnvHeader } from '../../../index';
import PieChat from './pieChat.vue';
import waterLevelChart from './waterLevelChart.vue';

const standardSituationV = ref({ current: '' });
const waterLevelV = ref();

// 请求数据
const queryData = async () => {
  const res = await querySeaWater();
  const { data } = res;
  const { standardSituation, waterLevel } = data.data;
  standardSituationV.value = standardSituation;
  waterLevelV.value = waterLevel;
};
queryData();
</script>

<style lang="scss" scoped>
@import '@/styles/common';

.water-env-status {
  display: flex;
  flex-basis: 5.2rem;
  flex-direction: column;

  .water-information-continer {
    padding: 0.12rem 0.2rem;

    .chart-section {
      display: flex;
      gap: 0.2rem;
      width: 4.42rem;

      .chart-section-left,
      .chart-section-right {
        position: relative;
        width: calc(50% - 0.1rem);
      }

      .radar-chart-box {
        margin: 0.08rem 0 0 0.55rem;
      }
    }
  }
}
</style>
