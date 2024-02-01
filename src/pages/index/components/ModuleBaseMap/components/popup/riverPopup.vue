<template>
  <div id="river-popup" ref="">
    <div class="title">
      <div class="title-wrapper">
        <div class="title-text">{{ popupData.name ?? popupData.GB ?? popupData.NAME }}</div>
      </div>
      <div class="iconfont icon-guanbi close" @click="closePop"></div>
    </div>
    <div class="content">
      <div class="flex">
        <section class="left">
          <section v-for="item in paramLlist2" :key="item.label" class="sec2">
            <span class="name">{{ item.label }}：</span
            ><span class="value">{{ popupData[item.name] ?? '' }}</span
            ><span class="unit">{{ item.unit }}</span>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  popupData: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(['close']);

const paramLlist2 = ref([
  { name: 'LX', label: '类型', unit: '' },
  // { name: 'grade', label: '河流级别', unit: '' },
  { name: 'bas', label: '所属流域', unit: '' },
  { name: 'length', label: '河流长度', unit: 'km' },
]);

const closePop = () => {
  emits('close');
};
</script>

<style lang="scss" scoped>
#river-popup {
  width: 3rem;
  height: 2rem;
  padding: 0.02rem 0.18rem;
  font-size: 0.16rem;
  background-color: transparent;
  background-image: url('@/assets/images/map2d/river-popup-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-shadow: 0.05rem 0.09rem 0.16rem 0 rgb(54 54 59 / 40%);

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.1rem 0;
    font-family: Alibaba-PuHuiTi-Regular, sans-serif;
    text-align: left;
    border-top-right-radius: 0.1rem;

    .title-wrapper {
      display: flex;
      gap: 0.1rem;
      align-items: baseline;
      justify-content: space-evenly;

      .title-text {
        font-family: 'PingFang SC', sans-serif;
        font-size: 0.18rem;
        font-weight: 600;
        color: rgb(23 141 238 / 100%);
        text-shadow: 0 0 9px #0e0e0e;
      }
    }

    .close {
      position: absolute;
      right: 0.2rem;
      width: 0.2rem;
      height: 0.2rem;
      color: #cdddf1;
      cursor: pointer;
      background: url('@/assets/images/map2d/icon-close.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .content {
    padding: 0.2rem 0;
    font-family: Alibaba-PuHuiTi-Regular, sans-serif;

    .flex {
      display: flex;
      padding: 0 0.2rem;

      .left {
        display: flex;
        flex-direction: column;

        .sec2,
        .sec5 {
          height: 0.34rem;
          font-family: 'Alibaba PuHuiTi', sans-serif;
          font-weight: 400;
          color: #fff;

          .name,
          .label {
            font-weight: 400;
            color: #d1d1d1;
          }

          .value1 {
            width: 0.4rem;
            padding: 0.02rem 0.18rem;
            font-size: 0.16rem;
            font-weight: 500;
            color: #7afa4d;
            text-align: center;
            background: rgb(122 250 77 / 16%);
            border: 1px solid rgb(122 250 77 / 80%);
            border-radius: 2px;

            &.red {
              color: red;
              background: rgb(232 8 9 / 16%);
              border: 1px solid rgb(232 8 9 / 80%);
            }
          }

          .unit {
            font-weight: 500;
            color: #fff;
          }
        }

        .sec5:last-child {
          width: 31%;
        }
      }
    }
  }
}
</style>
