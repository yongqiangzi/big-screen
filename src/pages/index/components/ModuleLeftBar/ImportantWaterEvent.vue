<!--
 * @Author: wanglei
 * @Date: 2023-12-22 14:59:11
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-05 09:24:13
 * @FilePath: \src\pages\index\components\ModuleLeftBar\ImportantWaterEvent.vue
 * @Descripttion:
-->
<template>
  <section class="important-water-event">
    <section class="title">
      <span class="title-icon" />
      <span class="title-name">重要水事</span>
    </section>
    <section class="content">
      <section
        class="list-container"
        ref="waterEventRef"
        @mouseenter="clear"
        @mouseleave="autoScroll"
      >
        <section class="event-list">
          <div class="list-row" v-for="(item, index) in eventsList" :key="index">
            {{ `${index + 1 > totalLength ? 1 : index + 1}、${item.text}` }}
          </div>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { queryImportantWaterEventsData } from '@/api/mainScreen/mainScreen';

const eventsList = ref<any>([]);
const totalLength = ref<number>(0);
const queryData = async () => {
  const res = await queryImportantWaterEventsData('');
  const { data } = res;
  eventsList.value = data.data ?? [];
  totalLength.value = data.data.length;
};
queryData();

const waterEventRef = ref<any>();
const flag = ref<boolean>(false);
// 计时器
let interval: any = null;
const tbodyHeight = ref<number>(40);

/**
 * 计时器自动滚动
 * @return {void}
 */
const autoScroll = (): void => {
  if (waterEventRef.value) {
    interval = setInterval(() => {
      const tbody = waterEventRef.value.querySelector('.event-list');
      const tr = waterEventRef.value.querySelector('.list-row');

      if (tbody && tr) {
        const { scrollTop, scrollHeight } = tbody;
        const { offsetHeight: trHeight } = tr;

        // 数据条数没有铺满时不轮播
        if (
          eventsList.value &&
          eventsList.value.length < Math.floor(tbodyHeight.value / trHeight)
        ) {
          clearInterval(interval);
          interval = null;

          return;
        }
        if (!flag.value && eventsList.value) {
          eventsList.value.push(...eventsList.value);
          flag.value = true;
        }

        // 滚动到最上面
        if (scrollTop >= scrollHeight / 2) {
          tbody.scrollTo({
            top: 0,
          });

          return;
        }

        tbody.scrollTo({
          // top: scrollTop + trHeight,
          top: scrollTop + 2,
          behavior: 'smooth',
        });
      }
    }, 50);
  }
};

/**
 * 清除计时器
 * @return {void}
 */
const clear = (): void => {
  clearInterval(interval);
  interval = null;
};

onMounted(() => {
  autoScroll();
});

onUnmounted(() => {
  clear();
});
</script>

<style lang="scss" scoped>
@import '@/styles/common';

.important-water-event {
  box-sizing: border-box;

  // flex-basis: 0.64rem;
  height: 0.72rem;
  padding: 0.04rem 0.25rem;

  // overflow: hidden;
  @include backgroud-image('@/assets/images/mainScreen/bg_water_event.png');

  .title {
    display: flex;
    height: 0.2rem;

    // margin-bottom: 0.05rem;

    .title-icon {
      width: 0.16rem;
      height: 0.16rem;
      margin-right: 0.02rem;
      @include backgroud-image('@/assets/images/mainScreen/icon_horn.png');
    }

    .title-name {
      font-family: Alibaba-PuHuiTi-Regular, sans-serif;
      font-size: 0.14rem;
      font-weight: bold;
      color: #ade6ff;
      text-shadow: 0 0 6px rgb(0 194 255 / 56%);
      background: linear-gradient(180deg, #fff 0%, #60ceff 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .content {
    height: 0.4rem;

    .list-container {
      position: relative;
      height: 100%;

      .event-list {
        display: flex;
        flex-direction: column;
        gap: 3px;
        max-height: 0.4rem;
        overflow: hidden;
        font-size: 0.12rem;
        line-height: 0.22rem;

        .list-row {
          height: 100%;
        }
      }
    }
  }
}
</style>
