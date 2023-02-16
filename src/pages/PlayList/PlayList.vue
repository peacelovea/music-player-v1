<template>
  <div v-if="isShowPlayList" class="recommend-list">
    <!-- 歌单列表  -->
    <h4 class="recommend-list-title">歌曲列表</h4>
    <ul class="recommend-list-songlist-header d-flex justify-content-start">
      <li class="songlist-header-name">歌曲</li>
      <li class="songlist-header-author">歌手</li>
      <li class="songlist-header-album">专辑</li>
      <li class="songlist-header-time">时长</li>
    </ul>
    <ul class="recommend-list-songlist-body">
      <li
        class="songlist-item d-flex justify-content-start"
        :class="(index + 1) % 2 == 0 ? 'even' : 'odd'"
        v-for="(item, index) in playList"
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
    </ul>
  </div>
</template>

<script>
export default {
  name: "PlayList",
  props: ["isShowPlayList"],
  data() {
    return {
      // 歌单列表的数据
      //   playList: [],
    };
  },
  computed: {
    playList() {
      return this.$store.state.playerOptions.playList.length == 0
        ? JSON.parse(localStorage.getItem("playList"))
        : this.$store.state.playerOptions.playList;
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
    playMusic(index) {
      // console.log('playMusic');
      this.musicId =
        this.$refs.recommendListMusic[index].getAttribute("musicId");
      console.log(this.$route);
      this.$store.dispatch("getPlayerMusicData", this.musicId);
      // this.$router.push({
      //   name: "player",
      //   params: {
      //     recommendId: this.recommendId,
      //     musicId: this.musicId,
      //   },
      // });

      // 将recommendId存到vuex
      // console.log(this.recommendId);
      // this.$store.commit("CHANGE_LAST_RECOMMENDLIST_ID", this.recommendId);
      // console.log(this.$store.state.playerOptions);
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import "@/../public/common/common.css";
@import "@/../public/common/home.css";

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