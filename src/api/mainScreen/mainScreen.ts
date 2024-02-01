/*
 * @Author: ziyongqiang
 * @Date: 2023-12-24 13:24:36
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-17 11:17:28
 * @FilePath: \src\api\mainScreen\mainScreen.ts
 * @Description:
 */
import http from '@/utils/xhr';

// 查询水生态数据
export const queryWaterEclogicaData = (params: any) =>
  http.get('./testData/waterEcologicalData.json', params);

// 查询水文化数据
export const queryWaterCulturalData = (params: any) =>
  http.get('./testData/waterCultural.json', params);

// 查询水事件数据
export const queryWaterEventData = (params: any) =>
  http.get('./testData/waterEventsData.json', params);

// 查询水资源数据
export const queryWaterResourceData = (params: any) =>
  http.get('./testData/waterResourceUse.json', params);

// 查询重要水事数据
export const queryImportantWaterEventsData = (params: any) =>
  http.get('./testData/importantWaterEvents.json', params);

// 查询水质数据
export const queryWaterQualityData = (params: any) =>
  http.get('./testData/waterQuality.json', params);

// 查询水环境状况分屏数据
export const queryWaterEnvScreenData = (params: any) =>
  http.get('./testData/screenwaterEnv.json', params);

// 查询水质智能研判分屏数据
export const queryWaterQualityScreenData = (params: any) =>
  http.get('./testData/screenWaterQuality.json', params);

// 查询污水零直排分屏数据
export const queryPolluteWaterScreenData = (params: any) =>
  http.get('./testData/screenPolluteWater.json', params);

// 查询重点污染源分屏数据
export const queryImportantPollutionScreenData = (params: any) =>
  http.get('./testData/screenImportantPollution.json', params);

// 高德地图天气查询
export const queryTodayWeatherByAMap = (params: any) =>
  http.get('https://restapi.amap.com/v3/weather/weatherInfo', params);
