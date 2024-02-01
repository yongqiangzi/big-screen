/*
 * @Date: 2024-01-08 13:19:56
 * @LastEditTime: 2024-01-08 19:03:09
 * @FilePath: \src\utils\cesium\IconMarker\index.ts
 */
import * as Cesium from 'cesium';

export interface IconOptions {
  id?: string;
  name?: string;
  position: [number, number];
  pixelOffset?: [number, number];
  image: string;
  width?: number;
  height?: number;
  properties?: Record<string, unknown>;
  show?: boolean;
}

export class IconMarker extends Cesium.Entity {
  constructor({
    id,
    name,
    position,
    pixelOffset = [0, 0],
    image,
    width = 16,
    height = 16,
    properties,
    show = true,
  }: IconOptions) {
    super({
      id,
      name,
      position: Cesium.Cartesian3.fromDegrees(...position),
      billboard: {
        image,
        width,
        height,
        pixelOffset: new Cesium.Cartesian2(...pixelOffset),
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        show,
        sizeInMeters: true,
        eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
      },
      properties: {
        ...properties,
      },
    });
  }
}
