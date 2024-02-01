/*
 * @Author: 王磊
 * @Date: 2020-12-29 09:54:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-19 09:30:11
 * @Description: 初始化openlayers地图和常用工具类
 * @FilePath: \src\utils\OLMap\InitMap.js
 */
import { Map, View } from 'ol';
import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import MousePosition from 'ol/control/MousePosition.js';
import { format } from 'ol/coordinate.js';
import TileWMS from 'ol/source/ImageWMS';
// import TileWMS from 'ol/source/TileWMS.js';
import ImageLayer from 'ol/layer/Image';
import { geoserverUrl } from '@/configs/map.config.ts';
import mapConfig from './mapConfig';

const { target, projection, center, zoom, onlineTdtLayers, maxZoom } = mapConfig;
const { vec, vecCva, img, imgCia, ter, terCia } = onlineTdtLayers;

class InitMap {
  constructor(props = {}) {
    // 天地图矢量图
    this.vect = new TileLayer({
      source: new XYZ({
        title: vec.name,
        url: vec.url,
      }),
      zIndex: 1,
      visible: false,
      className: vec.value,
    });

    // 天地图矢量图标注
    this.vect_info = new TileLayer({
      source: new XYZ({
        title: vecCva.name,
        url: vecCva.url,
      }),
      zIndex: 1,
      className: vecCva.value,
      visible: false,
    });

    // 天地图影像图
    this.img = new TileLayer({
      source: new XYZ({
        title: img.name,
        url: img.url,
      }),
      zIndex: 1,
      className: img.value,
      visible: true,
    });

    // 天地图影像图标注
    this.img_info = new TileLayer({
      source: new XYZ({
        title: imgCia.name,
        url: imgCia.url,
      }),
      zIndex: 1,
      className: imgCia.value,
      visible: true,
    });

    // 天地图地形图
    this.ter = new TileLayer({
      source: new XYZ({
        title: ter.name,
        url: ter.url,
      }),
      zIndex: 1,
      className: ter.value,
      visible: true,
    });

    // 天地图地形图标注
    this.ter_info = new TileLayer({
      source: new XYZ({
        title: terCia.name,
        url: terCia.url,
      }),
      zIndex: 1,
      className: terCia.value,
      visible: true,
    });

    this.zjyx = new ImageLayer({
      visible: true,
      source: new TileWMS({
        ratio: 1,
        url: geoserverUrl,
        serverType: 'geoserver',
        imageLoadFunction: (image, src) => {
          // eslint-disable-next-line no-param-reassign
          image.getImage().src = `${src.split('BBOX')[0]}BBOX=${image.getExtent().join()}`;
        },
        params: {
          TILED: true,
          service: 'WMS',
          format: 'image/png',
          version: '1.1.1',
          transparent: true,
          layers: 'ningbo:zjyx-tif',
        },
      }),
      zIndex: 1,
    });
    this.ningbo = new ImageLayer({
      visible: true,
      source: new TileWMS({
        ratio: 1,
        url: geoserverUrl,
        serverType: 'geoserver',
        imageLoadFunction: (image, src) => {
          // eslint-disable-next-line no-param-reassign
          image.getImage().src = `${src.split('BBOX')[0]}BBOX=${image.getExtent().join()}`;
        },
        params: {
          TILED: true,
          service: 'WMS',
          format: 'image/png',
          version: '1.1.1',
          transparent: true,
          layers: 'ningbo:2023ND1JD',
        },
      }),
      zIndex: 1,
    });
    this.ningbo_river = new ImageLayer({
      visible: true,
      source: new TileWMS({
        ratio: 1,
        url: geoserverUrl,
        serverType: 'geoserver',
        imageLoadFunction: (image, src) => {
          // eslint-disable-next-line no-param-reassign
          image.getImage().src = `${src.split('BBOX')[0]}BBOX=${image.getExtent().join()}`;
        },
        params: {
          TILED: true,
          service: 'WMS',
          format: 'image/png',
          version: '1.1.1',
          transparent: true,
          layers: 'ningbo:20230304',
        },
      }),
      zIndex: 1,
    });

    this.olView = new View({
      projection: props.projection || projection,
      center: props.center || center,
      zoom: props.zoom || zoom,
      maxZoom: props.maxZoom || maxZoom,
    });
    const mousePositionControl = new MousePosition({
      coordinateFormat: (coor) => format(coor, '经度：{x}&nbsp;&nbsp;纬度：{y}', 4),
      projection: 'EPSG:4326',
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
    });
    this.olMap = new Map({
      layers: [this.img, this.zjyx, this.ningbo_river, this.img_info], // this.img, this.img_info this.vect, this.vect_info, this.ter, this.ter_info,
      target: props.target || target,
      view: this.olView,
      controls: [mousePositionControl],
    });
  }
}

export default InitMap;
