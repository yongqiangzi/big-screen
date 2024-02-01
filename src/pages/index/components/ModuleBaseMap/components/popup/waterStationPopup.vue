<template>
  <div id="water-quality-device-popup" ref="waterQualityDevicePop">
    <div class="title">
      <div class="title-wrapper">
        <div class="title-text">{{ popupData.name ?? '' }}</div>
        <div class="title-mark" v-if="!stationInfo.flag">未达标</div>
      </div>
      <div class="iconfont icon-guanbi close" @click="closePop"></div>
      <div class="title-location iconfont icon-weizhi">
        <img src="@/assets/images/map2d/location-icon.png" class="icon" />
        {{ stationInfo.address }}
      </div>
    </div>
    <div class="content">
      <section class="sec6">
        <section class="sec4">
          <span class="content-top-title">水质监测信息</span>
          <span class="time">{{ dayjs().format('YYYY-MM-DD HH:mm') }}</span>
        </section>
        <div class="split"></div>
      </section>
      <div class="flex">
        <section class="left">
          <section
            v-for="item in paramLlist2.filter((item, index) => {
              return index < paramLlist2.length / 2;
            })"
            :key="item.label"
            class="sec2"
          >
            <span class="name">{{ item.label }}：</span
            ><span class="value">{{ popupData[item.name] }}</span
            ><span class="unit">{{ item.unit }}</span>
          </section>
        </section>
        <section class="left">
          <section
            v-for="item in paramLlist2.filter((item, index) => index >= paramLlist2.length / 2)"
            :key="item.label"
            class="sec2"
          >
            <span class="label">{{ item.label }}：</span
            ><span class="value">{{ popupData[item.name] }}</span
            ><span class="unit">{{ item.unit }}</span>
          </section>
        </section>
        <!-- <section class="left">
          <section
            v-for="item in paramLlist2.filter((item, index) => index >= 6)"
            :key="item.label"
            class="sec2"
          >
            <span class="label">{{ item.label }}：</span
            ><span class="value">{{ popupData[item.name] }}</span
            ><span class="unit">{{ item.unit }}</span>
          </section>
        </section> -->
      </div>
      <section class="flex">
        <section class="horizental">
          <section v-for="item in paramLlist3" :key="item.label" class="sec5">
            <span class="label">{{ item.label }}：</span
            ><span :class="`value1 ${item.name === 'waterQuality' ? 'red' : ''} `">{{
              popupData[item.name] + '类'
            }}</span
            ><span class="unit">{{ item.unit }}</span>
          </section>
        </section>
      </section>
    </div>
    <section class="content-bottom">
      <section class="btns">
        <Button
          v-for="item in btnGroups"
          :key="item.value"
          @click="() => btnClick(item)"
          :class="`btn ${btnValue === item.value ? 'select' : ''}`"
          >{{ item.label }}</Button
        >
      </section>
      <section class="chart">
        <RealtimeLineChartVue
          :chartData="40"
          :chartType="`line`"
          :chartId="`24h`"
          :pointInfo="popupData"
          v-if="btnValue === '24h'"
        ></RealtimeLineChartVue>
        <WRRL :pointInfo="popupData" v-if="btnValue === 'wrrl'"></WRRL>
        <TBFX :pointInfo="popupData" v-if="btnValue === 'tbfx'"></TBFX>
        <HBFX :pointInfo="popupData" v-if="btnValue === 'hbfx'"></HBFX>
      </section>
    </section>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, watch } from 'vue';
import { Button } from 'ant-design-vue';
import RealtimeLineChartVue from './components/24h.vue';
import WRRL from './components/wrrl.vue';
import TBFX from './components/tbfx.vue';
import HBFX from './components/hbfx.vue';

const props = defineProps({
  popupData: {
    type: Object,
    default: () => ({ name: '', companyAddress: '', nodeType: 'aqc' }),
  },
});
const emits = defineEmits(['close']);

const paramLlist2 = ref([
  { name: 'wt', label: '温度', unit: '°C' },
  { name: 'nh3h', label: '氨氮', unit: 'mg/L' },
  { name: 'ec', label: '电导率', unit: 'us/cm' },
  { name: 'thm', label: '浊度', unit: 'NTU' },
  { name: 'do2', label: '溶解氧', unit: 'mg/L' },
  { name: 'tp', label: '总磷', unit: 'mg/L' },
  { name: 'ph', label: 'ph值', unit: '' },
  { name: 'tn', label: '总氮', unit: 'mg/L' },
  { name: 'codmn', label: '高锰酸盐指数', unit: 'mg/L' },
]);
const paramLlist3 = ref([
  { name: 'waterQuality', label: '水质现状', unit: '' },
  { name: 'targetClassify', label: '水质目标', unit: '' },
]);

const btnGroups = [
  {
    label: '污染日历',
    value: 'wrrl',
  },
  {
    label: '24小时',
    value: '24h',
  },
  {
    label: '同比分析',
    value: 'tbfx',
  },
  {
    label: '环比分析',
    value: 'hbfx',
  },
];
const btnValue = ref<string>('24h');

const closePop = () => {
  emits('close');
};

const stationInfo = ref<Record<string, any>>({});
// 查询水质监测站
const getData = (params: any) => {
  // getWaterQualityDetail(params)
  //   .then((result) => {
  //     const { data } = result.data;
  //     stationInfo.value = data;
  //   })
  //   .catch((err) => {
  //     throw err;
  //   });
};

// 按钮点击事件
const btnClick = (item: any) => {
  btnValue.value = item.value;
};

// 水质监测站对象监听
watch(
  () => props.popupData,
  (newVal: any) => {
    const params = {
      // time: dayjs(newVal.currentTime.value, 'MM-DDHHmmss').format('YYYYMMDDHH'),
    };
    // getData(params);
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
#water-quality-device-popup {
  width: 4.3rem;
  height: 5.8rem;
  padding: 0.02rem 0.18rem;
  font-size: 0.16rem;
  background-color: transparent;
  background-image: url('@/assets/images/map2d/water-station-popup-bg.png');
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

      .title-mark {
        width: 0.56rem;
        font-size: 0.12rem;
        line-height: 0.16rem;
        color: #fff;
        text-align: center;
        background: #ff1515;
        border-radius: 0.02rem;
      }

      .sub-title {
        color: rgba($color: #000, $alpha: 40%);
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

    .title-location {
      margin-right: 1rem;
      font-size: 0.14rem;
      color: #cdddf1;

      .icon {
        width: 0.16rem;
        height: 0.16rem;
      }
    }
  }

  .content {
    padding: 0;
    font-family: Alibaba-PuHuiTi-Regular, sans-serif;

    .carousel-container {
      position: relative;
      height: 15%;
      margin-top: 0.1rem;

      :deep(.ant-carousel) {
        height: 100%;
        overflow: hidden;

        .slick-slide {
          height: 1.15rem;
          line-height: 1.15rem;
          text-align: center;

          div {
            width: 100%;
            height: 100%;
          }
        }
      }

      .carousel-item {
        box-sizing: border-box;
        display: flex !important;
        justify-content: space-between;
        width: 100%;
        height: 86%;
        padding: 0 0.18rem;

        .item-detail {
          width: 45%;
          height: 100%;
          padding: 0.08rem;
          background-size: 100% 100%;

          .detail-img {
            width: 99%;
            height: 99%;
          }
        }
      }

      .custom-slick-arrow {
        position: absolute;
        top: 0.4rem;
        width: 0.3rem;
        height: 0.3rem;

        &.left {
          left: 0;
          cursor: pointer;
          background-size: 100% 100%;
        }

        &.right {
          right: 0;
          cursor: pointer;
          background-size: 100% 100%;
        }
      }
    }

    .sec6 {
      margin-bottom: 0.1rem;

      .sec4 {
        display: flex;
        justify-content: space-between;

        .content-top-title {
          margin-top: 0;
          font-family: Source-KeynoteartHans, sans-serif;
          font-size: 0.16rem;
          font-weight: 400;
          line-height: 0.16rem;
          color: #fff;
          text-shadow: 0 0 10.02rem rgb(0 0 0 / 56%);
        }

        .time {
          font-family: 'Alibaba PuHuiTi', sans-serif;
          font-size: 0.14rem;
          font-weight: 400;
          color: #d1d1d1;
        }
      }

      .split {
        width: 100%;
        height: 0.04rem;
        background: linear-gradient(180deg, #1395ff 0%, rgb(19 149 255 / 0%) 100%);
        border-radius: 0;
        box-shadow: 0 0.01rem 0.04rem 0 #1395ff;
        opacity: 1;
      }
    }

    .sec1 {
      display: flex;
      align-items: center;
      height: 0.45rem;
      padding: 0 0.2rem;
      font-size: 0.16rem;
      font-weight: 400;
      color: #fff;
    }

    .flex {
      display: flex;
      justify-content: space-around;
      padding: 0 0.2rem;

      .left,
      .horizental {
        display: flex;
        flex-direction: column;

        .sec2,
        .sec5 {
          height: 0.34rem;
          font-family: 'Alibaba PuHuiTi', sans-serif;
          font-size: 0.14rem;
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
          // width: 31%;
        }
      }

      .horizental {
        display: flex;
        flex-direction: row;
        gap: 0.6rem;
        justify-content: flex-start;
        width: 100%;
        padding: 0 0.1rem;

        .sec5 {
          .value1 {
            font-size: 0.12rem;
          }
        }
      }
    }
  }

  .content-bottom {
    .btns {
      display: flex;
      gap: 0.08rem;
      justify-content: flex-start;

      .btn {
        font-family: 'Alibaba PuHuiTi', sans-serif;
        font-size: 0.14rem;

        // font-weight: 400;
        color: #34f0e6;
        background-color: transparent;
        background-image: url('@/assets/images/map2d/wqi-pop-btn.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-width: 0;

        &.select {
          color: #fff;
          background-image: url('@/assets/images/map2d/wqi-pop-btn-sel.png');
        }
      }
    }
  }
}
</style>
