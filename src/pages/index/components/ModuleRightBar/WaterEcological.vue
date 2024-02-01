<!--
 * @Author: wanglei
 * @Date: 2023-12-22 14:43:52
 * @LastEditors: PanYunhong
 * @LastEditTime: 2024-01-11 15:51:29
 * @FilePath: \src\pages\index\components\ModuleRightBar\WaterEcological.vue
 * @Descripttion:
-->
<template>
  <section class="water-ecological-restoration">
    <CommonModuleHeader title="水生态修复">
      <div class="more-btn">
        <Select class="region-select" v-model:value="selectYear" :align="'left'">
          <template #suffixIcon><CaretDownOutlined class="ant-select-suffix" /></template>
          <Option v-for="item in YearOption" :key="item" :value="item">
            {{ item }}
          </Option>
        </Select>
        <span class="goal-year">/2025目标</span>
      </div>
    </CommonModuleHeader>
    <div class="content" @mouseenter="clear" @mouseleave="autoChangeYear">
      <!--美丽河湖-->
      <div class="beautiful-lake">
        <CommonSubHeader title="美丽河湖"> </CommonSubHeader>
        <div class="content-main">
          <div class="main-part part-left">
            <div class="part-top">
              <div class="part-icon left-icon"></div>
              <div class="part-text">数量</div>
            </div>
            <div class="part-content">
              <span class="value">{{ lakeData.lakes }}</span>
              <span class="goals">{{ `/${lakeData.lakeGoals}` }}</span>
              <span class="unit">个(条)</span>
            </div>
          </div>
          <div class="main-part part-center">
            <div class="part-top">
              <div class="part-icon center-icon"></div>
              <div class="part-text">片区数量</div>
            </div>
            <div class="part-content">
              <span class="value">{{ lakeData.pianqu }}</span>
              <span class="goals">{{ `/${lakeData.pianquGoals}` }}</span>
              <span class="unit">个</span>
            </div>
          </div>
          <div class="main-part part-right">
            <div class="part-top">
              <div class="part-icon right-icon"></div>
              <div class="part-text">河道总长度</div>
            </div>
            <div class="part-content">
              <span class="value">{{ lakeData.length }}</span>
              <span class="unit">km</span>
            </div>
          </div>
        </div>
      </div>
      <!--美丽海湾-->
      <div class="beautiful-sea">
        <CommonSubHeader title="美丽海湾"> </CommonSubHeader>
        <div class="content-main">
          <div class="main-part part-left">
            <div class="part-top">
              <div class="part-icon left-icon"></div>
              <div class="part-text">数量</div>
            </div>
            <div class="part-content">
              <span class="value">{{ seaData.seas }}</span>
              <span class="goals">{{ `/${seaData.seaGoals}` }}</span>
              <span class="unit">个</span>
            </div>
          </div>
          <div class="main-part part-center">
            <div class="part-top">
              <div class="part-icon right-icon"></div>
              <div class="part-text">海岸线整治修复长度</div>
            </div>
            <div class="part-content">
              <span class="value">{{ seaData.coastlineLength }}</span>
              <span class="unit">km</span>
            </div>
          </div>
          <div class="main-part part-right">
            <div class="part-top">
              <div class="part-icon right-icon"></div>
              <div class="part-text">大陆自然岸线保有长度</div>
            </div>
            <div class="part-content">
              <span class="value">{{ seaData.mainlandCoastlineLength }}</span>
              <span class="goals">{{ `/${seaData.mainlandCoastlineGoals}` }}</span>
              <span class="unit">km</span>
            </div>
          </div>
        </div>
      </div>
      <!--水生生物分类&河湖健康评价-->
      <div class="chart-section">
        <div class="chart-section-left">
          <CommonSubHeader title="水生生物分类"> </CommonSubHeader>
          <div class="ring-chart-box">
            <RingChart3D :dataList="classificationData" />
          </div>
        </div>
        <div class="chart-section-right">
          <CommonSubHeader title="河湖健康评价"> </CommonSubHeader>
          <div class="radar-chart-box">
            <RadarChart :dataList="healthData" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Select } from 'ant-design-vue';
import { CaretDownOutlined } from '@ant-design/icons-vue';
import { queryWaterEclogicaData } from '@/api/mainScreen/mainScreen';
import { CommonModuleHeader, CommonSubHeader } from '../index';
import RingChart3D from './components/ringChart3D.vue';
import RadarChart from './components/radarChart.vue';

const { Option } = Select;

// 年份选择值tsconfig.app.json
const selectYear = ref<string>('2022');
// 年份选项数据
const YearOption = ref<any>(['2019', '2020', '2021', '2022']);
const lakeData = ref<any>({});
const seaData = ref<any>({});
const classificationData = ref<any>([]);
const healthData = ref<any>([]);

// 处理赋值数据
const dealData = (data: any) => {
  lakeData.value = data.lakeData[selectYear.value];
  seaData.value = data.seaData[selectYear.value];
  classificationData.value = data.classificationData[selectYear.value].list;
  healthData.value = data.healthData[selectYear.value].list;
};

const totalDataList = ref<any>();
// 请求数据
const queryData = async () => {
  const res = await queryWaterEclogicaData('');
  const { data } = res;
  totalDataList.value = data;
  dealData(data);
};
queryData();

let interval: any = null;
const yearIndex = ref<number>(0);

// 自动轮播年份切换数据
const autoChangeYear = () => {
  if (interval) return;
  interval = setInterval(() => {
    selectYear.value = YearOption.value[yearIndex.value];
    dealData(totalDataList.value);
    if (yearIndex.value === YearOption.value.length - 1) {
      yearIndex.value = 0;
    } else {
      yearIndex.value += 1;
    }
  }, 3000);
};

const clear = () => {
  clearInterval(interval);
  interval = null;
};

watch(
  () => selectYear.value,
  (year: string) => {
    dealData(totalDataList.value);
  },
);

onMounted(() => {
  autoChangeYear();
});

onUnmounted(() => {
  clear();
});
</script>

<style lang="scss" scoped>
.water-ecological-restoration {
  box-sizing: border-box;
  width: 4.8rem;
  height: 3.9rem;

  .header {
    position: relative;
    display: flex;
    width: 4.8rem;
    height: 0.32rem;
    background: url('@/assets/images/mainScreen/bg_module_title.png');
    background-size: cover;

    .title-text {
      position: absolute;
      margin-left: 0.35rem;
      font-family: Source-KeynoteartHans, sans-serif;
      font-size: 0.19rem;
      font-style: italic;
      font-weight: 400;
      line-height: 0.26rem;
      color: #fff;
      text-shadow: 0 0 10px rgb(0 0 0 / 56%);
    }

    .more-btn {
      position: absolute;
      right: 0.05rem;
      display: flex;
      gap: 0.05rem;
      align-items: center;
      height: 0.24rem;
      padding: 0 0.02rem;
      margin-right: 0.21rem;
      line-height: 0.24rem;
      color: #fff;
      text-align: center;
      cursor: pointer;

      .anticon-right {
        color: #04a9ff;
      }
    }
  }

  .goal-year {
    margin: 0 0.2rem 0 0.03rem;
    font-family: Alibaba-PuHuiTi-Regular, sans-serif;
    font-size: 0.13rem;
    font-weight: bold;
    line-height: 0.32rem;
    text-shadow: 0 0 10px rgb(0 0 0 / 56%);
    background: linear-gradient(180deg, #baddfc 0%, #fafdff 57%);
    background-clip: text;
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    justify-content: center;
    width: 92%;
    padding: 0.1rem 0.13rem 0;
    margin: 0 auto;
    background: linear-gradient(158deg, rgb(78 165 245 / 20%) 0%, rgb(79 167 248 / 0%) 100%);

    .beautiful-lake,
    .beautiful-sea,
    .chart-section {
      width: 4.42rem;
    }

    .chart-section {
      display: flex;
      gap: 0.2rem;

      .chart-section-left,
      .chart-section-right {
        position: relative;
        width: calc(50% - 0.1rem);
      }

      .ring-chart-box {
        margin: -0.15rem 0 0 0.5rem;
      }

      .radar-chart-box {
        margin: -0.15rem 0 0 0.15rem;
      }
    }

    .header-text {
      position: absolute;
      bottom: 0.03rem;
      font-family: Source-KeynoteartHans, sans-serif;
      font-size: 0.16rem;
      font-style: italic;
      font-weight: 400;
      line-height: 0.16rem;
      color: #fff;
      text-shadow: 0 0 10px rgb(0 194 255 / 56%);
    }

    .content-main {
      display: flex;
      margin-top: 0.05rem;
      background: url('@/assets/images/mainScreen/bg_lake_sea.png') no-repeat;
      background-size: 100% 100%;

      .main-part {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 0.06rem;
        width: 33%;
        width: 1.47rem;
        height: 0.53rem;
        padding: 0.06rem 0 0.1rem;
        padding-left: 0.13rem;

        .part-top {
          display: flex;
          gap: 0.03rem;
          align-items: center;

          .part-icon {
            width: 0.15rem;
            height: 0.15rem;
          }

          .left-icon {
            background: url('@/assets/images/mainScreen/icon-number.png');
          }

          .center-icon {
            background: url('@/assets/images/mainScreen/icon-pianqu-number.png');
          }

          .right-icon {
            background: url('@/assets/images/mainScreen/icon-river-length.png');
          }

          .part-text {
            font-family: Alibaba-PuHuiTi-Regular, sans-serif;
            font-size: 0.11rem;
            font-weight: 400;
            line-height: 0.11rem;
            color: #eef7ff;
          }
        }

        .part-content {
          /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
          font-family: D-DIN-DIN;
          font-size: 0.19rem;
          font-weight: bold;
          line-height: 0.19rem;

          .value {
            margin-right: 0.02rem;
            color: #2391ff;
            text-shadow: 0 3px 3px rgb(0 0 0 / 25%);
          }

          .goals {
            margin-right: 0.02rem;
            color: #20efff;
            text-shadow: 0 3px 3px rgb(0 0 0 / 25%);
          }

          .unit {
            /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
            font-family: 'PingFang SC';
            font-size: 0.1rem;
            font-weight: 400;
            line-height: 0.1rem;
            color: #7a8b96;
          }
        }
      }
    }
  }

  :deep() {
    .ant-select {
      transform: translateY(-2px);
    }

    .ant-select-selector {
      width: 0.75rem;
      height: 0.19rem;
      color: #b4c0cc;
      background: #20303e;
      border: 1px solid rgb(82 138 250 / 50%);
      border-radius: 2px;
      opacity: 1;
    }

    .ant-select-selection-item {
      font-size: 0.11rem;
      line-height: 0.17rem;
      color: #b4c0cc;
    }

    .ant-select-arrow {
      font-size: 0.1rem;
      color: #b4c0cc;
      user-select: all !important;
    }
  }
}
</style>
<style lang="scss">
.ant-select-dropdown {
  background: #195085;
}

.ant-select-item-option-selected {
  background-color: rgb(78 165 245) !important;
}

.ant-select-item-option {
  color: #b4c0cc !important;
}
</style>
