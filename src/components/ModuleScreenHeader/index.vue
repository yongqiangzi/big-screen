<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-09 11:25:54
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-09 15:46:40
 * @FilePath: \src\components\ModuleScreenHeader\index.vue
 * @Description:
-->

<template>
  <section class="screen-header">
    <section class="header-left">
      <div class="btn-home" @click="goToMainScreen"><span class="btn-text">返回主页</span></div>
      <SystemInfo />
    </section>
  </section>
</template>

<script setup lang="ts">
import SystemInfo from '@/components/SystemInfo/index.vue';
import { router } from '@/router';

const goToMainScreen = () => {
  router.push('/');
};
</script>

<style lang="scss" scoped>
.screen-header {
  position: absolute;
  top: 0.72rem;
  z-index: 1000;
  box-sizing: border-box;
  justify-content: space-between;
  width: 100%;
  height: 0.5rem;
  padding: 0 0.95rem;
  font-family: YouSheBiaoTiHei, sans-serif;
  text-align: center;
  pointer-events: all;

  .header-left {
    display: flex;
    justify-content: space-between;
    width: 4.5rem;
    height: 0.5rem;

    .btn-home {
      width: 1.4rem;
      height: 0.48rem;
      line-height: 0.48rem;
      cursor: pointer;
      background: url('@/assets/images/waterEnvScreen/bg_btn_return.png') no-repeat;
      background-size: 100% 100%;

      .btn-text {
        margin-left: 0.3rem;
        font-family: Alibaba-PuHuiTi-Regular, sans-serif;
        font-size: 0.16rem;
        font-weight: bold;
        line-height: 0.2rem;
        letter-spacing: 0.01rem;
        background: linear-gradient(180deg, #fdfeff 0%, #94cfff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
</style>
