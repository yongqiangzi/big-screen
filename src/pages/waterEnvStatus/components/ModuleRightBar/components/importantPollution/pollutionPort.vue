<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-30 17:17:17
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-02-01 14:53:18
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\components\importantPollution\pollutionPort.vue
 * @Description:
-->
<template>
  <section class="pollute-port">
    <CommonModuleHeader title="排污口情况"> </CommonModuleHeader>
    <section class="content">
      <section class="row">
        <section class="left">
          <CommonSubHeader title="排污口基本情况" textAlign="left" />
          <section class="list">
            <section class="block">
              <section class="block-half">
                <span class="text">{{ pollutionNums[0]?.text }}</span>
                <span class="value">{{ pollutionNums[0]?.value }}</span>
              </section>
              <section class="block-half">
                <span class="text">{{ pollutionNums[1]?.text }}</span>
                <span class="value">{{ pollutionNums[1]?.value }}</span>
              </section>
            </section>
          </section>
        </section>
        <section class="right">
          <CommonSubHeader title="达标情况" textAlign="left" />
          <section class="chart-container">
            <LightRingChart
              chartID="port-basic-chart"
              :chartValue="dabiaoChartValue"
              size="small"
            />
            <section class="item-list">
              <div class="list-row">
                <div class="row-label">
                  <div class="row-icon icon-proportion"></div>
                  对比比例
                </div>
                <div class="row-value">{{ dabiaoList?.proportion }}</div>
              </div>
              <div class="list-row">
                <div class="row-label">
                  <div class="row-icon icon-goal"></div>
                  目标
                </div>
                <div class="row-value">{{ dabiaoList?.goal }}</div>
              </div>
              <div class="list-row">
                <div class="row-label">
                  <div class="row-icon icon-rate"></div>
                  达标率
                </div>
                <div class="row-value">{{ dabiaoList?.rate }}</div>
              </div>
            </section>
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
import LightRingChart from '@/components/Chart/lightRingChart.vue';

const props = defineProps(['dataList']);
const pollutionNums = computed(() => props.dataList?.portBasic || []);
const dabiaoList = computed(() => props.dataList?.dabiaoList || {});
const dabiaoChartValue = computed(() => props.dataList?.dabiaoChartValue || 0);
</script>

<style lang="scss" scoped>
.pollute-port {
  width: 4.5rem;
  height: 1.8rem;

  .content {
    box-sizing: border-box;
    padding: 0.1rem 0.2rem;

    .row {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .left,
      .right {
        width: calc(50% - 0.1rem);
      }

      .list {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: calc(100% - 0.2rem);
        margin-top: 0.06rem;

        .block {
          display: flex;
          width: 1.98rem;
          height: 0.81rem;
          background: url('@/assets/images/waterEnvScreen/bg_port_list.png') no-repeat center;
          background-size: 100% 100%;

          .block-half {
            display: flex;
            flex-direction: column;
            gap: 6px;
            justify-content: center;
            width: 50%;
            padding: 0 0.1rem;

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

      .chart-container {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: calc(100% - 0.2rem);
        padding-top: 0.1rem;

        .unit {
          position: absolute;
          top: 0.05rem;
          left: 0.2rem;
          font-size: 0.11rem;
          color: rgb(255 255 255 / 85%);
        }

        .unit2 {
          position: absolute;
          top: 0.27rem;
          left: 0;
          font-size: 0.11rem;
          color: rgb(255 255 255 / 85%);
        }
      }

      .item-list {
        // margin-top: 0.09rem;

        .list-row {
          display: flex;
          gap: 6px;
          justify-content: space-between;
          width: 1.25rem;
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
              width: 0.22rem;
              height: 0.26rem;
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
            font-size: 12px;
            font-weight: bold;
            line-height: 13px;
            text-shadow: 0 0 5px rgb(19 149 255 / 48%);
            background: linear-gradient(180deg, #f3faff 0%, #bbe0ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }

      .pollute-water-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
