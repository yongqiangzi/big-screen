<!--
 * @Author: PanYunhong
 * @Date: 2024-01-16 18:03:46
 * @LastEditors: PanYunhong
 * @LastEditTime: 2024-01-23 10:43:24
 * @description: 配置文档 https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\components\waterQuality\StandardWarning.vue
-->
<template>
  <section class="standard-warning">
    <CommonModuleHeader title="达标断面预警">
      <span class="sub-title">2023年</span>
    </CommonModuleHeader>
    <EnvTable :headerData="headerData" :bodyData="dataList" />
  </section>
</template>

<script setup lang="ts">
import { EnvTable, CommonModuleHeader } from '@/pages/waterEnvStatus/components/index';

defineProps(['dataList']);

interface Header {
  [key: string]: any;
}

const headerData: Header = {
  sort: {
    label: '序号',
    width: '7',
  },
  name: {
    label: '断面名称',
    width: '13',
  },
  location: {
    label: '所在水体',
    width: '13',
  },
  county: {
    label: '责任区县（市）',
    width: '13',
  },
  water1: {
    label: '水质现状',
    width: '13',
  },
  water2: {
    label: '水质目标',
    width: '13',
  },
  dabiao: {
    label: '是否达标',
    width: '13',
  },
  average: {
    label: '年均值达标形势',
    width: '15',
  },
};
</script>

<style lang="scss" scoped>
.standard-warning {
  box-sizing: border-box;
  width: 4.5rem;
  margin-bottom: 0.15rem;

  .header {
    position: relative;
    display: flex;
    width: 4.8rem;
    height: 0.32rem;
    background: url('@/assets/images/mainScreen/bg_module_title.png');
    background-size: cover;
  }

  .sub-title {
    position: relative;
    right: 0.15rem;
    font-family: 'Alibaba PuHuiTi', sans-serif;
    font-size: 0.14rem;
    line-height: 0.3rem;
  }
}
</style>
