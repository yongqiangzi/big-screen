// eslint-disable-next-line max-classes-per-file
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Fill, Style, Stroke, Text } from 'ol/style.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { DEVICE_PIXEL_RATIO } from 'ol/has.js';
import WebGLVectorLayerRenderer from 'ol/renderer/webgl/VectorLayer.js';
import Layer from 'ol/layer/Layer.js';

class PolygonLayer {
  constructor(options) {
    this.map = options.map;
    this.options = options;

    this.geojsonLayers = {};
    this.geojsonSources = {};

    // 弹窗
    this.overlay = null;
    [this.container] = document.getElementsByClassName('ol-popup');
    [this.content] = document.getElementsByClassName('popup-content');
    [this.closer] = document.getElementsByClassName('ol-popup-closer');

    // 行政区划polygon样式
    this.regionLayerStyle = (feature) => {
      // renderer's pixel ratio
      const pixelRatio = DEVICE_PIXEL_RATIO;
      // Generate a rainbow gradient
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const gradient = context.createLinearGradient(0, 0, 1024 * pixelRatio, 0);
      // const gradient = context.createRadialGradient(1100, 100, 500, 1000, 500, 700);
      // const gradient = context.createConicGradient(0, 1100, 1100);
      gradient.addColorStop(0, 'red');
      // gradient.addColorStop(1 / 6, 'orange');
      gradient.addColorStop(0.2, 'yellow');
      gradient.addColorStop(0.4, 'green');
      // gradient.addColorStop(0.6, 'aqua');
      gradient.addColorStop(0.8, 'blue');
      gradient.addColorStop(1, 'green');
      return new Style({
        stroke: new Stroke({
          color: '#48d1cc',
          width: 2,
        }),
        fill: new Fill({
          // color: gradient,
          color: 'rgba(19, 100, 156, 0.7)',
        }),
        text: new Text({
          text: feature.getProperties().name ?? '',
          color: '#fff',
          font: 'bold 16px Alibaba PuHuiTi',
          fill: new Fill({
            color: [255, 255, 255, 1],
          }),
          // backgroundFill: new Fill({
          //   color: [88, 255, 255, 1],
          // }),
          // backgroundStroke: new Stroke({
          //   color: 'rgba(255,255,255, 0.9)',
          //   width: 1,
          // }),
        }),
      });
    };
    // 河流polygon样式
    this.riverLayerStyle = () => {
      return new Style({
        stroke: new Stroke({
          color: '#48d1cc',
          width: 2,
        }),
        fill: new Fill({
          color: '#63FBF8',
        }),
      });
    };
  }

  // 添加geoJson图层
  addVectorByGeoJson(geoJson, { style, layerId, zIndex = 200, callback }) {
    this.geojsonSources[layerId] = new VectorSource();
    this.geojsonLayers[layerId] = new VectorLayer({
      id: layerId,
      zIndex,
      style: style ?? this.regionLayerStyle,
    });
    this.geojsonLayers[layerId].id = layerId;
    this.map.addLayer(this.geojsonLayers[layerId]);
    const features = new GeoJSON().readFeatures(geoJson);
    this.geojsonSources[layerId].addFeatures(features);
    this.geojsonLayers[layerId].setSource(this.geojsonSources[layerId]);

    // 增加点击事件
    // this.pointClick = this.map.on('click', (evt) => {
    //   this.map.forEachFeatureAtPixel(
    //     evt.pixel,
    //     (feature) => {
    //       // 点击统一回调函数
    //       feature.setProperties({ lon: evt.coordinate[0], lat: evt.coordinate[1] });
    //       typeof callback === 'function' && callback(feature, layerId);
    //       return undefined;
    //     },
    //     // 点击绑定指定图层
    //     { layerFilter: (layer) => layer.id === layerId },
    //   );
    // });
    // // pointermove指定监听站点图层，优化光标捕捉卡顿问题
    // this.map.on('pointermove', (evt) => {
    //   this.map.getTargetElement().style.cursor = this.map.hasFeatureAtPixel(evt.pixel, {
    //     layerFilter: (layer) => layer.id === layerId,
    //   })
    //     ? 'pointer'
    //     : '';
    // });
  }

  addWebglVectorByGeoJson(geoJson, { style, layerId, zIndex = 200, callback }) {
    const styleWebGL = {
      'stroke-color': ['*', ['get', 'COLOR'], [73, 255, 251]],
      'stroke-width': 1,
      'stroke-offset': 0,
      'fill-color': ['*', ['get', 'COLOR'], [99, 251, 248, 1]],
    };
    class WebGLLayer extends Layer {
      createRenderer() {
        return new WebGLVectorLayerRenderer(this, {
          style: styleWebGL,
        });
      }
    }

    this.geojsonSources[layerId] = new VectorSource();
    this.geojsonLayers[layerId] = new WebGLLayer({
      id: layerId,
      zIndex,
      // style: style ?? this.regionLayerStyle,
    });
    this.geojsonLayers[layerId].id = layerId;
    this.map.addLayer(this.geojsonLayers[layerId]);
    const features = new GeoJSON().readFeatures(geoJson);
    this.geojsonSources[layerId].addFeatures(features);
    this.geojsonLayers[layerId].setSource(this.geojsonSources[layerId]);

    // 增加点击事件
    this.pointClick = this.map.on('click', (evt) => {
      this.map.forEachFeatureAtPixel(
        evt.pixel,
        (feature) => {
          // 点击统一回调函数
          feature.setProperties({ lon: evt.coordinate[0], lat: evt.coordinate[1] });
          typeof callback === 'function' && callback(feature, layerId);
          return undefined;
        },
        // 点击绑定指定图层
        { layerFilter: (layer) => layer.id === layerId },
      );
    });
    // pointermove指定监听站点图层，优化光标捕捉卡顿问题
    // this.map.on('pointermove', (evt) => {
    //   this.map.getTargetElement().style.cursor = this.map.hasFeatureAtPixel(evt.pixel, {
    //     layerFilter: (layer) => layer.id === layerId,
    //   })
    //     ? 'pointer'
    //     : '';
    // });
  }
}
export default PolygonLayer;
