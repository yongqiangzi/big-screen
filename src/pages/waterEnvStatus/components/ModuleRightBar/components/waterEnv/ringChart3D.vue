<template>
  <div :id="id" style="width: 100%; height: 100%"></div>
</template>
<script>
import highcharts from 'highcharts';
import fontChart from '@/utils/echartPxToRem';

export default {
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    opacity: {
      type: Number,
      default: 1,
    },
    depth: {
      type: Number,
      default: 10,
    },
    id: {
      type: String,
      default: 'ring-chart-env',
    },
  },
  watch: {
    dataList() {
      this.$nextTick(() => {
        this.initOption();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initOption();
    });
  },
  methods: {
    initOption() {
      highcharts.chart(this.id, {
        chart: {
          animation: false,
          backgroundColor: 'none',
          type: 'pie', // 饼图
          margin: [0, 0, 0, 0],
          options3d: {
            enabled: true, // 使用3d功能
            alpha: 60, // 延y轴向内的倾斜角度
            beta: 0,
          },
        },
        tooltip: {
          enabled: false,
        },
        legend: {
          enabled: true, // 关闭图例
          align: 'center', // 水平方向位置
          verticalAlign: 'bottom', // 垂直方向位置
          x: -65,
          y: 30,
          symbolWidth: 20,
          symbolHeight: 10,
          symbolRadius: 1,
          itemMarginBottom: fontChart(8),
          useHTML: true,
          itemDistance: 10,
          itemStyle: { color: '#fff' },
        },
        title: {
          // enabled: false,
          text: '',
        },
        subtitle: {
          text: '',
        },
        plotOptions: {
          pie: {
            opacity: this.opacity,
            allowPointSelect: false, // 禁用点击
            cursor: 'pointer',
            depth: this.depth,
            showInLegend: true,
            size: '75%', // 外圈直径大小
            innerSize: '75%', // 内圈直径大小
            center: ['30%', '20%'],
            // colors: ['#2577CB', '#564AF1', '#229DAD', '#4EA6D8', '#3CD495', '#A7D2EA'],
            colors: ['#EBB914', '#98FF74', '#96FAFF'],
            dataLabels: {
              // useHTML: false,
              enabled: true, // 是否显示饼图的线形tip
              distance: 1,
              align: 'center',
              // verticalAlign: 'top',
              position: 'right',
              format: '{point.y} %',
              style: {
                color: '#fff',
                fontSize: '12px',
              },
            },
          },
        },
        credits: {
          enabled: false, // 禁用版权信息
        },
        series: [
          {
            type: 'pie',
            name: '数量',
            data: this.dataList,
          },
        ],
      });
    },
    handleDataShow(data) {
      // console.log(this.legendList);
    },
  },
};
</script>
<style lang="scss" scoped>
#inshore-water-chart,
#inshore-water-chart-bak,
#water-information-chart,
#water-information-chart-bak {
  width: 4rem !important;
  height: 1.1rem !important;

  :deep(.highcharts-3d-chart) {
    font-size: 0.12rem;

    .highcharts-root {
      pointer-events: visible;

      .highcharts-label {
        font-size: 0.12rem;
      }
    }
  }
}

.legend-list {
  position: absolute;
  right: 0.3rem;
  bottom: 0.3rem;
  display: flex;
  gap: 0.15rem;

  .legend-item {
    display: flex;

    // align-items: center;
    gap: 0.02rem;
    font-family: Alibaba-PuHuiTi-Regular, sans-serif;
    font-size: 0.09rem;
    font-weight: 400;
    line-height: 0.09rem;
    color: #e1f2ff;
    cursor: pointer;

    .item-icon {
      width: 0.1rem;
      height: 0.06rem;
      margin-top: 0.01rem;
      border-radius: 0.01rem;
      opacity: 1;
    }

    .icon-fish {
      background: #4ea6d8;
    }

    .icon-fuyou {
      background: #3cd495;
    }

    .icon-diqi {
      background: #a7d2ea;
    }
  }
}
</style>
