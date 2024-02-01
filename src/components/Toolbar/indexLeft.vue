<template>
  <ul :class="`ht-toolbar`">
    <li
      :class="`tool-item ${tools[index].show ? 'tool-item-checked' : ''}`"
      v-for="(item, index) in tools"
      :key="item.id"
      @click.stop="handleClickTool(item, index)"
      :title="item.layerName"
    >
      <img :src="`${item.show ? item.icon : item.icon1}`" class="img" />
    </li>
  </ul>
  <popWin ref="popupRef" @closeWinInfo="closeWinInfo" />
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { UseMap2dStore } from '@/store';
import PointLayer from '@/utils/OLMap/PointLayer';
import popWin from '@/pages/index/components/ModuleBaseMap/components/popup/popWin.vue';
import { removeLayerByid } from '@/utils/OLMap/utils';
import GeoserverShpWMS from '@/utils/OLMap/GeoserverShpWMS';
import waterstation from './waterstation.json';

const useMap2dStore = UseMap2dStore();
let pointLayer: any;

type LayerObject = { layerName: String; id: String; icon: any; show: Boolean; icon1: any };
const tools = ref<Array<LayerObject>>([
  {
    layerName: '水质站点',
    id: 'waterMonitorStation',
    icon: new URL(`@/assets/images/map2d/toolbar-icon-water-resouce.png`, import.meta.url).href,
    icon1: new URL(`@/assets/images/map2d/toolbar-icon-water-resouce-1.png`, import.meta.url).href,
    show: false,
  },
  {
    layerName: '水系',
    id: 'waterFlows',
    icon: new URL(`@/assets/images/map2d/toolbar-icon-river.png`, import.meta.url).href,
    icon1: new URL(`@/assets/images/map2d/toolbar-icon-river-1.png`, import.meta.url).href,
    show: false,
  },
  {
    layerName: '河湖岸线',
    id: 'offshoreLines',
    icon: new URL('@/assets/images/map2d/toolbar-icon-offline.png', import.meta.url).href,
    icon1: new URL(`@/assets/images/map2d/toolbar-icon-offline-1.png`, import.meta.url).href,
    show: false,
  },
  {
    layerName: '重要湿地',
    id: 'offshoreLines',
    icon: new URL(`@/assets/images/map2d/toolbar-icon-wet-land.png`, import.meta.url).href,
    icon1: new URL(`@/assets/images/map2d/toolbar-icon-wet-land-1.png`, import.meta.url).href,
    show: false,
  },
  {
    layerName: '自然保护区',
    id: 'offshoreLines',
    icon: new URL(`@/assets/images/map2d/toolbar-icon-preserve.png`, import.meta.url).href,
    icon1: new URL(`@/assets/images/map2d/toolbar-icon-preserve-1.png`, import.meta.url).href,
    show: false,
  },
  {
    layerName: '饮用水源地',
    id: 'offshoreLines',
    icon: new URL('@/assets/images/map2d/toolbar-icon-drink-water.png', import.meta.url).href,
    icon1: new URL('@/assets/images/map2d/toolbar-icon-drink-water-1.png', import.meta.url).href,
    show: false,
  },
]);
// 地图弹框
const popupRef = ref<any>(null);
const overlay = ref<any>(null);

const showInfoWindow = (feature: any, layerId: string) => {
  //
  overlay.value = pointLayer.addPointOverlay(popupRef.value.$el, layerId);

  // 装载数据
  popupRef.value.setInfoValue({
    popupData: {
      // eslint-disable-next-line no-prototype-builtins
      ...(feature.properties ? feature.properties : feature.getProperties()),
      nodeType: layerId,
    },
  });
  // 显示
  nextTick(() => {
    pointLayer.showOverlay(
      // eslint-disable-next-line no-prototype-builtins
      feature.properties
        ? [feature.properties.lon, feature.properties.lat]
        : [feature.getProperties().lon, feature.getProperties().lat],
    );

    // 水质站点： 移动地图中心点，适应弹窗位置
    if (layerId !== 'waterMonitorStation') return;
    // x,y偏移量
    const offset = [240, 250];
    const offsetPixel = useMap2dStore.map?.olMap.getPixelFromCoordinate([
      feature.getProperties().lon,
      feature.getProperties().lat,
    ]);
    const offsetCoord = useMap2dStore.map?.olMap.getCoordinateFromPixel([
      offsetPixel[0] + offset[0],
      offsetPixel[1] + offset[1],
    ]);
    useMap2dStore.map?.olMap.getView().setCenter(offsetCoord);
  });
};

// 根据条件关闭地图弹窗
const closeWinInfo = () => {
  // 切换某些菜单关闭弹窗
  // pointLayer.hidePointOverlay();
  if (overlay.value) overlay.value.setPosition(undefined);
};

const handleClickTool = (item: any, index: number) => {
  if (tools.value[index].show) {
    if (item.id === 'waterFlows') {
      removeLayerByid(useMap2dStore.map?.olMap, 'river');
      removeLayerByid(useMap2dStore.map?.olMap, 'lake');
      removeLayerByid(useMap2dStore.map?.olMap, 'reservoir');
    } else {
      // 关闭图层
      removeLayerByid(useMap2dStore.map?.olMap, item.id);
    }
    // 关闭弹窗
    if (overlay.value) overlay.value.setPosition(undefined);
  } else if (item.id === 'waterMonitorStation') {
    pointLayer = new PointLayer({ map: useMap2dStore.map?.olMap });
    // 显示水质站点
    pointLayer.addMarkers(waterstation.stations, {
      layerId: item.id,
      zIndex: 1000,
      callback: showInfoWindow,
    });
  } else if (item.id === 'waterFlows') {
    // const yongxinheLayer = new PolygonLayer({ map: useMap2dStore.map?.olMap });
    // yongxinheLayer.addWebglVectorByGeoJson(shuixi, {
    //   layerId: item.id,
    //   zIndex: 201,
    //   callback: showInfoWindow,
    //   style: () => {
    //     return new Style({
    //       stroke: new Stroke({
    //         color: '#48d1cc',
    //         width: 0,
    //       }),
    //       fill: new Fill({
    //         color: '#63FBF8',
    //       }),
    //     });
    //   },
    // });
    // 加载geoserver图层
    const geoserverShpWMS = new GeoserverShpWMS({ map: useMap2dStore.map?.olMap });
    geoserverShpWMS.addShpWMSLayer({
      zIndex: 220,
      layerName: 'ningbo:river',
      callback: showInfoWindow,
    });
    geoserverShpWMS.addShpWMSLayer({
      zIndex: 220,
      layerName: 'ningbo:lake',
      callback: showInfoWindow,
    });
    geoserverShpWMS.addShpWMSLayer({
      zIndex: 220,
      layerName: 'ningbo:reservoir',
      callback: showInfoWindow,
    });
  }

  // 切换
  tools.value[index].show = !item.show;
};

onMounted(() => {
  handleClickTool(tools.value[0], 0);
});
</script>

<style lang="scss" scoped>
.ht-toolbar {
  position: absolute;
  top: 1.7rem;
  left: 5.76rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  height: auto;
  padding: 0.1rem 0.05rem;
  color: #cdddf1;
  user-select: none;
  border-radius: 0.04rem;
  transition: all 0.5s ease-in-out;

  &.dock-right {
    right: 0.35rem;
  }

  li {
    display: flex;
    align-items: center;

    .ant-switch {
      margin-right: 0.05rem;
      background: rgb(255 250 250 / 25%);
    }

    .ant-switch-checked {
      background: rgb(37 117 236 / 100%);
    }
  }

  li.tool-item {
    position: relative;
    display: flex;
    place-items: center;
    justify-content: center;
    width: 0.36rem;
    height: 0.36rem;
    list-style: none;
    cursor: pointer;
    border-radius: 3px;
    border-image: linear-gradient(180deg, rgb(57 190 182 / 100%), rgb(255 255 255 / 100%)) 1 1;

    &::before {
      margin-right: 0.05rem;
    }

    > .tool-kit {
      position: absolute;
      top: 0;
      right: 0.5rem;
      background: rgb(2 18 52 / 60%);
      border-radius: 0.04rem;
      box-shadow: 0 0.01rem 0.12rem 0 rgb(0 0 0 / 30%);
    }

    &.iconfont {
      color: #cdddf1;
    }

    .img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
      border-image: linear-gradient(180deg, rgb(57 190 182 / 100%), rgb(255 255 255 / 100%)) 1 1;
      opacity: 1;
    }
  }

  li.hide {
    visibility: hidden;
  }
}
</style>
