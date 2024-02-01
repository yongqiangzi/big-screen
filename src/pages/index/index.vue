<!--
 * @Author: wanglei
 * @Date: 2023-12-22 13:49:20
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2023-12-24 16:04:22
 * @FilePath: \src\pages\index\index.vue
 * @Descripttion:
-->
<template>
  <section class="index">
    <ModuleBaseMap />
    <section class="index-wrapper">
      <ModuleHeader />
      <ModuleTopNavBar />
      <ModuleBottomNavBar />
      <ModuleLeftBar />
      <ModuleRightBar />
    </section>
  </section>
</template>

<script setup lang="ts">
import {
  ModuleBaseMap,
  ModuleBottomNavBar,
  ModuleHeader,
  ModuleLeftBar,
  ModuleRightBar,
  ModuleTopNavBar,
} from './components/index';
</script>

<style lang="scss" scoped>
.index {
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
