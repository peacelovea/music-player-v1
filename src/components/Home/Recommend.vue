<template>
  <div class="recommend">
    <div class="recommend-container">
      <!-- <a href="#">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a> -->
      <div class="recommend-item">
        <div class="recommend-title">
          <h2>歌单推荐</h2>
        </div>
        <div class="recommend-bar">
          <div class="recommend-bar-item">
            <a class="index_tab__item index_tab__item--current">为你推荐</a>
            <a class="index_tab__item">情歌</a>
            <a class="index_tab__item">经典</a>
            <a class="index_tab__item">广场舞</a>
            <a class="index_tab__item">官方歌单</a>
            <a class="index_tab__item">网络歌曲</a>
          </div>
        </div>

        <div class="recommend-playlist">
          <div
            class="recommend-playlist-item"
            v-for="(item, index) in recommentData"
            :key="index"
          >
            <div class="recommend-playlist-cover">
              <!-- pararms参数 -->
              <router-link :to="`/recommendList/${item.creativeId}`">
                <!-- <router-link :to="{
                name:'recommendList',
                params:{
                  creativeId:item.creativeId
                }
              }"> -->
                <!-- <router-link to="/recommendList" > -->
                <img :src="item.uiElement.image.imageUrl" alt="" />
                <svg class="recommend-playlist-icon" aria-hidden="true">
                  <use xlink:href="#icon-zanting"></use>
                </svg>
              </router-link>
            </div>
            <div class="recommend-playlist-title">
              {{ item.uiElement.mainTitle.title }}
            </div>
          </div>
        </div>
      </div>

      <!-- <a href="#">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a> -->
    </div>
  </div>
</template>

<script>

export default {
  name: "Recommend",
  data() {
    return {};
  },
  props: ["recommentData"],
};
</script>

<style lang="less" scoped>
.recommend {
  position: relative;
  height: 500px;
  background-color: #fff;

  .recommend-container {
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
    .recommend-item {
      width: 80%;
      height: 100%;

      margin: auto 0;
      .recommend-title {
        width: 100%;
        height: 15%;

        padding: 20px 0;
        h2 {
          display: block;
          padding-top: 30px;
          margin: 0 auto;
          width: 196px;
          height: 40px;
          font-size: 24px;
          text-align: center;
        }
      }
      .recommend-bar {
        position: relative;
        width: 100%;
        height: 15%;
        background-color: #fff;
        .recommend-bar-item {
          position: absolute;
          width: 60%;
          height: 100%;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          display: flex;
          justify-content: center;
          a {
          }
        }
      }
      .recommend-playlist {
        width: 100%;
        padding-top: 15px;
        overflow: auto;
        margin-top: 15px;
        display: flex;
        justify-content: center;
        .recommend-playlist-item {
          position: relative;
          width: 225px;
          margin: 0 10px;
          .recommend-playlist-cover {
            position: relative;
            transition: transform 0.2s linear;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
            svg {
              display: none;
              position: absolute;
              width: 40px;
              opacity: 1;
              margin: auto;
              left: 50%;
              top: 50%;
              transform: translateX(-50%) translateY(-50%);
            }
            &:hover {
              transform: scale(1.1);
              .recommend-playlist-icon {
                display: block;
                color: #fff;
              }
            }
          }
          .recommend-playlist-title {
            padding-top: 10px;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>

