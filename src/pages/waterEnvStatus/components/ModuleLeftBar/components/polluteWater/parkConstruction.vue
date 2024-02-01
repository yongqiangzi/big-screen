<!--
 * @Author: ziyongqiang
 * @Date: 2024-01-25 17:09:49
 * @LastEditors: ziyongqiang
 * @LastEditTime: 2024-01-29 14:07:35
 * @FilePath: \src\pages\waterEnvStatus\components\ModuleLeftBar\components\polluteWater\parkConstruction.vue
 * @Description:
-->
<template>
  <section class="park-construction">
    <CommonModuleHeader title="污水零直排示范园区建设"> </CommonModuleHeader>
    <section class="content">
      <section class="list">
        <section class="list-item" v-for="(item, index) in dataList" :key="index">
          <CommonSubHeader :title="item.name"> </CommonSubHeader>
          <section class="item-content">
            <section class="item-part item-left">
              <section class="item-part-top">
                <section class="icon left-icon"></section>
                <span class="label">{{ item.label1 }}</span>
              </section>
              <section class="item-part-bottom">
                <span class="value value1">{{ item.value1 }}</span>
                <span class="unit">个</span>
              </section>
            </section>
            <section class="item-part item-center">
              <section class="item-part-top">
                <section class="icon center-icon"></section>
                <span class="label">{{ item.label2 }}</span>
              </section>
              <section class="item-part-bottom">
                <span class="value value2">{{ item.value2 }}</span>
              </section>
            </section>
            <section class="item-part item-right">
              <section class="item-part-top">
                <section class="icon right-icon"></section>
                <span class="label">{{ item.label3 }}</span>
              </section>
              <section class="item-part-bottom">
                <span class="value value3">{{ item.value3 }}</span>
                <span class="unit">万元</span>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import CommonModuleHeader from '@/components/CommonModuleHeader/index.vue';
import CommonSubHeader from '@/components/CommonSubHeader/index.vue';

defineProps(['dataList']);
</script>

<style lang="scss" scoped>
.park-construction {
  width: 4.5rem;
  height: 2.6rem;

  .content {
    width: 94%;
    height: 2.18rem;
    padding-left: 0.15rem;

    .list {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      margin-top: 0.1rem;

      .list-item {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;

        .item-content {
          display: flex;
          align-items: center;
          width: 4.15rem;
          height: 0.66rem;
          padding-left: 0.18rem;
          font-family: Alibaba-PuHuiTi-Regular, sans-serif;
          font-size: 0.14rem;
          color: #eef7ff;
          background: url('@/assets/images/waterEnvScreen/bg_park_list.png') no-repeat center;
          background-size: 100% 100%;

          .item-part {
            display: flex;
            flex-direction: column;
            gap: 0.1rem;
            width: 30%;

            .item-part-top {
              display: flex;
              gap: 0.04rem;
              align-items: center;
            }

            .item-part-bottom {
              .value {
                font-family: 'PingFang SC', sans-serif;
                font-size: 0.24rem;
                font-weight: bold;
                line-height: 0.2rem;
                color: #20efff;
                text-shadow: 0 4px 4px rgb(0 0 0 / 25%);
              }

              .value2 {
                font-size: 15px;
              }

              .value3 {
                color: #d3c57c;
              }

              .unit {
                margin-left: 0.03rem;
                font-family: 'PingFang SC', sans-serif;
                font-size: 0.12rem;
                font-weight: 400;
                line-height: 0.14rem;
                color: #c2dff1;
              }
            }

            &:not(:last-child)::after {
              position: absolute;
              display: block;
              width: 1px;
              height: 0.4rem;
              content: '';
              background: url('@/assets/images/waterEnvScreen/bg_list_divider.png') no-repeat center;
              background-size: 100% 100%;
              transform: translate(1rem, 0.05rem);
            }

            &:nth-child(2)::after {
              transform: translate(1.4rem, 0.05rem);
            }
          }

          .item-center {
            width: 40%;
          }

          .icon {
            width: 0.14rem;
            height: 0.14rem;
          }

          .left-icon {
            background: url('@/assets/images/mainScreen/icon-number.png') no-repeat center;
          }

          .center-icon {
            background: url('@/assets/images/mainScreen/icon-pianqu-number.png') no-repeat center;
          }

          .right-icon {
            background: url('@/assets/images/mainScreen/icon-river-length.png') no-repeat center;
          }
        }
      }
    }
  }
}
</style>
