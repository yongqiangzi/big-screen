/*
 * @Author: 陈娟
 * @Date: 2021-10-27 14:50:59
 * @LastEditors: 陈娟
 * @LastEditTime: 2022-02-11 11:17:05
 * @Description: 地图相关配置
 * @FilePath: \intranet-publishing-platform\src\utils\OLMap\mapConfig.js
 */
/**
 * 说明：地图的基本配置
 * @return {Object}
 */
const token = '8b225bd4138dab3501a9509610fcfc02'; // 天地图token

const mapConfigs = {
  target: 'map-container', // 地图容器
  projection: 'EPSG:4326', // 空间参考
  center: [121.45, 29.75], // 地图中心点
  zoom: 9.5, // 显示级别
  minZoom: 5, // 最小缩放级别
  maxZoom: 17, // 最大缩放级别
  controls: [], // 地图控件
  onlineTdtLayers: {
    vec: {
      name: '矢量图',
      value: 'baseLayer_vect',
      url: `http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${token}`, // 天地图矢量
    },
    vecCva: {
      name: '矢量图标注',
      value: 'baseLayer_vect',
      url: `http://t{0-7}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${token}`, // 天地图矢量注记
    },
    img: {
      name: '影像图',
      value: 'baseLayer_image',
      url: `http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${token}`, // 天地图影像
    },
    imgCia: {
      name: '影像图标注',
      value: 'baseLayer_image',
      url: `http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${token}`, // 天地图影像注记
    },
    ter: {
      name: '地形图',
      value: 'baseLayer_terrian',
      url: `http://t{0-7}.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=${token}`, // 天地图地形图
    },
    terCia: {
      name: '地形图标注',
      value: 'baseLayer_terrian',
      url: `http://t{0-7}.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=${token}`, // 天地图地形图注记
    },
  },
};

export const mapConfigStatistic = {
  center: [93.55, 36.55], // 地图中心点
  zoom: 7, // 显示级别
};

export default mapConfigs;
