<template>
  <section class="water-env-status">
    <EnvHeader title="水源地基本情况" />
    <!--饮用水水质状况-->
    <CommonModuleHeader title="饮用水源地基本情况" />
    <section class="water-information-continer">
      <section class="water-detail-container">
        <!-- <section class="detail-text">
          <section class="last-year">去年同期</section>
          <section class="percent">{{ lastYearSynchronismV }}%</section>
        </section> -->
        <PieChat
          :chartValue="i.value"
          v-for="i in waterTypeV"
          :key="i.key"
          :showLegend="false"
          :name="i.name"
          size="small"
        />
      </section>
      <ul class="water-count-container">
        <li v-for="i in detailsV" :key="i.value">
          <section class="total-water">{{ i.name }}</section>
          <section class="water-count">
            <span class="count-num">{{ i.value }}</span
            ><span>{{ i.unit }}</span>
          </section>
        </li>
      </ul>
    </section>
    <!--饮用水水质状况-->
    <CommonModuleHeader title="饮用水源地水质状况" />
    <section class="water-information-continer">
      <!--水质等级&达标情况-->
      <section class="chart-section">
        <section class="chart-section-left">
          <CommonSubHeader title="水质等级" :textAlign="'center'" />
          <waterLevelChart :chartId="'water-information-chart'" :chartData="waterLevelV" />
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
      <EnvTable :headerData="headerData" :bodyData="bodyData" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { queryFreshWater } from '@/api/waterEnvScreen';
import {
  CommonModuleHeader,
  CommonSubHeader,
  EnvHeader,
  EnvTable,
} from '@/pages/waterEnvStatus/components/index';
import PieChat from './pieChat.vue';
import waterLevelChart from './waterLevelChart.vue';

const lastYearSynchronismV = ref();

const standardSituationV = ref({ current: '' });
const waterTypeV = ref();
const waterLevelV = ref();

interface Header {
  [key: string]: any;
}

const headerData: Header = {
  sort: {
    label: '序号',
    width: '9',
  },
  name: {
    label: '饮用水源地名称',
    width: '30',
  },
  county: {
    label: '责任区县',
    width: '20',
  },
  type: {
    label: '类型',
    width: '15',
  },
  water1: {
    label: '水质类别',
    width: '15',
  },
  average: {
    label: '是否达标',
    width: '15',
  },
};

const bodyData = ref();

const detailsV = ref([
  { value: '0', name: '取水总量', unit: '万吨', key: 'totalWaterIntaking' },
  { value: '0', name: '服务区域', unit: '平方千米', key: 'serviceArea' },
  { value: '0', name: '服务入口', unit: '万人', key: 'servicePeople' },
]);

const totalDataList = ref<any>();
// 请求数据
const queryData = async () => {
  const res = await queryFreshWater();
  const { data } = res;
  const { lastYearSynchronism, standardSituation, waterType, details, waterLevel, waterQuality } =
    data.data;

  lastYearSynchronismV.value = lastYearSynchronism;
  standardSituationV.value = standardSituation;
  waterTypeV.value = waterType;
  detailsV.value = detailsV.value.map((item: any) => ({ ...item, value: details[item.key] }));
  waterLevelV.value = waterLevel;
  totalDataList.value = data;
  bodyData.value = waterQuality;
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
    padding: 0.1rem 0.2rem 0;

    // margin-bottom: 0.15rem;

    .water-detail-container {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 0.25rem;

      .detail-text {
        width: 1.6rem;
        height: 0.87rem;
        background: url('@/assets/images/waterEnvScreen/last_year_bg.png') no-repeat;
        background-size: 100% 100%;

        .last-year {
          position: relative;
          top: 0.23rem;
          left: 0.62rem;
          font-size: 0.105rem;
        }

        .percent {
          position: relative;
          top: 0.34rem;
          left: 0.62rem;
          font-size: 0.18rem;
          font-weight: bold;
          color: #20efff;
        }
      }
    }

    .water-count-container {
      display: flex;
      justify-content: flex-start;
      height: 0.57rem;
      margin-bottom: 0.1rem;
      font-size: 9px;
      background: url('@/assets/images/waterEnvScreen/water_count_bg.png') no-repeat;
      background-size: 100% 100%;

      li {
        width: 1.38rem;
        padding-top: 0.1rem;
        padding-left: 0.12rem;
      }

      .total-water {
        margin-bottom: 0.03rem;
      }

      .water-count {
        .count-num {
          margin-right: 0.03rem;
          font-size: 18px;
          color: #20efff;
        }
      }
    }

    .chart-section {
      display: flex;
      gap: 0.2rem;
      width: 4.42rem;
      margin-bottom: 0.25rem;

      .chart-section-left,
      .chart-section-right {
        position: relative;
        width: calc(50% - 0.1rem);
      }

      .radar-chart-box {
        margin: 0.08rem 0 0 0.6rem;
      }
    }
  }
}
</style>
