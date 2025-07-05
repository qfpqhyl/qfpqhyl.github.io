<template>
  <section id="about" class="section about">
    <div class="container">
      <h2 class="section-title fade-in-up">关于我</h2>
      <div class="about-content">
        <div class="about-text fade-in-left">
          <div class="about-card card">
            <h3>{{ config.user.title }}</h3>
            <p>{{ config.user.bio }}</p>
            <div class="about-details">
              <div class="detail-item">
                <span class="icon">📍</span>
                <span>{{ config.user.location }}</span>
              </div>
              <div class="detail-item">
                <span class="icon">💼</span>
                <span>专注于全栈开发</span>
              </div>
              <div class="detail-item">
                <span class="icon">🎯</span>
                <span>追求代码质量与用户体验</span>
              </div>
            </div>
            <div class="about-links">
              <a :href="config.user.github" target="_blank" rel="noopener" class="btn btn-outline">
                <span class="icon">📱</span> GitHub
              </a>
              <a :href="config.user.website" target="_blank" rel="noopener" class="btn btn-outline">
                <span class="icon">🌐</span> 个人网站
              </a>
            </div>
          </div>
        </div>
        
        <div class="about-highlights fade-in-right delay-2">
          <div class="highlight-grid">
            <div class="highlight-item card" v-for="(category, key) in config.categories" :key="key">
              <div class="highlight-icon" :style="{ color: category.color }">
                {{ category.icon }}
              </div>
              <h4>{{ category.name }}</h4>
              <p>{{ category.description }}</p>
              <div class="project-count">
                {{ getProjectsByCategory(key).length }} 个项目
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import config from '../../projects-config.json'

export default {
  name: 'AboutSection',
  data() {
    return {
      config
    }
  },
  methods: {
    getProjectsByCategory(category) {
      return config.projects.filter(project => project.category === category)
    }
  }
}
</script>

<style scoped>
.about {
  background: white;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-card {
  height: 100%;
}

.about-card h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-card p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #666;
  margin-bottom: 2rem;
}

.about-details {
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
}

.detail-item .icon {
  font-size: 1.2rem;
  width: 24px;
}

.about-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.highlight-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.highlight-item {
  text-align: center;
  padding: 2rem 1.5rem;
}

.highlight-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.highlight-item h4 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.highlight-item p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-count {
  font-size: 0.8rem;
  color: #667eea;
  font-weight: 600;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  display: inline-block;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .highlight-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .highlight-item {
    padding: 1.5rem 1rem;
  }
  
  .highlight-icon {
    font-size: 2.5rem;
  }
  
  .about-links {
    justify-content: center;
  }
}
</style>