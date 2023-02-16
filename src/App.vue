<template>
  <div id="app">
    <playerHeader></playerHeader>
    <!-- <keep-alive>
      <router-view ></router-view>
    </keep-alive> -->
    <router-view> </router-view>

    <Control></Control>
  </div>
</template>

<script>
import playerHeader from "./components/PlayerHeader/PlayerHeader";
import Home from "./components/Home/Home";
import Control from "./pages/Player/Control";

export default {
  name: "App",
  components: {
    playerHeader,
    Home,
    Control
},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
a {
  cursor: pointer;
}
#app {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
