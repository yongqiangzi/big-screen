<!--
 * @Author: wanglei
 * @Date: 2023-12-24 11:26:42
 * @LastEditors: wanglei
 * @LastEditTime: 2023-12-25 15:33:13
 * @FilePath: /src/pages/index/components/CommonModuleHeader/index.vue
 * @Descripttion: 模块公共头部
-->
<template>
  <section class="common-module-header">
    <span class="common-module-header-title">{{ props.title }}</span>
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

.common-module-header {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 0.32rem;
  padding-left: 0.38rem;
  font-family: Source-KeynoteartHans, sans-serif;
  font-size: 0.19rem;
  line-height: 0.24rem;
  background: url('@/assets/images/mainScreen/bg_module_title.png') no-repeat center;
  background-size: 100% 100%;

  .common-module-header-title {
    text-shadow: 0 0 10px rgb(0 194 255 / 56%);
  }
}
</style>
