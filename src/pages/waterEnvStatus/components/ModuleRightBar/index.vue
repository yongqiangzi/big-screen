<!--
 * @Author: wanglei
 * @Date: 2023-12-22 14:19:40
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-17 10:33:02
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\index.vue
 * @Descripttion: 右侧边栏
-->
<template>
  <section class="module-right-bar">
    <WaterInformation />
    <InshoreWater />
  </section>
</template>

<script setup lang="ts">
import WaterInformation from './components/waterEnv/WaterInformation.vue';
import InshoreWater from './components/waterEnv/InshoreWater.vue';
</script>

<style lang="scss" scoped>
.module-right-bar {
  position: absolute;
  top: 0;
  right: 0;
  width: 4.8rem;
  height: calc(100% - 1.92rem);
  padding: 1.27rem 0.95rem 0.55rem 0;
  pointer-events: all;
  background: rgb(255 255 255 / 0%);

  .account-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    .account {
      box-sizing: border-box;
      width: 1.3rem;
      height: 0.48rem;
      padding-left: 0.5rem;
      margin-bottom: 0.1rem;
      font-size: 0.14rem;
      line-height: 0.48rem;
      color: #fff;
      background: url('@/assets/images/waterEnvScreen/bg_account.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
