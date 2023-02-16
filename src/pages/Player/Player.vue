<template>
  <div class="wrapper d-flex flex-column">
    <section class="content">
      <!-- <play-list></play-list> -->
      <!-- 此处为中间内容，通过 js 动态生成 -->
      <div class="player-background-image">
        <div class="player-content d-flex w">
          <!-- 内容区左 -->
          <div class="player-album-cover d-flex">
            <!-- 歌曲封面 -->
            <div class="ablum">
              <div class="cover running">
                <img :src="songs.picUrl" />
              </div>
            </div>
          </div>
          <!-- 内容区右 -->
          <div class="player-lyric d-flex align-items-start">
            <!-- 歌曲和歌词信息 -->
            <h3 class="song-name">{{ songs.name }}</h3>
            <div class="song-info">
              <span class="song-album">专辑：{{ songs.songAlbum }}</span>
              <span class="singer">歌手：{{ songs.singer }}</span>
              <span class="song-sour">来源：{{ songs.name }}</span>
            </div>
            <div class="lyric-wrap">
              <p
                class="song-lyric-item"
                ref="lyricItem"
                v-for="(item, index) in lyric"
                :key="index"
                :lyricTime="`${item.time}`"
              >
                {{ item.lyric }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <Control
      :lyricItem="this.$refs.lyricItem"
      :songs="songs"
      :musicId="musicId"
      :musicSrc="musicSrc"
    ></Control> -->
    <!-- 新添加音频 -->
    <!-- <audio controls autoplay ref="audio" :src="musicSrc" @timeupdate="getPlayingTime"></audio> -->
  </div>
</template> 

<script>
import { formatSongTime, formatSongLyric } from "@/util/util.js";
import PlayList from '../PlayList/PlayList.vue';
export default {
  components: { PlayList },
  name: "Player",
  data() {
    return {};
  },

  computed: {
    // 歌词
    lyric() {
      let localLyric = JSON.parse(
        localStorage.getItem("playerMusicData")
      ).musicLyric;

      return formatSongLyric(localLyric);
    },
    songs() {
      let songsObj = this.$store.state.playerOptions.playerMusicData.songsData;
      let localObj = JSON.parse(
        localStorage.getItem("playerMusicData")
      ).songsData;
      // console.log(localObj);
      let localLyric = JSON.parse(
        localStorage.getItem("playerMusicData")
      ).musicLyric;
      // console.log(localLyric);
      return {
        name: localObj.name,
        singer: localObj.ar[0].name,
        dt: formatSongTime(localObj.dt),
        picUrl: localObj.al.picUrl,
        songAlbum: localObj.al.name,
        lyric: formatSongLyric(localLyric),
      };
    },
  },
  methods: {
    // 歌词高亮
  },

  async mounted() {
    // 更新store
    this.$store.dispatch("getPlayerMusicData", this.$route.params.musicId);
  },
};
</script>

<style lang="less" scoped>
// * {
//   margin: 0;
//   padding: 0;
// }
// .el-header,
// .el-footer {
//   background-color: #b3c0d1;
//   color: #333;
//   text-align: center;
// }

// .el-aside {
//   background-color: #d3dce6;
//   color: #333;
//   text-align: center;
// }

// .el-main {
//   background-color: #e9eef3;
//   color: #333;
//   text-align: center;
//   height: 1000px;
//   padding: 0;
// }
// .content-left {
//   width: 70%;
//   background-color: #fff;
//   .player-title {
//     width: 45%;
//     height: 50px;
//     // background-color: rgb(47, 39, 39);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     .el-button {
//       background-color: rgb(97, 86, 86);
//       color: #fff;
//     }
//   }
//   .music-list {
//     width: 100%;
//     height: 900px;
//     background-color: #4154;

//     li {
//       background-color: yellow;
//     }
//   }
// }
</style>