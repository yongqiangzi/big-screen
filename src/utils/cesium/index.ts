/*
 * @Author: JunFan Hang
 * @Date: 2022-01-11 12:04:28
 * @LastEditTime: 2024-01-10 12:28:40
 * @LastEditors: Please set LastEditors
 * @Description: 地图
 * @FilePath: \src\utils\cesium\index.ts
 */
import * as Cesium from 'cesium';
import { layers } from '@/configs/map.config';
import IconOutfall from '@/assets/images/map3d/outfall.png';
import IconwaterQuality from '@/assets/images/map3d/water-quality.png';
import LayersModal from './LayersModal';
import MarkerCollection from './MarkerCollection';

import { IconMarker } from './IconMarker';
import { TextMarker } from './TextMarker';
import type { TextOptions } from './TextMarker';
import type { IconOptions } from './IconMarker';

// import YongxinHee

// 底图组集合
const imageryProviderViewModels = Object.entries(layers).map(
  ([key, { label, value }]) => new LayersModal(label, label, '', value),
);

/**
 * 地图viwer
 * @param {string} domId 渲染DOM ID
 * @param {number[]} original 初始视角
 * @returns {any} 地图视图
 */
export default class MapViewer extends Cesium.Viewer {
  popup: any;

  original: [number, number, number, number];

  regionLayer: any;

  yongXinHeDataSource: any;

  pipeoutGlb: any;

  pipeoutGlb2: any;

  offshoreGlb: any;

  tileset: any;

  polyLineLayer: any;

  czmlDataSourceArr: any[];

  constructor(domId: string, original: [number, number, number, number]) {
    super(domId, {
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: false,
      vrButton: false,
      infoBox: false,
      selectionIndicator: false,
      // 可供BaseLayerPicker选择的图像图层ProviderViewModel数组
      imageryProviderViewModels,
      mapProjection: new Cesium.WebMercatorProjection(),
      // 当前图像图层的显示模型，仅baseLayerPicker设为true有意义
      selectedImageryProviderViewModel: imageryProviderViewModels[0],
      contextOptions: {
        webgl: {
          alpha: true,
          depth: false,
          stencil: true,
          antialias: true,
          premultipliedAlpha: true,
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: true,
        },
        allowTextureFilterAnisotropic: true,
      },
      shouldAnimate: true,
    });

    // 初始化默认视角
    this.original = original;

    // 添加多线段图层
    this.polyLineLayer = new Cesium.CustomDataSource('polyLineLayer');
    this.dataSources.add(this.polyLineLayer);
    this.scene.globe.depthTestAgainstTerrain = true;
    // 存储czml 数据源的变量
    this.czmlDataSourceArr = [];

    // 添加行政边界图层 置于底部优先添加
    this.regionLayer = new Cesium.CustomDataSource('regionLayer');
    this.dataSources.add(this.regionLayer);

    this.clock.shouldAnimate = false;
    this.clock.currentTime = Cesium.JulianDate.fromIso8601('2023-09-01T04:00:00Z');
    this.scene.globe.enableLighting = true;
    this.shadows = false;

    const creditContainer: HTMLElement = this.cesiumWidget.creditContainer as HTMLElement;
    creditContainer.style.display = 'none';
    // 取消默认双击事件
    this.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
    );

    this.reset();
    // this.loadYongxinheShp();
    this.loadWater();
    this.loadTerrain();

    // 出水管模型
    this.loadPipeoutModel();

    // 广告牌
    this.loadBillboard();

    // 护栏模型
    this.loadOffshoreModel();

    this.hotel3DModel();

    // 管道流水粒子效果
    // this.addWaterParticle();
  }

  hotel3DModel() {
    this.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(...[121.621819, 29.885538, 38000]),
    });

    setTimeout(() => {
      this.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(...[121.696539, 29.896479, 500]),
        duration: 3,
      });
    }, 3000);

    setTimeout(() => {
      this.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(...[121.622019, 29.885638, 500]),
      });
    }, 5000);
    this.load3DTileSet(
      '/nanjing-juicefs-datas/air/NingBoWater/3355/tileset.json',
      [121.62419, 29.88263, 100],
      0,
    );
    this.load3DTileSet(
      '/nanjing-juicefs-datas/air/NingBoWater/3356/tileset.json',
      [121.62429, 29.88263, 61],
      0,
    );
    this.load3DTileSet(
      '/nanjing-juicefs-datas/air/NingBoWater/3363/tileset.json',
      [121.6207, 29.886212, 57.5],
      0,
    );
    this.load3DTileSet(
      '/nanjing-juicefs-datas/air/NingBoWater/gxq1/tileset.json',
      [121.62355, 29.8885, 56.0],
      0,
    );

    this.load3DTileSet(
      '/nanjing-juicefs-datas/air/NingBoWater/gxq2/tileset.json',
      [121.6253, 29.88528, 61.5],
      0,
    );
  }

  async load3DTileSet(url: any, lonlat: any, radians: number) {
    const tilesetRes: any = await Cesium.Cesium3DTileset.fromUrl(url, {
      // debugShowMemoryUsage: true,
      skipLevelOfDetail: false,
      baseScreenSpaceError: 1024,
      skipScreenSpaceErrorFactor: 16,
      skipLevels: 0,
      immediatelyLoadDesiredLevelOfDetail: false,
      loadSiblings: false,
      cullWithChildrenBounds: true,
    });

    tilesetRes.lightColor = new Cesium.Cartesian3(10, 10, 10);

    this.scene.primitives.add(tilesetRes);
    // this.zoomTo(tilesetRes);

    tilesetRes.allTilesLoaded.addEventListener(() => {
      this.tileset = tilesetRes;
      const tilesetPrimitives: any = this.scene.primitives.add(tilesetRes);
      // 将3d tiles移动位置
      const position = Cesium.Cartesian3.fromDegrees(lonlat[0], lonlat[1], lonlat[2]);
      const mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
      const rotationX = Cesium.Matrix4.fromRotationTranslation(
        Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(radians)),
      );
      Cesium.Matrix4.multiply(mat, rotationX, mat);
      tilesetPrimitives.root.transform = mat;
    });
  }

  async loadTerrain() {
    const terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
      '/nanjing-juicefs-datas/air/NingBoWater/NingBoTerrain',
      {
        requestVertexNormals: true,
      },
    );

    this.terrainProvider = terrainProvider;
  }

  /**
   * 复位
   * @param {number} duration 复位所需时间
   * @returns {void}
   */
  reset(duration = 1) {
    this.camera.flyTo({
      destination: Cesium.Rectangle.fromDegrees(...this.original),
      duration,
    });
  }

  loadYongxinheShp() {
    Cesium.GeoJsonDataSource.load('/data/yongxinhe.json', {
      stroke: Cesium.Color.YELLOW, // 多边形或线的颜色
      strokeWidth: 3, // 多边形或线 宽度
      fill: Cesium.Color.BLUE.withAlpha(0.5), // 多边形内部的默认颜色。
      clampToGround: true, // 多边形或线 固定在地面上true/false
    }).then((dataSource) => {
      this.yongXinHeDataSource = dataSource;
      this.dataSources.add(dataSource).then((data) => {
        // this.zoomTo(dataSource.entities);
        // this.camera.setView({
        //   destination: Cesium.Cartesian3.fromDegrees(
        //     ...[121.61062693063855, 29.87971750900681, 100],
        //   ),
        // });
      });
    });
  }

  /**
   * 获取鼠标坐标
   * @param {any} calback 回调函数
   * @returns {void}
   */
  getLocation = (calback: any): void => {
    const handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas);
    let cartesian = null;
    let latitudeString = null;
    let longitudeString = null;

    handler.setInputAction((movement: any) => {
      // 得到当前三维场景的椭球体
      const { ellipsoid } = this.scene.globe;

      cartesian = this.camera.pickEllipsoid(movement.endPosition, ellipsoid);
      if (cartesian) {
        // 将笛卡尔坐标转换为地理坐标
        const cartographic = ellipsoid.cartesianToCartographic(cartesian);

        // 将弧度转为度的十进制度表示
        longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
        latitudeString = Cesium.Math.toDegrees(cartographic.latitude);

        return calback && calback(longitudeString, latitudeString);
      }
      return calback && calback(0, 0);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  };

  /**
   * 添加uav影像
   * @returns {void}
   */
  loadWater(): void {
    const box = new Cesium.BoxGeometry({
      vertexFormat: Cesium.VertexFormat.POSITION_NORMAL_AND_ST,
      maximum: new Cesium.Cartesian3(300.0, 300.0, 0),
      minimum: new Cesium.Cartesian3(-300.0, -300.0, 10.0),
    });

    const { ellipsoid } = this.scene.globe;

    const cartographic = ellipsoid.cartesianToCartographic(
      new Cesium.Cartesian3(50000.0, 50000.0, 200.0),
    );

    // 将弧度转为度的十进制度表示
    const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
    const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
    // 45 0.1631486781604732 -135 1.06034820364833

    const geometry: any = Cesium.BoxGeometry.createGeometry(box);

    const dd = [
      119.368528, 29.543008, 0, 119.321107, 29.540158, 0.896974, 119.291526, 29.529465, 1.087638,
      119.273877, 29.522155, 1.009509, 119.245387, 29.501279, 0.972801, 119.24207, 29.513024,
      1.402055, 119.253039, 29.56261, 1.096467, 119.247459, 29.595435, 1.27257, 119.234406,
      29.628011, 1.234795, 119.215848, 29.646696, 1.436356, 119.172456, 29.648655, 0.850855,
      119.126986, 29.664445, 1.475282, 119.091454, 29.66403, 1.14508, 119.025906, 29.658, 1.468297,
      118.952737, 29.670996, 0.988865, 118.882819, 29.632874, 1.132133, 118.841249, 29.54116,
      1.49504, 118.916146, 29.48925, 1.144256, 118.991991, 29.458387, 1.312631, 119.089128,
      29.419761, 1.508935, 119.086081, 29.438497, 0.926737, 119.217709, 29.398944, 1.2236,
      119.216599, 29.426871, 0.991028, 119.237708, 29.446496, 1.488523, 119.25017, 29.45964,
      1.519156, 119.255844, 29.46315, 1.046008, 119.275974, 29.462272, 0.928832, 119.300073,
      29.45705, 0.947281, 119.319941, 29.45894, 1.186739, 119.317731, 29.477559, 1.023766,
      119.325853, 29.488904, 1.407161, 119.356167, 29.483477, 0.948372, 119.38381, 29.475774,
      0.833889, 119.419487, 29.474866, 1.336729,
    ];
    const sss = new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        // Cesium.Cartesian3.fromDegreesArray(positionArr)
        Cesium.Cartesian3.fromDegreesArrayHeights(dd),
      ),
      height: 200,
      extrudedHeight: 500,
      vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
    });

    const inst = new Cesium.GeometryInstance({
      // geometry: sss,
      geometry,
    });

    // 自定义材质
    const aper = new Cesium.MaterialAppearance({
      aboveGround: false,
      material: new Cesium.Material({
        fabric: {
          uniforms: {
            iTime: 0.6,
          },
          source: `
        const int NUM_STEPS = 4;
      const float PI     = 3.141592;
      const float EPSILON  = 1e-3;
      #define EPSILON_NRM (0.1 / 200.0)
      // sea
      const int ITER_GEOMETRY = 3;


      const int ITER_FRAGMENT = 8;  // 波浪大小
      const float SEA_HEIGHT = 0.75; // 海浪高


      const float SEA_CHOPPY = 4.0;   // 波浪起伏
      const float SEA_SPEED = 0.8;   // 速度
      const float SEA_FREQ = 0.15;   // 频率

     const vec3 SEA_BASE = vec3(0.1,0.19,0.22);
      const vec3 SEA_WATER_COLOR = vec3(0.8,0.9,0.6);
      // const vec3 SEA_BASE = vec3(164.0/255.0,138.0/255.0,91.0/255.0);  // 调整海面基本颜色为江水颜色

      const mat2 octave_m = mat2(1.6,1.2,-1.2,1.6);
      // math
      mat3 fromEuler(vec3 ang) {
        vec2 a1 = vec2(sin(ang.x),cos(ang.x));
        vec2 a2 = vec2(sin(ang.y),cos(ang.y));
        vec2 a3 = vec2(sin(ang.z),cos(ang.z));
        mat3 m;
        m[0] = vec3(a1.y*a3.y+a1.x*a2.x*a3.x,a1.y*a2.x*a3.x+a3.y*a1.x,-a2.y*a3.x);
        m[1] = vec3(-a2.y*a1.x,a1.y*a2.y,a2.x);
        m[2] = vec3(a3.y*a1.x*a2.x+a1.y*a3.x,a1.x*a3.x-a1.y*a3.y*a2.x,a2.y*a3.y);
        return m;
      }
      float hash( vec2 p ) {
        float h = dot(p,vec2(127.1,311.7));
        return fract(sin(h)*43758.5453123);
      }
     // float noise( in vec2 p ) {
     //   vec2 i = floor( p );
     //   vec2 f = fract( p );
     //   vec2 u = f*f*(3.0-2.0*f);
    //    return -1.0+2.0*mix( mix( hash( i + vec2(0.0,0.0) ),
     //            hash( i + vec2(1.0,0.0) ), u.x),
     //         mix( hash( i + vec2(0.0,1.0) ),
     //            hash( i + vec2(1.0,1.0) ), u.x), u.y);
     // }
     //噪声函数3
            vec4 permute(vec4 x)
            {
                return mod(((x*34.0)+1.0)*x, 289.0);
            }
            vec2 fade(vec2 t)
            {
                return t*t*t*(t*(t*6.0-15.0)+10.0);
            }
            float noise(vec2 P)
            {
                vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
                vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
                Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
                vec4 ix = Pi.xzxz;
                vec4 iy = Pi.yyww;
                vec4 fx = Pf.xzxz;
                vec4 fy = Pf.yyww;
                vec4 i = permute(permute(ix) + iy);
                vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
                vec4 gy = abs(gx) - 0.5;
                vec4 tx = floor(gx + 0.5);
                gx = gx - tx;
                vec2 g00 = vec2(gx.x,gy.x);
                vec2 g10 = vec2(gx.y,gy.y);
                vec2 g01 = vec2(gx.z,gy.z);
                vec2 g11 = vec2(gx.w,gy.w);
                vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
                g00 *= norm.x;
                g01 *= norm.y;
                g10 *= norm.z;
                g11 *= norm.w;
                float n00 = dot(g00, vec2(fx.x, fy.x));
                float n10 = dot(g10, vec2(fx.y, fy.y));
                float n01 = dot(g01, vec2(fx.z, fy.z));
                float n11 = dot(g11, vec2(fx.w, fy.w));
                vec2 fade_xy = fade(Pf.xy);
                vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
                float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
                return 2.3 * n_xy;
            }


      // lighting
      float diffuse(vec3 n,vec3 l,float p) {
        return pow(dot(n,l) * 0.4 + 0.6,p);
      }
      float specular(vec3 n,vec3 l,vec3 e,float s) {
        float nrm = (s + 8.0) / (PI * 8.0);
        return pow(max(dot(reflect(e,n),l),0.0),s) * nrm;
      }
      // sky
      vec3 getSkyColor(vec3 e) {
        e.y = max(e.y,0.0);
        return vec3(pow(1.0-e.y,2.0), 1.0-e.y, 0.6+(1.0-e.y)*0.4);
      }
      // sea
      float sea_octave(vec2 uv, float choppy) {
        uv += noise(uv);
        vec2 wv = 1.0-abs(sin(uv));
        vec2 swv = abs(cos(uv));
        wv = mix(wv,swv,wv);
        return pow(1.0-pow(wv.x * wv.y,0.65),choppy);
      }
      float map(vec3 p) {
        float freq = SEA_FREQ;
        float amp = SEA_HEIGHT;
        float choppy = SEA_CHOPPY;
        vec2 uv = p.xz; uv.x *= 0.75;
        float d, h = 0.0;
        float SEA_TIME = 1.0 + iTime * SEA_SPEED;
        for(int i = 0; i < ITER_GEOMETRY; i++) {
          d = sea_octave((uv+SEA_TIME)*freq,choppy);
          d += sea_octave((uv-SEA_TIME)*freq,choppy);
          h += d * amp;
          uv *= octave_m; freq *= 1.9; amp *= 0.22;
          choppy = mix(choppy,1.0,0.2);
        }
        return p.y - h;
      }
      float map_detailed(vec3 p) {
        float freq = SEA_FREQ;
        float amp = SEA_HEIGHT;
        float choppy = SEA_CHOPPY;
        vec2 uv = p.xz; uv.x *= 0.75;
        float SEA_TIME = 1.0 + iTime * SEA_SPEED;
        float d, h = 0.0;
        for(int i = 0; i < ITER_FRAGMENT; i++) {
          d = sea_octave((uv+SEA_TIME)*freq,choppy);
          d += sea_octave((uv-SEA_TIME)*freq,choppy);
          h += d * amp;
          uv *= octave_m; freq *= 1.9; amp *= 0.22;
          choppy = mix(choppy,1.0,0.2);
        }
        return p.y - h;
      }
      vec3 getSeaColor(vec3 p, vec3 n, vec3 l, vec3 eye, vec3 dist) {
        float fresnel = clamp(1.0 - dot(n,-eye), 0.0, 1.0);
        fresnel = pow(fresnel,3.0) * 0.65;
        vec3 reflected = getSkyColor(reflect(eye,n));
        vec3 refracted = SEA_BASE + diffuse(n,l,80.0) * SEA_WATER_COLOR * 0.12;
        vec3 color = mix(refracted,reflected,fresnel);
        float atten = max(1.0 - dot(dist,dist) * 0.001, 0.0);
        color += SEA_WATER_COLOR * (p.y - SEA_HEIGHT) * 0.18 * atten;
        color += vec3(specular(n,l,eye,60.0));
        return color;
      }
      // tracing
      vec3 getNormal(vec3 p, float eps) {
        vec3 n;
        n.y = map_detailed(p);
        n.x = map_detailed(vec3(p.x+eps,p.y,p.z)) - n.y;
        n.z = map_detailed(vec3(p.x,p.y,p.z+eps)) - n.y;
        n.y = eps;
        return normalize(n);
      }
      float heightMapTracing(vec3 ori, vec3 dir, out vec3 p) {
        float tm = 0.0;
        float tx = 1000.0;
        float hx = map(ori + dir * tx);
        if(hx > 0.0) return tx;
        float hm = map(ori + dir * tm);
        float tmid = 0.0;
        for(int i = 0; i < NUM_STEPS; i++) {
          tmid = mix(tm,tx, hm/(hm-hx));
          p = ori + dir * tmid;
          float hmid = map(p);
          if(hmid < 0.0) {
            tx = tmid;
            hx = hmid;
          } else {
            tm = tmid;
            hm = hmid;
          }
        }
        return tmid;
      }
           vec4 czm_getMaterial(vec2 vUv, vec3 positionWC)
           {
            vec2 uv = vUv;
            uv = vUv * 2.0 - 1.0;
            float time = iTime * 0.3 + 0.0*0.01;
            // ray
            vec3 ang = vec3(0, 1.2, 0.0);
              vec3 ori = vec3(0.0,3.5,0);
            vec3 dir = normalize(vec3(uv.xy,-2.0)); dir.z += length(uv) * 0.15;
            dir = normalize(dir) * fromEuler(ang);
            // tracing
            vec3 p;
            heightMapTracing(ori,dir,p);
            vec3 dist = p - ori;
            vec3 n = getNormal(p, dot(dist,dist) * EPSILON_NRM);
            vec3 light = normalize(vec3(0.0,1.0,0.8));
            // color
            vec3 color = mix(
              getSkyColor(dir),
              getSeaColor(p,n,light,dir,dist),
              pow(smoothstep(0.0,-0.05,dir.y),0.3));
               return vec4( pow(color,vec3(0.75)), 0.5); // 调整海面最终输出颜色
           }
        `,
        },
      }),
      translucent: true,
      vertexShaderSource: `
        in vec3 position3DHigh;
        in vec3 position3DLow;
        in float batchId;
        in vec2 st;
        in vec3 normal;
        out vec2 v_st;
        out vec3 v_positionEC;
        out vec3 v_normalEC;
        out vec3 positionWC;
        void main() {
            v_st = st;
            vec4 p = czm_computePosition();
            v_positionEC = (czm_modelViewRelativeToEye * p).xyz;
            v_normalEC = czm_normal * normal;

            vec4 positionMC = czm_inverseModelView * vec4(v_positionEC, 1.0);
            positionWC = position3DHigh + position3DLow;
            gl_Position = czm_modelViewProjectionRelativeToEye * p;
        }
                    `,
      fragmentShaderSource: `
      in vec2 v_st;
      in vec3 v_positionEC;
      in vec3 v_normalEC;
      in vec3 positionWC;
      void main()  {
        vec3 positionToEyeEC = -v_positionEC;
        vec3 normalEC = normalize(v_normalEC);
        czm_materialInput materialInput;
        materialInput.normalEC = normalEC;
        materialInput.positionToEyeEC = positionToEyeEC;
        materialInput.st = v_st;
        vec4 color = czm_getMaterial(v_st, positionWC);
        out_FragColor = color;
      }
                `,
      show: true,
    });

    const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
      Cesium.Cartesian3.fromDegrees(121.62339, 29.88663, -10),
    );

    this.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: inst,
        appearance: aper,
        asynchronous: false,
        modelMatrix,
      }),
    );

    // new 119.368528, 29.543008   108.80411007, 31.62869524
    // this.camera.flyToBoundingSphere(
    //   new Cesium.BoundingSphere(
    //     Cesium.Cartesian3.fromDegrees(108.80411007, 31.62869524, 10000),
    //     2100,
    //   ),
    //   {
    //     duration: 0.1,
    //   },
    // );

    this.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(...[121.62419, 29.88263, 99990]),
    });

    function renderLoop(timestamp?: any) {
      aper.material.uniforms.iTime = timestamp / 1000;
      requestAnimationFrame(renderLoop);
    }

    renderLoop();
  }

  /**
   * 删除czml线段
   * @returns {void}
   */
  removeCzml = (): any => {
    this.clock.shouldAnimate = false;

    this.czmlDataSourceArr.forEach((item: any) => {
      this.dataSources.remove(item);
    });
  };

  sleep = (time: any) => {
    return (
      new Promise((resolve) => {
        setTimeout(resolve, time);
      }) || this
    );
  };

  resetView = (lonlat: number[], duration: number, heading: number) => {
    this.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(...[lonlat[0], lonlat[1], 0]),
      duration,
      orientation: {
        heading: Cesium.Math.toRadians(heading),
        pitch: Cesium.Math.toRadians(-5),
        roll: 0.0,
      },
    });
  };

  /**
   * 获取无人机规划航线
   * @param {number[]} lonlat 经纬度
   * @returns {any} 创建的实体
   */
  getCzml = async (lonlat: number[][]) => {
    this.clock.shouldAnimate = true;
    this.resetView([lonlat[0][1], lonlat[0][2]], 1, -90);

    await this.sleep(2);

    const julianDTStart = Cesium.JulianDate.fromDate(new Date());
    const startTime = julianDTStart.toString();
    const endTime = Cesium.JulianDate.addSeconds(
      julianDTStart,
      lonlat[lonlat.length - 1][0],
      new Cesium.JulianDate(),
    ).toString();
    const endTimeClock = Cesium.JulianDate.addSeconds(
      julianDTStart,
      lonlat[lonlat.length - 1][0],
      new Cesium.JulianDate(),
    );

    const czml = [
      {
        id: 'document',
        name: 'CZML Path',
        version: '1.0',
        repeat: false,
        clock: {
          interval: `${startTime}/${endTime}`,
          currentTime: startTime,
          multiplier: 10,
        },
      },
      {
        id: 'path',
        name: 'path with GPS flight data',
        description: '无人机',
        availability: `${startTime}/${endTime}`,
        path: {
          material: {
            polylineOutline: {
              color: {
                rgba: [255, 0, 255, 255],
              },
              outlineColor: {
                rgba: [0, 255, 255, 255],
              },
              outlineWidth: 5,
            },
          },
          width: 0,
          leadTime: 10,
          trailTime: 1000,
          resolution: 5,
        },
        billboard: {
          image: '',
          width: 55,
          height: 55,
          // 左转90° rotation: Cesium.Math.PI_OVER_TWO,
          scale: 1,
          eyeOffset: {
            cartesian: [0.0, 0.0, -10.0],
          },
        },
        position: {
          epoch: startTime,
          cartographicDegrees: lonlat.flat(),
        },
      },
    ];

    const oCzmlAnimate: any = Cesium.CzmlDataSource.load(czml);
    let flyEntity: any = null;

    this.dataSources.add(oCzmlAnimate).then((ds: any) => {
      this.czmlDataSourceArr.push(ds);
      flyEntity = ds.entities.getById('path');
      // 视野跟踪
      this.trackedEntity = flyEntity;
      // flyEntity.viewFrom = Cesium.Cartesian3.fromDegrees(119.59358, 34.2073688, 90);

      if (flyEntity) {
        // 模型就可以按照路线转向
        flyEntity.orientation = new Cesium.VelocityOrientationProperty(flyEntity.position);
        // billboard广告牌转向
        flyEntity.billboard.alignedAxis = new Cesium.VelocityVectorProperty(
          flyEntity.position,
          true,
        );

        flyEntity.position.setInterpolationOptions({
          interpolationDegree: 1,
          interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
          // interpolationAlgorithm: Cesium.LinearApproximation,
        });
      }
    });

    const watchAdjustTheViewingAngle = (scene: any, time: any) => {
      const diffSeconds = Cesium.JulianDate.secondsDifference(endTimeClock, time);

      if (diffSeconds < 2) {
        // this.removeCzml();
        this.clock.shouldAnimate = false;
        this.trackedEntity = undefined;

        this.resetView([lonlat[lonlat.length - 1][1], lonlat[lonlat.length - 1][2]], 3, 90);

        setTimeout(() => {
          this.resetView([lonlat[lonlat.length - 1][1], lonlat[lonlat.length - 1][2]], 3, 30);
        }, 3000);
        // this.camera.setView({
        //   destination: Cesium.Cartesian3.fromDegrees(...[121.62085, 29.885816, 5]),
        //   orientation: {
        //     heading: Cesium.Math.toRadians(90.0), // east, default value is 0.0 (north)
        //     pitch: Cesium.Math.toRadians(-10), // default value (looking down)
        //     roll: 0.0, // default value
        //   },
        // });
        this.scene.postRender.removeEventListener(watchAdjustTheViewingAngle);
      }
    };
    this.scene.postRender.addEventListener(watchAdjustTheViewingAngle);
  };

  loadBillboard(): void {
    const handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas);

    const newValue = [
      [121.624255, 29.885848, 0],
      [121.623947, 29.885861, 0],
      [121.623446, 29.88585, 0],
      [121.623156, 29.885838, 0],
      [121.62285, 29.885848, 0],
      [121.62254, 29.885846, 0],
      [121.62217, 29.885847, 0],
      [121.621774, 29.885827, 0],
      [121.621307, 29.885825, 0],
      [121.620893, 29.88576, 0],
      [121.620766, 29.885659, 0],
      [121.620631, 29.8857, 0],
      [121.620618, 29.885758, 0],
    ];
    handler.setInputAction(({ position }: { position: Cesium.Cartesian2 }) => {
      const pickedObject = this.scene.pick(position);

      if (!pickedObject) return;
      const { name } = pickedObject.id || '';
      if (name === '总磷') {
        if (newValue && newValue.length) {
          const lineArr = newValue.map((item: any) => [item[0], item[1]]);
          const czmlArr = newValue.map((item: any, index: number) => [index * 10, ...item]);

          this.getCzml(czmlArr);
        } else {
          this.removeCzml();
          this.clock.shouldAnimate = false;
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // const startTime = Cesium.JulianDate.now();
    // const IconOutfallHeight = 15;
    // const IconwaterQualityHeight = 5;
    // 出水管广告牌
    this.entities.add({
      name: '入河排污口',
      position: Cesium.Cartesian3.fromDegrees(121.620511, 29.886, 5),
      // position: new Cesium.CallbackProperty((time, result) => {
      //   IconOutfallHeight -= 2 * Cesium.JulianDate.secondsDifference(time, startTime);
      //   console.warn('IconOutfallHeight', IconOutfallHeight);

      //   if (IconOutfallHeight < 10) {
      //     IconOutfallHeight = 15;
      //   }

      //   return Cesium.Cartesian3.fromDegrees(121.620511, 29.88602, IconOutfallHeight);
      // }, false) as any,
      billboard: {
        image: IconOutfall,
        height: 8,
        width: 8,
        sizeInMeters: true,
        pixelOffset: new Cesium.Cartesian2(0, 0),
        eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        alignedAxis: Cesium.Cartesian3.ZERO,
        // translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0);
      },
    });

    this.entities.add({
      name: '总磷',
      position: Cesium.Cartesian3.fromDegrees(121.624479, 29.886517, 5),
      // position: new Cesium.CallbackProperty((time) => {
      //   IconwaterQualityHeight += 2 * Cesium.JulianDate.secondsDifference(time, startTime);

      //   if (IconwaterQualityHeight < 0) {
      //     IconwaterQualityHeight = 5;
      //   }

      //   return Cesium.Cartesian3.fromDegrees(121.621777, 29.885859, IconwaterQualityHeight);
      // }, false) as any,
      billboard: {
        image: IconwaterQuality,
        height: 8,
        width: 8,
        sizeInMeters: true,
        pixelOffset: new Cesium.Cartesian2(0, 0),
        eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        alignedAxis: Cesium.Cartesian3.ZERO,
        // translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0);
      },
    });
  }

  loadPipeoutModel(): void {
    const position = Cesium.Cartesian3.fromDegrees(121.6208, 29.88611, -1.5);
    const heading = Cesium.Math.toRadians(155);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    this.pipeoutGlb = this.entities.add({
      name: 'pipeout',
      position,
      orientation,
      model: {
        uri: '/map/排污口.glb',
        minimumPixelSize: 5,
        maximumScale: 5,
        scale: 12,
      },
    });
    this.pipeoutGlb2 = this.entities.add({
      name: 'pipeout',
      position: Cesium.Cartesian3.fromDegrees(121.6205, 29.885983, -1.5),
      orientation,
      model: {
        uri: '/map/排污口.glb',
        minimumPixelSize: 5,
        maximumScale: 5,
        scale: 12,
      },
    });

    // Cesium.GeoJsonDataSource.load('/map/pipeoutArea.json', {
    //   stroke: Cesium.Color.YELLOW, // 多边形或线的颜色
    //   strokeWidth: 3, // 多边形或线 宽度
    //   fill: Cesium.Color.BLUE.withAlpha(0.5), // 多边形内部的默认颜色。
    //   clampToGround: true, // 多边形或线 固定在地面上true/false
    // }).then((dataSource) => {
    //   this.dataSources.add(dataSource);
    //   this.flyTo(dataSource);
    // });
  }

  // eslint-disable-next-line class-methods-use-this
  addWaterParticle(): void {
    const computeModelMatrix = (entity) => {
      const position = Cesium.Property.getValueOrUndefined(entity.position, '');
      const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
      return modelMatrix;
    };
    // 计算粒子发射器的位置姿态
    const computeEmitterModelMatrix = (heading, pitch, roll) => {
      const hpr = Cesium.HeadingPitchRoll.fromDegrees(heading, pitch, roll);
      const trs = new Cesium.TranslationRotationScale();
      trs.translation = Cesium.Cartesian3.fromElements(0, 0, 0);
      trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr);
      const Matrix4 = Cesium.Matrix4.fromTranslationRotationScale(trs);
      return Matrix4;
    };
    // 更新粒子运动状态
    const updateCallback = (p, dt) => {
      const gravityScratch = new Cesium.Cartesian3();
      const { position } = p;
      Cesium.Cartesian3.normalize(position, gravityScratch);
      Cesium.Cartesian3.fromElements(20 * dt, gravityScratch.y * dt, -30 * dt, gravityScratch);
      // eslint-disable-next-line no-param-reassign
      p.velocity = Cesium.Cartesian3.add(p.velocity, gravityScratch, p.velocity);
    };

    // 创建粒子系统
    const createWaterSystem = (position) => {
      const gatePosition = Cesium.Cartesian3.fromRadians(position.x, position.y, position.z);
      const hole = this.entities.add({ position: gatePosition });
      const waterParticleSystem = new Cesium.ParticleSystem({
        // 这里需要改为自己的图片路径
        image: '/map/smoke.png',
        startColor: Cesium.Color.WHITE.withAlpha(0.0),
        endColor: Cesium.Color.WHITE.withAlpha(0.65),
        startScale: 10,
        endScale: 10,
        minimumParticleLife: 1.5,
        maximumParticleLife: 1.7,
        minimumSpeed: 1.5,
        maximumSpeed: 2.5,
        imageSize: new Cesium.Cartesian2(23, 23),
        emissionRate: 20,
        emitter: new Cesium.CircleEmitter(10.0),
        lifetime: 16.0,
        // emitter: new Cesium.BoxEmitter(new Cesium.Cartesian3(20.0, 5.0, 5.0)),
        modelMatrix: computeModelMatrix(hole),
        emitterModelMatrix: computeEmitterModelMatrix(...[65, 0, 0]),
        updateCallback: (p, dt) => {
          const gravityScratch = new Cesium.Cartesian3();
          const { position: position1 } = p;
          Cesium.Cartesian3.normalize(position1, gravityScratch);
          Cesium.Cartesian3.fromElements(20 * dt, gravityScratch.y * dt, -30 * dt, gravityScratch);
          // eslint-disable-next-line no-param-reassign
          p.velocity = Cesium.Cartesian3.add(p.velocity, gravityScratch, p.velocity);
        },
      });
      // 将粒子系统添加到场景中
      this.scene.primitives.add(waterParticleSystem);
    };

    const position = {
      x: 121.62072,
      y: 29.88627,
      z: 35.0,
    };
    createWaterSystem(position);
    this.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(...[121.62072, 29.88627, 35]),
    });
  }

  loadOffshoreModel(): void {
    const position = Cesium.Cartesian3.fromDegrees(121.62072, 29.88627, -6);
    const heading = Cesium.Math.toRadians(-115);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    this.offshoreGlb = this.entities.add({
      name: 'offshore',
      position,
      orientation,
      model: {
        uri: '/map/河堤.glb',
        minimumPixelSize: 2,
        maximumScale: 5,
        imageBasedLightingFactor: new Cesium.Cartesian2(0.1, 1), // 修改无变化
        colorBlendAmount: 0, // 修改无变化
      },
    });
    // this.flyTo(this.pipeoutGlb);
  }

  /**
   * 添加文本图层标识
   */
  addTextMarker(iconOptions: TextOptions, target: Cesium.CustomDataSource): Cesium.Entity {
    const iconMarker = new TextMarker(iconOptions);

    (target || this).entities.add(iconMarker);

    return iconMarker;
  }

  /**
   * 添加图层标识集合
   */
  addTextMarkerCollection = (name: string, icons: TextOptions[]): MarkerCollection => {
    const iconMarkerCollection = new MarkerCollection(name, this);

    icons.forEach((iconOptions: TextOptions) => {
      this.addTextMarker(iconOptions, iconMarkerCollection);
    });
    this.dataSources.add(iconMarkerCollection);

    return iconMarkerCollection;
  };

  /**
   * 添加图标点图层标识
   */
  addIconMarker(iconOptions: IconOptions, target: Cesium.CustomDataSource): Cesium.Entity {
    const iconMarker = new IconMarker(iconOptions);

    (target || this).entities.add(iconMarker);

    return iconMarker;
  }

  /**
   * 添加图层标识集合
   */
  addIconMarkerCollection = (
    name: string,
    icons: IconOptions[],
    type?: string,
  ): MarkerCollection => {
    const iconMarkerCollection = new MarkerCollection(name, this);

    icons.forEach((iconOptions: IconOptions) => {
      if (type) {
        // this.addOriginalMarker(iconOptions, iconMarkerCollection);
      } else {
        this.addIconMarker(iconOptions, iconMarkerCollection);
      }
    });
    this.dataSources.add(iconMarkerCollection);

    return iconMarkerCollection;
  };
}
