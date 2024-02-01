<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-29 17:39:24
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-30 16:01:52
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleRightBar\components\polluteWater\projectRanking.vue
 * @Description:
-->
<template>
  <section class="project-ranking">
    <section class="content">
      <Ranking
        title="项目完成率排名"
        :headerList="headerList"
        :contentData="dataList"
        :sliderConfig="sliderConfig"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import Ranking from '@/components/Chart/ranking.vue';

defineProps(['dataList']);
const headerList = ['排名', '区县名称', '', '项目完成率'];
const sliderConfig = {
  max: 100,
  step: 1,
  formatter: true,
};
</script>

<style lang="scss" scoped>
.project-ranking {
  width: 4.5rem;
  height: 2rem;
}
</style>
