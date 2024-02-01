<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-09 13:41:20
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-09 13:56:58
 * @FilePath: \src\components\SystemInfo\index.vue
 * @Description:
-->
<template>
  <section class="system-info">
    <div class="sys-time">
      <span class="time">{{ date.format('HH:mm:ss') }}</span>
      <span class="date">{{ date.format('YYYY.MM.DD') }}</span>
    </div>
    <div class="divider"></div>
    <div class="weather">
      <div :class="['left', 'weather-icon', activeIcon]"></div>
      <div class="right">
        <span class="text">{{ weatherInfo.weather }}</span>
        <span class="temperature">{{ weatherInfo.temperature }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import dayjs, { type Dayjs } from 'dayjs';
import { queryTodayWeatherByAMap } from '@/api/mainScreen/mainScreen';

const timer = ref<any>(undefined);
const date = ref<Dayjs>(dayjs());
// 天气信息
const weatherInfo = reactive({
  temperature: '',
  weather: '',
});
const weatherIconList: any = {
  晴: 'icon-sunny',
  云: 'icon-cloudy',
  雨: 'icon-rain',
  雷: 'icon-mine',
  雪: 'icon-snow',
};
const activeIcon = ref<string>('icon-sunny');

const queryData = async () => {
  const params = {
    city: '330200',
    key: 'eb2cf6fc9684d1148aaff18dc9208365',
  };
  const res = await queryTodayWeatherByAMap(params);
  const { data } = res;
  const { lives } = data;
  const temperature = Number(lives[0].temperature) ?? 0;
  weatherInfo.temperature = temperature > 0 ? `0-${temperature}°C` : `${temperature}-0°C`;
  weatherInfo.weather = lives[0].weather ?? '';

  // 动态icon设置
  for (const key of Object.keys(weatherIconList)) {
    if (weatherInfo.weather.indexOf(key) > -1) {
      activeIcon.value = weatherIconList[key];
    }
  }
};
queryData();

onMounted(() => {
  timer.value = setInterval(() => {
    date.value = dayjs();
  }, 1000);
});
</script>

<style lang="scss" scoped>
.system-info {
  display: flex;
  align-items: center;
  height: 0.48rem;
  padding-left: 0.16rem;
  color: #fff;

  .sys-time {
    display: flex;
    flex-direction: column;
    gap: 0.02rem;
    align-items: flex-end;
    font-family: Alibaba-PuHuiTi-Regular, sans-serif;
    color: #fff;

    .time {
      font-size: 0.14rem;
      font-weight: 500;
      line-height: 14px;
    }

    .date {
      font-size: 0.12rem;
      font-weight: 400;
      line-height: 12px;
      opacity: 0.8;
    }
  }

  .divider {
    width: 0;
    height: 0.32rem;
    margin: 0 0.16rem;
    border: 1px solid;
    border-radius: 0;
    border-image: linear-gradient(
        180deg,
        rgb(255 255 255 / 0%),
        rgb(255 255 255 / 100%),
        rgb(255 255 255 / 0%)
      )
      1 1;
    opacity: 0.4;
  }

  .weather {
    display: flex;
    gap: 0.03rem;

    .weather-icon {
      width: 0.32rem;
      height: 0.32rem;
      background-size: cover;
    }

    .icon-sunny {
      background: url('@/assets/images/mainScreen/weather/icon-sunny.png');
    }

    .icon-cloudy {
      background: url('@/assets/images/mainScreen/weather/icon-cloudy.png');
    }

    .icon-rain {
      background: url('@/assets/images/mainScreen/weather/icon-rain.png');
    }

    .icon-mine {
      background: url('@/assets/images/mainScreen/weather/icon-mine.png');
    }

    .icon-snow {
      background: url('@/assets/images/mainScreen/weather/icon-snow.png');
    }

    .right {
      display: flex;
      flex-direction: column;
      gap: 0.02rem;
      align-items: flex-end;

      .text {
        font-size: 0.12rem;
        opacity: 0.8;
      }

      .temperature {
        font-size: 0.14rem;
      }
    }
  }
}
</style>
