<template>
  <section class="blog" id="blog">
    <div class="container">
      <h2>博客文章</h2>
      <div class="blog-content">
        <div class="blog-list">
          <div 
            v-for="(article, index) in articles" 
            :key="index"
            class="blog-item"
            :class="{ 'active': selectedArticle === index }"
            @click="selectArticle(index)"
          >
            <h3>{{ article.title }}</h3>
            <p class="blog-excerpt">{{ article.excerpt }}</p>
            <div class="blog-meta">
              <span class="blog-date">{{ article.date }}</span>
              <span class="blog-tags" v-if="article.tags">
                <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="blog-viewer">
          <div v-if="selectedArticle !== null" class="article-content">
            <div v-html="renderedContent"></div>
          </div>
          <div v-else class="no-selection">
            <h3>选择一篇文章开始阅读</h3>
            <p>点击左侧文章列表中的任意文章来查看完整内容。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { marked } from 'marked'

export default {
  name: 'BlogSection',
  data() {
    return {
      selectedArticle: null,
      articles: [
        {
          title: '欢迎来到我的博客',
          excerpt: '这里是我分享技术心得、学习笔记和项目经验的地方...',
          date: '2025年1月',
          tags: ['博客', '介绍'],
          file: 'welcome-to-blog.md'
        },
        {
          title: 'Vue 3 开发心得分享',
          excerpt: 'Vue.js 一直是我前端开发的首选框架，在这篇文章中分享使用心得...',
          date: '2025年1月',
          tags: ['Vue.js', '前端开发', 'JavaScript'],
          file: 'vue3-development-tips.md'
        },
        {
          title: 'Python 数据分析实战经验',
          excerpt: '分享在数据分析项目中的实用经验和技巧...',
          date: '2025年1月',
          tags: ['Python', '数据分析', 'Pandas'],
          file: 'python-data-analysis-tips.md'
        }
      ],
      renderedContent: ''
    }
  },
  mounted() {
    // 默认选择第一篇文章
    if (this.articles.length > 0) {
      this.selectArticle(0)
    }
  },
  methods: {
    async selectArticle(index) {
      this.selectedArticle = index
      const article = this.articles[index]
      
      try {
        // 使用 fetch 加载 markdown 文件
        const response = await fetch(`/blogs/${article.file}`)
        const markdownContent = await response.text()
        
        // 使用 marked 解析 markdown
        this.renderedContent = marked(markdownContent)
      } catch (error) {
        console.error('加载文章失败:', error)
        this.renderedContent = '<p>文章加载失败，请稍后重试。</p>'
      }
    }
  }
}
</script>

<style scoped>
.blog {
  background: #f8f9fa;
  padding: 5rem 0;
}

.blog h2 {
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
}

.blog-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  max-height: 600px;
}

.blog-list {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.blog-item {
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.blog-item:hover {
  background: rgba(102, 126, 234, 0.05);
  transform: translateY(-2px);
}

.blog-item.active {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
}

.blog-item h3 {
  color: #2c3e50;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.blog-excerpt {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

.blog-date {
  color: #888;
}

.blog-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
}

.blog-viewer {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.article-content {
  line-height: 1.8;
  color: #333;
}

.article-content :deep(h1) {
  color: #2c3e50;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.article-content :deep(h2) {
  color: #2c3e50;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-content :deep(h3) {
  color: #667eea;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
}

.article-content :deep(p) {
  margin-bottom: 1rem;
}

.article-content :deep(code) {
  background: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Consolas', monospace;
}

.article-content :deep(pre) {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
  border-left: 4px solid #667eea;
}

.article-content :deep(pre code) {
  background: none;
  padding: 0;
}

.article-content :deep(ul), .article-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
}

.article-content :deep(blockquote) {
  border-left: 4px solid #667eea;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  color: #666;
  font-style: italic;
}

.no-selection {
  text-align: center;
  color: #666;
  padding: 3rem;
}

.no-selection h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .blog-content {
    grid-template-columns: 1fr;
    max-height: none;
  }
  
  .blog-list {
    max-height: 300px;
  }
  
  .blog-viewer {
    max-height: 500px;
  }
}

@media (max-width: 768px) {
  .blog {
    padding: 3rem 0;
  }
  
  .blog h2 {
    font-size: 2rem;
  }
  
  .blog-content {
    gap: 2rem;
  }
  
  .blog-list, .blog-viewer {
    padding: 1rem;
  }
  
  .blog-item {
    padding: 1rem;
  }
  
  .blog-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>