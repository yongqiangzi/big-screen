import * as Cesium from 'cesium';

const getStr = (arr: any) => {
  let str = `vec2 vs[${arr.length}];\n`;
  arr.forEach((item: any, index: any) => {
    str += `vs[${index}] = vec2(${item[0]},${item[1]});\n`;
  });
  return str;
};

const toModelXyz = (tileset: any, arr: any) => {
  const m = tileset.clippingPlanesOriginMatrix.clone();
  const n = Cesium.Matrix4.inverseTransformation(m, new Cesium.Matrix4());
  const newArr: any[] = [];
  arr.forEach((item: any) => {
    const xyz = Cesium.Matrix4.multiplyByPoint(n, item, new Cesium.Cartesian3());
    newArr.push([xyz.x, -xyz.y]);
  });
  return newArr;
};

/**
 * @descripion:
 * @param {tileset} 3d瓦片
 * @param {car3Ps} 压平区域(笛卡尔坐标数组)
 */
const toFlatten = (tileset: any, car3Ps: any) => {
  const temp: any = tileset;
  const arr = toModelXyz(tileset, car3Ps);
  const { length } = arr;
  const customShader = new Cesium.CustomShader({
    uniforms: {
      u_height: {
        type: Cesium.UniformType.FLOAT,
        value: 0.0,
      },
      u_lowerHeight: {
        // 新增一个 uniform 用于指定下降的高度
        type: Cesium.UniformType.FLOAT,
        value: 65.0, // 你可以根据需要调整这个值
      },
    },
    vertexShaderText: `
        void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
            ${getStr(arr)}
            float y = vsOutput.positionMC.z;
            float x = vsOutput.positionMC.x;
            const int len =${length};
            const int j =${length - 1};
            bool c = false;
            for(int i=0; i< len;i++){
              if(i==0){
                if((vs[i].y >= y && y > vs[j].y) || (vs[j].y >= y && y > vs[i].y)){
                  if(x < (vs[j].x - vs[i].x) * (y - vs[i].y) / (vs[j].y - vs[i].y) + vs[i].x){
                    c = !c;
                  }
                }
              }else{
                if((vs[i].y >= y && y > vs[i-1].y) || (vs[i-1].y >= y && y > vs[i].y)){
                  if(x < (vs[i-1].x - vs[i].x) * (y - vs[i].y) / (vs[i-1].y - vs[i].y) + vs[i].x){
                    c = !c;
                  }
                }
              }
            }
            if(c){
              // vsOutput.positionMC.y =u_height;

              // vsOutput.positionMC.z -= 150.0; // 在压扁之前先下降一定高度
              // vsOutput.positionMC.z *= 0.0; // 压扁Z坐标
              vsOutput.positionMC.z -= u_lowerHeight; // 在压扁之前先下降一定高度
            }
        }
        `,
  });
  temp.customShader = customShader;
};

const clearFlatten = (tileset: any) => {
  const temp: any = tileset;
  temp.customShader = null;
};

/**
 * @descripion:
 * @param {tileset} 3d瓦片
 * @param {height} 压平高度(小数点保留一位)
 */
const changeHeight = (tileset: any, height: any) => {
  tileset.customShader.setUniform('u_height', height);
};

export { toFlatten, clearFlatten, changeHeight };
