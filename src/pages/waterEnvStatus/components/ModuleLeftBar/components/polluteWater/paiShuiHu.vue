<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-17 11:06:43
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-29 13:43:35
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\polluteWater\paiShuiHu.vue
 * @Description:
-->
<template>
  <section class="pai-shui-hu">
    <CommonModuleHeader title="排水户总览"> </CommonModuleHeader>
    <section class="content">
      <section class="list">
        <section class="list-item" v-for="(item, index) in dataList" :key="index">
          <section class="dark-text">{{ item.text }}</section>
          <section class="blue-text">{{ item.value }}</section>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';

defineProps(['dataList']);
</script>

<style lang="scss" scoped>
.pai-shui-hu {
  width: 4.5rem;
  height: 1.04rem;

  .content {
    box-sizing: border-box;
    height: 0.8rem;
    padding: 0.1rem 0.2rem;

    .list {
      display: flex;
      width: 4.14rem;
      height: 0.5rem;
      background: url('@/assets/images/waterEnvScreen/bg_paishuihu.png') no-repeat center;
      background-size: 100% 100%;

      .list-item {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 0.06rem;
        justify-content: center;
        width: 25%;

        // padding: 0.09rem 0 0 0.12rem;

        .dark-text {
          font-family: 'Alibaba PuHuiTi', sans-serif;
          font-size: 0.11rem;
          font-weight: 400;
          line-height: 0.11rem;
          color: #eef7ff;
        }

        .blue-text {
          font-family: D-DIN-DIN, sans-serif;
          font-size: 0.18rem;
          font-weight: bold;
          line-height: 0.15rem;
          color: #20efff;
          text-shadow: 0 3px 3px rgb(0 0 0 / 25%);
        }

        &:not(:last-child)::after {
          position: absolute;
          display: block;
          width: 1px;
          height: 0.32rem;
          content: '';
          background: url('@/assets/images/waterEnvScreen/bg_list_divider.png') no-repeat center;
          background-size: 100% 100%;
          transform: translateX(0.85rem);
        }
      }
    }
  }
}
</style>
