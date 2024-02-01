import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { Icon, Style } from 'ol/style.js';
import Overlay from 'ol/Overlay.js';
import wqiLevel1 from '@/assets/images/map2d/wqi-level1.png';
import wqiLevel2 from '@/assets/images/map2d/wqi-level2.png';
import wqiLevel3 from '@/assets/images/map2d/wqi-level3.png';
import wqiLevel4 from '@/assets/images/map2d/wqi-level4.png';
import wqiLevel5 from '@/assets/images/map2d/wqi-level5.png';
import wqiLevel6 from '@/assets/images/map2d/wqi-level6.png';
import { getLayerByid, removeLayerByid } from './utils';

class PointLayer {
  constructor(options) {
    this.options = options;
    this.map = options.map;
    this.iconStyle = new Style({
      image: new Icon({
        scale: [0.4, 0.4],
        anchor: [0.5, 126],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: wqiLevel1,
      }),
    });
    // 私有变量
    // 要素数据集合
    this.features = {};
    // 图层数据集合
    this.layers = {};
    // 图层源数据集合
    this.layerSources = {};
    // 地图点击事件
    this.pointClick = null;
    // 弹窗
    this.overlay = null;
    [this.container] = document.getElementsByClassName('ol-popup');
    [this.content] = document.getElementsByClassName('popup-content');
    [this.closer] = document.getElementsByClassName('ol-popup-closer');
  }

  // eslint-disable-next-line class-methods-use-this
  getIconStyle(waterQuality) {
    switch (waterQuality) {
      case 'Ⅰ':
        return wqiLevel1;
      case 'Ⅱ':
        return wqiLevel2;
      case 'Ⅲ':
        return wqiLevel3;
      case 'Ⅳ':
        return wqiLevel4;
      case 'Ⅴ':
        return wqiLevel5;
      case '劣Ⅴ':
        return wqiLevel6;
      default:
        return wqiLevel1;
    }
  }

  // 散点模式
  addMarkers(dataList, { layerId, callback, zIndex = 2002 }) {
    if (!dataList.length) return;
    //
    this.features[layerId] = [];
    this.layers[layerId] = [];
    this.layerSources[layerId] = [];
    // 获取数据，遍历数据
    for (let i = 0; i < dataList.length; i++) {
      const props = dataList[i];
      const { lon, lat } = props;
      const coor = [lon, lat];
      // 定义feature点
      const iconFeature = new Feature({
        geometry: new Point(coor),
        ...props,
      });
      // 给feature点设置样式
      iconFeature.setStyle(
        new Style({
          image: new Icon({
            scale: [0.5, 0.5],
            anchor: [0.5, 126],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: this.getIconStyle(props.waterQuality),
          }),
        }),
      );
      this.features[layerId].push(iconFeature);
    }
    // 图层源
    this.layerSources[layerId] = new VectorSource({});
    // 图层
    this.layers[layerId] = new VectorLayer({
      source: this.layerSources[layerId],
      style: null,
      zIndex,
      visible: true,
    });
    // 图层id
    this.layers[layerId].id = layerId;
    this.map.addLayer(this.layers[layerId]);
    this.layerSources[layerId].addFeatures(this.features[layerId]);

    // 增加点击事件
    this.pointClick = this.map.on('click', (evt) => {
      this.map.forEachFeatureAtPixel(
        evt.pixel,
        (feature) => {
          // 点击统一回调函数
          typeof callback === 'function' && callback(feature, layerId);
          return undefined;
        },
        // 点击绑定指定图层
        { layerFilter: (layer) => layer.id === layerId },
      );
    });
    // pointermove指定监听站点图层，优化光标捕捉卡顿问题
    this.map.on('pointermove', (evt) => {
      this.map.getTargetElement().style.cursor = this.map.hasFeatureAtPixel(evt.pixel, {
        layerFilter: (layer) => layer.id !== 'ningboLayer',
      })
        ? 'pointer'
        : '';
    });
  }

  // 聚合模式
  // addClusterMarkers() {}

  // eslint-disable-next-line class-methods-use-this
  swtichLayerVisble(layerId, visible) {
    const layer = getLayerByid(this.map, layerId);
    layer.setVisible(visible);
  }

  // eslint-disable-next-line class-methods-use-this
  removeLayerByid = (layerId) => {
    return removeLayerByid(this.map, layerId);
  };

  // 添加mark点详情overlay
  addPointOverlay(ele, layerId) {
    this.overlay = new Overlay({
      element: ele,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
      offset: [30, -50],
    });
    this.overlay.id = layerId;
    if (this.closer) this.closer.onclick = this.hidePointOverlay;

    this.map.addOverlay(this.overlay);
    return this.overlay;
  }

  // 显示弹窗
  showOverlay(position) {
    if (this.overlay) {
      this.overlay.setPosition(position);
      this.overlay.setPositioning('top-left');
    }
  }

  // 删除所有overlay
  // removeAllOverlay() {}

  // 隐藏mark点详情overlay
  hidePointOverlay = () => {
    if (this.overlay) this.overlay.setPosition(undefined);
    // this.map.removeOverlay(this.overlay);
    // this.closer.blur();
    // if (this.selectedPoint) {
    //   this.selectedPoint.setStyle(this.iconStyle);
    // }
    // this.selectedPoint = null;
    return '';
  };
}

export default PointLayer;
