<!--
 * @Author: wanglei
 * @Date: 2023-12-22 14:19:01
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-30 15:58:07
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\index.vue
 * @Descripttion: 左侧边栏
-->
<template>
  <section class="water-module-left-bar">
    <section class="bar-title">
      <span class="title-text">地表水水质状况</span>
    </section>
    <section class="mouse-trigger-block" @mouseenter="clear" @mouseleave="autoChangeType">
      <section class="type-list">
        <section
          :class="['type-item', item.active ? 'item-active' : '']"
          v-for="(item, index) in typeList"
          :key="item.value"
          @click="handleClickBtn(index)"
        >
          {{ item.text }}
        </section>
      </section>

      <WaterQualityTotal title="断面水质总体情况" :dataList="totalSituationList" />
      <SurfaceWaterSection
        title="地表水断面达标率"
        :label="labelList[currentType]"
        :dataList="daBiaoList"
        :chartData="daBiaoChartData"
        :sectionType="'1'"
      />
      <SurfaceWaterSection
        title="地表水断面优良率"
        :label="labelList[currentType]"
        :dataList="youLiangList"
        :chartData="youLiangChartData"
        :sectionType="'2'"
      />
    </section>
    <Ranking
      title="区县市水质综合排名"
      :headerList="headerList"
      :contentData="rankingData"
      :sliderConfig="sliderConfig"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { queryWaterEnvScreenData } from '@/api/mainScreen/mainScreen';
import Ranking from '@/components/Chart/ranking.vue';
import WaterQualityTotal from './components/waterEnv/waterQualityTotal.vue';
import SurfaceWaterSection from './components/waterEnv/surfaceWaterSection.vue';

const originData = ref<any>({});
const currentType = ref<string>('all');
const totalSituationList = ref<any>({});
const daBiaoList = ref<any>({});
const youLiangList = ref<any>({});
const daBiaoChartData = ref<any>();
const youLiangChartData = ref<any>();
const labelList: any = {
  all: '全部断面',
  country: '国控断面',
  province: '省控断面',
  city: '市控断面',
};
const typeList = ref<any>([
  {
    text: '全部',
    value: 'all',
    active: true,
  },
  {
    text: '国控',
    value: 'country',
    active: false,
  },
  {
    text: '省控',
    value: 'province',
    active: false,
  },
  {
    text: '市控',
    value: 'city',
    active: false,
  },
]);
const headerList = ['排名', '区县市', '', 'CWQI'];
const rankingData = ref<any>([
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
const sliderConfig = {
  max: 10,
  step: 0.1,
};

const computeComponentsData = () => {
  const {
    data: { totalData, surfaceDaBiaoLv, countyDaBiaoLv, surfaceYouLiangLv, countyYouLiangLv },
  } = originData.value;
  totalSituationList.value = totalData[currentType.value];
  daBiaoList.value = surfaceDaBiaoLv[currentType.value];
  youLiangList.value = surfaceYouLiangLv[currentType.value];
  daBiaoChartData.value = countyDaBiaoLv[currentType.value];
  youLiangChartData.value = countyYouLiangLv[currentType.value];
};

const queryData = async () => {
  originData.value = await queryWaterEnvScreenData('');
  computeComponentsData();
};
queryData();

let interval: any = null;
const activeIndex = ref<number>(0);
const autoChangeType = () => {
  if (interval) return;
  interval = setInterval(() => {
    if (activeIndex.value === typeList.value.length - 1) {
      activeIndex.value = 0;
    } else {
      activeIndex.value += 1;
    }
    typeList.value.forEach((item: any, index: number) => {
      if (index === activeIndex.value) {
        // eslint-disable-next-line no-param-reassign
        item.active = true;
        currentType.value = item.value;
      } else {
        // eslint-disable-next-line
        item.active = false;
      }
    });
    computeComponentsData();
  }, 3000);
};

const clear = () => {
  clearInterval(interval);
  interval = null;
};

const handleClickBtn = (typeIndex: number) => {
  activeIndex.value = typeIndex;
  typeList.value.forEach((item: any, index: number) => {
    if (index === activeIndex.value) {
      // eslint-disable-next-line no-param-reassign
      item.active = true;
      currentType.value = item.value;
    } else {
      // eslint-disable-next-line
      item.active = false;
    }
  });
  computeComponentsData();
};

onMounted(() => {
  autoChangeType();
});

onUnmounted(() => {
  clear();
});
</script>

<style lang="scss" scoped>
.water-module-left-bar {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  // width: 5.6rem;
  height: 100%;
  padding: 1.27rem 0 0.55rem 0.95rem;
  overflow: auto;
  pointer-events: all;

  .bar-title {
    width: 4.8rem;
    height: 0.54rem;
    line-height: 0.6rem;
    text-align: center;
    background: url('@/assets/images/waterEnvScreen/bg_bar_title.png') no-repeat center;
    background-position-x: -0.18rem;
    background-size: 100% 100%;

    .title-text {
      margin-right: 0.18rem;
      font-family: Source-KeynoteartHans, sans-serif;
      font-size: 21px;
      font-weight: 400;
      line-height: 24px;
      text-shadow: 0 0 7px rgb(0 194 255 / 80%);
      letter-spacing: 1px;
      background: linear-gradient(180deg, #fdfeff 0%, #94cfff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .type-list {
    display: flex;
    gap: 0.05rem;
    align-items: center;
    justify-content: center;

    .type-item {
      width: 0.63rem;
      height: 0.23rem;
      font-family: Alibaba-PuHuiTi-Regular, sans-serif;
      font-size: 0.12rem;
      font-weight: normal;
      line-height: 0.22rem;
      color: #fff;
      text-align: center;
      cursor: pointer;
      background: url('@/assets/images/waterEnvScreen/bg_water_env_type.png') no-repeat center;
      background-size: 100% 100%;
    }

    .item-active {
      background: url('@/assets/images/waterEnvScreen/bg_water_env_type_active.png') no-repeat
        center;
      background-size: 100% 100%;
    }
  }
}
</style>
