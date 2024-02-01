<!--
 * @Author: wanglei
 * @Date: 2023-12-22 14:20:01
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-09 10:43:51
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleBaseMap\index.vue
 * @Descripttion: 地图业务组件
-->
<template>
  <MapContainer :mapContainerShowToolBar="baseMapShowToolBar"></MapContainer>
</template>

<script setup lang="ts">
import MapContainer from '@/components/MapContainer/index.vue';

const props = defineProps(['baseMapShowToolBar']);
</script>

<style lang="scss" scoped>
.module-base-map {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
