<!--
 * @Author: wanglei
 * @Date: 2023-12-24 11:26:42
 * @LastEditors: PanYunhong
 * @LastEditTime: 2024-01-12 10:12:26
 * @FilePath: \src\components\CommonSubHeader\index.vue
 * @Descripttion: 模块公共头部
-->
<template>
  <section class="common-sub-header">
    <span class="common-sub-header-title">{{ props.title }}</span>
    <slot />
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  textAlign: {
    type: String,
    default: 'left',
  },
});
</script>

<style lang="scss" scoped>
.common-sub-header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: v-bind(textAlign);
  width: 100%;
  height: 0.2rem;
  font-family: Source-KeynoteartHans, sans-serif;
  font-size: 0.16rem;
  line-height: 0.16rem;
  background: url('@/assets/images/mainScreen/bg_subTitle.png') no-repeat center bottom;

  .common-sub-header-title {
    text-shadow: 0 0 6px rgb(0 194 255 / 80%);
  }
}
</style>
