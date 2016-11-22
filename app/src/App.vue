<style>
  @import url('//unpkg.com/element-ui/lib/theme-default/index.css');

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    background-position: center;
    /*display: flex;*/
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
    /*text-align: center;*/
  }
  /*.content {
    height: 100%;
  }*/
</style>

<template>
  <div style="height: 100%;">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'src/vuex/store';

  export default {
    store,
  };
</script>
