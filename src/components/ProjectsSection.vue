<template>
  <section id="projects" class="section projects">
    <div class="container">
      <h2 class="section-title fade-in-up">项目作品</h2>
      
      <!-- 项目分类筛选 -->
      <div class="project-filters fade-in-up delay-1">
        <button 
          :class="{ active: activeFilter === 'all' }"
          @click="setFilter('all')"
          class="filter-btn"
        >
          全部项目 ({{ config.projects.length }})
        </button>
        <button 
          v-for="(category, key) in config.categories" 
          :key="key"
          :class="{ active: activeFilter === key }"
          @click="setFilter(key)"
          class="filter-btn"
          :style="{ '--category-color': category.color }"
        >
          {{ category.icon }} {{ category.name }} ({{ getProjectsByCategory(key).length }})
        </button>
      </div>
      
      <!-- 特色项目展示 -->
      <div v-if="activeFilter === 'all'" class="featured-projects fade-in-up delay-2">
        <h3 class="featured-title">🌟 特色项目</h3>
        <div class="featured-grid">
          <div 
            v-for="project in featuredProjects" 
            :key="project.id"
            class="featured-project card"
          >
            <div class="project-header">
              <div class="project-icon" :style="{ color: getCategoryColor(project.category) }">
                {{ getCategoryIcon(project.category) }}
              </div>
              <div class="project-meta">
                <div class="project-stats">
                  <span class="stat">⭐ {{ project.stars }}</span>
                  <span class="stat">🍴 {{ project.forks }}</span>
                  <span class="language-tag" :style="{ backgroundColor: getLanguageColor(project.language) }">
                    {{ project.language }}
                  </span>
                </div>
              </div>
            </div>
            <h4 class="project-name">{{ project.name }}</h4>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-topics">
              <span v-for="topic in project.topics" :key="topic" class="topic-tag">
                {{ topic }}
              </span>
            </div>
            <div class="project-actions">
              <a :href="project.url" target="_blank" rel="noopener" class="btn btn-outline">
                📱 GitHub
              </a>
              <a 
                v-if="project.homepage" 
                :href="project.homepage" 
                target="_blank" 
                rel="noopener" 
                class="btn"
              >
                🌐 演示
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 项目网格 -->
      <div class="projects-grid fade-in-up delay-3">
        <transition-group name="project" tag="div" class="projects-container">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="project-card card"
          >
            <div class="project-header">
              <div class="project-icon" :style="{ color: getCategoryColor(project.category) }">
                {{ getCategoryIcon(project.category) }}
              </div>
              <div class="project-meta">
                <div class="project-stats">
                  <span class="stat">⭐ {{ project.stars }}</span>
                  <span class="stat">🍴 {{ project.forks }}</span>
                </div>
                <span class="language-tag" :style="{ backgroundColor: getLanguageColor(project.language) }">
                  {{ project.language }}
                </span>
              </div>
            </div>
            
            <h4 class="project-name">{{ project.name }}</h4>
            <p class="project-description">{{ project.description }}</p>
            
            <div class="project-topics">
              <span v-for="topic in project.topics" :key="topic" class="topic-tag">
                {{ topic }}
              </span>
            </div>
            
            <div class="project-footer">
              <div class="project-dates">
                <small>创建于 {{ formatDate(project.created_at) }}</small>
                <small>更新于 {{ formatDate(project.updated_at) }}</small>
              </div>
              <div class="project-actions">
                <a :href="project.url" target="_blank" rel="noopener" class="btn btn-outline">
                  GitHub
                </a>
                <a 
                  v-if="project.homepage" 
                  :href="project.homepage" 
                  target="_blank" 
                  rel="noopener" 
                  class="btn"
                >
                  演示
                </a>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
      
      <!-- 项目统计 -->
      <div class="project-stats-summary fade-in-up delay-4">
        <div class="stats-grid">
          <div class="stat-card card">
            <div class="stat-icon">📊</div>
            <div class="stat-value">{{ totalStats.totalStars }}</div>
            <div class="stat-label">总 Stars</div>
          </div>
          <div class="stat-card card">
            <div class="stat-icon">🍴</div>
            <div class="stat-value">{{ totalStats.totalForks }}</div>
            <div class="stat-label">总 Forks</div>
          </div>
          <div class="stat-card card">
            <div class="stat-icon">💻</div>
            <div class="stat-value">{{ totalStats.languages }}</div>
            <div class="stat-label">编程语言</div>
          </div>
          <div class="stat-card card">
            <div class="stat-icon">🗂️</div>
            <div class="stat-value">{{ totalStats.categories }}</div>
            <div class="stat-label">项目分类</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import config from '../../projects-config.json'

export default {
  name: 'ProjectsSection',
  data() {
    return {
      config,
      activeFilter: 'all'
    }
  },
  computed: {
    filteredProjects() {
      if (this.activeFilter === 'all') {
        return config.projects.filter(p => !p.featured)
      }
      return config.projects.filter(project => project.category === this.activeFilter)
    },
    featuredProjects() {
      return config.projects.filter(project => project.featured)
    },
    totalStats() {
      return {
        totalStars: config.projects.reduce((sum, p) => sum + p.stars, 0),
        totalForks: config.projects.reduce((sum, p) => sum + p.forks, 0),
        languages: [...new Set(config.projects.map(p => p.language))].length,
        categories: Object.keys(config.categories).length
      }
    }
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter
    },
    getProjectsByCategory(category) {
      return config.projects.filter(project => project.category === category)
    },
    getCategoryColor(category) {
      return config.categories[category]?.color || '#667eea'
    },
    getCategoryIcon(category) {
      return config.categories[category]?.icon || '📁'
    },
    getLanguageColor(language) {
      const colors = {
        'Python': '#3776ab',
        'JavaScript': '#f7df1e',
        'Vue': '#4fc08d',
        'HTML': '#e34f26',
        'CSS': '#1572b6',
        'Jupyter Notebook': '#da5b0b'
      }
      return colors[language] || '#6c757d'
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: 'short'
      })
    }
  }
}
</script>

<style scoped>
.projects {
  background: white;
}

.project-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
}

.filter-btn {
  padding: 0.8rem 1.5rem;
  border: 2px solid #e9ecef;
  background: white;
  color: #666;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
}

.filter-btn:hover {
  border-color: var(--category-color, #667eea);
  color: var(--category-color, #667eea);
}

.filter-btn.active {
  background: var(--category-color, #667eea);
  border-color: var(--category-color, #667eea);
  color: white;
}

.featured-projects {
  margin-bottom: 4rem;
}

.featured-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.featured-project {
  padding: 2.5rem;
  border-left: 4px solid #667eea;
}

.projects-grid {
  margin-bottom: 4rem;
}

.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.project-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.project-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.project-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.project-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  font-size: 0.8rem;
  color: #666;
}

.language-tag {
  font-size: 0.7rem;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-weight: 600;
}

.project-name {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
}

.project-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.project-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.topic-tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-footer {
  margin-top: auto;
}

.project-dates {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: #999;
}

.project-actions {
  display: flex;
  gap: 1rem;
}

.project-stats-summary {
  margin-top: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

/* 动画效果 */
.project-enter-active,
.project-leave-active {
  transition: all 0.5s ease;
}

.project-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.project-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .project-filters {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
  
  .featured-grid,
  .projects-container {
    grid-template-columns: 1fr;
  }
  
  .project-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .project-meta {
    align-items: flex-start;
    width: 100%;
  }
  
  .project-stats {
    flex-wrap: wrap;
  }
  
  .project-dates {
    flex-direction: column;
    gap: 0.3rem;
  }
  
  .project-actions {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .stat-card {
    padding: 1.5rem;
  }
  
  .stat-icon {
    font-size: 2.5rem;
  }
  
  .stat-value {
    font-size: 2rem;
  }
}
</style>