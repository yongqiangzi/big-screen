<!--
 * @Author: ziyongqiang
 * @Date: 2023-12-26 11:07:11
 * @LastEditors: PanYunhong
 * @LastEditTime: 2024-01-16 16:23:53
 * @FilePath: \src\pages\index\components\ModuleRightBar\components\ringChart3D.vue
 * @Description:
-->
<template>
  <div id="ring-chart-3d" style="width: 100%; height: 100%"></div>
  <div class="chart-bg"></div>
  <div class="legend-list">
    <div
      class="legend-item"
      v-for="item in legendList"
      :key="item.type"
      @click="handleDataShow(item)"
    >
      <div :class="['item-icon', `icon-${item.type}`]"></div>
      {{ item.name }}
    </div>
  </div>
</template>
<script>
import highcharts from 'highcharts';
import fontChart from '@/utils/echartPxToRem';

export default {
  props: {
    dataList: {
      type: Array,
      default: () => [
        {
          name: '鱼类',
          y: 10,
          h: 0,
          bfb: 0,
        },
        {
          name: '浮游植物',
          y: 6,
          h: 0,
          bfb: 0,
        },

        {
          name: '底栖生物',
          y: 14,
          h: 0,
          bfb: 0,
        },
      ],
    },
    legendList: {
      type: Array,
      default: () => [
        {
          name: '鱼类',
          type: 'fish',
        },
        {
          name: '浮游植物',
          type: 'fuyou',
        },
        {
          name: '底栖生物',
          type: 'diqi',
        },
      ],
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
    this.initOption();
    // window.addEventListener('resize', this.initOption);
  },
  unmounted() {
    // window.removeEventListener('resize', this.initOption);
  },
  methods: {
    initOption() {
      let quantity = 0; // 总数
      this.dataList.forEach((item) => {
        quantity += item.y;
      });
      this.dataList.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.bfb = (item.y / quantity) * 100;
        // eslint-disable-next-line no-param-reassign
        item.h = 0.6 * item.bfb; // 最高高度60，根据比例渲染高度
        // item.h = item.bfb * 1.5 >= 70 ? 70 : item.bfb * 1.5;
      });
      // 修改3d饼图绘制过程
      const { each } = highcharts;
      const { round } = Math;
      const { cos } = Math;
      const { sin } = Math;
      const { deg2rad } = Math;
      highcharts.wrap(highcharts.seriesTypes.pie.prototype, 'translate', function (proceed) {
        // eslint-disable-next-line prefer-rest-params
        proceed.apply(this, [].slice.call(arguments, 1));
        // Do not do this if the chart is not 3D
        if (!this.chart.is3d()) {
          return;
        }
        const series = this;
        const { chart } = series;
        const { options } = chart;
        const seriesOptions = series.options;
        const depth = seriesOptions.depth || 0;
        const { options3d } = options.chart;
        const { alpha } = options3d;
        const { beta } = options3d;
        // eslint-disable-next-line no-underscore-dangle
        let z = seriesOptions.stacking ? (seriesOptions.stack || 0) * depth : series._i * depth;
        z += depth / 2;
        if (seriesOptions.grouping !== false) {
          z = 0;
        }
        each(series.data, function (point) {
          const { shapeArgs } = point;
          let angle;
          // eslint-disable-next-line no-param-reassign
          point.shapeType = 'arc3d';
          const ran = point.options.h;
          shapeArgs.z = z;
          shapeArgs.depth = depth * 0.75 + ran;
          shapeArgs.alpha = alpha;
          shapeArgs.beta = beta;
          shapeArgs.center = series.center;
          shapeArgs.ran = ran;
          // eslint-disable-next-line prefer-const
          angle = (shapeArgs.end + shapeArgs.start) / 2;
          // eslint-disable-next-line no-param-reassign
          point.slicedTranslation = {
            translateX: round(cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)),
            translateY: round(sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)),
          };
        });
      });
      (function (H) {
        H.wrap(highcharts.SVGRenderer.prototype, 'arc3dPath', function (proceed) {
          // eslint-disable-next-line prefer-rest-params
          const ret = proceed.apply(this, [].slice.call(arguments, 1));
          ret.zTop = (ret.zOut + 0.5) / 100;
          return ret;
        });
      })(highcharts);
      highcharts.chart('ring-chart-3d', {
        chart: {
          animation: false,
          backgroundColor: 'none',
          type: 'pie', // 饼图
          margin: [0, 0, 0, 0],
          options3d: {
            enabled: true, // 使用3d功能
            alpha: 65, // 延y轴向内的倾斜角度
            beta: 0,
          },
          events: {
            load() {
              // eslint-disable-next-line no-shadow
              const { each } = highcharts;
              const { points } = this.series[0];
              each(points, function (p, i) {
                p.graphic.attr({
                  translateY: -p.shapeArgs.ran,
                });
                p.graphic.side1.attr({
                  translateY: -p.shapeArgs.ran,
                });
                p.graphic.side2.attr({
                  translateY: -p.shapeArgs.ran,
                });
              });
            },
          },
        },
        tooltip: {
          style: {
            fontSize: '0.14rem',
          },
          formatter: (point) => {
            if (point.chart.hoverPoint.name === '底栖生物') {
              return (
                '<b>底栖生物 19种</b><br>' +
                '昆虫纲 9 种 47.4%<br>' +
                '甲壳纲 4 种 21.1%<br>' +
                '其他 6 种 31.5%'
              );
            }
            if (point.chart.hoverPoint.name === '浮游植物') {
              return (
                '<b>浮游植物 58种</b><br>' +
                '绿藻门 27 种 46.6%<br>' +
                '硅藻门 14 种 24.1%<br>' +
                '蓝藻门 7 种 12.1%<br>' +
                '其他 10种 17.2%'
              );
            }
            if (point.chart.hoverPoint.name === '鱼类') {
              return `<b>鱼类 50种</b><br>土著鱼类 42种 84%<br>其他 8种 16%`;
            }
            return '';
          },
        },
        legend: {
          enabled: false, // 关闭图例
          align: 'right', // 水平方向位置
          verticalAlign: 'bottom', // 垂直方向位置
          layout: 'vertical',
          x: fontChart(-20),
          y: fontChart(30),
          symbolWidth: 40,
          symbolHeight: 20,
          symbolRadius: 1, // 修改成圆
          itemMarginBottom: fontChart(8),
          useHTML: true,
          // labelFormat: '{name}&nbsp;&nbsp;&nbsp;&nbsp;{y}',
          // labelFormatter() {
          //   return `<div style="width: .3125rem;display: inline-block">${this.name}:&nbsp;&nbsp;</div><div style="color: #00d7da;display: inline-block">${this.y}</div>`;
          // },
          // itemStyle: {
          //   color: '#f4f4f6',
          //   fontSize: fontChart(12),
          // },
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
            opacity: 0.9,
            allowPointSelect: false, // 禁用点击
            cursor: 'pointer',
            depth: fontChart(15),
            showInLegend: true,
            size: '75%', // 外圈直径大小
            innerSize: '75%', // 内圈直径大小
            center: ['30%', '50%'],
            // colors: ['#2577CB', '#564AF1', '#229DAD', '#4EA6D8', '#3CD495', '#A7D2EA'],
            colors: ['#4EA6D8', '#3CD495', '#A7D2EA'],
            dataLabels: {
              // useHTML: false,
              enabled: false, // 是否显示饼图的线形tip
              distance: 5,
              borderColor: '#007acc',
              align: 'center',
              // verticalAlign: 'top',
              position: 'right',
              // format: '{point.bfb}%',
              // formatter: (point, b) => {
              //   console.log(point, 'ponit-->>');
              //   console.log(b, 'ponit-->>');
              // },
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
#ring-chart-3d {
  width: 1.5rem !important;
  height: 1.5rem !important;

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

.chart-bg {
  position: absolute;
  bottom: 45px;
  left: 33px;
  z-index: -1;
  width: 1.4rem;
  height: 0.6rem;
  background: url('@/assets/images/mainScreen/bg_ring_chart.png') no-repeat;
  background-size: 100% 100%;
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
