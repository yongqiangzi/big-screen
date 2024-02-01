<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-11 16:55:53
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-24 13:57:45
 * @FilePath: \src\pages\waterEnvStatus\components\EnvTable\index.vue
 * @Description:
-->
<template>
  <section class="content" ref="smokeDeviceTable" @mouseenter="clear" @mouseleave="autoScroll">
    <ul class="row header-row">
      <li
        v-for="h in Object.keys(headerData)"
        :key="h"
        class="lightText"
        :style="{ width: `${headerData[h].width}%` || '10%' }"
        :title="headerData[h].label"
      >
        {{ headerData[h].label }}
      </li>
    </ul>
    <section class="t-body" v-if="dataSource && dataSource.length">
      <ul class="row body-row" v-for="(b, i) in dataSource" :key="i">
        <li
          v-for="h in Object.keys(headerData)"
          :key="h"
          class="col"
          :style="{ width: `${headerData[h].width}%` || '10%' }"
          :title="b[h]"
        >
          <span v-if="h === 'sort'">{{ b.index }}</span>
          <span v-else>{{ b[h] }}</span>
        </li>
      </ul>
    </section>
    <partLaoding v-else-if="dataSource === undefined" />
    <section v-else class="no-data">暂无数据</section>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps(['headerData', 'bodyData', 'tHeight']);

// const smokeDevice = ref<any>();
const smokeDeviceTable = ref<any>();
const dataSource = ref<any>();

// 计时器
let interval: any = null;
const tbodyHeight = ref<number>(40);

const flag = ref<boolean>(false);

/**
 * 清除计时器
 * @return {void}
 */
const clear = (): void => {
  clearInterval(interval);
  interval = null;
};

/**
 * 根据组件高度计算tbody高度
 * @return {void}
 */
const resize = (): void => {
  tbodyHeight.value = smokeDeviceTable.value.offsetHeight - 23.8;
};

/**
 * 计时器自动滚动
 * @return {void}
 */
const autoScroll = (): void => {
  if (smokeDeviceTable.value) {
    interval = setInterval(() => {
      const tbody = smokeDeviceTable.value.querySelector('.t-body');
      const tr = smokeDeviceTable.value.querySelector('.body-row');

      if (tbody && tr) {
        const { scrollTop, scrollHeight } = tbody;
        const { offsetHeight: trHeight } = tr;

        // 数据条数没有铺满时不轮播
        if (
          dataSource.value &&
          dataSource.value.length / 2 < Math.floor(tbodyHeight.value / trHeight)
        ) {
          clearInterval(interval);
          interval = null;

          return;
        }
        if (!flag.value && dataSource.value) {
          dataSource.value.push(...dataSource.value);
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

watch(
  () => props.bodyData,
  (newVal) => {
    if (newVal && newVal.length) {
      flag.value = false;
      const temp = newVal.map((item: any, i: number) => ({ ...item, index: i + 1 }));
      dataSource.value = [...temp];
    } else {
      dataSource.value = [];
    }
  },
);

onMounted(() => {
  window.addEventListener('resize', resize);
  resize();
  setTimeout(() => {
    autoScroll();
  }, 1500);
});

onUnmounted(() => {
  clear();
  window.removeEventListener('resize', resize);
});
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 4.5rem;
  width: 97%;
  padding: 0.09rem;
  margin: 0 auto;
  background: linear-gradient(158deg, rgb(78 165 245 / 10%) 0%, rgb(79 167 248 / 0%) 100%);

  .t-body {
    width: 100%;
    height: 1.32rem;
    overflow: hidden;

    .body-row:nth-child(even) {
      background: url('@/assets/images/waterEnvScreen/bg_water_quality_list.png');
      background-size: contain;
    }
  }

  .header-row {
    background: linear-gradient(360deg, #1c4668 0%, rgb(47 66 82 / 9%) 100%);
  }

  .row {
    display: flex;
    height: 0.27rem;
    padding-right: 0.05rem;
    line-height: 0.27rem;

    .col {
      height: 0.27rem;
      padding: 0 0.02rem;
      overflow: hidden;
      font-family: Alibaba-PuHuiTi-Regular, sans-serif;
      font-size: 0.12rem;
      font-weight: 500;
      line-height: 0.27rem;
      color: #fff;
      text-align: center;
      text-overflow: ellipsis;
      text-shadow: 0 3px 3px rgb(0 0 0 / 25%);
      white-space: nowrap;
      background: linear-gradient(180deg, #badefc 0%, #fafdff 57%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .lightText {
      height: 0.27rem;
      padding: 0 0.02rem;
      overflow: hidden;
      font-family: Alibaba-PuHuiTi-Regular, sans-serif;
      font-size: 0.12rem;
      font-weight: 500;
      line-height: 0.27rem;
      color: #fff;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .dark {
      font-weight: 400;
      color: #fff;
    }
  }
}
</style>
