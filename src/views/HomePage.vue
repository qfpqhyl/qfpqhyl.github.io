<template>
  <div class="home-page">
    <!-- 英雄区域 -->
    <HeroSection />
    
    <!-- 关于我 -->
    <AboutSection />
    
    <!-- 技能 -->
    <SkillsSection />
    
    <!-- 作品展示 -->
    <ProjectsSection />
    
    <!-- 联系方式 -->
    <ContactSection />
  </div>
</template>

<script>
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ContactSection from '../components/ContactSection.vue'

export default {
  name: 'HomePage',
  components: {
    HeroSection,
    AboutSection,
    SkillsSection,
    ProjectsSection,
    ContactSection
  }
}
</script>

<style scoped>
/* HomePage specific styles if needed */
</style>