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

const chartType = 'line';
const chartId = 'tbfx';
const chartData = ref({});

const initChart = (indicatorValue: string | undefined) => {
  if (indicatorValue === 'hn') {
    chartData.value = {
      xlist: [
        '1号',
        '2号',
        '3号',
        '4号',
        '5号',
        '6号',
        '7号',
        '8号',
        '9号',
        '10号',
        '11号',
        '12号',
        '13号',
        '14号',
        '15号',
        '16号',
        '17号',
        '18号',
        '19号',
        '20号',
        '21号',
        '22号',
        '23号',
        '24号',
        '25号',
      ],
      yparamList: [
        {
          name: '去年本月',
          ylist: [
            0.0722, 0.1174, 0.1471, 0.1599, 0.1297, 0.1101, 0.059, 0.0748, 0.0998, 0.1191, 0.0728,
            0.0508, 0.0524, 0.0934, 0.0388, 0.0361, 0.0399, 0.1208, 0.0754, 0.0731, 0.1295, 0.1089,
            0.0767, 0.0871, 0.0978,
          ],
        },
        {
          name: '本月',
          ylist: [
            0.0346, 0.05, 0.0574, 0.0701, 0.0747, 0.058, 0.0587, 0.0526, 0.0474, 0.0405, 0.0376,
            0.0401, 0.0372, 0.0425, 0.0367, 0.0672, 0.0353, 0.0441, 0.049, 0.0515, 0.1127, 0.0822,
            0.0975, 0.0435, 0.0572,
          ],
        },
      ],
    };
  }
  if (indicatorValue === 'p') {
    chartData.value = {
      xlist: [
        '1号',
        '2号',
        '3号',
        '4号',
        '5号',
        '6号',
        '7号',
        '8号',
        '9号',
        '10号',
        '11号',
        '12号',
        '13号',
        '14号',
        '15号',
        '16号',
        '17号',
        '18号',
        '19号',
        '20号',
        '21号',
        '22号',
        '23号',
        '24号',
        '25号',
      ],
      yparamList: [
        {
          name: '去年本月',
          ylist: [
            0.1139, 0.1143, 0.1047, 0.1076, 0.103, 0.1022, 0.1037, 0.1251, 0.1058, 0.0856, 0.0651,
            0.0807, 0.08, 0.0792, 0.0708, 0.0667, 0.0633, 0.0818, 0.0806, 0.0841, 0.0901, 0.0918,
            0.0874, 0.0861, 0.0806,
          ],
        },
        {
          name: '本月',
          ylist: [
            0.0467, 0.054, 0.0496, 0.0499, 0.0509, 0.0462, 0.0471, 0.041, 0.041, 0.0396, 0.0395,
            0.0419, 0.044, 0.0414, 0.0404, 0.0531, 0.0513, 0.0538, 0.0529, 0.051, 0.0527, 0.0498,
            0.053, 0.0499, 0.0526,
          ],
        },
      ],
    };
  }
  if (indicatorValue === 'ph') {
    chartData.value = {
      xlist: [
        '1号',
        '2号',
        '3号',
        '4号',
        '5号',
        '6号',
        '7号',
        '8号',
        '9号',
        '10号',
        '11号',
        '12号',
        '13号',
        '14号',
        '15号',
        '16号',
        '17号',
        '18号',
        '19号',
        '20号',
        '21号',
        '22号',
        '23号',
        '24号',
        '25号',
      ],
      yparamList: [
        {
          name: '去年本月',
          ylist: [
            8.9817, 8.9133, 8.8067, 8.8433, 9.0133, 8.87, 8.9917, 9.184, 8.924, 8.6775, 9.0183,
            9.1117, 9.1767, 9.2217, 9.2033, 9.166, 9.102, 9.04, 8.9967, 8.9867, 8.9583, 8.945,
            8.975, 9.0317, 9.0733,
          ],
        },
        {
          name: '本月',
          ylist: [
            9.0233, 8.9883, 8.9667, 8.86, 8.8217, 8.884, 8.8633, 8.7883, 8.835, 8.89, 8.8767,
            8.7783, 8.8133, 8.8667, 8.8517, 8.7267, 8.8683, 8.845, 8.81, 8.8633, 8.862, 8.95, 8.96,
            8.9583, 8.9167,
          ],
        },
      ],
    };
  }
  if (indicatorValue === 'cod') {
    chartData.value = {
      xlist: [
        '1号',
        '2号',
        '3号',
        '4号',
        '5号',
        '6号',
        '7号',
        '8号',
        '9号',
        '10号',
        '11号',
        '12号',
        '13号',
        '14号',
        '15号',
        '16号',
        '17号',
        '18号',
        '19号',
        '20号',
        '21号',
        '22号',
        '23号',
        '24号',
        '25号',
      ],
      yparamList: [
        {
          name: '去年本月',
          ylist: [
            9.7902, 9.6898, 8.9178, 8.2753, 5.7373, 11.3187, 12.6575, 14.57, 11.9398, 10.2038,
            13.009, 13.6348, 14.0798, 13.6688, 13.3972, 12.8094, 11.9096, 10.807, 10.5423, 10.7158,
            11.1953, 11.3735, 12.0335, 12.6578, 13.0863,
          ],
        },
        {
          name: '本月',
          ylist: [
            10.9398, 11.0665, 10.7712, 9.8812, 9.5598, 10.2202, 9.9573, 9.7913, 10.1283, 10.7062,
            10.8007, 10.2443, 10.5892, 10.7888, 11.2927, 11.183, 12.6207, 12.7207, 12.2987, 12.9252,
            13.3554, 14.294, 14.5238, 13.0013, 12.3063,
          ],
        },
      ],
    };
  }
  if (indicatorValue === 'ntu') {
    chartData.value = {
      xlist: [
        '1号',
        '2号',
        '3号',
        '4号',
        '5号',
        '6号',
        '7号',
        '8号',
        '9号',
        '10号',
        '11号',
        '12号',
        '13号',
        '14号',
        '15号',
        '16号',
        '17号',
        '18号',
        '19号',
        '20号',
        '21号',
        '22号',
        '23号',
        '24号',
        '25号',
      ],
      yparamList: [
        {
          name: '去年本月',
          ylist: [
            0.1139, 0.1143, 0.1047, 0.1076, 0.103, 0.1022, 0.1037, 0.1251, 0.1058, 0.0856, 0.0651,
            0.0807, 0.08, 0.0792, 0.0708, 0.0667, 0.0633, 0.0818, 0.0806, 0.0841, 0.0901, 0.0918,
            0.0874, 0.0861, 0.0806,
          ],
        },
        {
          name: '本月',
          ylist: [
            0.0467, 0.054, 0.0496, 0.0499, 0.0509, 0.0462, 0.0471, 0.041, 0.041, 0.0396, 0.0395,
            0.0419, 0.044, 0.0414, 0.0404, 0.0531, 0.0513, 0.0538, 0.0529, 0.051, 0.0527, 0.0498,
            0.053, 0.0499, 0.0526,
          ],
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
