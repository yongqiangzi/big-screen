<!--
 * @Date: 2024-01-17 14:47:22
 * @LastEditTime: 2024-01-17 16:41:54
 * @FilePath: \src\components\BaseMap\index.vue
-->
<template>
  <section id="maps"></section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import OLMap from '@/utils/OLMap/InitMap';
import UseMap2dStore from '@/store/modules/map2d';
import PolygonLayer from '@/utils/OLMap/PolygonLayer';
import ningboJson from './宁波市.json';

onMounted(() => {
  const useMap2dStore = UseMap2dStore();
  const olMap = new OLMap({ target: 'maps' });
  // 状态库缓存map对象
  useMap2dStore.map = olMap;

  // 加载宁波区县行政区划图层
  const geojsonLayer = new PolygonLayer({ map: olMap.olMap });
  geojsonLayer.addVectorByGeoJson(ningboJson, { layerId: 'ningboLayer', zindex: 200 });
});
</script>

<style lang="scss" scoped>
#maps {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 1px 1px 3px 0 rgb(35 24 21 / 10%);
}
</style>
