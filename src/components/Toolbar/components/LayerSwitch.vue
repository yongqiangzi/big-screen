<template>
  <section class="sec">
    <div
      :class="`${select === item.name ? 'selected' : ''} tool-kit`"
      :title="item.name"
      v-for="item in mapLayers"
      :key="item.name"
      @click.stop="onclick(item)"
    >
      {{ item.name }}
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';

const select = ref('影像图');
const mapLayers = [
  { name: '影像图', value: '1' },
  // { name: '地形图', value: '2' },
  { name: '矢量图', value: '3' },
  { name: '深色图', value: '4' },
];

export default {
  props: {
    map: {
      type: Object,
    },
  },
  computed: {
    mapType: '',
  },
  data() {
    return {
      radioVal: '矢量图',
      mapLayers,
      select,
    };
  },
  methods: {
    change(e) {
      const name = e.target.value;
      let type = '';
      this.mapLayers.forEach((ele) => {
        if (ele.name === name) {
          type = ele.value;
        }
      });
      // const map = mapStore.htmap.olMap;
      this.layerSwitch(this.map, type);
      // mapStore.mapType = name;
    },
    layerSwitch(map, switchType) {
      if (!map) return;
      if (switchType.value === '1') {
        map.changeMapStyle('sate');
      }
      if (switchType.value === '2') {
        map.changeMapStyle('');
      }
      if (switchType.value === '3') {
        map.changeMapStyle('vector');
      }
      if (switchType.value === '4') {
        map.changeMapStyle('darkVector');
      }
    },
    onclick(item) {
      this.select = item.name;
      this.layerSwitch(this.map, item);
    },
  },
  mounted() {
    // 默认显示地形图
    // const map = mapStore.htmap.olMap;
    const name = '地形图';
    let type = '';
    this.mapLayers.forEach((ele) => {
      if (ele.name === name) {
        type = ele.value;
      }
    });

    // this.layerSwitch(map, type);
    // this.$store.commit('dataRetrieval/updateState', { mapType: name });
  },
  watch: {
    mapType: {
      handler(val) {
        if (!val) return;
        this.radioVal = val;
        // const map = mapStore.htmap.olMap;
        // this.layerSwitch(map, this.mapLayers.find((i) => i.name === val)?.value);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './style';

.sec {
  bottom: calc(1.28rem + 2 * 0.15rem);
}
</style>
