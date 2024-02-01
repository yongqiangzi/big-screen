/*
 * @Author: 王佳宾
 * @Date: 2023-09-18 09:31:40
 * @LastEditors: 曹健勇
 * @LastEditTime: 2024-01-09 11:33:02
 * @Description: cesium加载热力图
 * @FilePath: \src\utils\cesium\Heatmap\initHeatmap.ts
 */
/* eslint-disable */
import * as Cesium from 'cesium';
import HeatMapToCesium from './CesiumHeatmap';

const areaBound = [121.62049275137885, 29.885687799244657, 121.62205208533366, 29.88641026671694];
const heatMapMax = 100;
const heatMapMin = 0;

/* import * as turf from '@turf/turf';
import GufeiJson from './gufei.json';

const bbox = turf.bbox(GufeiJson);
const PointsTurf = turf.explode(GufeiJson);
const parserPoints: { x: number; y: number; value: number }[] = [];

PointsTurf.features.forEach((dl) => {
  const coord = dl.geometry.coordinates;
  const properties: any = dl.properties;
  const point: any = {
    x: coord[0],
    y: coord[1],
    value: properties['面积'],
  };
  parserPoints.push(point);
}); */

interface HeatMapConfigOptions {
  level: number;
  radius: number;
}

interface PointOptions {
  x: number;
  y: number;
  value: number;
}
const heatMapConfig: HeatMapConfigOptions[] = [
  {
    level: 0,
    radius: 40,
    // gradient: { 0.4: '#006ab4', 0.85: 'green', 0.98: 'yellow', 0.99: 'red' },
  },
  {
    level: 6,
    radius: 80,
  },
  {
    level: 10,
    radius: 70,
  },
  {
    level: 11,
    radius: 50,
  },
  {
    level: 12,
    radius: 30,
  },
  {
    level: 13,
    radius: 20,
  },
  {
    level: 14,
    radius: 10,
  },
  {
    level: 15,
    radius: 5,
  },
];

export default class CesiumHeatMap {
  view: Cesium.Viewer;

  containerElement!: HTMLDivElement;

  heatPrimitive!: Cesium.Primitive;

  heatmapInstance: any;

  heatmapList: { layer: Cesium.ImageryLayer; id: string }[];

  currentHeatMapConfig: HeatMapConfigOptions;

  boundBbox: number[];

  heatMapPoints: any;

  constructor(view: Cesium.Viewer) {
    this.view = view;
    this.heatmapList = [];
    this.currentHeatMapConfig = heatMapConfig[0];
    this.boundBbox = areaBound;
    this.heatMapPoints = [];
    // this.addListenMoveEnd();
  }

  /**
   * @description 根据层级对应参数创建热力图实例
   */
  createHeatMap(bbox: any) {
    if (this.heatmapInstance && this.heatmapInstance._container) {
      document.body.removeChild(this.heatmapInstance._container);
    }
    const heatConfig = {
      // heatmap相应参数
      opacity: 1,
      blur: 1,
      gradient: {
        0.2: 'green',
        0.4: 'green',
        0.7: 'rgba(192, 230, 62, 1)',
        0.9: 'rgba(230, 137, 62, 1)',
        1: 'rgba(230, 62, 62, 1)',
      },
      ...this.currentHeatMapConfig,
    };

    this.heatmapInstance = new HeatMapToCesium(this.view, bbox, heatConfig);
  }

  /**
   * @description 添加热力图图片 - 计算当前的范围
   */
  addImgHeatMap(points: PointOptions[], bbox: any) {
    console.log('bbox', bbox);
    this.createHeatMap(bbox);
    /**
     * Initializes a heatmap instance with a dataset
     * @param {object} data An array of objects, where each item contains lon, lat, value and radius(optional).
     * @param {number} min Min value of the heatmap.
     * @param {number} max Max value of the heatmap.
     */
    const image = new Image();
    // canvas.toDataURL返回的是一串Base64编码的URL,当然,浏览器自己肯定支持
    // 指定格式PNG
    this.heatmapInstance.setWGS84Data(heatMapMin, heatMapMax, points);
    // console.log('image.src', image.src);

    // const imageryProvider = new Cesium.SingleTileImageryProvider({
    //   url: image.src,
    //   rectangle: Cesium.Rectangle.fromDegrees(
    //     this.boundBbox[0],
    //     this.boundBbox[1],
    //     this.boundBbox[2],
    //     this.boundBbox[3],
    //   ),
    // });
    // this.view.imageryLayers.addImageryProvider(imageryProvider);

    // this.heatPrimitive = this.view.scene.primitives.add(
    //   new Cesium.Primitive({
    //     geometryInstances: new Cesium.GeometryInstance({
    //       geometry: new Cesium.RectangleGeometry({
    //         extrudedHeight: 100,
    //         rectangle: Cesium.Rectangle.fromDegrees(
    //           this.boundBbox[0],
    //           this.boundBbox[1],
    //           this.boundBbox[2],
    //           this.boundBbox[3],
    //         ),
    //         vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
    //       }),
    // geometry: new Cesium.PolygonGeometry({
    //   polygonHierarchy: new Cesium.PolygonHierarchy(
    //     Cesium.Cartesian3.fromDegreesArray([
    //       121.62049275137885, 29.886092882499007, 121.62061024143907, 29.88588204962157,
    //       121.62077417849098, 29.88568779924465, 121.62127144145568, 29.8857043815887,
    //       121.62163953824279, 29.88572802955589, 121.62203570180394, 29.88605493298714,
    //       121.62205208533366, 29.88627998534938, 121.621849899904, 29.8864102667169,
    //       121.621055584947, 29.8863439869567, 121.62049275137885, 29.88609288249900,
    //     ]),
    //   ),
    // }),
    //     }),
    //     // appearance: new Cesium.EllipsoidSurfaceAppearance({
    //     //   aboveGround: false,
    //     //   material: new Cesium.Material({
    //     //     fabric: {
    //     //       type: 'Image',
    //     //       uniforms: {
    //     //         image: image.src,
    //     //       },
    //     //     },
    //     //   }),
    //     // }),
    //   }),
    // );
  }

  // 更新热力图
  updateHeatmap(points: PointOptions[]) {
    /**
     * Initializes a heatmap instance with a dataset
     * @param {object} data An array of objects, where each item contains lon, lat, value and radius(optional).
     * @param {number} min Min value of the heatmap.
     * @param {number} max Max value of the heatmap.
     */
    const image = new Image();
    // canvas.toDataURL返回的是一串Base64编码的URL,当然,浏览器自己肯定支持
    // 指定格式PNG
    image.src = this.heatmapInstance.setWGS84Data(heatMapMin, heatMapMax, points).url;
    this.heatPrimitive.appearance.material.uniforms.image = image.src;
  }

  /**
   * @description 删除实例 - 热力图列表
   */
  removeHeatmapList() {
    this.heatmapList.forEach((item) => {
      this.view.imageryLayers.remove(item.layer);
    });
    this.heatmapList = [];
  }

  // /**
  //  * @description 监听地图层级 渲染热力图
  //  */
  // addListenMoveEnd() {
  //   this.view.camera.moveEnd.addEventListener(() => {
  //     if (!this.heatmapList.length) return;
  //     const tileRender = this.view.scene._globe._surface._tilesToRender;
  //     if (tileRender && tileRender.length > 0) {
  //       const level: number = tileRender[0]._level;

  //       // 计算当前的范围
  //       const current = this.getCurrentRadio(level);
  //       // 重绘
  //       if (JSON.stringify(this.currentHeatMapConfig) != JSON.stringify(current)) {
  //         this.currentHeatMapConfig = current;
  //         this.addImgHeatMap(null, { follow: false });
  //       }
  //     }
  //   });
  // }

  /**
   * @description 获取当前层级
   * @param key
   */
  getCurrentRadio(key: number) {
    let current;
    for (let i = 0; i < heatMapConfig.length; i++) {
      const element = heatMapConfig[i];
      if (i == 0 && key <= element.level) {
        current = element;
        break;
      } else if (i == heatMapConfig.length - 1 && key >= element.level) {
        current = element;
        break;
      } else if (key <= heatMapConfig[i + 1].level && key >= element.level) {
        current = element;
        break;
      }
    }

    return current;
  }
}
