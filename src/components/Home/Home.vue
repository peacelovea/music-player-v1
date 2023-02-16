<template>
  <div>
    <Carousel :bannersData="bannersData"></Carousel>
    <Recommend :recommentData="recommentData"></Recommend>
  </div>
</template>

<script>
import PlayerHeader from "../PlayerHeader/PlayerHeader";
import Carousel from "./Carousel";
import Recommend from "./Recommend";
import { getBannerList } from "../../service/api";
export default {
  name: "Home",
  components: { Carousel, Recommend, PlayerHeader },
  data() {
    return {
      //轮播图数据
      bannersData: [],
      // 推荐歌单数据
      recommentData: [],
    };
  },
  mounted() {
    //获取主页的轮播图数据和播放列表的数据，传给对应的子组件
    getBannerList().then((res) => {
      this.bannersData = res.data.blocks[0].extInfo.banners;
      this.recommentData = res.data.blocks[1].creatives;
    });
  },
};
</script>

<style>
</style>