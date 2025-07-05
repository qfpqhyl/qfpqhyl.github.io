<template>
  <div class="blog-page">
    <!-- 博客文章页面 -->
    <BlogSection />
  </div>
</template>

<script>
import BlogSection from '../components/BlogSection.vue'

export default {
  name: 'BlogPage',
  components: {
    BlogSection
  }
}
</script>

<style scoped>
/* BlogPage specific styles if needed */
</style>