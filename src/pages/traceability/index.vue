<!--
 * @Author: wanglei
 * @Date: 2023-12-22 13:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-10 11:31:26
 * @FilePath: \src\pages\traceability\index.vue
 * @Descripttion:
-->
<template>
  <div class="cesium-main">
    <Header></Header>
    <Footer></Footer>
    <Left></Left>
    <Right></Right>
    <div id="cesium-container"></div>
    <div class="location">{{ mouseLongitude }},{{ mouseLatitude }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import * as turf from '@turf/turf';
import CesiumHeatmap from '../../utils/cesium/Heatmap/initHeatmap.ts';
import areaPointArr from '../../utils/cesium/Heatmap/area.js';
import MapViewer from '../../utils/cesium/index';
import Header from './components/header.vue';
import Footer from './components/footer.vue';
import Left from './components/left.vue';
import Right from './components/right.vue';

const mouseLongitude = ref('0.000000');
const mouseLatitude = ref('0.000000');
const isDynamic = ref(false); // 是否动态

let mapViewer: any = null;
let heatmapBbox: any = null;

// 随机数
const getRndInteger = (min: number, max: number) => {
  // console.log('min', min);
  return Math.floor(Math.random() * (max - min)) + min;
};

// 获取bbox矩形区域内的count个随机点
const getRandomPoints = () => {
  const searchWithin = turf.transformScale(turf.polygon(areaPointArr), 1);
  const [xmin, ymin, xmax, ymax] = turf.bbox(searchWithin);

  const rectangle = { xmin, ymin, xmax, ymax }; // 矢量四至
  heatmapBbox = {
    west: rectangle.xmin,
    east: rectangle.xmax,
    south: rectangle.ymin,
    north: rectangle.ymax,
  };
  const heatCount = 2000; // 随机生成2000个点
  const arr = [];
  const arrPoint = turf.randomPoint(heatCount, {
    bbox: [rectangle.xmin, rectangle.ymin, rectangle.xmax, rectangle.ymax],
  }).features; // 随机点
  for (let i = 0; i < arrPoint.length; i++) {
    const item = arrPoint[i].geometry.coordinates;
    const pointsArr = turf.points([item]);
    const result = turf.pointsWithinPolygon(pointsArr, searchWithin);
    if (result.features.length) {
      // 计算点与水管之间的距离，控制随机数生成范围，大致控制扩散颜色
      const radius = turf.distance(turf.point([121.620511, 29.88602]), turf.point(item)) as number;
      let val = null;
      if (radius < 0.015) {
        val = getRndInteger(95, 100);
      } else if (radius < 0.025 && radius >= 0.015) {
        val = getRndInteger(60, 90);
      } else if (radius < 0.035 && radius >= 0.025) {
        val = getRndInteger(40, 60);
      } else if (radius < 0.65 && radius >= 0.035) {
        val = getRndInteger(20, 40);
      } else {
        val = getRndInteger(0, 20);
      }
      arr.push({ x: item[0], y: item[1], value: val });
    }
  }
  return arr;
};

// 生成变化点位
const lerpHeatMapData = (startArr: any[], endArr: any[], ratio: number, result: any) => {
  const length = startArr.length <= endArr.length ? startArr.length : endArr.length;
  for (let i = 0; i < length; i++) {
    const start = startArr[i];
    const end = endArr[i];
    if (start.x && end.x && start.y && end.y) {
      // eslint-disable-next-line no-param-reassign
      result[i] = {
        x: start.x * (1 - ratio) + end.x * ratio,
        y: start.y * (1 - ratio) + end.y * ratio,
        value: start.value * (1 - ratio) + end.value * ratio,
      };
    }
  }
};

const showHeatMap = () => {
  // 随机数据的生成
  const heatMapData0 = getRandomPoints();
  const heatMapData1 = getRandomPoints();
  const resultHeatMapData = getRandomPoints();

  const heatMap = new CesiumHeatmap(mapViewer);
  heatMap.addImgHeatMap(heatMapData0, heatmapBbox);

  // // 为了演示动态更新
  let ratio = 0;
  setInterval(() => {
    if (!isDynamic.value) {
      return;
    }

    ratio += 0.003;
    if (ratio > 1.0) {
      ratio = 0.0;
    }

    lerpHeatMapData(heatMapData0, heatMapData1, ratio, resultHeatMapData);
    // 更新数据
    heatMap.updateHeatmap(resultHeatMapData);
  }, 100);
};

onMounted(() => {
  // 63, 2, 132, 56         121.618323, 29.88388, 121.624886, 29.887144
  mapViewer = new MapViewer('cesium-container', [63, 2, 132, 56]);
  mapViewer.getLocation((lon: any, lat: any) => {
    mouseLongitude.value = lon.toFixed(6);
    mouseLatitude.value = lat.toFixed(6);
  });

  // mapViewer.scene.globe.depthTestAgainstTerrain = true;
  showHeatMap();
});
</script>

<style lang="scss" scoped>
.cesium-main {
  width: 100%;
  height: 100%;
  height: 100vh;
  background-color: red;

  #cesium-container {
    width: 100%;
    height: 100%;
  }

  .location {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #fff;
    background-color: blue;
  }
}
</style>
