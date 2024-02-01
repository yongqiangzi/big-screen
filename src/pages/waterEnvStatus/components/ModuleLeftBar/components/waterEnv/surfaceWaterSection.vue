<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-09 15:58:57
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-20 14:32:15
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\waterEnv\surfaceWaterSection.vue
 * @Description:
-->
<template>
  <section class="surface-water-section">
    <CommonModuleHeader :title="title"> </CommonModuleHeader>
    <section class="content">
      <section class="left-list">
        <CommonSubHeader :title="label"></CommonSubHeader>
        <section class="item-bg"></section>
        <section class="item-list">
          <div class="list-row">
            <div class="row-label">
              <div class="row-icon icon-proportion"></div>
              对比比例
            </div>
            <div class="row-value">{{ dataList.proportion }}</div>
          </div>
          <div class="list-row">
            <div class="row-label">
              <div class="row-icon icon-goal"></div>
              目标
            </div>
            <div class="row-value">{{ dataList.goal }}</div>
          </div>
          <div class="list-row">
            <div class="row-label">
              <div class="row-icon icon-rate"></div>
              {{ sectionType === '1' ? '达标率' : '优良率' }}
            </div>
            <div class="row-value">{{ dataList.rate }}</div>
          </div>
        </section>
      </section>
      <section class="right-chart">
        <CommonSubHeader
          :title="sectionType === '1' ? '区县达标率统计' : '区县优良率统计'"
          style="justify-content: left"
        ></CommonSubHeader>
        <BarChart
          :chartId="sectionType === '1' ? 'dabiao-chart' : 'youliang-chart'"
          :seriesName="sectionType === '1' ? '区县达标率' : '区县优良率'"
          :xAxisData="xAxisData"
          :pieChartData="chartData"
        />
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';
import CommonSubHeader from '@/components/CommonSubHeader/index.vue';
import BarChart from './barChart.vue';

defineProps(['title', 'label', 'dataList', 'chartData', 'sectionType']);

const xAxisData = ['海曙', '江北', '北仑', '镇海', '鄞州', '奉化', '象山', '宁海', '余姚', '慈溪'];
</script>

<style lang="scss" scoped>
.surface-water-section {
  box-sizing: border-box;
  width: 4.5rem;
  height: 1.7rem;
  margin-top: 0.1rem;

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
  }

  .content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    gap: 0.1rem;
    justify-content: space-between;
    width: 98%;
    height: 1.38rem;
    padding: 0 0.09rem;
    margin: 0 auto;
    margin-top: 0.02rem;

    // background: linear-gradient(158deg, rgb(78 165 245 / 10%) 0%, rgb(79 167 248 / 0%) 100%);

    .left-list {
      width: 30%;
    }

    .item-bg {
      width: 0.42rem;
      height: 0.4rem;
      margin: 0 auto;
      margin-top: 0.06rem;
      background: url('@/assets/images/waterEnvScreen/bg_data_item.png');
      background-size: cover;
    }

    .item-list {
      // margin-top: 0.09rem;

      .list-row {
        display: flex;
        justify-content: space-between;
        height: 0.2rem;
        margin-bottom: 0.05rem;
        background: url('@/assets/images/mainScreen/icon_water_quality.png') no-repeat;
        background-position-y: 0.13rem;

        .row-label {
          display: flex;
          align-items: center;
          font-family: Alibaba-PuHuiTi-Regular, sans-serif;
          font-size: 10px;
          font-weight: 500;
          line-height: 10px;
          color: #fff;
          -webkit-background-clip: text;
          transform: translateY(-3px);

          // -webkit-text-fill-color: transparent;

          .row-icon {
            width: 0.28rem;
            height: 0.28rem;
          }

          .icon-proportion {
            background: url('@/assets/images/waterEnvScreen/bg_proportion.png');
          }

          .icon-goal {
            background: url('@/assets/images/waterEnvScreen/bg_goal.png');
          }

          .icon-rate {
            background: url('@/assets/images/waterEnvScreen/bg_rate.png');
          }
        }

        .row-value {
          /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
          font-family: D-DIN-DIN;
          font-size: 13px;
          font-weight: bold;
          line-height: 13px;
          text-shadow: 0 0 5px rgb(19 149 255 / 48%);
          background: linear-gradient(180deg, #f3faff 0%, #bbe0ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }

  .btn {
    width: 0.45rem;
    height: 0.2rem;
    margin: 0.05rem 0.2rem 0 0;
    cursor: pointer;
    background: url('@/assets/images/mainScreen/bg_btn_more.png');
  }

  .common-sub-header {
    justify-content: center;
  }
}
</style>
