<template>
  <div id="app">
    <!-- 导航栏 -->
    <HeaderNav />
    
    <!-- Router 视图 -->
    <router-view />
    
    <!-- 回到顶部按钮 -->
    <ScrollToTop />
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue'
import ScrollToTop from './components/ScrollToTop.vue'

export default {
  name: 'App',
  components: {
    HeaderNav,
    ScrollToTop
  }
}
</script>

<style>
/* App 全局样式已在 main.css 中定义 */
</style>