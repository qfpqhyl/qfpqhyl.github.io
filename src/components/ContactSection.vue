<template>
  <section id="contact" class="section contact">
    <div class="container">
      <h2 class="section-title fade-in-up">联系我</h2>
      <div class="contact-content">
        <div class="contact-info fade-in-left">
          <div class="contact-card card">
            <h3>让我们一起创造些什么吧！</h3>
            <p>我对新的机会和合作项目总是保持开放的态度。无论是技术讨论、项目合作，还是简单的交流，都欢迎联系我。</p>
            
            <div class="contact-methods">
              <a :href="`mailto:${config.user.email}`" class="contact-method">
                <div class="method-icon">📧</div>
                <div class="method-info">
                  <div class="method-label">邮箱</div>
                  <div class="method-value">{{ config.user.email }}</div>
                </div>
              </a>
              
              <a :href="config.user.github" target="_blank" rel="noopener" class="contact-method">
                <div class="method-icon">🐙</div>
                <div class="method-info">
                  <div class="method-label">GitHub</div>
                  <div class="method-value">{{ config.user.name }}</div>
                </div>
              </a>
              
              <a :href="config.user.website" target="_blank" rel="noopener" class="contact-method">
                <div class="method-icon">🌐</div>
                <div class="method-info">
                  <div class="method-label">个人网站</div>
                  <div class="method-value">qfpqhyl.github.io</div>
                </div>
              </a>
              
              <div class="contact-method">
                <div class="method-icon">📍</div>
                <div class="method-info">
                  <div class="method-label">位置</div>
                  <div class="method-value">{{ config.user.location }}</div>
                </div>
              </div>
            </div>
            
            <div class="quick-contact">
              <h4>快速联系</h4>
              <div class="quick-buttons">
                <a :href="`mailto:${config.user.email}?subject=项目合作咨询`" class="btn">
                  📧 发送邮件
                </a>
                <a :href="config.user.github" target="_blank" rel="noopener" class="btn btn-outline">
                  🐙 访问 GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-form fade-in-right delay-2">
          <div class="form-card card">
            <h3>发送消息</h3>
            <form @submit.prevent="sendMessage" class="message-form">
              <div class="form-group">
                <label for="name">姓名</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required 
                  placeholder="请输入您的姓名"
                >
              </div>
              
              <div class="form-group">
                <label for="email">邮箱</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required 
                  placeholder="请输入您的邮箱"
                >
              </div>
              
              <div class="form-group">
                <label for="subject">主题</label>
                <select id="subject" v-model="form.subject" required>
                  <option value="">请选择主题</option>
                  <option value="项目合作">项目合作</option>
                  <option value="技术咨询">技术咨询</option>
                  <option value="求职机会">求职机会</option>
                  <option value="学习交流">学习交流</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="message">消息内容</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required 
                  rows="5" 
                  placeholder="请详细描述您想交流的内容..."
                ></textarea>
              </div>
              
              <button type="submit" class="btn submit-btn" :disabled="isSubmitting">
                <span v-if="!isSubmitting">📤 发送消息</span>
                <span v-else>⏳ 发送中...</span>
              </button>
            </form>
            
            <div class="form-note">
              <p><strong>注意：</strong> 此表单将通过您的默认邮件客户端发送邮件。如果您没有配置邮件客户端，建议直接发送邮件到 {{ config.user.email }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 工作状态 -->
      <div class="work-status fade-in-up delay-3">
        <div class="status-card card">
          <div class="status-indicator">
            <div class="status-dot"></div>
            <span class="status-text">目前开放新机会</span>
          </div>
          <p>我正在寻找有挑战性的项目和学习机会，特别是在 Python 开发、前端技术和数据分析领域。</p>
          <div class="interests">
            <span class="interest-tag">🐍 Python 开发</span>
            <span class="interest-tag">🎨 前端技术</span>
            <span class="interest-tag">📊 数据分析</span>
            <span class="interest-tag">🤖 自动化工具</span>
            <span class="interest-tag">🌐 Web 爬虫</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import config from '../../projects-config.json'

export default {
  name: 'ContactSection',
  data() {
    return {
      config,
      isSubmitting: false,
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    sendMessage() {
      this.isSubmitting = true
      
      // 构建邮件内容
      const subject = encodeURIComponent(`[作品集联系] ${this.form.subject} - ${this.form.name}`)
      const body = encodeURIComponent(
        `姓名: ${this.form.name}\n` +
        `邮箱: ${this.form.email}\n` +
        `主题: ${this.form.subject}\n\n` +
        `消息内容:\n${this.form.message}\n\n` +
        `---\n通过 qfpqhyl 作品集网站发送`
      )
      
      // 使用 mailto 链接
      const mailtoLink = `mailto:${config.user.email}?subject=${subject}&body=${body}`
      window.location.href = mailtoLink
      
      // 重置表单
      setTimeout(() => {
        this.isSubmitting = false
        this.form = {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.contact {
  background: #f8f9fa;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.contact-card,
.form-card {
  padding: 2.5rem;
}

.contact-card h3,
.form-card h3 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.contact-card p {
  color: #666;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.contact-methods {
  margin-bottom: 2.5rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.contact-method:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(5px);
}

.method-icon {
  font-size: 2rem;
  min-width: 50px;
  text-align: center;
}

.method-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.3rem;
}

.method-value {
  font-weight: 600;
  color: #2c3e50;
}

.quick-contact h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.quick-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.message-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  align-self: flex-start;
  padding: 1rem 2rem;
  font-size: 1rem;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-note {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(255, 193, 7, 0.1);
  border-radius: 8px;
  border-left: 4px solid #ffc107;
}

.form-note p {
  font-size: 0.9rem;
  color: #856404;
  margin: 0;
  line-height: 1.5;
}

.work-status {
  text-align: center;
}

.status-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 2.5rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.status-dot {
  width: 12px;
  height: 12px;
  background: #28a745;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(40, 167, 69, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
  }
}

.status-text {
  font-weight: 600;
  color: #28a745;
  font-size: 1.1rem;
}

.status-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.interests {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
}

.interest-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .contact-card,
  .form-card {
    padding: 2rem;
  }
  
  .contact-method {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .method-icon {
    font-size: 2.5rem;
  }
  
  .quick-buttons {
    flex-direction: column;
  }
  
  .interests {
    gap: 0.5rem;
  }
  
  .interest-tag {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
  
  .status-indicator {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>