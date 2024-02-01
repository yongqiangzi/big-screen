<template>
  <section class="carousel-container" :class="type">
    <Carousel ref="CarouselRef" :dots="false" autoplay>
      <section v-for="(item, index) in imageList" :key="item">
        <section class="carousel-item">
          <section class="item-detail">
            <img class="detail-img" :src="getImage(imageList[index].imageUrl)" alt="" />
            <div class="img-desc">
              <span class="title">{{ imageList[index].title }}</span>
              <div class="text" :title="imageList[index].text">{{ imageList[index].text }}</div>
            </div>
          </section>
          <section class="item-detail">
            <img
              class="detail-img"
              :src="
                getImage(
                  imageList[index + 1]?.imageUrl
                    ? imageList[index + 1]?.imageUrl
                    : imageList[0]?.imageUrl,
                )
              "
              alt=""
            />
            <div class="img-desc">
              <span class="title">{{
                imageList[index + 1] ? imageList[index + 1]?.title : imageList[0]?.title
              }}</span>
              <div
                class="text"
                :title="
                  imageList[index + 1]?.text ? imageList[index + 1]?.text : imageList[0]?.text
                "
              >
                {{ imageList[index + 1]?.text ? imageList[index + 1]?.text : imageList[0]?.text }}
              </div>
            </div>
          </section>
        </section>
      </section>
    </Carousel>
    <section class="custom-slick-arrow right" :class="type" @click="next" />
    <section class="custom-slick-arrow left" :class="type" @click="prev" />
  </section>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Carousel } from 'ant-design-vue';

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  moduleList: {
    type: Array,
    default: () => [],
  },
});

const imageList = ref<any>([]);

watch(
  () => props.moduleList,
  (data: any) => {
    imageList.value = data;
  },
);

const CarouselRef = ref();

const next = () => {
  CarouselRef.value.next();
};

const prev = () => {
  CarouselRef.value.prev();
};

const getImage = (url: string) => {
  return new URL(`../../assets/images/mainScreen/${url}`, import.meta.url).href;
};

// 定时器
let interval: any = null;
// 自定义滚动事件
const autoScroll = (): void => {
  if (imageList.value) {
    interval = setInterval(() => {
      next();
    }, 3000);
  }
};

onMounted(() => {
  // autoScroll();
});
</script>
<style lang="scss" scoped>
.carousel-container {
  position: relative;

  &.big {
    height: 2.38rem;
  }

  :deep(.ant-carousel) {
    height: 100%;
    overflow: hidden;

    .slick-slide {
      text-align: center;

      div {
        width: 100%;
        height: 100%;
      }
    }
  }

  .carousel-item {
    box-sizing: border-box;
    display: flex !important;
    justify-content: space-between;
    width: 88% !important;
    height: 86%;
    padding: 0 0.18rem;
    margin: 0 auto;

    .item-detail {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 1.74rem;
      height: 2.1rem;
      padding: 0.04rem;
      background: url('@/assets/images/mainScreen/bg_image_carousel.png') no-repeat;
      background-size: 100% 100%;

      .detail-img {
        width: 1.62rem;
        height: 0.8rem;
      }

      .img-desc {
        box-sizing: border-box;
        width: 1.62rem;
        height: 0.62rem;
        padding: 0 0.06rem;
        margin-top: 0.02rem;
        font-family: Alibaba-PuHuiTi-Regular, sans-serif;
        color: #fff;
        text-align: left;
        background: url('@/assets/images/mainScreen/bg_image_text.png') no-repeat;
        background-size: 100% 100%;

        .title {
          font-size: 11px;
          font-weight: bold;
          line-height: 11px;
          text-shadow: 0 3px 3px rgb(0 0 0 / 25%);
        }

        .text {
          display: -webkit-box;
          height: 0.43rem;
          overflow: hidden;
          font-size: 10px;
          font-weight: 400;
          line-height: 11px;
          text-overflow: ellipsis;
          text-shadow: 0 3px 3px rgb(0 0 0 / 25%);
          word-wrap: break-word;
          opacity: 0.8;
          -webkit-line-clamp: 4;
          line-clamp: 4;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  .custom-slick-arrow {
    position: absolute;
    top: 0.82rem;
    width: 0.32rem;
    height: 0.45rem;
    cursor: pointer;

    &.big {
      top: 0.98rem;
    }

    &.left {
      left: 0;
      background: url('@/assets/images/mainScreen/icon_arrow_left.png') no-repeat;
      background-size: 100% 100%;
    }

    &.right {
      right: 0;
      background: url('@/assets/images/mainScreen/icon_arrow_right.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
