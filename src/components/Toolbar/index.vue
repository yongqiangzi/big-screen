<template>
  <ul :class="`ht-toolbar`">
    <li
      :class="`tool-item ${current === index ? 'tool-item-checked' : ''}`"
      v-for="(item, index) in tools"
      :key="item.key"
      @click.stop="handleClickTool(item, index)"
      :title="item.title"
    >
      <img :src="item.icon" class="img" />
      <component
        :is="tools[index].component"
        v-show="current === index"
        :map="map"
        :toolbarItem="curItem"
        :item="item"
        @getGeoWKT="getGeoWKT"
        @regionChange="regionChange"
      >
      </component>
    </li>
  </ul>
</template>

<script>
import { Switch } from 'ant-design-vue';
import mapConfig from '@/utils/OLMap/mapConfig';
import useMapStore from '@/store/modules/map2d.ts';
import LayerSwitch from './components/LayerSwitch.vue';
import MapRecovery from './components/MapRecovery.vue';
import MapSearch from './components/MapSearch.vue';

const mapStore = useMapStore();

export default {
  name: 'HtToolbar',
  components: {
    LayerSwitch,
    MapRecovery,
    // eslint-disable-next-line vue/no-reserved-component-names
    Switch,
    MapSearch,
  },
  data() {
    return {
      app: null,
      current: 0,
      curItem: null,
      tools: [
        {
          key: 'layer-search',
          title: '搜索',
          component: MapSearch,
          icon: new URL('@/assets/images/map2d/toolbar-icon-search.png', import.meta.url).href,
        },
        {
          key: 'layer-switch',
          title: '图层',
          component: '',
          icon: new URL('@/assets/images/map2d/toolbar-icon-locate.png', import.meta.url).href,
        },
        {
          key: 'zoomin',
          title: '放大',
          component: '',
          icon: new URL('@/assets/images/map2d/toolbar-icon-zoomin.png', import.meta.url).href,
        },
        {
          key: 'zoomout',
          title: '缩小',
          component: '',
          icon: new URL('@/assets/images/map2d/toolbar-icon-zoomout.png', import.meta.url).href,
        },
        // {
        //   key: 'measure',
        //   title: '测量工具',
        //   component: 'Measure',
        //   icon: 'iconfont icon-chizi_o',
        // },
        // {
        //   key: 'weather',
        //   title: '天气标识',
        //   component: 'CustomSymbols',
        //   icon: 'iconfont icon-weitanzhen',
        // },
        // {
        //   key: 'view-layer',
        //   title: '查看图层',
        //   component: 'ViewLayer',
        //   icon: 'iconfont icon-chanpinmobanguanli',
        // },
        // {
        //   key: 'transparency',
        //   title: '透明度',
        //   component: 'Transparency',
        //   icon: 'iconfont icon-toumingdu',
        // },
        // {
        //   key: 'station',
        //   title: '站点联动',
        //   component: 'Station',
        //   icon: 'iconfont icon-liandong',
        // },
        {
          key: 'map-recovery',
          title: '恢复',
          component: 'MapRecovery',
          icon: new URL('@/assets/images/map2d/toolbar-icon-recovery.png', import.meta.url).href,
        },
      ],
      areaVecLayer: null, // 区域选择图层
    };
  },
  mounted() {
    this.app = document.getElementById('app');
    this.app.addEventListener('click', this.listener, false);
    this.current = null; // 初始化加载完默认云南省边界后隐藏显示
  },
  unmounted() {
    this.app.removeEventListener('click', this.listener, false);
  },
  methods: {
    handleClickTool(item, index) {
      const { key } = item;
      if (this.current === index) {
        this.current = null;
        this.curItem = null;
      } else {
        this.current = index;
        this.curItem = item;
      }

      if (key === 'zoomin') {
        // mapStore.map.olMap.zoomIn();
      }
      if (key === 'zoomout') {
        // mapStore.map.olMap.zoomOut();
      }
      if (key === 'clear-all') {
        this.$emit('clearAll');
      }

      if (key === 'map-recovery') {
        // const olMap = this.map;
        // if (window.mapSize) {
        //   olMap.getView().fit(window.mapExtent, {
        //     size: window.mapSize,
        //     padding: [100, 100, 100, 100],
        //   });
        // } else {
        //   const { center, zoom } = mapConfig;
        mapStore.map.olMap.getView().setZoom(mapConfig.zoom);
        mapStore.map.olMap.getView().setCenter(mapConfig.center);
        //   // 清除地图上所有绘制结果
        //   // mapStore.measure.needClearDraw = true;
        // }
        // mapStore.map.olMap.setZoomAndCenter(mapConfig.zoom, mapConfig.center, false, 500);

        setTimeout(() => {
          this.current = null;
          this.curItem = null;
        }, 500);
      }
    },

    listener() {
      this.current = null;
    },

    getGeoWKT(data) {
      // const { vectorLayer } = data;
      // this.areaVecLayer = vectorLayer;
      // this.$emit('getGeoWKT', data);
    },

    regionChange() {
      // const map = this.$store.state.map.htmap.olMap;
      this.map.removeLayer(this.areaVecLayer);
    },

    // 清空工具栏增加的图层
    clearToolbarLayer() {
      this.curItem = {
        key: 'clear-all',
        title: '一键清空',
      };
    },
    productTypeComputed() {
      return this.productType;
    },
  },
  watch: {
    productTypeComputed: {
      function(newVal) {
        if (newVal === 'atmos') {
          this.toolitems = [
            {
              key: 'station-picker',
              title: '站点',
              component: 'Station',
              icon: 'iconfont icon-zhandian',
            },
            {
              key: 'layer-switch-atmos',
              title: '气象',
              component: 'AtmosLayer',
              icon: 'iconfont icon-qixiang',
            },
          ].concat(this.tools);
        }
        if (newVal === 'water') {
          this.toolitems = this.tools;
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.ht-toolbar {
  position: absolute;
  top: 1.7rem;
  right: 5.76rem;
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
    background: linear-gradient(133deg, #39aac3 0%, #115b8f 100%);
    border-radius: 3px;
    border-image: linear-gradient(180deg, rgb(57 190 182 / 100%), rgb(255 255 255 / 100%)) 1 1;
    opacity: 0.8;

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
    }
  }

  // li.tool-item-checked {
  // background: rgb(22 106 231);
  // border: 1px solid #84bbff;
  // }

  li.hide {
    visibility: hidden;
  }
}
</style>
