<!--
 * @Author: wanglei
 * @Date: 2023-12-22 14:43:52
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2023-12-29 17:17:06
 * @FilePath: \src\pages\index\components\ModuleRightBar\WaterCultural.vue
 * @Descripttion: 水文化遗产
-->
<template>
  <section class="water-cultural-heritage">
    <CommonModuleHeader title="水文化遗产">
      <div class="btn"></div>
    </CommonModuleHeader>
    <div class="content">
      <CarouselImage :carouselList="imageList" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CarouselImage from '@/components/carouselImage/index.vue';
import { queryWaterCulturalData } from '@/api/mainScreen/mainScreen';
import { CommonModuleHeader } from '../index';

const imageList = ref<any>([]);
const queryData = async () => {
  const res = await queryWaterCulturalData('');
  const { data } = res;
  imageList.value = data.data ?? [];
};
queryData();
</script>

<style lang="scss" scoped>
.water-cultural-heritage {
  box-sizing: border-box;
  width: 4.8rem;
  height: 2.54rem;

  .header {
    position: relative;
    display: flex;
    width: 4.8rem;
    height: 0.32rem;
    background: url('@/assets/images/mainScreen/bg_module_title.png');
    background-size: cover;

    .title-text {
      position: absolute;
      margin-left: 0.35rem;
      font-family: Source-KeynoteartHans, sans-serif;
      font-size: 0.19rem;
      font-style: italic;
      font-weight: 400;
      line-height: 0.26rem;
      color: #fff;
      text-shadow: 0 0 10px rgb(0 0 0 / 56%);
    }
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    justify-content: center;
    width: 95%;
    padding-left: 0.13rem;
    margin: 0 auto;
    background: linear-gradient(158deg, rgb(78 165 245 / 20%) 0%, rgb(79 167 248 / 0%) 100%);
  }

  .btn {
    width: 0.45rem;
    height: 0.2rem;
    margin: 0.05rem 0.2rem 0 0;
    cursor: pointer;
    background: url('@/assets/images/mainScreen/bg_btn_more.png');
  }
}
</style>
