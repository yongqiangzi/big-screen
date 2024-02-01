import * as Cesium from 'cesium';

export interface TextOptions {
  id?: string;
  name?: string;
  text?: string;
  position: [number, number, number];
  pixelOffset?: [number, number];
  image: string;
  width?: number;
  height?: number;
  properties?: Record<string, unknown>;
  show?: boolean;
}

export class TextMarker extends Cesium.Entity {
  constructor({
    id,
    name,
    text,
    position,
    pixelOffset = [0, 0],
    image,
    width = 16,
    height = 16,
    properties,
    show = true,
  }: TextOptions) {
    super({
      id,
      name,
      position: Cesium.Cartesian3.fromDegrees(...position),
      label: {
        text,
        font: '16px Source Han Sans CN-Regular, Source Han Sans CN ',
        outlineWidth: 1.0,
        fillColor: Cesium.Color.fromCssColorString('#FFFFFF'),
        showBackground: true,
        pixelOffset: new Cesium.Cartesian2(...pixelOffset),
        backgroundColor: Cesium.Color.fromCssColorString('#504408').withAlpha(0.0),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
      billboard: {
        image,
        width,
        height,
        pixelOffset: new Cesium.Cartesian2(...pixelOffset),
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        show,
      },
      properties: {
        ...properties,
      },
    });
  }
}
