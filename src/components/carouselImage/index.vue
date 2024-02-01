<!--
 * @Author: ziyongqiang
 * @Date: 2023-12-24 17:39:18
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2023-12-25 13:24:04
 * @FilePath: \src\components\carouselImage\index.vue
 * @Description:
-->
<template>
  <carouselModule :moduleList="carouselList" style="cursor: pointer" @click="handleClick" />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import carouselModule from './carouselModule.vue';

const props = defineProps({
  carouselList: {
    type: Array,
    default: () => [],
  },
});

watch(
  () => props.carouselList,
  (data: any) => {
    // console.log(data);
  },
);

const vocsModalOpen = ref(false);

const handleClick = () => {
  vocsModalOpen.value = true;
};
</script>

<style lang="scss" scoped></style>
