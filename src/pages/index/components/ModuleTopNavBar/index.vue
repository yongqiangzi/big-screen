<!--
 * @Author: wanglei
 * @Date: 2023-12-22 17:38:09
 * @LastEditors: wanglei
 * @LastEditTime: 2023-12-24 13:10:03
 * @FilePath: /src/pages/index/components/ModuleTopNavBar/index.vue
 * @Descripttion: 大屏头部
-->
<template>
  <section class="module-top-nav-bar">
    <ul class="nav-list">
      <li class="nav-item" v-for="item of navList" :key="item.key" @click="goToItemScreen(item)">
        {{ item.value }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { router } from '@/router';

const navList = [
  {
    key: 'waterEnv',
    value: '水环境全域感知',
  },
  {
    key: 'xxx',
    value: '水资源全景概览',
  },
  {
    key: 'xxx',
    value: '水生态—屏展现',
  },
  {
    key: 'xxx',
    value: '水文化古今通晓',
  },
  {
    key: 'xxx',
    value: '水事件联动指挥',
  },
];

// 分屏跳转
const goToItemScreen = (target: any) => {
  if (target.key === 'waterEnv') {
    router.push('waterEnv');
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/common';

.module-top-nav-bar {
  position: absolute;
  top: 1rem;
  width: 100%;
  pointer-events: all;

  .nav-list {
    display: flex;
    align-items: center;
    justify-content: center;

    .nav-item {
      width: 1.45rem;
      height: 0.4rem;
      font-size: 0.14rem;
      line-height: 0.4rem;
      color: #fff;
      text-align: center;
      cursor: pointer;
      @include backgroud-image('@/assets/images/mainScreen/bg_nav.png');

      &:hover {
        color: #ffd949;
      }
    }
  }
}
</style>
