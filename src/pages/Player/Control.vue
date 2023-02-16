<template>
  <div style="width: 100%">
    <section class="player-control d-flex justify-content-start">
      <div class="player-control-songinfo d-flex justify-content-start">
        <div class="img" @click="PlayerCoverBackMode">
          <img :src="songs.picUrl" alt="" />
        </div>
        <div class="songinfo d-flex flex-column align-items-start">
          <span class="songname">{{  songs.name  }}</span>
          <span class="single-text-omitted singer">{{  songs.singer  }}</span>
        </div>
      </div>
      <div class="player-control-unit d-flex justify-content-between">
        <div class="control">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shangyiqu" @click="prevMusic"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="toogleIcon">
            <use :xlink:href="playIcon"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="nextMusic">
            <use xlink:href="#icon-xiayiqu"></use>
          </svg>
        </div>
        <div class="d-flex justify-content-between">
          <div class="song-progress d-flex justify-content-between">
            <span class="current-time">00:00</span>
            <div class="progress" id="progress-bar">
              <div class="progress-bar"></div>
              <div class="progress-dot"></div>
            </div>
            <span class="total-time">{{  songs.dt  }}</span>
          </div>
          <div class="volume d-flex">
            <svg class="icon volume-icon" aria-hidden="true">
              <use xlink:href="#icon-yinliang"></use>
            </svg>
            <div class="progress" id="volume-bar">
              <div class="progress-bar"></div>
              <div class="progress-dot"></div>
            </div>
          </div>
        </div>
        <div class="list">
          <svg class="icon" aria-hidden="true" @click="musicMode = ++musicMode % 3">
            <use :xlink:href="`#icon-${musicModeIcon}`" ref="musicModeIcon"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="isShowPlayList = !isShowPlayList">
            <use xlink:href="#icon-bofangliebiao"></use>
          </svg>
        </div>
      </div>
    </section>
    <PlayList :isShowPlayList="isShowPlayList"></PlayList>
    <!-- 新添加音频 -->
    <audio id="myAudio" ref="audio" :src="musicSrc" autoplay @timeupdate="getPlayingTime"
      @ended="controlRoll, toogleMusic()" @pause="controlRoll" @playing="controlRoll"></audio>
  </div>
</template>

<script>
import { formatSongTime, formatSongLyric } from "@/util/util.js";
import PlayList from "../PlayList/PlayList";
export default {
  name: "Control",
  props: ["lyricItem"],
  components: { PlayList },
  data() {
    return {
      // 播放列表的状态
      isShowPlayList: false,
      // 播放模式 0顺序 1随机 2单曲循环
      musicMode: Number(localStorage.getItem("musicMode")) || 0,
      musicId: "",
      isPlay: "",

    };
  },
  watch: {
    // 监听musicId
    musicId() {
      this.$store.dispatch("getPlayerMusicData", this.musicId);
      // getPlayerMusicData
    },
    isPlay: {
      handler() {
        this.$nextTick(() => {
          // this.$store.dispatch();
          this.isPlay == true
            ? this.$refs.audio.play()
            : this.$refs.audio.pause();
        });
      },
    },
    // 监听播放模式
    musicMode() {
      localStorage.setItem("musicMode", this.musicMode);
      this.musicMode = localStorage.getItem("musicMode", this.musicMode);
    },
  },
  computed: {
    playIcon() {
      if (this.isPlay) {
        return "#icon-bofangzhong";
      } else {
        return "#icon-zanting";
      }
    },
    // isPlay() {
    //   return this.$store.state.playerOptions.playerMusicData.isPlay;
    // },
    // //播放中的musicId
    // musicId() {
    //   return this.$store.state.playerOptions.playerMusicData.musicId;
    // },
    // 播放地址
    musicSrc() {
      return this.$store.state.playerOptions.playerMusicData.musicSrc;
    },
    // 歌词
    lyric() {
      let localLyric = JSON.parse(
        localStorage.getItem("playerMusicData")
      ).musicLyric;
      console.log(localLyric);
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
    // 播放模式图标
    musicModeIcon() {
      if (this.musicMode == 0) {
        return "liebiaoxunhuan";
      } else if (this.musicMode == 1) {
        return "suijibofang";
      } else if (this.musicMode == 2) {
        return "danquxunhuan";
      } else {
        return "liebiaoxunhuan";
      }
    },
  },
  methods: {
    // 改变播放图标
    toogleIcon() {
      this.isPlay = !this.isPlay;
      this.$store.commit("CHANGE_ISPlAY", this.isPlay);
    },
    // 歌词高亮
    getPlayingTime() {
      try {
        // 获得歌词元素
        const lyricItem = document.querySelectorAll(".song-lyric-item");
        if (lyricItem.length == 0) return;
        // 获取当前播放时间
        const currentTime = this.$refs.audio.currentTime;
        let i = 0;
        Array.from(lyricItem).forEach((item) => {
          const time = item.getAttribute("lyrictime");
          if (currentTime > time) i++;
          item.classList.remove("active");
        });
        lyricItem[i - 1].classList.add("active");
        if (i > 5) {
          this.setScrollTop("lyric-wrap", "song-lyric-item", i - 1 - 5);
        }
      } catch (error) { }
    },
    // 滚动条自动滑动的距离
    setScrollTop(className, target, index) {
      const ele = document.querySelector(`.${className}`);
      if (typeof target == "number") {
        ele.scrollTop = index * target;
      } else if (typeof target == "string") {
        const { height } = document
          .querySelector(`.${target}`)
          .getBoundingClientRect();
        ele.scrollTop = index * height;
      } else if (target instanceof HTMLElement) {
        const { height } = target.getBoundingClientRect();
        ele.scrollTop = index * height;
      }
    },
    // 控制圆盘滚动
    controlRoll(e) {
      // const ablumCover = document.querySelector(".ablum .cover");
      // if (!ablumCover) return;
      // if (e.target.name == "ended") {
      //   ablumCover.style.animationPlayState = "paused";
      // }
      // if (e.target.name == "pause") {
      //   ablumCover.style.animationPlayState = "paused";
      // }
      // if (e.target.name == "playing") {
      //   ablumCover.style.animationPlayState = "running";
      // }
      //...代码同上省略
      const audio = this.$refs.audio;
      audio.addEventListener("ended", () => {
        const ablumCover = document.querySelector(".ablum .cover");
        if (!ablumCover) return;
        ablumCover.style.animationPlayState = "paused";
        // this.toogleMusic();
      });
      audio.addEventListener("pause", () => {
        const ablumCover = document.querySelector(".ablum .cover");
        if (!ablumCover) return;
        ablumCover.style.animationPlayState = "paused";
      });
      audio.addEventListener("playing", () => {
        const ablumCover = document.querySelector(".ablum .cover");
        if (!ablumCover) return;
        ablumCover.style.animationPlayState = "running";
      });
    },
    // 控制播放页和推荐页的跳转
    PlayerCoverBackMode() {
      const params = this.$route.params;
      console.log(this.$route);
      if (Object.keys(params).length == 0 || this.$route.name == "home") {
        this.$router.push({
          name: "player",
          params: {
            recommendId: JSON.parse(
              localStorage.getItem("lastRecommendListId")
            ),
            musicId:
              this.$store.state.playerOptions.musicId ||
              JSON.parse(localStorage.getItem("playerMusicData")).musicId,
          },
        });
        return;
      }
      if (this.$route.name == "recommendList") {
        // console.log(this.$store.state.playerOptions.playerMusicData.musicId);
        // console.log(
        //   JSON.parse(localStorage.getItem("playerMusicData")).musicId
        // );
        // console.log(this.$route.params.recommendId);
        this.$router.push({
          name: "player",
          params: {
            recommendId: this.$route.params.recommendId,
            musicId:
              this.$store.state.playerOptions.playerMusicData.musicId ||
              JSON.parse(localStorage.getItem("playerMusicData")).musicId,
          },
        });
        return;
      } else if (this.$route.name == "player") {
        console.log(this.$route);
        this.$router.push({
          name: "recommendList",
          params: {
            recommendId: this.$route.params.recommendId,
          },
        });
        return;
      }
    },
    // 改变musicId
    changeMusicId(control = "next") {
      let musicId = this.musicId || 1813926556;
      const mode = this.musicMode || 0;
      if (mode == 2) return musicId;

      const songList = this.$store.state.playerOptions.playList || [];
      const songs = songList.length;
      let index = songList.findIndex((item) => item.id == musicId);
      if (mode == 1) {
        index = Math.floor(Math.random() * songs);
      } else if (mode == 0 && control == "next") {
        index = ++index % songs;
      } else if (mode == 0 && control == "prev") {
        index = --index % songs;
      }
      musicId = songs > 0 ? songList[index].id : musicId;
      // window.localStorage.setItem("musicId", musicId);
      return musicId;
    },
    // 播放下一首
    nextMusic() {
      this.musicId = this.changeMusicId("next");
      if (this.musicMode == 2) {
        this.$router.go(0);
      }
      if (this.musicMode !== 2 && this.$route.name === "player") {
        this.$router.push({
          name: "player",
          params: {
            recommendId: this.$route.params.recommendId,
            musicId: this.musicId,
          },
        });
      }
      this.isPlay = true;
    },
    // 播放上一首
    prevMusic() {
      this.musicId = this.changeMusicId("prev");
      if (this.musicMode == 2) {
        this.$router.go(0);
      }
      if (this.musicMode !== 2 && this.$route.name === "player") {
        this.$router.push({
          name: "player",
          params: {
            recommendId: this.$route.params.recommendId,
            musicId: this.musicId,
          },
        });
      }

      this.isPlay = true;
    },
    // 自动切歌
    toogleMusic() {
      console.log(131313131313);
      this.musicId = this.changeMusicId();
      this.isPlay = true;
    },
    // 设置进度条的进度
    setProcess(eleName, mode, eleWidth) {
      const progressBar = document.querySelector(eleName);
      const { left, width } = progressBar.getBoundingClientRect();

      let percent;
      if (mode == "percentMode") {
        percent = eleWidth;
      } else if (mode == "positionMode") {
        let distance = eleWidth - left;
        percent = distance / width;
      }

      document.querySelector(`${eleName} .progress-bar`).style.width = `${(
        percent * 100
      ).toFixed(2)}%`;
      document.querySelector(`${eleName} .progress-dot`).style.left = `${Math.round(percent * width) - 2
        }px`;
      return percent;
    },

    /*     // 进度条更新
    UpdateProgress() {
      const myAudio = this.$refs.audio;
      const percent = this.setProcess("#volume-bar", "percentMode", 0.5);
      myAudio.volume = percent;
      const currentTime = e.target.currentTime;
      const totalTime = e.target.duration;
      this.setProcess("#progress-bar", "percentMode", currentTime / totalTime);
      document.querySelector(".song-progress .current-time").innerText =
        formatSongTime(currentTime * 1000);
      myAudio.addEventListener("timeupdate", (e) => {});
    },
    // 点击进度条
    updateProgressBar(e) {
      const percent = this.setProcess(
        "#progress-bar",
        "positionMode",
        e.clientX
      );
      const totalTime = this.$refs.audio.duration;
      this.$refs.audio.currentTime = percent * totalTime;
    },
    // 点击音量控制条
    updateVolumeBar() {
      const percent = this.setProcess("#volume-bar", "positionMode", e.clientX);
      console.log(percent);
    }, */
    initPlayerEvent() {
      this.$nextTick(() => {
        const myAudio = document.querySelector("#myAudio");
        const percent = this.setProcess("#volume-bar", "percentMode", 0.5);
        myAudio.volume = percent;
        myAudio.addEventListener("timeupdate", (e) => {
          const currentTime = e.target.currentTime;
          const totalTime = e.target.duration;
          this.setProcess(
            "#progress-bar",
            "percentMode",
            currentTime / totalTime
          );
          document.querySelector(".song-progress .current-time").innerText =
            formatSongTime(currentTime * 1000);
        });
        // 进度条控制
        document
          .querySelector("#progress-bar")
          .addEventListener("click", (e) => {
            const percent = this.setProcess(
              "#progress-bar",
              "positionMode",
              e.clientX
            );
            const totalTime = myAudio.duration;
            myAudio.currentTime = percent * totalTime;
          });
        document.querySelector("#volume-bar").addEventListener("click", (e) => {
          const percent = this.setProcess(
            "#volume-bar",
            "positionMode",
            e.clientX
          );
          myAudio.volume = percent;
        });
      });
    },
  },
  components: { PlayList },
  mounted() {
    console.log("#", this.$store.state.playerOptions.playerMusicData.musicId);
    this.musicId = this.$store.state.playerOptions.playerMusicData.musicId;
    this.isPlay = this.$store.state.playerOptions.playerMusicData.isPlay;
    this.$nextTick(() => {
      this.initPlayerEvent();
    });
  },
};
</script>

<style scoped>
</style>