<template>
  <section id="hero" class="hero">
    <div class="hero-background">
      <div class="particles"></div>
    </div>
    <div class="container">
      <div class="hero-content">
        <div class="hero-text fade-in-up">
          <div class="hero-avatar delay-1">
            <img :src="config.user.avatar" :alt="config.user.name" />
          </div>
          <h1 class="hero-title delay-2">
            你好，我是 <span class="highlight">{{ config.user.displayName }}</span>
          </h1>
          <h2 class="hero-subtitle delay-3">{{ config.user.title }}</h2>
          <p class="hero-description delay-4">{{ config.user.bio }}</p>
          <div class="hero-buttons delay-4">
            <a href="#projects" class="btn" @click="scrollTo('projects')">查看作品</a>
            <a href="#contact" class="btn btn-outline" @click="scrollTo('contact')">联系我</a>
          </div>
        </div>
        <div class="hero-stats fade-in-right delay-3">
          <div class="stat-item">
            <div class="stat-number">{{ totalProjects }}</div>
            <div class="stat-label">项目</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ totalStars }}</div>
            <div class="stat-label">GitHub Stars</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ pythonProjects }}</div>
            <div class="stat-label">Python 项目</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import config from '../../projects-config.json'

export default {
  name: 'HeroSection',
  data() {
    return {
      config
    }
  },
  computed: {
    totalProjects() {
      return config.projects.length
    },
    totalStars() {
      return config.projects.reduce((sum, project) => sum + project.stars, 0)
    },
    pythonProjects() {
      return config.projects.filter(project => project.language === 'Python').length
    }
  },
  methods: {
    scrollTo(elementId) {
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}

.particles {
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, white 2px, transparent 2px);
  background-size: 50px 50px;
  animation: float 20s infinite linear;
}

@keyframes float {
  0% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}

.hero-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 2rem;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.highlight {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .hero-stats {
    flex-direction: row;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stat-item {
    padding: 1rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>