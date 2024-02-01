<!--
 * @Author: wanglei
 * @Date: 2023-12-22 17:38:09
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-11 14:11:34
 * @FilePath: \src\pages\index\components\ModuleBottomNavBar\index.vue
 * @Descripttion: 大屏头部
-->
<template>
  <section class="module-bottom-nav-bar">
    <ul class="nav-list">
      <li class="nav-item" v-for="item of navList" :key="item.key" @click="openNewScreen(item)">
        <span
          class="nav-item-icon"
          :style="{
            background: `url(${require(item.icon)}) no-repeat center center`,
            backgroundSize: 'contain',
          }"
        />
        <span class="nav-item-name">{{ item.value }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import require from '@/utils/require';
import { router } from '@/router';

const navList = [
  {
    key: '3D',
    value: '数智排口孪生',
    icon: 'images/mainScreen/icon_3D.png',
  },
  {
    key: 'xxx',
    value: '河湖水生态治理系统',
    icon: 'images/mainScreen/icon_house3.png',
  },
  {
    key: 'xxx',
    value: '精准治水系统',
    icon: 'images/mainScreen/icon_water.png',
  },
];

// 打开新窗口
const openNewScreen = (target: any) => {
  // @to-do目前只有三维页面有跳转需求
  if (target.key === '3D') {
    const href = router.resolve({
      path: '/3D',
    });
    window.open(href.href, '_blank');
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/common';

.module-bottom-nav-bar {
  position: absolute;
  bottom: 0.46rem;
  width: 100%;
  pointer-events: all;

  .nav-list {
    display: flex;
    align-items: center;
    justify-content: center;

    .nav-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 0.98rem;
      height: 0.96rem;
      margin-right: 0.5rem;
      font-family: Source-KeynoteartHans, sans-serif;
      font-size: 0.16rem;
      color: #fff;
      text-align: center;
      cursor: pointer;

      @include backgroud-image('@/assets/images/mainScreen/bg_bottom_nav.png');

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        @include backgroud-image('@/assets/images/mainScreen/bg_bottom_nav_active.png');
      }

      .nav-item-icon {
        width: 0.4rem;
        height: 0.4rem;
      }

      .nav-item-name {
        position: absolute;
        top: 76%;
        line-height: 0.22rem;
      }
    }
  }
}
</style>
