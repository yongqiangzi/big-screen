<!--
 * @Author: wanglei
 * @Date: 2023-12-22 14:20:01
 * @LastEditors: wanglei
 * @LastEditTime: 2023-12-22 14:57:30
 * @FilePath: /src/pages/index/components/ModuleBaseMap/index.vue
 * @Descripttion: 地图业务组件
-->
<template>
  <MapContainer></MapContainer>
</template>

<script setup lang="ts">
import MapContainer from '@/components/MapContainer/index.vue';
</script>

<style lang="scss" scoped>
.module-base-map {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
