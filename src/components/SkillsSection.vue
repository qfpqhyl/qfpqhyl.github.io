<template>
  <section id="skills" class="section skills">
    <div class="container">
      <h2 class="section-title fade-in-up">技能专长</h2>
      <div class="skills-content">
        <div class="skills-grid">
          <div 
            v-for="(level, skill) in config.user.skills" 
            :key="skill"
            class="skill-item card fade-in-up"
            :class="getDelayClass(skill)"
          >
            <div class="skill-header">
              <h3 class="skill-name">{{ skill }}</h3>
              <span class="skill-percentage">{{ level }}%</span>
            </div>
            <div class="skill-bar">
              <div 
                class="skill-progress" 
                :style="{ 
                  width: skillsVisible ? level + '%' : '0%',
                  background: getSkillColor(level)
                }"
              ></div>
            </div>
            <div class="skill-description">
              {{ getSkillDescription(skill) }}
            </div>
          </div>
        </div>
        
        <div class="skills-summary card fade-in-up delay-4">
          <h3>技术总结</h3>
          <div class="summary-stats">
            <div class="summary-item">
              <div class="summary-number">{{ Object.keys(config.user.skills).length }}</div>
              <div class="summary-label">核心技能</div>
            </div>
            <div class="summary-item">
              <div class="summary-number">{{ averageSkillLevel }}%</div>
              <div class="summary-label">平均水平</div>
            </div>
            <div class="summary-item">
              <div class="summary-number">{{ expertSkills }}</div>
              <div class="summary-label">专家级技能</div>
            </div>
          </div>
          <div class="tech-tags">
            <span v-for="skill in topSkills" :key="skill" class="tech-tag">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import config from '../../projects-config.json'

export default {
  name: 'SkillsSection',
  data() {
    return {
      config,
      skillsVisible: false
    }
  },
  computed: {
    averageSkillLevel() {
      const skills = Object.values(config.user.skills)
      return Math.round(skills.reduce((sum, level) => sum + level, 0) / skills.length)
    },
    expertSkills() {
      return Object.values(config.user.skills).filter(level => level >= 85).length
    },
    topSkills() {
      return Object.entries(config.user.skills)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 4)
        .map(([skill]) => skill)
    }
  },
  mounted() {
    this.observeSkills()
  },
  methods: {
    observeSkills() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.skillsVisible = true
            }, 300)
          }
        })
      }, { threshold: 0.3 })
      
      observer.observe(this.$el)
    },
    getDelayClass(skill) {
      const skills = Object.keys(config.user.skills)
      const index = skills.indexOf(skill)
      return `delay-${Math.min(index + 1, 4)}`
    },
    getSkillColor(level) {
      if (level >= 90) return 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
      if (level >= 80) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      if (level >= 70) return 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)'
      return 'linear-gradient(135deg, #48cae4 0%, #0077b6 100%)'
    },
    getSkillDescription(skill) {
      const descriptions = {
        'Python': '数据分析、Web开发、自动化脚本',
        'Vue.js': '现代前端框架，组件化开发',
        'JavaScript': 'ES6+，异步编程，DOM操作',
        'Web爬虫': 'Scrapy、BeautifulSoup、Selenium',
        '数据分析': 'Pandas、NumPy、数据可视化',
        'HTML/CSS': '响应式设计、现代CSS特性',
        '自动化工具': '流程自动化、任务调度'
      }
      return descriptions[skill] || '专业技能'
    }
  }
}
</script>

<style scoped>
.skills {
  background: #f8f9fa;
}

.skills-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.skill-item {
  padding: 2rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.skill-name {
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 600;
}

.skill-percentage {
  font-size: 1rem;
  color: #667eea;
  font-weight: 700;
}

.skill-bar {
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.skill-progress {
  height: 100%;
  border-radius: 4px;
  transition: width 1.5s ease-in-out;
  position: relative;
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.skill-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}

.skills-summary {
  padding: 2.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.skills-summary h3 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.summary-stats {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-item {
  text-align: center;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
}

.summary-number {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.summary-label {
  font-size: 0.9rem;
  color: #666;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .skills-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .skills-summary {
    position: relative;
    top: auto;
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .skill-item {
    padding: 1.5rem;
  }
  
  .summary-stats {
    flex-direction: row;
    gap: 1rem;
  }
  
  .summary-item {
    flex: 1;
    padding: 0.8rem;
  }
  
  .summary-number {
    font-size: 1.5rem;
  }
}
</style>