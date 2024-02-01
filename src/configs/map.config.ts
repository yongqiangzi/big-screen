/*
 * @Date: 2024-01-12 11:28:13
 * @LastEditTime: 2024-01-15 16:41:43
 * @FilePath: \src\configs\map.config.ts
 */
// 天地图服务域名
export const tdtUrl = 'https://t{s}.tianditu.gov.cn/';
// 天地图服务TOKEN
export const token = 'c6a1cbdb70052289b007e5fcdbbabdeb';
// 服务负载子域
export const subdomains = ['7', '6', '5', '4', '3', '2', '1', '0'];
export const layers = {
  img: { label: '影像图', value: ['img_w', 'cia_w'] },
  terrain: { label: '地形图', value: ['ter_w', 'cta_w'] },
  vector: { label: '矢量图', value: ['vec_w', 'cva_w'] },
};

// geoserver配置
export const geoserverUrl = 'http://221.122.67.144:18090/geoserver/ningbo/wms';
