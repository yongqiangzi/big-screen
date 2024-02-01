<template>
  <section class="sec" @click.stop="">
    <section class="btns">
      <Button
        v-for="item in btnGroups"
        :key="item.value"
        @click.stop="() => btnClick(item)"
        :class="`btn ${btnValue === item.value ? 'select' : ''}`"
        >{{ item.label }}</Button
      >
    </section>
    <Select
      v-model:value="selectValue"
      show-search
      allowClear
      placeholder="请选择"
      class="select-c"
      :options="options[btnValue]"
      @click.stop="() => {}"
    >
    </Select>
    <section class="footer">
      <Button size="small" class="ok" @click.stop="ok">确定</Button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { Button, Select } from 'ant-design-vue';
import { MultiPolygon } from 'ol/geom';
import { getCenter, buffer } from 'ol/extent';
import { Feature } from 'ol';
import { UseMap2dStore } from '@/store';
import GeoserverShpWMS from '@/utils/OLMap/GeoserverShpWMS';
import waterstation from '../waterstation.json';
import river from '../river.json';
import lake from '../lake.json';
import reservoir from '../reservoir.json';

const useMap2dStore = UseMap2dStore();

const btnGroups = [
  {
    label: '水质站',
    value: 'waterStation',
  },
  {
    label: '河流',
    value: 'river',
  },
  {
    label: '湖泊',
    value: 'lake',
  },
  {
    label: '水库',
    value: 'reservoir',
  },
];
const selectValue = ref<string | undefined>(undefined);
const btnValue = ref<string>('waterStation');
// 按钮点击事件
const btnClick = (item: any) => {
  btnValue.value = item.value;
  selectValue.value = undefined;
};
const options = reactive<any>({
  waterStation: waterstation.stations.map((item) => {
    return { ...item, value: item.name, label: item.name };
  }),
  river: Array.from(new Set(river.features.map((item) => item.properties?.NAME))).map((item) => {
    return { value: item, label: item };
  }),
  lake: Array.from(new Set(lake.features.map((item) => item.properties?.NAME))).map((item) => {
    return { value: item, label: item };
  }),
  reservoir: Array.from(new Set(reservoir.features.map((item) => item.properties?.NAME))).map(
    (item) => {
      return { value: item, label: item };
    },
  ),
});

let geoserverShpWMS: any | null = null;

const ok = () => {
  // 水质站定位
  if (btnValue.value === 'waterStation') {
    const [station] = waterstation.stations.filter((item) => item.name === selectValue.value);
    useMap2dStore.map?.olMap.getView().setZoom(13);
    useMap2dStore.map?.olMap.getView().setCenter([station.lon, station.lat]);
  }
  // 河流定位
  const url = `geoserver/ningbo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ningbo%3A${btnValue.value}&maxFeatures=1&outputFormat=application%2Fjson&CQL_FILTER=NAME=='${selectValue.value}'`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!data || data.features.length === 0) return;
      const featureObj = data.features?.at(0);
      const geom = new MultiPolygon(featureObj.geometry.coordinates);
      const center = getCenter(geom.getExtent());
      const feature = new Feature({
        geometry: geom,
      });
      feature.setProperties({ ...featureObj.properties, lon: center.at(0), lat: center.at(1) });
      // 选中
      if (geoserverShpWMS) geoserverShpWMS.addSelected(feature);
      // 聚焦
      useMap2dStore.map?.olMap.getView().fit(buffer(geom.getExtent(), 0.1));
      // 弹窗
      // showInfoWindow(feature, layerId);
    });
};

onMounted(() => {
  geoserverShpWMS = new GeoserverShpWMS({ map: useMap2dStore.map?.olMap });
});
</script>

<style lang="scss" scoped>
@import './style';

.sec {
  top: 1.8rem;
  right: 6.2rem;
  bottom: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: auto;
  height: 1.5rem;
  padding: 0.08rem;
  text-align: center;
  cursor: default;
  background-image: url('@/assets/images/map2d/map-search-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .btns {
    // display: flex;
    gap: 0.08rem;
    justify-content: flex-start;
    width: 2rem;

    .btn {
      width: 0.9rem;
      font-family: 'Alibaba PuHuiTi', sans-serif;
      font-size: 0.16rem;
      font-weight: bold;
      color: #34f0e6;
      background-color: transparent;
      background-image: url('@/assets/images/map2d/wqi-pop-btn.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border-width: 0;

      &.select {
        color: #fff;
        background-image: url('@/assets/images/map2d/wqi-pop-btn-sel.png');
      }
    }
  }

  .select-c {
    width: 1.8rem;

    :deep(.ant-select-selector) {
      // height: 0.35rem;

      // padding-top: 0.02rem;
      color: #fff;
      background-color: #20303e;
      border: 1px solid;
      border-radius: 2px;
      border-image: linear-gradient(180deg, rgb(70 132 255 / 100%), rgb(82 138 250 / 48%)) 1 1;

      .ant-select-selection-item {
        font-size: 0.16rem;
      }

      .ant-select-selection-placeholder {
        font-size: 0.14rem;
        color: #b4c0cc;
      }
    }

    :deep(.ant-select-arrow) {
      .anticon {
        font-size: 0.14rem;
        color: #fff;
      }
    }

    :deep(.ant-select-clear) {
      color: #fff;
      background-color: #20303e;
    }
  }

  .footer {
    .ok {
      // width: 0.64rem;
      // height: 0.3rem;
      // padding: 0.01rem;
      // font-size: 0.16rem;
      color: #fff;
      background: linear-gradient(133deg, #39aac3 0%, #115b8f 100%);
      border: 1px solid;
      border-radius: 3px;
    }
  }
}
</style>
