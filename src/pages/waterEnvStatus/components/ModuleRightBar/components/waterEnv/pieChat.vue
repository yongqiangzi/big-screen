<template>
  <div class="pie-chat" :style="{ width: chartContainerSize, height: chartContainerSize }">
    <section
      :id="chartID"
      class="chart left"
      :style="{ width: chartSize, height: chartSize }"
      v-show="chartSize"
    ></section>
    <section class="right" v-show="showLegend">
      <ul>
        <li v-for="(item, index) in legendList" :key="index">
          <span class="left-type-color" :style="{ background: colorList1[index] }" />
          <span class="left-type-name">{{ item }}</span>
        </li>
      </ul>
    </section>
    <section class="title" v-if="size === 'small'">{{ name }}</section>
    <section class="title" v-else>
      对比值: {{ chartText.contrast }} 目标值: {{ chartText.target }}%
    </section>
    <section class="split-line" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick, computed } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
  chartText: {
    type: Object,
    default: () => ({}),
  },
  chartValue: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  showLegend: {
    type: Boolean,
    default: true,
  },
  chartUnit: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'small',
  },
});
const emits = defineEmits(['stopAutoScroll']);

const chartContainerSize = computed(() => (props.size === 'small' ? '0.68rem' : '0.92rem'));
const chartSize = computed(() => (props.size === 'small' ? '0.48rem' : '0.7rem'));
const titleColor = computed(() => (props.size === 'small' ? '#7a8b96' : '#fff'));
const titleWidth = computed(() => (props.size === 'small' ? '0.825rem' : '1.6rem'));
const titleLeft = computed(() => (props.size === 'small' ? '-0.08rem' : '-0.25rem'));
const titleMargin = computed(() => (props.size === 'small' ? '0.2rem' : '0.25rem'));
// 图表对象
const pieChart = ref<any>();
// 图表配置
const chartOption = ref<any>({
  legend: {
    // top: '25%',
    left: 'center',
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
        formatter: (params: any) => `${props.chartValue}%`,
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
const colorList2 = ['#FFBA0A', '#354857'];
const colorList3 = ['#0AFF6C', '#354857'];
// 图表id
const chartID = ref<string>('chart-1');
/**
 * 初始化图表
 * @returns {void}
 */
const initCharts = (id: string): void => {
  if (!pieChart.value) {
    const container = document.getElementById(id) as HTMLElement;
    pieChart.value = echarts.init(container);
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

  // console.log(chartOption.value.series[0].data, 'chartOption.value.series[0].data');
  // chartOption.value.series[0].label.formatter = () => {
  //   return `${props.chartTotal}亿m³\n ${props.chartText}`;
  // };
  chartOption.value.series[0].label.fontSize = 10;
  chartOption.value.series[0].label.color = '#FFFFFF';
  let color = colorList1;
  if (props.name === '湖泊型供水占比') {
    color = colorList2;
  } else if (props.name === '水库型供水占比') {
    color = colorList3;
  }
  chartOption.value.series[0].color = color;
  pieChart.value.setOption(chartOption.value);

  // 鼠标移入移出图表时动态修改内容
  pieChart.value.on('mouseover', { seriesName: 'seriesFrom' }, () => {
    emits('stopAutoScroll', true);
    chartOption.value.series[0].label.show = false;
    pieChart.value.setOption(chartOption.value);
  });

  pieChart.value.on('mouseout', { seriesName: 'seriesFrom' }, () => {
    emits('stopAutoScroll', false);
    chartOption.value.series[0].label.show = true;
    pieChart.value.setOption(chartOption.value);
  });
};

const legendList = ref<any>([]);

// 生成随机数
const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 包含大小写字母和数字的所有字符集合
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // 获取随机索引值
    const randomChar = characters[randomIndex]; // 根据索引值从字符集合中选择对应的字符

    result += randomChar; // 将当前字符添加到结果字符串中
  }
  return result;
};

watch(
  () => props.chartValue,
  (data: any) => {
    legendList.value = [];
    // 随机生成图表的id，避免报错
    chartID.value = generateRandomString(5);

    nextTick(() => {
      // data.forEach((item: any) => {
      //   legendList.value.push(item.name);
      // });
      initCharts(chartID.value);
      // pieChart.value.setOption(chartOption.value);
    });
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
  pieChart.value?.resize();
};

onMounted(() => {
  initCharts(chartID.value);
  // pieChart.value.setOption(chartOption.value);
  window.addEventListener('resize', reSize);
});

onUnmounted(() => {
  echarts.dispose(pieChart.value);
  pieChart.value = {};
  window.removeEventListener('resize', reSize);
});
</script>

<style lang="scss" scoped>
.pie-chat {
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

  .title {
    position: relative;
    left: v-bind('titleLeft');
    width: v-bind('titleWidth');
    margin-top: v-bind('titleMargin');
    font-size: 10.5px;
    color: v-bind('titleColor');
    text-align: center;
  }
}
</style>
