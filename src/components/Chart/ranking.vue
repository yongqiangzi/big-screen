<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-30 14:52:00
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-30 16:04:00
 * @FilePath: \src\components\Chart\ranking.vue
 * @Description:
-->
<template>
  <section class="surface-water-section">
    <CommonModuleHeader :title="title"> </CommonModuleHeader>
    <section class="content">
      <div class="row special">
        <div class="col col1">{{ headerList[0] }}</div>
        <div class="col col2">{{ headerList[1] }}</div>
        <div class="col col3">{{ headerList[2] }}</div>
        <div class="col col4">{{ headerList[3] }}</div>
      </div>
      <div class="list-container" ref="rankingRef" @mouseenter="clear" @mouseleave="autoScroll">
        <div class="ranking-list">
          <div class="row list-row" v-for="item in dataList" :key="item.index">
            <div class="col col1 dark">{{ item.index }}</div>
            <div class="col col2 dark">{{ item.county }}</div>
            <div class="col col3">
              <a-slider
                v-model:value="item.value"
                :min="0"
                :max="sliderConfig.max"
                :step="sliderConfig.step"
                :tip-formatter="formatter"
                disabled
              />
            </div>
            <div class="col col4 dark">
              {{ sliderConfig.formatter ? item.value + '%' : item.value }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Slider as ASlider } from 'ant-design-vue';

import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';

const props = defineProps(['title', 'headerList', 'contentData', 'sliderConfig']);

const dataList = ref<any>([
  {
    index: 'NO.1',
    county: '海曙区',
    value: 6.2011,
  },
  {
    index: 'NO.2',
    county: '江北区',
    value: 6.1337,
  },
  {
    index: 'NO.3',
    county: '北仑区',
    value: 6.0489,
  },
  {
    index: 'NO.4',
    county: '镇海区',
    value: 5.8292,
  },
  {
    index: 'NO.5',
    county: '鄞州区',
    value: 5.5851,
  },

  {
    index: 'NO.6',
    county: '奉化区',
    value: 5.2509,
  },
  {
    index: 'NO.7',
    county: '象山县',
    value: 4.7725,
  },
  {
    index: 'NO.8',
    county: '宁海县',
    value: 4.4199,
  },
  {
    index: 'NO.9',
    county: '余姚市',
    value: 4.1397,
  },
  {
    index: 'NO.10',
    county: '慈溪市',
    value: 4.0064,
  },
]);

const formatter = (value: number) => {
  if (props.sliderConfig.formatter) {
    return `${value}%`;
  }
  return `${value}`;
};

const rankingRef = ref<any>();
const flag = ref<boolean>(false);
// 计时器
let interval: any = null;
const tbodyHeight = ref<number>(40);

/**
 * 计时器自动滚动
 * @return {void}
 */
const autoScroll = (): void => {
  if (rankingRef.value) {
    interval = setInterval(() => {
      const tbody = rankingRef.value.querySelector('.ranking-list');
      const tr = rankingRef.value.querySelector('.list-row');

      if (tbody && tr) {
        const { scrollTop, scrollHeight } = tbody;
        const { offsetHeight: trHeight } = tr;

        // 数据条数没有铺满时不轮播
        if (dataList.value && dataList.value.length < Math.floor(tbodyHeight.value / trHeight)) {
          clearInterval(interval);
          interval = null;

          return;
        }
        if (!flag.value && dataList.value) {
          dataList.value.push(...dataList.value);
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

watch(
  () => props.contentData,
  (data: any) => {
    if (data) {
      dataList.value = data;
    }
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  autoScroll();
});

onUnmounted(() => {
  clear();
});
</script>

<style lang="scss" scoped>
.surface-water-section {
  box-sizing: border-box;
  width: 4.5rem;
  height: 1.95rem;

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
    z-index: 9999;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    // gap: 0.09rem;
    justify-content: center;
    width: 98%;
    height: 1.65rem;
    padding: 0 0.09rem;
    margin: 0 auto;
    margin-top: 0.02rem;
    background: linear-gradient(158deg, rgb(78 165 245 / 10%) 0%, rgb(79 167 248 / 0%) 100%);

    .list-container {
      width: 99%;
      height: 1.3rem;

      .ranking-list {
        height: 100%;
        overflow: hidden;
      }
    }

    .row {
      display: flex;
      height: 0.24rem;

      // padding-right: 0.05rem;

      .col {
        height: 0.24rem;
        font-family: Alibaba-PuHuiTi-Regular, sans-serif;
        font-size: 10px;
        font-weight: bold;
        line-height: 0.24rem;
        background: linear-gradient(180deg, #f3faff 0%, #bbe0ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .dark {
        font-weight: 400;
        color: #fff;
      }

      .col1 {
        width: 0.41rem;
      }

      .col2 {
        width: 0.55rem;
      }

      .col3 {
        width: calc(100% - 1.24rem);
      }

      .col4 {
        width: 0.55rem;
        text-align: right;
      }
    }

    .special {
      width: 98.5%;
      padding: 0.08rem 0 0.01rem;
      border-bottom: 1px solid;
      border-image: linear-gradient(
          180deg,
          rgb(137 202 255 / 0%),
          rgb(137 202 255 / 100%),
          rgb(137 202 255 / 0%)
        )
        5 1;
    }
  }

  :deep() {
    .ant-slider {
      margin: 0.05rem;
    }

    .ant-slider-disabled {
      cursor: auto;
    }

    .ant-slider.ant-slider-disabled .ant-slider-track {
      background: linear-gradient(270deg, #3f95ce 0%, #1ee7e7 100%) !important;
    }

    .ant-slider.ant-slider-disabled .ant-slider-handle::after {
      width: 0;
      height: 6px;
      margin: 2px 0 0 4px;
      border-radius: 0;
      box-shadow: 0 0 0 1px rgb(255 255 255);
    }

    .ant-slider.ant-slider-disabled .ant-slider-rail {
      background-color: rgb(255 255 255 / 12%) !important;
    }
  }
}
</style>
