<template>
  <div class="player-header">
    <div class="title"><h2>网易云音乐</h2></div>
  </div>
</template>

<script>
export default {
  name: "PlayerHeader",
};
</script>

<!-- <style lang="less">

</style> -->
<style lang="less" scoped>
.player-header {
  width: 100%;
  height: 20%;
  background-color: #fff;
  position: relative;
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    margin: 0 auto;
    height: 40px;
    font-size: 24px;
    h2 {
      text-align: center;
    }
  }
}
</style>