import * as Cesium from 'cesium';
import { tdtUrl, token, subdomains } from '@/configs/map.config';

/**
 * 天地图底图
 * @param {string} layer 底图对应的类型
 */
export default class TDTLayer extends Cesium.WebMapTileServiceImageryProvider {
  constructor(layer: string) {
    super({
      url: new Cesium.Resource({
        url: `${tdtUrl}${layer}/wmts?tk=${token}`,
      }),
      layer: layer.split('_')[0],
      format: 'tiles',
      style: 'default',
      tileMatrixSetID: layer.split('_')[1],
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      subdomains,
      maximumLevel: 18,
    });
  }
}
