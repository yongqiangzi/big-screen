/*
 * @Author: PanYunhong
 * @Date: 2024-01-16 09:28:06
 * @LastEditors: PanYunhong
 * @LastEditTime: 2024-01-16 15:14:47
 * @description: 配置文档 https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \src\api\waterEnvScreen.ts
 */
import http from '@/utils/xhr';

// 查询水生态数据
export const queryFreshWater = () => http.get('./testData/freshWater.json');

export const querySeaWater = () => http.get('./testData/seaWater.json');
export const querySectionStatistics = () =>
  http.get('./testData/waterEnvStatus/sectionStatistics.json');

// 查询水质智能研判分屏数据
export const queryWaterQualityScreenData = (params: any) =>
  http.get('./testData/screenWaterQuality.json', params);
