/*
 * @Author: ziyongqiang
 * @Date: 2023-12-26 11:15:38
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2023-12-26 11:18:00
 * @FilePath: \src\utils\echartPxToRem.ts
 * @Description:
 */
const fontChart = (res: any) => {
  const clientWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return;
  const fontSize = clientWidth / 1920;
  // eslint-disable-next-line consistent-return
  return res * fontSize;
};

export default fontChart;
