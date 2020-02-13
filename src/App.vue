<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tar-bar/>
  </div>
</template>

<script>
  import MainTarBar from 'components/content/MainTabBar/MainTabBar'
  export default {
    name: 'app',
    components: {
      MainTarBar
    }
  }
</script>

<style>
 @import "assets/css/base.css";
</style>
