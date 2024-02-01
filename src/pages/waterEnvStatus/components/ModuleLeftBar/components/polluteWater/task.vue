<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-17 11:06:43
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-29 17:24:26
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\polluteWater\task.vue
 * @Description:
-->
<template>
  <section class="task">
    <CommonModuleHeader title="重点任务"> </CommonModuleHeader>
    <section class="content">
      <section class="normal-task">
        <section class="common-title title-block">
          <span><span class="blue">正常</span>{{ normalTask.taskName }}</span>
          <span>{{ normalTask.taskUnit }}</span>
        </section>
        <section class="list-text">
          <span class="gray-text">
            当前值
            <span class="light-text">{{ `${normalList?.currentPercentage}%` }}</span>
          </span>
          <span class="gray-text">
            年度目标值
            <span class="light-text">{{ `${normalList?.currentTarget}%` }}</span>
          </span>
          <span class="text">
            2025目标值
            {{ `${normalList?.targetPercentage}%/${normalList?.targetValue}个` }}</span
          >
        </section>
        <section class="progress">
          <a-slider
            v-model:value="normalList.currentPercentage"
            :min="0"
            :max="normalList?.currentTarget"
            :step="1"
            disabled
          />
        </section>
      </section>
      <section class="late-task">
        <section class="common-title title-block">
          <span><span class="red">滞后</span>{{ lateTask.taskName }}</span>
          <span>{{ lateTask.taskUnit }}</span>
        </section>
        <section class="list-block">
          <section class="list-item" v-for="(item, index) in lateList" :key="index">
            <section class="item-left">{{ item.name }}</section>
            <section class="item-right">
              <section class="item-right-top">
                <span class="gray-text">
                  当前值
                  <span class="light-text">{{ `${item.currentPercentage}%` }}</span>
                </span>
                <span class="gray-text">
                  {{ item.year }}年度目标值
                  <span class="light-text">{{ `${item.currentTarget}%` }}</span>
                </span>
              </section>
              <section class="item-right-bottom">
                <a-slider
                  v-model:value="item.currentPercentage"
                  :min="0"
                  :max="item.currentTarget"
                  :step="1"
                  disabled
                />
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';
import { Slider as ASlider } from 'ant-design-vue';

const props = defineProps(['dataList']);

const normalTask = ref<any>({});
const normalList = ref<any>([]);
const lateTask = ref<any>({});
const lateList = ref<any>([]);
watch(
  () => props.dataList,
  (list: any) => {
    if (list) {
      normalTask.value = list.normalTask;
      lateTask.value = list.lateTask;
      normalList.value = list.normalTask.taskList;
      lateList.value = list.lateTask.taskList;
    }
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss" scoped>
.task {
  width: 4.5rem;
  height: 100%;

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding: 0.1rem 0 0 0.1rem;

    .common-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 4.31rem;
      height: 0.15rem;

      span {
        display: flex;
        align-items: center;
        font-family: Alibaba-PuHuiTi-Regular, sans-serif;
        font-size: 12px;
        font-weight: normal;
        line-height: 12px;
        color: #e1f2ff;
      }

      .blue,
      .red {
        display: inline-block;
        width: 0.32rem;
        height: 0.12rem;
        margin-right: 0.03rem;
        font-size: 0.09rem;
        text-align: center;
      }

      .blue {
        background-color: #23c343;
      }

      .red {
        background-color: #c32323;
      }
    }

    .list-text {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 4.31rem;
      margin-top: 0.1rem;
    }

    .gray-text {
      font-family: Alibaba-PuHuiTi-Regular, sans-serif;
      font-size: 0.11rem;
      font-weight: normal;
      line-height: 0.11rem;
      color: #7a8b96;
    }

    .light-text {
      font-family: D-DIN-DIN, sans-serif;
      font-size: 0.15rem;
      font-weight: bold;
      line-height: 0.15rem;
      text-shadow: 0 3px 3px rgb(0 0 0 / 25%);
      background: linear-gradient(180deg, #fdfeff 0%, #94cfff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .text {
      font-family: Alibaba-PuHuiTi-Regular, sans-serif;
      font-size: 0.11rem;
      font-weight: normal;
      line-height: 0.11rem;
      color: #fff;
    }

    .normal-task {
      .title-block {
        background: url('@/assets/images/waterEnvScreen/bg_normal_task.png') no-repeat center;
        background-size: 100% 100%;
      }

      :deep() {
        .ant-slider.ant-slider-disabled .ant-slider-track {
          background: linear-gradient(270deg, #3f95ce 0%, #1ee7e7 100%) !important;
        }

        .ant-slider.ant-slider-disabled .ant-slider-handle::after {
          width: 3px;
          height: 3px;
          margin: 3px 0 0 4px;
        }
      }
    }

    .late-task {
      .title-block {
        background: url('@/assets/images/waterEnvScreen/bg_late_task.png') no-repeat center;
        background-size: 100% 100%;
      }

      .list-block {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        margin-top: 0.05rem;

        .list-item {
          display: flex;
          gap: 1%;
          align-items: center;

          .item-left {
            align-items: center;
            width: 33%;
            font-family: Alibaba-PuHuiTi-Regular, sans-serif;
            font-size: 0.12rem;
            font-weight: normal;
            line-height: 0.16rem;
            color: #bbd3e9;
          }

          .item-right {
            width: 66%;

            .item-right-top {
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }

      :deep() {
        .ant-slider.ant-slider-disabled .ant-slider-track {
          height: 0.08rem;
          margin-top: 0.01rem;
          background: linear-gradient(270deg, #3f95ce 0%, #1ee7e7 100%) !important;
          border-radius: 0.05rem;
        }

        .ant-slider.ant-slider-disabled .ant-slider-handle::after {
          display: none;
        }

        .ant-slider.ant-slider-disabled .ant-slider-rail {
          height: 0.1rem;
          background-color: rgb(255 255 255 / 12%) !important;
          border: 1px solid #20efff;
          border-radius: 0.05rem;
        }
      }
    }
  }

  :deep() {
    .ant-slider {
      margin: 0 0.05rem 0.05rem 0;
    }

    .ant-slider-disabled {
      cursor: auto;
    }

    .ant-slider.ant-slider-disabled .ant-slider-rail {
      background-color: rgb(255 255 255 / 12%) !important;
    }
  }
}
</style>
