<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-09 14:04:29
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-11 14:30:06
 * @FilePath: \src\pages\waterEnvStatus\components\moduleScreenFooter.vue
 * @Description:
-->
<template>
  <section class="module-screen-footer">
    <ul class="btn-list">
      <li
        :class="['btnItem', `item-${item.key}`, item.active ? 'btnItemActive' : '']"
        v-for="item in screenTypeList"
        :key="item.key"
        @click="subScreenClick(item)"
      >
        <span :class="`btnIcon icon-${item.key}`"></span>
        <span class="text">{{ item.name }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const emits = defineEmits(['changeScreenSideBar']);
// 分屏类型列表
const screenTypeList = reactive([
  {
    name: '水环境状况',
    key: 'waterEnv',
    active: true,
  },
  {
    name: '水质智能研判',
    key: 'waterQuality',
    active: false,
  },
  {
    name: '污水零直排',
    key: 'polluteWater',
    active: false,
  },
  {
    name: '重点污染源',
    key: 'importantPollution',
    active: false,
  },
  // {
  //   name: '入河(海)排口',
  //   key: 'sea-port',
  //   active: false,
  // },
  {
    name: '重点专项工作',
    key: 'specialWork',
    active: false,
  },
  {
    name: '督查检查',
    key: 'supervisionInspection',
    active: false,
  },
  {
    name: '河湖长监管',
    key: 'lakeSupervision',
    active: false,
  },
  {
    name: '绩效考核评价',
    key: 'performanceEvaluation',
    active: false,
  },
]);
// 分屏类型点击事件
const subScreenClick = (target: any) => {
  screenTypeList.forEach((item: any) => {
    // eslint-disable-next-line no-param-reassign
    item.active = target.key === item.key;
  });
  emits('changeScreenSideBar', target);
};
</script>

<style lang="scss" scoped>
.module-screen-footer {
  position: absolute;
  bottom: 0.2rem;
  z-index: 1000;
  box-sizing: border-box;
  width: 100%;
  height: 1.5rem;
  padding: 0 2.63rem;
  pointer-events: all;

  .btn-list {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;

    .btnItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 0.98rem;
      height: 0.96rem;
      cursor: pointer;
      background: url('@/assets/images/waterEnvScreen/bg_btn_menu.png') no-repeat;
      background-size: 100% 100%;

      &:hover {
        background: url('@/assets/images/waterEnvScreen/bg_btn_menu_active.png') no-repeat;
        background-size: 100% 100%;
      }

      .text {
        position: absolute;
        top: 78%;
        font-family: Source-KeynoteartHans, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        color: #fff;
        -webkit-background-clip: text;
      }
    }

    .btnItemActive {
      background: url('@/assets/images/waterEnvScreen/bg_btn_menu_active.png') no-repeat;
      background-size: 100% 100%;
    }

    .item-waterEnv {
      transform: translateY(0);
    }

    .item-waterQuality {
      transform: translateY(-8px);
    }

    .item-polluteWater {
      transform: translateY(-16px);
    }

    .item-importantPollution {
      transform: translateY(-24px);
    }

    .item-sea-port {
      transform: translateY(-32px);
    }

    .item-specialWork {
      transform: translateY(-24px);
    }

    .item-supervisionInspection {
      transform: translateY(-16px);
    }

    .item-lakeSupervision {
      transform: translateY(-8px);
    }

    .item-performanceEvaluation {
      transform: translateY(0);
    }

    .btnIcon {
      display: inline-block;
      width: 0.4rem;
      height: 0.4rem;
    }

    .icon-waterEnv {
      background: url('@/assets/images/waterEnvScreen/icon-water-env.png') no-repeat;
      background-size: 100% 100%;
    }

    .icon-waterQuality {
      background: url('@/assets/images/waterEnvScreen/icon-water-quality.png') no-repeat;
      background-size: 100% 100%;
    }

    .icon-polluteWater {
      background: url('@/assets/images/waterEnvScreen/icon-pollute-water.png') no-repeat;
      background-size: 100% 100%;
    }

    .icon-importantPollution {
      background: url('@/assets/images/waterEnvScreen/icon-important-pollution.png') no-repeat;
      background-size: 100% 100%;
    }

    .icon-sea-port {
      background: url('@/assets/images/waterEnvScreen/icon-sea-port.png') no-repeat;
      background-size: 100% 100%;
    }

    .icon-specialWork {
      background: url('@/assets/images/waterEnvScreen/icon-special-work.png') no-repeat;
      background-size: 100% 100%;
    }

    .icon-supervisionInspection {
      background: url('@/assets/images/waterEnvScreen/icon-supervision-inspection.png') no-repeat;
      background-size: 100% 100%;
    }

    .icon-lakeSupervision {
      background: url('@/assets/images/waterEnvScreen/icon-lake-supervision.png') no-repeat;
      background-size: 100% 100%;
    }

    .icon-performanceEvaluation {
      background: url('@/assets/images/waterEnvScreen/icon-performance-evaluation.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
