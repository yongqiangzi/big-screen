<!--
 * @Author: wanglei
 * @Date: 2023-12-22 13:49:20
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-30 17:15:42
 * @FilePath: \src\pages\waterEnvStatus\index.vue
 * @Descripttion:
-->
<template>
  <section class="water-env-status">
    <!--地图组件-->
    <ModuleBaseMap :baseMapShowToolBar="showMapToolBar" />
    <!--页面容器-->
    <section class="index-wrapper">
      <!--页面头部-->
      <ModuleHeader />
      <!--分屏头部-->
      <ModuleScreenHeader />
      <!--左侧面板-->
      <component :is="sideBarList[activeSideBar].leftPanel" />
      <!--右侧面板-->
      <component :is="sideBarList[activeSideBar].rightPanel" />
      <!--分屏底部-->
      <ModuleScreenFooter @changeScreenSideBar="changeScreenSideBar" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  ModuleBaseMap,
  ModuleHeader,
  ModuleLeftBar,
  WaterQualityLeftBar,
  PolluteWaterLeftBar,
  ImportantPollutionLeftBar,
  ModuleRightBar,
  WaterQualityRightBar,
  PolluteWaterRightBar,
  ImportantPollutionRightBar,
  ModuleScreenHeader,
  ModuleScreenFooter,
} from './components/index';

// 水环境分屏左右侧边栏列表
const sideBarList: any = {
  // 水环境状况
  waterEnv: {
    leftPanel: ModuleLeftBar,
    rightPanel: ModuleRightBar,
  },
  // 水质智能研判
  waterQuality: {
    leftPanel: WaterQualityLeftBar,
    rightPanel: WaterQualityRightBar,
  },
  // 污水零直排
  polluteWater: {
    leftPanel: PolluteWaterLeftBar,
    rightPanel: PolluteWaterRightBar,
  },
  // 重点污染源
  importantPollution: {
    leftPanel: ImportantPollutionLeftBar,
    rightPanel: ImportantPollutionRightBar,
  },
  // 重点专项工作
  specialWork: {
    leftPanel: ModuleLeftBar,
    rightPanel: ModuleRightBar,
  },
  // 督查检查
  supervisionInspection: {
    leftPanel: ModuleLeftBar,
    rightPanel: ModuleRightBar,
  },
  // 河湖长监管
  lakeSupervision: {
    leftPanel: ModuleLeftBar,
    rightPanel: ModuleRightBar,
  },
  // 绩效考核评价
  performanceEvaluation: {
    leftPanel: ModuleLeftBar,
    rightPanel: ModuleRightBar,
  },
};
// 水环境分屏当前展示类型
const activeSideBar = ref<string>('waterEnv');
// 地图工具栏显隐
const showMapToolBar = ref<boolean>(false);
// 切换分屏左右面板
const changeScreenSideBar = (target: any) => {
  activeSideBar.value = target.key;
};
</script>

<style lang="scss" scoped>
.water-env-status {
  position: relative;
  width: 100%;
  height: 100%;

  & :not(.index-wrapper) {
    // pointer-events: all;
  }

  .index-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    font-family: Alibaba-PuHuiTi-Regular, sans-serif;
    color: #fff;
    pointer-events: none;
    user-select: none;
    background: url('@/assets/images/mainScreen/bg_system.png') no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
