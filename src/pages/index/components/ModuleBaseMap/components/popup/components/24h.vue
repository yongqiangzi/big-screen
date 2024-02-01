<template>
  <section class="sec">
    <WaterIndicatorRadioGroupVue @radioChange="radioChange"></WaterIndicatorRadioGroupVue>
    <PieLineChart :chartId="chartId" :chartData="chartData" :chartType="chartType"></PieLineChart>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WaterIndicatorRadioGroupVue from './waterIndicatorRadioGroup.vue';
import PieLineChart from './pieLineChart.vue';

const props = defineProps(['pointInfo']);

const chartType = 'line';
const chartId = '24h';
const chartData = ref({});

const initChart = (indicatorValue: string | undefined) => {
  if (indicatorValue === 'hn') {
    chartData.value = {
      xlist: ['12:00', '16:00', '20:00', '0:00', '4:00', '8:00'],
      yparamList: [
        {
          name: '',
          ylist: [0.0528, 0.06, 0.0466, 0.0665, 0.0493, 0.0559],
        },
      ],
    };
  }
  if (indicatorValue === 'p') {
    chartData.value = {
      xlist: ['12:00', '16:00', '20:00', '0:00', '4:00', '8:00'],
      yparamList: [
        {
          name: '',
          ylist: [0.0518, 0.0514, 0.0558, 0.0529, 0.0526, 0.0523],
        },
      ],
    };
  }
  if (indicatorValue === 'ph') {
    chartData.value = {
      xlist: ['12:00', '16:00', '20:00', '0:00', '4:00', '8:00'],
      yparamList: [
        {
          name: '',
          ylist: [8.96, 9.02, 8.96, 8.91, 8.91, 8.93],
        },
      ],
    };
  }
  if (indicatorValue === 'ntu') {
    chartData.value = {
      xlist: ['12:00', '16:00', '20:00', '0:00', '4:00', '8:00'],
      yparamList: [
        {
          name: '',
          ylist: [13.059, 12.104, 12.148, 12.134, 12.266, 12.519],
        },
      ],
    };
  }
  if (indicatorValue === 'cod') {
    chartData.value = {
      xlist: ['12:00', '16:00', '20:00', '0:00', '4:00', '8:00'],
      yparamList: [
        {
          name: '',
          ylist: [5.524, 5.765, 5.867, 5.727, 5.981, 5.511],
        },
      ],
    };
  }
};

const radioChange = (indicatorValue: any) => {
  initChart(indicatorValue);
};

onMounted(() => {
  initChart('p');
});
</script>

<style lang="scss" scoped>
.sec {
  display: flex;
  flex-direction: row;
  height: 2.3rem;
  padding: 0.08rem 0;
}
</style>
