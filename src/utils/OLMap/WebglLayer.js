import WebGLVectorLayerRenderer from 'ol/renderer/webgl/VectorLayer.js';
import Layer from 'ol/layer/Layer.js';

const styleWebGL = {
  'stroke-color': ['*', ['get', 'COLOR'], [220, 220, 220]],
  'stroke-width': 3,
  'stroke-offset': -1,
  'fill-color': ['*', ['get', 'COLOR'], [255, 255, 255, 0.6]],
};
class WebGLLayer extends Layer {
  createRenderer() {
    return new WebGLVectorLayerRenderer(this, {
      style: styleWebGL,
    });
  }
}

export default { WebGLLayer };
