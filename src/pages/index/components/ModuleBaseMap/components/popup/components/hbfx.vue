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
const chartId = 'hbfx';
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
          name: '上月',
          ylist: [
            0.0305, 0.04, 0.0343, 0.0436, 0.0779, 0.0698, 0.0947, 0.0781, 0.0921, 0.0913, 0.1038,
            0.1356, 0.1361, 0.1152, 0.1246, 0.0844, 0.1049, 0.092, 0.0882, 0.0788, 0.054, 0.0909,
            0.1249, 0.1033, 0.0768,
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
          name: '上月',
          ylist: [
            0.0598, 0.0609, 0.0526, 0.0558, 0.0614, 0.0622, 0.0851, 0.073, 0.0647, 0.0693, 0.072,
            0.0734, 0.0715, 0.0651, 0.0617, 0.0573, 0.0655, 0.0644, 0.0539, 0.0526, 0.0504, 0.0486,
            0.0463, 0.0489, 0.0467,
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
          name: '上月',
          ylist: [
            9.4962, 8.2445, 8.9326, 6.9744, 4.7665, 6.5312, 6.1393, 6.6193, 6.1093, 7.0702, 7.282,
            7.8078, 8.2663, 8.7453, 9.0337, 9.8348, 8.9046, 9.9772, 10.3622, 10.9632, 12.4353,
            12.1658, 10.1497, 10.0578, 10.2402,
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
          name: '上月',
          ylist: [
            8.7633, 8.8017, 9.09, 8.968, 8.8333, 8.885, 8.7667, 8.785, 8.735, 8.7067, 8.5333,
            8.4683, 8.4317, 8.5017, 8.5267, 8.5767, 8.466, 8.596, 8.6367, 8.7517, 8.9733, 9.0267,
            8.9583, 9.0083, 9.005,
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
