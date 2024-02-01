<template>
  <section class="pollution-intensity">
    <CommonModuleHeader title="不达标断面统计"> </CommonModuleHeader>
    <section class="chart-container">
      <PieChat
        class="right"
        :chartData="dataList?.countyDistribution"
        :chartText="'10个'"
        :chartUnit="'个'"
      />
      <PieChat
        class="right"
        :chartData="dataList?.polDistribution"
        :chartText="'24个'"
        :chartUnit="'个'"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';
import PieChat from './pieChat.vue';

defineProps(['dataList']);
</script>

<style lang="scss" scoped>
.pollution-intensity {
  box-sizing: border-box;
  width: 4.5rem;
  margin-bottom: 0.15rem;

  // height: 3.51rem;

  .header {
    position: relative;
    display: flex;
    width: 4.8rem;
    height: 0.32rem;
    background: url('@/assets/images/mainScreen/bg_module_title.png');
    background-size: cover;
  }

  .chart-container {
    display: flex;
    justify-content: space-between;
    padding-top: 0.15rem;
  }
}
</style>
