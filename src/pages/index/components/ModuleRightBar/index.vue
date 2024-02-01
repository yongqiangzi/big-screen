<!--
 * @Author: wanglei
 * @Date: 2023-12-22 14:19:40
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-09 13:55:31
 * @FilePath: \src\pages\index\components\ModuleRightBar\index.vue
 * @Descripttion: 右侧边栏
-->
<template>
  <section class="module-right-bar">
    <!--系统信息-->
    <SystemInfo />
    <!--水生态修复-->
    <WaterEcological @changeSelectYear="changeSelectYear" />
    <!--水文化遗产-->
    <WaterCultural />
    <!--水事件联动-->
    <WaterEvents :currentYear="currentYear" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
import SystemInfo from '@/components/SystemInfo/index.vue';
import WaterEcological from './WaterEcological.vue';
import WaterCultural from './WaterCultural.vue';
import WaterEvents from './WaterEvents.vue';

const currentYear = ref<string>(dayjs().format('YYYY年MM月'));
const changeSelectYear = (year: string) => {
  currentYear.value = year;
};
</script>

<style lang="scss" scoped>
.module-right-bar {
  position: absolute;
  top: 0;
  right: 0;
  width: 4.8rem;
  height: calc(100% - 1.92rem);
  margin: 0.72rem 0.8rem 0.48rem 0;
  pointer-events: all;
  background: rgb(255 255 255 / 0%);

  // background: linear-gradient(158deg, #4ea5f5 0%, rgba(79, 167, 248, 0) 100%);
}
</style>
