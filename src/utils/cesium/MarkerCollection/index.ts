import * as Cesium from 'cesium';

/**
 * 图标集合
 * @return {CustomDataSource} 图标集合 CustomDataSource
 */
export default class MarkerCollection extends Cesium.CustomDataSource {
  mapViewer: Cesium.Viewer;

  eventHandler: Cesium.ScreenSpaceEventHandler[];

  constructor(name: string, mapViewer: Cesium.Viewer) {
    super(name);

    this.mapViewer = mapViewer;
    this.eventHandler = [];
  }

  /**
   * 添加监听事件
   * @param {number} eventType 事件类型
   * @param {(position: Cesium.Cartesian2) => void} action 事件动作
   * @returns {void}
   */
  addEventListener = (eventType: number, action: (position: Cesium.Cartesian2) => void): void => {
    const event = new Cesium.ScreenSpaceEventHandler(this.mapViewer.scene.canvas);

    event.setInputAction(({ position }: { position: Cesium.Cartesian2 }) => {
      action(position);
    }, eventType);
    this.eventHandler.push(event);
  };

  /**
   * 销毁
   * @returns {void}
   */
  destroy = (): void => {
    this.eventHandler.forEach((item) => {
      if (!item.isDestroyed()) {
        item.destroy();
      }
    });

    if (this.mapViewer && this.mapViewer.dataSources) {
      this.mapViewer.dataSources.remove(this);
    }
  };
}
