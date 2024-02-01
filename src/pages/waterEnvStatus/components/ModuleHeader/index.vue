<!--
 * @Author: wanglei
 * @Date: 2023-12-22 17:38:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-04 16:03:45
 * @FilePath: \src\pages\index\components\ModuleHeader\index.vue
 * @Descripttion: 大屏头部
-->
<template>
  <section class="module-header">
    <span class="module-header-name">{{ VITE_APP_TITLE }}</span>
  </section>
</template>

<script setup lang="ts">
const { VITE_APP_TITLE } = import.meta.env;
</script>

<style lang="scss" scoped>
.module-header {
  width: 100%;
  height: 1rem;
  font-family: YouSheBiaoTiHei, sans-serif;
  text-align: center;
  pointer-events: all;
  background: linear-gradient(180deg, #fdfeff 0%, #94cfff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;

  .module-header-name {
    margin-left: 0.45rem;
    font-size: 0.5rem;
    line-height: 0.55rem;
    letter-spacing: 0.45rem;
  }
}
</style>
