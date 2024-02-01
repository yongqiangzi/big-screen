// 地图公共方法

// 根据图层id查询
const getLayerByid = (map, layerId) => {
  for (let index = 0; index < map.getLayers().getArray().length; index++) {
    const element = map.getLayers().getArray()[index];
    if (element.id === layerId) {
      return element;
    }
  }
  return '';
};

// 根据图层id删除
const removeLayerByid = (map, layerId) => {
  for (let index = map.getLayers().getArray().length - 1; index >= 0; index--) {
    const layer = map.getLayers().getArray()[index];
    if (layerId === layer.id) {
      map.removeLayer(layer);
    }
  }
};

export { getLayerByid, removeLayerByid };
