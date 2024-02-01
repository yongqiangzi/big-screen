<template>
  <div class="light-ring-chart" :style="{ width: chartContainerSize, height: chartContainerSize }">
    <section
      :id="chartID"
      class="chart left"
      :style="{ width: chartSize, height: chartSize }"
      v-show="chartSize"
    ></section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick, computed } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  chartID: {
    type: String,
    default: '',
  },
  chartValue: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'small',
  },
});

const chartContainerSize = computed(() => (props.size === 'small' ? '0.68rem' : '0.92rem'));
const chartSize = computed(() => (props.size === 'small' ? '0.48rem' : '0.7rem'));
// 图表对象
const ringChart = ref<any>();
// 图表配置
const chartOption = ref<any>({
  legend: {
    show: false,
  },
  series: [
    {
      name: 'seriesFrom',
      type: 'pie',
      radius: ['75%', '100%'],
      avoidLabelOverlap: false,
      label: {
        position: 'center',
        show: true,
        // position: 'inside', // 将标签显示在内部
        formatter: () => `${props.chartValue}%`,
      },
      emphasis: {
        label: {
          show: false,
        },
        scale: false,
        // focus: 'self',//在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果
      },
      labelLine: {
        show: false,
      },
      data: [],
      color: ['#2391FF', '#0AF9FF'],
    },
  ],
});

const colorList1 = ['#0AF9FF', '#354857'];
/**
 * 初始化图表
 * @returns {void}
 */
const initCharts = (): void => {
  if (!ringChart.value) {
    const container = document.getElementById(props.chartID) as HTMLElement;
    ringChart.value = echarts.init(container);
  }
  chartOption.value.series[0].data = [
    {
      name: '',
      value: Number(props.chartValue),
    },
    {
      name: '',
      value: 100 - Number(props.chartValue),
    },
  ];

  chartOption.value.series[0].label.fontSize = 10;
  chartOption.value.series[0].label.color = '#FFFFFF';
  const color = colorList1;
  chartOption.value.series[0].color = color;
  ringChart.value.setOption(chartOption.value);
};

watch(
  () => props.chartValue,
  (value: any) => {
    if (value) {
      nextTick(() => {
        initCharts();
      });
    }
  },
  {
    immediate: true,
  },
);

/**
 * echats重绘
 * @returns {void}
 */
const reSize = () => {
  ringChart.value?.resize();
};

onMounted(() => {
  initCharts();
  window.addEventListener('resize', reSize);
});

onUnmounted(() => {
  echarts.dispose(ringChart.value);
  ringChart.value = {};
  window.removeEventListener('resize', reSize);
});
</script>

<style lang="scss" scoped>
.light-ring-chart {
  height: 100%;
  background: url('@/assets/images/waterEnvScreen/bg_pie_chart.png') no-repeat;
  background-size: 100% 100%;

  .save-water,
  .waster-water {
    display: flex;
    flex: 1;
  }

  .left {
    position: relative;
    top: 0.1rem;
    left: 0.1rem;
    height: 100%;
  }

  .right {
    flex: 1;

    ul {
      li {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 0.2rem;
        padding-left: 0.07rem;

        // margin-bottom: 0.1rem;

        .left-type-color {
          display: inline-block;
          width: 0.14rem;
          height: 0.07rem;
          margin-right: 0.04rem;
          border-radius: 0.02rem;
        }

        .left-type-name {
          font-size: 0.11rem;
          color: #fff;
          text-align: left;
        }
      }
    }
  }
}
</style>
