<template>
  <div id="app">
    <router-view/>
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
