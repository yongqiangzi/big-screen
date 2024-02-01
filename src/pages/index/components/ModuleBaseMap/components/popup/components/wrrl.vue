<!--
 * @Author: 王佳宾
 * @Date: 2022-05-26 13:38:43
 * @LastEditors: 王佳宾
 * @LastEditTime: 2023-09-19 09:20:57
 * @Description:
 * @FilePath: \src\map\components\Popup\dmPopup\component\wrrl.vue
-->
<template>
  <section id="wrrl">
    <ul class="wrrl-ul">
      <li v-for="(item, index) in dataList" :key="index" class="wrrl-li">
        <section class="left">
          {{ item.name }}
        </section>
        <section class="right">
          <div class="d1" v-for="(i, index) in item.list" :key="index">
            <Popover>
              <template #content>
                <p>{{ item.dateList[index] + '日  ' + getStandardValue(i).value }}</p>
              </template>
              <div
                :title="item.dateList[index] + '日  ' + getStandardValue(i).value"
                :class="['zfx', getStandardValue(i).level]"
              ></div>
            </Popover>
          </div>
        </section>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { message, Popover } from 'ant-design-vue';

const props = defineProps({
  pointInfo: {
    type: Object,
  },
});
const dataList = ref([
  {
    name: '2023年12月',
    list: [6, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    dateList: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    ],
  },
  {
    name: '2023年11月',
    list: [
      4, 4, 6, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 6, 3, 6, 6, 3, 6, 6, 6, 6,
    ],
    dateList: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30,
    ],
  },
]);

const translateArray = (arr) => {
  const timeArr = [];
  const newArray = [];

  arr.forEach((curArr) => {
    const index = timeArr.indexOf(curArr.time);

    if (index > -1) {
      newArray[index].push(curArr);
    } else {
      timeArr.push(curArr.time);
      const { length } = newArray;

      newArray[length] = [];
      newArray[length].push(curArr);
    }
  });
  return newArray;
};

const dealData = (data) => {
  const data1 = data.map((item) => {
    const map = {
      ...item,
      date:
        item.time.split(' ')[0].slice(8, 10).indexOf('0') === 0
          ? item.time.split(' ')[0].slice(8, 10).replace('0', '')
          : item.time.split(' ')[0].slice(8, 10),
      time: item.time.split(' ')[0].slice(0, 7),
    };

    return map;
  });

  const data2 = translateArray(data1).map((itemArr, index) => {
    const lastArr = [];
    const dateArr = [];

    itemArr.forEach((item) => {
      lastArr.push(item.level);
      dateArr.push(item.date);
    });

    return {
      name: itemArr[0].time.split('-')[1].replace('0', '').concat('月'),
      list: lastArr,
      dateList: dateArr,
    };
  });

  return data2;
};

const getData = () => {
  dataList.value = [];
  axios
    .post('/wewater/DetectionAlarm/getStationWaterQualityCalendar', props.pointInfo)
    .then((res) => {
      if (res.data.code === 200) {
        dataList.value = dealData(res.data.data);
      } else {
        message.warn('污染日历数据查询异常！');
      }
    });
};

/**
 * @description 水质枚举
 */
const getStandardValue = (key) => {
  let option = {
    value: '',
    level: '',
  };

  switch (key) {
    case 0:
      option = {
        value: '-',
        level: 'level0',
      };
      break;
    case 1:
      option = {
        value: 'I类',
        level: 'level1',
      };
      break;
    case 2:
      option = {
        value: 'II类',
        level: 'level2',
      };
      break;
    case 3:
      option = {
        value: 'III类',
        level: 'level3',
      };
      break;
    case 4:
      option = {
        value: 'IV类',
        level: 'level4',
      };
      break;
    case 5:
      option = {
        value: 'V类',
        level: 'level5',
      };
      break;
    default:
      option = {
        value: '劣V类',
        level: 'level6',
      };
      break;
  }

  return option;
};
watch(
  () => props.pointInfo,
  () => {
    // getData();
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss">
#wrrl {
  width: 100%;
  height: 100%;
  padding: 0.05rem 0.05rem 0.05rem 0;

  // background: rgba(26, 48, 82, 0.6);
  .wrrl-ul {
    font-family: 'Source Han Sans CN', sans-serif;
    font-size: 16px;
    font-style: italic;
    font-weight: 400;
    line-height: 19px;
    color: #fff;
    background: none;
    border: none;

    .wrrl-li {
      display: flex;
      flex-direction: column;
      justify-content: start;
      margin-top: 0.01rem;
      margin-left: 0;

      .left {
        // width: 0.4rem;
        margin-right: 0.1rem;
        text-align: left;
      }

      .right {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: start;
        width: 100%;

        .d1 {
          .zfx {
            width: 0.24rem;
            height: 0.24rem;
            margin-top: 0.05rem;
            margin-right: 0.05rem;
            cursor: pointer;
            border-width: 0;

            &.level1 {
              background-color: rgb(181 222 200);
            }

            &.level2 {
              background-color: rgb(83 163 241);
            }

            &.level3 {
              background-color: rgb(107 218 65);
            }

            &.level4 {
              background-color: rgb(250 228 77);
            }

            &.level5 {
              background-color: rgb(231 129 49);
            }

            &.level6 {
              background-color: rgb(181 38 28);
            }

            &.level0 {
              background-color: rgb(215 215 215);
            }
          }
        }
      }
    }
  }
}
</style>
