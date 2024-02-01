<!--
 * @Author: PanYunhong
 * @Date: 2024-01-09 15:14:21
 * @LastEditors: PanYunhong
 * @LastEditTime: 2024-01-20 11:19:51
 * @description: 配置文档 https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \src\pages\waterEnvStatus\components\EnvHeader\index.vue
-->
<template>
  <section class="env-header">
    <section class="common-module-header-title">{{ props.title }}</section>
    <slot />
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/common';

.env-header {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 4.8rem;
  height: 0.54rem;
  font-family: Source-KeynoteartHans, sans-serif;
  font-size: 0.22rem;
  line-height: 0.54rem;
  background: url('@/assets/images/waterEnvScreen/bg_bar_title.png') no-repeat center;
  background-position-x: -0.18rem;
  background-size: 106% 100%;

  .common-module-header-title {
    width: 100%;
    font-size: 21px;
    line-height: 0.5rem;
    text-align: center;
    text-shadow: 0 0 7px rgb(0 194 255 / 80%);
    letter-spacing: 1px;
    background: linear-gradient(180deg, #fdfeff 0%, #94cfff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
