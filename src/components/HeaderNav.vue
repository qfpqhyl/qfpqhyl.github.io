<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="nav-content">
        <div class="nav-brand">
          <h2>{{ config.user.displayName }}</h2>
        </div>
        
        <ul class="nav-menu" :class="{ 'active': isMenuOpen }">
          <li><a href="#hero" @click="navigateToSection('hero')">首页</a></li>
          <li><a href="#about" @click="navigateToSection('about')">关于</a></li>
          <li><a href="#skills" @click="navigateToSection('skills')">技能</a></li>
          <li><a href="#projects" @click="navigateToSection('projects')">作品</a></li>
          <li><a href="/blog" @click="navigateToBlog">博客</a></li>
          <li><a href="#contact" @click="navigateToSection('contact')">联系</a></li>
        </ul>
        
        <div class="nav-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import config from '../../projects-config.json'

export default {
  name: 'HeaderNav',
  data() {
    return {
      config,
      isScrolled: false,
      isMenuOpen: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    navigateToSection(elementId) {
      // If we're not on the home page, navigate to home first
      if (this.$route.path !== '/') {
        this.$router.push('/')
        // Wait for navigation to complete, then scroll
        this.$nextTick(() => {
          setTimeout(() => {
            this.scrollTo(elementId)
          }, 100)
        })
      } else {
        this.scrollTo(elementId)
      }
    },
    navigateToBlog(event) {
      event.preventDefault()
      this.$router.push('/blog')
      this.isMenuOpen = false
    },
    scrollTo(elementId) {
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      this.isMenuOpen = false
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.nav-brand h2 {
  color: #2c3e50;
  font-weight: 700;
  font-size: 1.5rem;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-menu a:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.nav-toggle span {
  width: 25px;
  height: 3px;
  background: #2c3e50;
  transition: all 0.3s ease;
  border-radius: 2px;
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }
  
  .nav-menu {
    position: fixed;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    padding: 2rem 0;
    gap: 0;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    border-top: 1px solid #e9ecef;
  }
  
  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-menu li {
    padding: 0 2rem;
    margin: 0.5rem 0;
  }
  
  .nav-menu a {
    display: block;
    padding: 1rem;
    border-radius: 8px;
  }
}
</style>