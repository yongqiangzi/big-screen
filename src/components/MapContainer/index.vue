<template>
  <section class="map-container">
    <BaseMap />
    <Toolbar v-if="mapContainerShowToolBar" />
    <div v-show="mapContainerShowToolBar">
      <ToolbarLeft></ToolbarLeft>
    </div>
    <div id="popup" class="ol-popup" ref="popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content" class="popup-content"></div>
    </div>
  </section>
  <div id="mouse-position"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseMap from '../BaseMap/index.vue';
import Toolbar from '../Toolbar/index.vue';
import ToolbarLeft from '../Toolbar/indexLeft.vue';

const props = defineProps({
  mapContainerShowToolBar: {
    type: Boolean,
    default: () => true,
  },
});

const popup = ref<any>();
</script>

<style lang="scss" scoped>
#mouse-position {
  position: absolute;
  right: 0.05rem;
  bottom: 0.2rem;
  padding: 0 0.1rem;
  font-size: 0.16rem;
  color: #fff;
  white-space: nowrap;
  background-color: rgb(24 38 81);
}

.map-container {
  width: 100%;
  height: 100%;

  .auto-play-tips {
    position: absolute;
    top: 0.81rem;
    left: calc(50% - 2rem);
    width: auto;
    height: 0.4rem;
    padding: 0 0.6rem;
    font-size: 0.16rem;
    line-height: 0.4rem;
    color: #fff;
    text-shadow: 0 0.01rem 0.02rem rgb(2 18 52 / 8%);
    user-select: none;
    background: linear-gradient(to right, rgb(0 0 0 / 20%), rgb(0 0 0 / 80%) 50%, rgb(0 0 0 / 20%));
  }

  .ol-popup-closer {
    position: absolute;
    top: 8px;
    right: 8px;
    text-decoration: none;
  }

  .ol-popup-closer::after {
    content: '✖';
  }

  .popup-point-content {
    width: 3.9rem;
    height: 2rem;
    padding: 0.1rem 0.2rem 0;
    margin-top: 0.3rem;
    margin-left: 0.3rem;

    // background-image: url('../../assets/images/ProdService/popup_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    box-shadow: 10px 10px 30px;

    .title {
      font-size: 0.18rem;
      font-weight: 400;
      color: #ecf4ff;
      text-shadow: 0 0.03rem 0.03rem rgb(19 89 143 / 49%);
    }

    .content {
      display: flex;
      justify-content: space-between;
      height: 70%;
      margin-top: 0.1rem;

      .left,
      .right1 {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-evenly;
        font-size: 0.14rem;
        font-weight: 400;
        color: #bfd8ff;

        div {
          white-space: nowrap;
        }

        .spn {
          color: #fff;
        }
      }
    }
  }
}
</style>
