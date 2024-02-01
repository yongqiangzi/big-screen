import * as Cesium from 'cesium';
import TdtLayer from '../TdtLayerWMTS';

/**
 * 天地图底图组
 * @param {string} name 切换按钮名称
 * @param {string} tooltip 切换按钮提示文字
 * @param {string} iconUrl 切换按钮展示图标
 * @param {string[]} layers 底图对应的类型集合
 */
export default class LayersModal extends Cesium.ProviderViewModel {
  constructor(name: string, tooltip: string, iconUrl: string, layers: string[]) {
    super({
      name,
      tooltip,
      iconUrl,
      creationFunction: () => layers.map((layer) => new TdtLayer(layer)),
    });
  }
}
