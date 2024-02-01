import ImageWMS from 'ol/source/ImageWMS';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Fill, Style, Stroke } from 'ol/style.js';
import { Feature } from 'ol';
import { MultiPolygon } from 'ol/geom';
import { geoserverUrl } from '@/configs/map.config.ts';

class OLShpWMS {
  constructor(props) {
    const { map } = props;
    this.map = map;
    this.shpWMSLayers = []; // 当前添加的矢量wms图层
    this.shpWMSLayers = []; // 所有的矢量wms图层
    this.shpWMSSources = [];
    this.pointClicks = []; // 地图点击事件
    // 选中要素图层
    this.selectFeatureSource = new VectorSource();
    this.selectFeatureLayer = new VectorLayer({
      id: 'selectFeature',
      source: this.selectFeatureSource,
      zIndex: 998,
      style: new Style({
        stroke: new Stroke({
          color: '#7CE040',
          width: 2,
        }),
        fill: new Fill({
          color: '#48B208',
        }),
      }),
    });
    this.map.addLayer(this.selectFeatureLayer);
  }

  // 选中
  addSelected(feature) {
    this.selectFeatureSource.clear();
    this.selectFeatureSource.addFeature(feature);
  }

  // 增加矢量wms服务
  addShpWMSLayer(options) {
    const { layerName, callback, zIndex = 1000, sldParams } = options;
    const layerId = layerName.split(':')[1];
    this.shpWMSSources[layerId] = new ImageWMS({
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
        layers: layerName,
      },
    });
    this.shpWMSLayers[layerId] = new ImageLayer({
      visible: true,
      source: this.shpWMSSources[layerId],
      zIndex,
    });
    // 添加点击事件
    this.pointClicks[layerId] = this.map.on('click', (evt) => {
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const url = this.shpWMSSources[layerId].getFeatureInfoUrl(
        evt.coordinate,
        viewResolution,
        view.getProjection(),
        {
          // FORMAT: 'application/json',
          INFO_FORMAT: 'application/json',
          FEATURE_COUNT: 1,
          QUERY_LAYERS: layerName,
        },
      );

      fetch(url.replace('http://221.122.67.144:18090/', '').replace('version=1.1.1&', ''))
        .then((response) => response.json())
        .then((data) => {
          if (!data || data.features.length === 0) return;
          const feature = data.features?.at(0);
          feature.properties = {
            ...feature.properties,
            lon: evt.coordinate[0],
            lat: evt.coordinate[1],
          };
          // 选中
          this.selectFeatureSource.clear();
          this.selectFeatureSource.addFeature(
            new Feature({ geometry: new MultiPolygon(feature.geometry.coordinates) }),
          );
          // 弹窗
          typeof callback === 'function' && callback(feature, layerId);
        });
    });
    this.shpWMSLayers[layerId].id = layerId;
    this.map.addLayer(this.shpWMSLayers[layerId]);
  }

  addTiledWMSLayer(options) {
    const { url, params = {}, sldParams } = options;
    const { layers } = params;
    const layerId = layers.split(':')[1];
    const { zIndex = 1000 } = params;
    let sldBody;
    if (sldParams) {
      sldBody = this.parseSLD(sldParams);
      params.SLD_BODY = sldBody;
    }
    const wmsSource = new TileWMS({
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
        ...params,
      },
    });
    this.shpWMSLayers[layerId] = new TileLayer({
      visible: true,
      source: wmsSource,
      zIndex,
    });
    this.shpWMSLayers[layerId].id = layerId;
    if (!layers) {
      // if (sldParams.layers.startsWith(`${geoWorkSpace}:`)) {
      //   // eslint-disable-next-line prefer-destructuring
      //   layers = sldParams.layers.split(':')[1];
      // } else {
      //   layers = sldParams.layers;
      // }
    }

    this.shpWMSLayers.push(this.shpWMSLayers[layerId]);

    this.map.addLayer(this.shpWMSLayers[layerId]);
  }

  // 移除当前矢量wms服务
  removeCurShpWMSLayer() {
    this.map.removeLayer(this.shpWMSLayers);
    this.shpWMSLayers = null;
  }

  // 移除所有矢量wms服务
  removeShpWMSLayers() {
    this.shpWMSLayers.forEach((item) => {
      this.map.removeLayer(item);
    });
    this.shpWMSLayers = [];
  }

  // 移除指定的wms服务
  removeSpecifiedShpWMS(id) {
    const tempId = id.slice();
    while (tempId.length > 0) {
      this.map.getLayers().forEach((layer) => {
        const layerType = layer?.get('name');
        tempId.forEach((ele) => {
          if (layerType === ele) {
            this.map.removeLayer(layer);
            const index = tempId.indexOf(ele);
            tempId.splice(index, 1);
          }
        });
      });
    }
  }

  removeSpecifiedShpWMSSelf(id) {
    this.shpWMSLayers.forEach((item) => {
      const { id: layerId, layer } = item;
      id.forEach((ele) => {
        if (layerId === ele) {
          this.map.removeLayer(layer);
        }
      });
    });
  }

  // 增加和移除矢量wms服务
  toggleShpWMSLayer(options) {
    if (!this.shpWMSLayers) {
      this.addShpWMSLayer(options);
    } else {
      this.removeCurShpWMSLayer();
    }
  }

  // 解析sld
  // eslint-disable-next-line class-methods-use-this
  parseSLD(params) {
    const { layers, lineColor, lineWidth } = params;
    //     return `<?xml version="1.0" encoding="GB2312"?>
    // <sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">
    //     <sld:UserLayer>
    //         <sld:LayerFeatureConstraints>
    //             <sld:FeatureTypeConstraint/>
    //         </sld:LayerFeatureConstraints>
    //         <sld:UserStyle>
    //             <sld:Name>AreaCounty</sld:Name>
    //             <sld:FeatureTypeStyle>
    //                 <sld:Name>group 0</sld:Name>
    //                 <sld:FeatureTypeName>Feature</sld:FeatureTypeName>
    //                 <sld:SemanticTypeIdentifier>generic:geometry</sld:SemanticTypeIdentifier>
    //                 <sld:SemanticTypeIdentifier>simple</sld:SemanticTypeIdentifier>
    //                 <sld:Rule>
    //                     <sld:Name>default rule</sld:Name>
    //                     <sld:PolygonSymbolizer>
    //                         <sld:Stroke>
    //                             <sld:CssParameter name="stroke">${lineColor}</sld:CssParameter>
    //                             <sld:CssParameter name="stroke-width">${lineWidth}</sld:CssParameter>
    //                         </sld:Stroke>
    //                     </sld:PolygonSymbolizer>
    //                 </sld:Rule>
    //             </sld:FeatureTypeStyle>
    //         </sld:UserStyle>
    //     </sld:UserLayer>
    // </sld:StyledLayerDescriptor>`;
    return `<?xml version="1.0" encoding="ISO-8859-1"?>
            <StyledLayerDescriptor version="1.0.0"
                xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
                xmlns="http://www.opengis.net/sld"
                xmlns:ogc="http://www.opengis.net/ogc"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
              <NamedLayer>
                <Name>${layers}</Name>
                <UserStyle>
                  <Title>SLD Cook Book: Transparent polygon</Title>
                  <FeatureTypeStyle>
                    <Rule>
                      <PolygonSymbolizer>
                        <Fill>
                          <CssParameter name="fill">#000080</CssParameter>
                          <CssParameter name="fill-opacity">0</CssParameter>
                        </Fill>
                        <Stroke>
                          <CssParameter name="stroke">${lineColor}</CssParameter>
                          <CssParameter name="stroke-width">${lineWidth}</CssParameter>
                        </Stroke>
                      </PolygonSymbolizer>
                    </Rule>
                  </FeatureTypeStyle>
                </UserStyle>
              </NamedLayer>
            </StyledLayerDescriptor>`;
  }
}

export default OLShpWMS;
