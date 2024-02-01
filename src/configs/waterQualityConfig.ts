interface ColorInner {
  [key: string]: any;
}

interface ColorConfig {
  [key: string]: ColorInner;
}

const colorConfig: ColorConfig = {
  water: {
    // 严重污染
    serious: {
      value: 565,
      color: '#e70a08',
      fontColor: 'rgb(255, 255, 255)',
      emo: 'serious',
      txt: '严重污染',
      colorOpacity50: 'rgb(126 1 0 / 50%)',
    },
    // 重度污染
    severe: {
      value: 280,
      color: '#fc7f00',
      fontColor: 'rgb(255, 255, 255)',
      emo: 'severe',
      txt: '重度污染',
      colorOpacity50: 'rgb(129 0 127 / 50%)',
    },
    // 中度污染
    moderate: {
      value: 180,
      color: '#fdfd61',
      fontColor: 'rgb(255, 255, 255)',
      emo: 'moderate',
      txt: '中度污染',
      colorOpacity50: 'rgb(254 0 0 / 50%)',
    },
    // 轻度污染
    mild: {
      value: 80,
      color: '#84f21b',
      fontColor: 'rgb(255, 255, 255)',
      emo: 'mild',
      txt: '轻度污染',
      colorOpacity50: 'rgb(255 125 0 / 50%)',
    },
    // 良
    good: {
      value: 40,
      color: '#3671ff',
      fontColor: 'rgb(68, 67, 0)',
      emo: 'good',
      txt: '良',
      colorOpacity50: 'rgb(254 254 5 / 50%)',
    },
    // 优
    optimal: {
      value: 0,
      color: '#58b7ff',
      fontColor: '#174500',
      emo: 'optimal',
      txt: '优',
      colorOpacity50: 'rgb(0 231 0 / 50%)',
    },
    nodata: {
      value: 0,
      color: '#58b7ff',
      fontColor: '#174500',
      emo: 'optimal',
      txt: '优',
      colorOpacity50: 'rgb(0 231 0 / 50%)',
    },
  },
};

export default colorConfig;
