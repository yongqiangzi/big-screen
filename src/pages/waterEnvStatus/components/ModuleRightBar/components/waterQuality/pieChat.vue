<template>
  <div class="pie-chat">
    <section :id="chartID" class="chart left"></section>
    <section class="right" v-show="showLegend">
      <ul>
        <li v-for="(item, index) in legendList" :key="index">
          <span class="left-type-color" :style="{ background: colorList1[index] }" />
          <span class="left-type-name">{{ item }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [
      {
        name: '',
        value: 2,
      },
      {
        name: '',
        value: 6,
      },
    ],
  },
  chartTotal: {
    type: String,
    default: '',
  },
  chartText: {
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
});
const emits = defineEmits(['stopAutoScroll']);

// 图表对象
const pieChart = ref<any>();
// 图表配置
const chartOption = ref<any>({
  legend: {
    top: '30%',
    left: 'center',
    show: false,
  },
  series: [
    {
      name: 'seriesFrom',
      type: 'pie',
      radius: ['65%', '100%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 2,
      },
      label: {
        position: 'center',
        show: true,
        // position: 'inside', // 将标签显示在内部
        formatter: (params: any) => {
          return `${props.chartText}\n${props.chartTotal}`;
        },
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 10,
          lineHeight: 15,
          formatter: (params: any) => {
            return `${params.name}\n${params.value}${props.chartUnit}`;
          },
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
const colorList1 = ['#5BD39F', '#FFBA0A', '#0AFF6C', '#0AF9FF', '#1099FD', '#4D42D8', '#D7D7D7'];
const colorList2 = ['#B5DEC8', '#53A3F1', '#6BDA41', '#FAE44D', '#E78131', '#B5261C', '#D7D7D7'];
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

  chartOption.value.series[0].data = props.chartData;
  // chartOption.value.series[0].label.formatter = () => {
  //   return `${props.chartTotal}亿m³\n ${props.chartText}`;
  // };
  chartOption.value.series[0].label.fontSize = 15;
  chartOption.value.series[0].label.lineHeight = 0;
  chartOption.value.series[0].label.color = '#FFFFFF';
  chartOption.value.series[0].color = props.showLegend ? colorList1 : colorList2;
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
  () => props.chartData,
  (data: any) => {
    legendList.value = [];
    // 随机生成图表的id，避免报错
    chartID.value = generateRandomString(5);

    nextTick(() => {
      data.forEach((item: any) => {
        legendList.value.push(item.name);
      });
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
  display: flex;
  width: 100%;
  height: 100%;

  .save-water,
  .waster-water {
    display: flex;
    flex: 1;
  }

  .left {
    width: 1rem;
    height: 1rem;
  }

  .right {
    flex: 1;

    ul {
      li {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 0.2rem;
        padding-left: 0.2rem;

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
