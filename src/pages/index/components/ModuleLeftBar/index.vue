<!--
 * @Author: wanglei
 * @Date: 2023-12-22 14:19:01
 * @LastEditors: wanglei
 * @LastEditTime: 2023-12-26 14:31:47
 * @FilePath: /src/pages/index/components/ModuleLeftBar/index.vue
 * @Descripttion: 左侧边栏
-->
<template>
  <section class="module-left-bar">
    <ImportantWaterEvent />
    <section class="module-left-bar-content">
      <WaterEnvStatus />
      <WaterResource />
    </section>
  </section>
</template>

<script setup lang="ts">
import ImportantWaterEvent from './ImportantWaterEvent.vue';
import WaterEnvStatus from './WaterEnvStatus.vue';
import WaterResource from './WaterResource.vue';
</script>

<style lang="scss" scoped>
.module-left-bar {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 5.6rem;
  height: 100%;
  padding: 0.6rem 0 0.55rem 0.8rem;
  overflow: auto;
  pointer-events: all;

  .module-left-bar-content {
    display: flex;
    flex-direction: column;
  }
}
</style>
