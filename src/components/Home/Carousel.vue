<template>
  <div class="app-container">
    <!--主体为swiper标签-->
    <!--属性 :options 绑定的是data中设置的swiper配置项-->
    <!--属性 ref 用于获取该dom元素，在计算属性computed中将被调用-->
    <!--属性 id 为swiper最外层容器设置css样式-->
    <swiper :options="swiperOption" ref="mySwiper" id="mySwiper">
      <!--必须的组件-->
      <!--每页幻灯片使用swiper-slide标签-->
      <!--幻灯片组件生成的标签自带.swiper-slide的类名，但单类名选择器设置的部分css(如宽高)将被覆盖-->
      <swiper-slide
        class="swiper_slide_item"
        v-for="banner in bannersData"
        :key="banner.targetId"
      >
        <img class="swipperImg" :src="banner.pic" alt="" />
      </swiper-slide>

      <!-- 可选的控件 -->
      <!--分页器-->
      <div class="swiper-pagination" slot="pagination"></div>
      <!--滚动条-->
      <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
      <!--前进后退按钮-->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>

  <!-- <div class="carousel">
    <div class="carousel-container">
      <a href="#">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
      <div class="carousel-item">123</div>
      <a href="#">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  </div> -->
</template>

<script>
export default {
  name: "carrousel",
  props: ["bannersData"],
  data() {
    return {
      //swiperOption：swiper配置项信息，需要绑定在swiper标签的 :option 属性中
      swiperOption: {
        //分页器配置项
        pagination: {
          el: ".swiper-pagination", //分页器的类名
          clickable: true, // 点击分页器跳切换到相应的幻灯片
          type: "bullets", //小圆点|进度条|数字页码
          dynamicBullets: true, //动态小圆点(type:'bullets'时)
          //自定义分页器，需设置样式
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom">${
              index + 1
            }</span>`;
          },
        },

        //前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        //滚动条
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: true,
        },

        //幻灯片播放配置项
        loop: true, //是否循环播放
        speed: 1000, // 发生页面切换动画时，动画的切换速度
        autoplay: {
          delay: 2000, // 幻灯片停留时间
          disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
          stopOnLastSlide: true, // 切换到最后一个slide时是否停止自动切换。（loop模式下无效）。
        },
        on: {
          slideChangeTransitionEnd: function () {
            // console.log(this.activeIndex); //每次切换结束时，在控制台打印现在是第几个slide
          },
        },
      },
    };
  },

  //计算属性
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },

  //设置自定义的按钮，点击后将前往目标也页
  methods: {
    to(index) {
      this.swiper.slideTo(index);
      console.log(this.swiper);
    },
  },
};
</script>
<!-- <style lang="less" scoped>
.carousel {
  position: relative;
  height: 500px;
  background-color: #ccc;

  .carousel-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    a {
      display: block;
      margin: auto;
      svg {
        width: 80px;
        height: 80px;
      }
    }
    .carousel-item {
      width: 80%;
      height: 100%;
      background-color: green;
      margin: auto 0;
    }
  }
}
</style> -->
<style>
.app-container {
  width: 100%;
  height: 500px;
  /* background-color: #ccc; */
}
/* 容器样式 */
#mySwiper {
  width: 80%;
  height: 100%;
  background-color: aquamarine;
}

/* 幻灯片样式 */
.swiper-slide.swiper_slide_item {
  height: 100%;
  background-color: aliceblue;
}
/* 前进后退按钮 */
.swiper-button-prev {
}
/* 自定义分页器样式 */
#mySwiper /deep/ .swiper-pagination-bullet-custom.swiper-pagination-bullet {
  width: 15px !important;
  height: 15px !important;
  color: aqua;
}
.swipperImg {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>