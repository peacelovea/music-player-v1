<template v-if="recommendData.creator.avatarUrl">
  <div class="wrapper d-flex flex-column">
    <section class="content">
      <div class="w">
        <div class="recommend-header">
          <a @click="goHome">首页</a>/
          <span>推荐歌单页</span>
        </div>
        <div class="recommend-wrapper">
          <!-- 此处为推荐页，内容主要包括两个部分：歌单介绍和歌单列表 -->
          <div class="recommend-describe d-flex justify-content-start">
            <!-- 歌单介绍 -->
            <div class="recommend-describe-left">
              <img :src="recommendData.coverImgUrl" alt="" />
            </div>
            <div
              class="
                recommend-describe-right
                d-flex
                flex-column
                align-items-start
              "
            >
              <h4 class="recommend-describe-right-title single-text-omitted">
                {{ recommendData.name }}
              </h4>
              <div class="recommend-describe-right-creator d-flex">
                <img class="avatar" :src="avatarUrl" alt="" />
                <span class="creator"></span>
                <span class="create-time">2021-5-2</span>
              </div>
              <div
                @click="addPlayList"
                class="recommend-describe-right-add d-flex"
              >
                <span class="btn">播放全部</span><span class="add">+</span>
              </div>
              <div class="recommend-describe-right-info">
                <div class="info">
                  <span class="label">标签：</span>
                  <span
                    class="tag"
                    v-for="(item, index) in recommendData.tags"
                    :key="index"
                    >{{ item }} /
                  </span>
                </div>
                <div class="info">
                  <span class="label">歌曲：</span>
                  <span class="label-info">{{ recommendData.trackCount }}</span>
                  <span class="label">播放：</span>
                  <span class="label-info">{{ recommendData.playCount }}</span>
                </div>
                <div class="info multi-text-omitted">
                  <span class="label">简介：</span>
                  <span class="label-info" style="display: block; width: 800px">
                    {{ recommendData.description }}
                  </span>
                </div>
                <el-button>展开</el-button>
              </div>
            </div>
          </div>
          <div class="recommend-list">
            <!-- 歌单列表  -->
            <h4 class="recommend-list-title">歌曲列表</h4>
            <ul
              class="
                recommend-list-songlist-header
                d-flex
                justify-content-start
              "
            >
              <li class="songlist-header-name">歌曲</li>
              <li class="songlist-header-author">歌手</li>
              <li class="songlist-header-album">专辑</li>
              <li class="songlist-header-time">时长</li>
            </ul>
            <ul class="recommend-list-songlist-body">
              <template>
                <li
                  class="songlist-item d-flex justify-content-start"
                  :class="(index + 1) % 2 == 0 ? 'even' : 'odd'"
                  v-for="(item, index) in recommendData.tracks"
                  :key="item.id"
                  :musicId="`${item.id}`"
                  ref="recommendListMusic"
                  @mouseenter="addActive(index)"
                  @dblclick="playMusic(index)"
                >
                  <div class="songlist-number font-color">
                    <span class="index">{{ index + 1 }} </span>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-zanting"></use>
                    </svg>
                  </div>
                  <div class="songlist-songname">{{ item.name }}</div>
                  <div class="songlist-artist font-color">
                    {{ item.ar[0].name }}
                  </div>
                  <div class="songlist-album font-color">
                    {{ item.al.name }}
                  </div>
                  <div class="songlist-time font-color">
                    {{ item.dt | formatCreateTime }}
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PlayerHeader from "@/components/PlayerHeader/PlayerHeader";
import Control from "@/pages/Player/Control";
import { getRecommendList, getAudioSrc } from "@/service/api";

export default {
  name: "RecommendList",
  components: { PlayerHeader, Control },
  data() {
    return {
      // 歌单列表的数据
      recommendData: {},
      // 选中播放音乐的Id
      musicId: "",
      // 背景图片
      avatarUrl: "",
    };
  },
  computed: {
    // 路由的歌单列表Id
    recommendId() {
      return this.$route.params.recommendId;
    },
    playList() {
      return this.recommendData.tracks;
    },
  },
  methods: {
    // 添加active类
    addActive(index) {
      this.$refs.recommendListMusic.forEach((item) =>
        item.classList.remove("active")
      );
      this.$refs.recommendListMusic[index].classList.add("active");
    },
    // 跳转到player页面播放音乐
    playMusic(index) {
      // console.log('playMusic');
      this.musicId =
        this.$refs.recommendListMusic[index].getAttribute("musicId");
      console.log(this.$route);
      this.$router.push({
        name: "player",
        params: {
          recommendId: this.recommendId,
          musicId: this.musicId,
        },
      });

      // 将recommendId存到vuex
      console.log(this.recommendId);
      this.$store.commit("CHANGE_LAST_RECOMMENDLIST_ID", this.recommendId);
      // console.log(this.$store.state.playerOptions);
    },
    // 添加播放列表
    addPlayList() {
      alert("添加成功");
      console.log(this.$store);
      this.$store.dispatch("changePlayList", this.playList);
    },
    goHome() {
      this.$router.push({
        name: "home",
      });
    },
  },

  mounted() {
    getRecommendList(this.recommendId).then((res) => {
      if (Object.keys(this.recommendData).length === 0) {
        this.recommendData = res.playlist;
        this.avatarUrl = this.recommendData.creator.avatarUrl;
      }
    });
  },
};
</script>

<style scoped>
@import "@/../public/common/common.css";
@import "@/../public/common/home.css";
.recommend-header {
  margin: 5px 10px;
  margin-bottom: 10px;
}

.recommend-header a {
  padding: 5px 2px;
  cursor: pointer;
}

.recommend-header span {
  padding: 5px 2px;
  color: rgb(52, 99, 252);
}

.recommend-describe {
  margin: 5px;
}

.recommend-describe-left {
  width: 20%;
  border-radius: 15px;
  overflow: hidden;
  margin-right: 15px;
}

.recommend-describe-left img {
  height: 150px;
}

.recommend-describe-right {
  flex-grow: 1;
}

.recommend-describe-right-title {
  font-weight: 700;
  font-size: 20px;
  margin: 5px 0;
}

.recommend-describe-right-creator {
  margin: 5px 0;
}

.recommend-describe-right-creator .avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}

.recommend-describe-right-creator .creator {
  font-size: 12px;
  color: #507daf;
  margin-right: 10px;
}

.recommend-describe-right-creator .create-time {
  font-size: 12px;
  color: #666;
  margin-right: 10px;
}

.recommend-describe-right-add {
  margin: 5px 0;
  height: 30px;
  line-height: 30px;
}

.recommend-describe-right-add span {
  background-color: #2bb669;
  color: #fff;
  cursor: pointer;
}

.recommend-describe-right-add .btn {
  font-size: 14px;
  padding-left: 20px;
  padding-right: 10px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.recommend-describe-right-add .add {
  font-size: 20px;
  padding-left: 10px;
  padding-right: 12px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.recommend-describe-right-info {
  margin-top: 5px;
}

.recommend-describe-right-info .info {
  margin: 5px 0;
  font-size: 12px;
}

.recommend-describe-right-info .info .label {
  color: #666;
}

.recommend-describe-right-info .info .tag {
  color: #507daf;
}

.recommend-describe-right-info .info .label-info {
  color: #666;
  margin-right: 8px;
}

/*  */
.recommend-list {
  margin-top: 10px;
}

.recommend-list-title {
  font-weight: bold;
}

.recommend-list-songlist-header {
  width: 100%;
  margin: 10px 0;
  color: #433f3f;
  padding: 10px 0;
}

.recommend-list-songlist-body {
  margin-bottom: 10px;
  overflow: auto;
}

.recommend-list-songlist-body .odd {
  background-color: #e6e6e6;
}

.recommend-list-songlist-body .even {
  background-color: #e9e9e9;
}

.recommend-list-songlist-body .active {
  background-color: #f6f6f6;
}

.songlist-header-name {
  margin-left: 15%;
  width: 35%;
}

.songlist-item .songlist-number {
  text-align: center;
  width: 15%;
}

.songlist-item .songlist-songname {
  width: 35%;
}

.songlist-header-author,
.songlist-item .songlist-artist {
  width: 15%;
}

.songlist-header-album,
.songlist-item .songlist-album {
  width: 20%;
}

.songlist-header-time,
.songlist-item .songlist-time {
  width: 15%;
}

.songlist-item {
  padding: 10px 0;
}

.songlist-item .font-color {
  color: #666;
}
</style>