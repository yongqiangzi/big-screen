/*
 * @Author: wanglei
 * @Date: 2023-12-22 13:49:20
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2023-12-26 11:14:03
 * @FilePath: \src\main.ts
 * @Descripttion:
 */
import { createApp } from 'vue';
import highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
import pinia from '@/store';
import App from './App.vue';
import { router } from './router';

import './styles/global.scss';
import './styles/theme.scss';
import 'normalize.css/normalize.css';

highcharts3d(highcharts);

const app = createApp(App);

app.use(router).use(pinia).mount('#app');
