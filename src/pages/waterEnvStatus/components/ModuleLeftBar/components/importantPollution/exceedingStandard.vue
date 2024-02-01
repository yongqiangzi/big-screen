<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-30 17:08:11
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-31 16:26:31
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\importantPollution\exceedingStandard.vue
 * @Description:
-->
<template>
  <section class="exceeding-standard">
    <CommonModuleHeader title="达标情况"> </CommonModuleHeader>
    <section class="content">
      <CommonSubHeader title="超标情况统计"> </CommonSubHeader>
      <section class="list">
        <section class="list-half list-left">
          <section class="list-item" v-for="(item, index) in list" :key="index">
            <span class="text">{{ item.text }}</span>
            <span class="value">{{ item.value }}</span>
          </section>
        </section>
        <section class="list-half list-right">
          <section class="chart-container">
            <PieChart
              :chartData="pieChartData"
              :chartStyle="chartStyle"
              :containerStyle="containerStyle"
              :legendUlStyle="legendUlStyle"
              chartUnit="个"
              :legendColorStyle="legendColorStyle"
            />
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';
import CommonSubHeader from '@/components/CommonSubHeader/index.vue';
import PieChart from '@/components/Chart/pieChart.vue';

const props = defineProps(['dataList']);

const list = computed(() => props.dataList?.list || []);

const pieChartData = [
  { value: 145, name: 'CODMn' },
  { value: 219, name: 'PH' },
  { value: 64, name: '溶解氧' },
  { value: 251, name: '氨氮' },
  { value: 283, name: '总磷' },
];
const chartStyle = {
  legendTop: '25%',
  emphasisLineHeight: 15,
  colorList: ['#0AF9FF', '#FFBA0A', '#0AFF6C', '#930AFF', '#27B9CC'],
  seriesFontsize: 10,
  seriesLineHeight: 0,
  chartWidth: '1.1rem',
  chartHeight: '1.1rem',
  liPaddingLeft: '0.05rem',
};
const containerStyle = {
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
};
const legendUlStyle = {
  width: '100%',
  display: 'none',
  'justify-content': 'space-evenly',
  'margin-top': '10px',
};
const legendColorStyle = {
  width: '0.06rem',
  height: '0.06rem',
};
</script>

<style lang="scss" scoped>
.exceeding-standard {
  width: 4.5rem;

  .content {
    box-sizing: border-box;
    width: 100%;
    padding: 0.1rem 0.2rem;
    margin: 0 auto;

    .list {
      display: flex;
      gap: 0.1rem;
      padding-top: 0.12rem;

      .list-half {
        width: 49%;
      }

      .list-left {
        display: flex;
        flex-wrap: wrap;
        height: 1.26rem;
        background: url('@/assets/images/waterEnvScreen/bg_upToStandard_list.png') no-repeat center;
        background-size: 100% 100%;

        .list-item {
          display: flex;
          flex-direction: column;
          gap: 0.05rem;
          justify-content: center;
          width: calc(50% - 0.1rem);
          padding-left: 0.1rem;

          .text {
            font-family: Alibaba-PuHuiTi-Regular, sans-serif;
            font-size: 11px;
            font-weight: normal;
            line-height: 11px;
            color: #eef7ff;
          }

          .value {
            font-family: D-DIN-DIN, sans-serif;
            font-size: 15px;
            font-weight: bold;
            line-height: 15px;
            text-shadow: 0 3px 3px rgb(0 0 0 / 25%);
            background: linear-gradient(180deg, #fdfeff 0%, #94cfff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
  }
}
</style>
