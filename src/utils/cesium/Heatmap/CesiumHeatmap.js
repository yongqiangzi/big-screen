/*
 * @Author: 王佳宾
 * @Date: 2023-09-18 16:11:00
 * @LastEditors: 曹健勇
 * @LastEditTime: 2024-01-09 11:01:28
 * @Description:
 * @FilePath: \src\utils\cesium\Heatmap\CesiumHeatmap.js
 */
/*
 *  _CesiumHeatMap.js v0.1 | Cesium Heatmap Library
 *
 *  Works with heatmap.js v2.0.0: http://www.patrick-wied.at/static/heatmapjs/
 */
/* eslint-disable */
import * as Cesium from 'cesium';
import Heatmap from './heatmap';

const define_CesiumHeatmap = function () {
  const _CesiumHeatMap = {
    defaults: {
      useEntitiesIfAvailable: true, // whether to use entities if a Viewer is supplied or always use an ImageryProvider
      minCanvasSize: 700, // minimum size (in pixels) for the heatmap canvas
      maxCanvasSize: 2000, // maximum size (in pixels) for the heatmap canvas
      radiusFactor: 60, // data point size factor used if no radius is given (the greater of height and width divided by this number yields the used radius)
      spacingFactor: 1.5, // extra space around the borders (point radius multiplied by this number yields the spacing)
      maxOpacity: 0.8, // the maximum opacity used if not given in the heatmap options object
      minOpacity: 0.1, // the minimum opacity used if not given in the heatmap options object
      blur: 0.85, // the blur used if not given in the heatmap options object
      gradient: {
        // the gradient used if not given in the heatmap options object
        '.3': 'blue',
        '.65': 'yellow',
        '.8': 'orange',
        '.95': 'red',
      },
    },
  };

  /*  Create a _CesiumHeatMap instance
   *
   *  cesium:  the CesiumWidget or Viewer instance
   *  bb:      the WGS84 bounding box like {north, east, south, west}
   *  options: a heatmap.js options object (see http://www.patrick-wied.at/static/heatmapjs/docs.html#h337-create)
   */
  _CesiumHeatMap.create = function (cesium, bb, options) {
    const instance = new CHInstance(cesium, bb, options);
    return instance;
  };

  _CesiumHeatMap._getContainer = function (width, height, id) {
    const c = document.createElement('div');
    if (id) {
      c.setAttribute('id', id);
    }
    c.setAttribute('style', `width: ${width}px; height: ${height}px; margin: 0px; display: none;`);
    document.body.appendChild(c);
    return c;
  };

  _CesiumHeatMap._getImageryProvider = function (instance) {
    // var n = (new Date()).getTime();
    const d = instance._heatmap.getDataURL();
    // console.log("Create data URL: " + ((new Date()).getTime() - n));

    // var n = (new Date()).getTime();
    const imgprov = new Cesium.SingleTileImageryProvider({
      url: d,
      rectangle: instance._rectangle,
    });
    // console.log("Create imageryprovider: " + ((new Date()).getTime() - n));

    imgprov._tilingScheme = new Cesium.WebMercatorTilingScheme({
      rectangleSouthwestInMeters: new Cesium.Cartesian2(
        instance._mbounds.west,
        instance._mbounds.south,
      ),
      rectangleNortheastInMeters: new Cesium.Cartesian2(
        instance._mbounds.east,
        instance._mbounds.north,
      ),
    });

    return imgprov;
  };

  _CesiumHeatMap._getID = function (len) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < (len || 8); i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  const WMP = new Cesium.WebMercatorProjection();

  /*  Convert a WGS84 location into a mercator location
   *
   *  p: the WGS84 location like {x: lon, y: lat}
   */
  _CesiumHeatMap.wgs84ToMercator = function (p) {
    const mp = WMP.project(Cesium.Cartographic.fromDegrees(p.x, p.y));
    return {
      x: mp.x,
      y: mp.y,
    };
  };

  /*  Convert a WGS84 bounding box into a mercator bounding box
   *
   *  bb: the WGS84 bounding box like {north, east, south, west}
   */
  _CesiumHeatMap.wgs84ToMercatorBB = function (bb) {
    const sw = WMP.project(Cesium.Cartographic.fromDegrees(bb.west, bb.south));
    const ne = WMP.project(Cesium.Cartographic.fromDegrees(bb.east, bb.north));
    return {
      north: ne.y,
      east: ne.x,
      south: sw.y,
      west: sw.x,
    };
  };

  /*  Convert a mercator location into a WGS84 location
   *
   *  p: the mercator lcation like {x, y}
   */
  _CesiumHeatMap.mercatorToWgs84 = function (p) {
    const wp = WMP.unproject(new Cesium.Cartesian3(p.x, p.y));
    return {
      x: wp.longitude,
      y: wp.latitude,
    };
  };

  /*  Convert a mercator bounding box into a WGS84 bounding box
   *
   *  bb: the mercator bounding box like {north, east, south, west}
   */
  _CesiumHeatMap.mercatorToWgs84BB = function (bb) {
    const sw = WMP.unproject(new Cesium.Cartesian3(bb.west, bb.south));
    const ne = WMP.unproject(new Cesium.Cartesian3(bb.east, bb.north));
    return {
      north: this.rad2deg(ne.latitude),
      east: this.rad2deg(ne.longitude),
      south: this.rad2deg(sw.latitude),
      west: this.rad2deg(sw.longitude),
    };
  };

  /*  Convert degrees into radians
   *
   *  d: the degrees to be converted to radians
   */
  _CesiumHeatMap.deg2rad = function (d) {
    const r = d * (Math.PI / 180.0);
    return r;
  };

  /*  Convert radians into degrees
   *
   *  r: the radians to be converted to degrees
   */
  _CesiumHeatMap.rad2deg = function (r) {
    const d = r / (Math.PI / 180.0);
    return d;
  };

  return _CesiumHeatMap;
};
const _CesiumHeatMap = define_CesiumHeatmap();

/*  Initiate a _CesiumHeatMap instance
 *
 *  c:  CesiumWidget instance
 *  bb: a WGS84 bounding box like {north, east, south, west}
 *  o:  a heatmap.js options object (see http://www.patrick-wied.at/static/heatmapjs/docs.html#h337-create)
 */
export default function CHInstance(c, bb, o) {
  if (!bb) {
    return null;
  }
  if (!o) {
    o = {};
  }

  this._cesium = c;
  this._options = o;
  this._id = _CesiumHeatMap._getID();

  this._options.gradient = this._options.gradient
    ? this._options.gradient
    : _CesiumHeatMap.defaults.gradient;
  this._options.maxOpacity = this._options.maxOpacity
    ? this._options.maxOpacity
    : _CesiumHeatMap.defaults.maxOpacity;
  this._options.minOpacity = this._options.minOpacity
    ? this._options.minOpacity
    : _CesiumHeatMap.defaults.minOpacity;
  this._options.blur = this._options.blur ? this._options.blur : _CesiumHeatMap.defaults.blur;

  this._mbounds = _CesiumHeatMap.wgs84ToMercatorBB(bb);
  this._setWidthAndHeight(this._mbounds);

  this._options.radius = Math.round(
    this._options.radius
      ? this._options.radius
      : this.width > this.height
      ? this.width / _CesiumHeatMap.defaults.radiusFactor
      : this.height / _CesiumHeatMap.defaults.radiusFactor,
  );

  this._spacing = this._options.radius * _CesiumHeatMap.defaults.spacingFactor;
  this._xoffset = this._mbounds.west;
  this._yoffset = this._mbounds.south;

  this.width = Math.round(this.width + this._spacing * 2);
  this.height = Math.round(this.height + this._spacing * 2);

  this._mbounds.west -= this._spacing * this._factor;
  this._mbounds.east += this._spacing * this._factor;
  this._mbounds.south -= this._spacing * this._factor;
  this._mbounds.north += this._spacing * this._factor;

  this.bounds = _CesiumHeatMap.mercatorToWgs84BB(this._mbounds);

  this._rectangle = Cesium.Rectangle.fromDegrees(
    this.bounds.west,
    this.bounds.south,
    this.bounds.east,
    this.bounds.north,
  );
  this._container = _CesiumHeatMap._getContainer(this.width, this.height, this._id);
  this._options.container = this._container;
  this._heatmap = Heatmap.create(this._options);
  this._container.children[0].setAttribute('id', `${this._id}-hm`);
}

/*  Convert a WGS84 location to the corresponding heatmap location
 *
 *  p: a WGS84 location like {x:lon, y:lat}
 */
CHInstance.prototype.wgs84PointToHeatmapPoint = function (p) {
  return this.mercatorPointToHeatmapPoint(_CesiumHeatMap.wgs84ToMercator(p));
};

/*  Convert a mercator location to the corresponding heatmap location
 *
 *  p: a WGS84 location like {x: lon, y:lat}
 */
CHInstance.prototype.mercatorPointToHeatmapPoint = function (p) {
  const pn = {};

  pn.x = Math.round((p.x - this._xoffset) / this._factor + this._spacing);
  pn.y = Math.round((p.y - this._yoffset) / this._factor + this._spacing);
  pn.y = this.height - pn.y;

  return pn;
};

CHInstance.prototype._setWidthAndHeight = function (mbb) {
  this.width =
    mbb.east > 0 && mbb.west < 0 ? mbb.east + Math.abs(mbb.west) : Math.abs(mbb.east - mbb.west);
  this.height =
    mbb.north > 0 && mbb.south < 0
      ? mbb.north + Math.abs(mbb.south)
      : Math.abs(mbb.north - mbb.south);
  this._factor = 1;

  if (this.width > this.height && this.width > _CesiumHeatMap.defaults.maxCanvasSize) {
    this._factor = this.width / _CesiumHeatMap.defaults.maxCanvasSize;

    if (this.height / this._factor < _CesiumHeatMap.defaults.minCanvasSize) {
      this._factor = this.height / _CesiumHeatMap.defaults.minCanvasSize;
    }
  } else if (this.height > this.width && this.height > _CesiumHeatMap.defaults.maxCanvasSize) {
    this._factor = this.height / _CesiumHeatMap.defaults.maxCanvasSize;

    if (this.width / this._factor < _CesiumHeatMap.defaults.minCanvasSize) {
      this._factor = this.width / _CesiumHeatMap.defaults.minCanvasSize;
    }
  } else if (this.width < this.height && this.width < _CesiumHeatMap.defaults.minCanvasSize) {
    this._factor = this.width / _CesiumHeatMap.defaults.minCanvasSize;

    if (this.height / this._factor > _CesiumHeatMap.defaults.maxCanvasSize) {
      this._factor = this.height / _CesiumHeatMap.defaults.maxCanvasSize;
    }
  } else if (this.height < this.width && this.height < _CesiumHeatMap.defaults.minCanvasSize) {
    this._factor = this.height / _CesiumHeatMap.defaults.minCanvasSize;

    if (this.width / this._factor > _CesiumHeatMap.defaults.maxCanvasSize) {
      this._factor = this.width / _CesiumHeatMap.defaults.maxCanvasSize;
    }
  }

  this.width /= this._factor;
  this.height /= this._factor;
};

/*  Set an array of heatmap locations
 *
 *  min:  the minimum allowed value for the data values
 *  max:  the maximum allowed value for the data values
 *  data: an array of data points in heatmap coordinates and values like {x, y, value}
 */
CHInstance.prototype.setData = function (min, max, data) {
  if (data && data.length > 0 && min !== null && min !== false && max !== null && max !== false) {
    this._heatmap.setData({
      min,
      max,
      data,
    });

    return this.updateLayer();
  }
};

/*  Set an array of WGS84 locations
 *
 *  min:  the minimum allowed value for the data values
 *  max:  the maximum allowed value for the data values
 *  data: an array of data points in WGS84 coordinates and values like { x:lon, y:lat, value }
 */
CHInstance.prototype.setWGS84Data = function (min, max, data) {
  if (data && data.length > 0 && min !== null && min !== false && max !== null && max !== false) {
    const convdata = [];

    for (let i = 0; i < data.length; i++) {
      const gp = data[i];

      const hp = this.wgs84PointToHeatmapPoint(gp);
      if (gp.value || gp.value === 0) {
        hp.value = gp.value;
      }

      convdata.push(hp);
    }

    return this.setData(min, max, convdata);
  }

  return false;
};

/*  Set whether or not the heatmap is shown on the map
 *
 *  s: true means the heatmap is shown, false means the heatmap is hidden
 */
CHInstance.prototype.show = function (s) {
  if (this._layer) {
    this._layer.show = s;
  }
};

/*  Update/(re)draw the heatmap
 */
CHInstance.prototype.updateLayer = function () {
  // only works with a Viewer instance since the cesiumWidget
  // instance doesn't contain an entities property
  // const d = this._heatmap.getDataURL();
  // return { url: d };
  if (_CesiumHeatMap.defaults.useEntitiesIfAvailable && this._cesium.entities) {
    if (this._layer) {
      this._cesium.entities.remove(this._layer);
    }

    // Work around issue with material rendering in Cesium
    // provided by https://github.com/criis
    let material = new Cesium.ImageMaterialProperty({
      image: this._heatmap._renderer.canvas,
      transparent: true,
    });

    if (Cesium.VERSION >= '1.21') {
      material.transparent = true;
    } else if (Cesium.VERSION >= '1.16') {
      material.alpha = 0.99;
    }
    this._layer = this._cesium.entities.add({
      show: true,
      rectangle: {
        zIndex: 100,
        height: 0,
        coordinates: this._rectangle,
        material: material,
      },
    });
  } else {
    if (this._layer) {
      this._cesium.scene.imageryLayers.remove(this._layer);
    }

    this._layer = this._cesium.scene.imageryLayers.addImageryProvider(
      _CesiumHeatMap._getImageryProvider(this),
    );
  }
};
