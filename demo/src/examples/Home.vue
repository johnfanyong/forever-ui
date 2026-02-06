<template>
  <div class="home">
    <h2>欢迎使用 Forever UI</h2>
    <p>这是一个基于 Vue 3 和 TypeScript 的现代化 UI 组件库。</p>

    <div class="features">
      <div class="feature-card">
        <h3>🎯 现代化技术栈</h3>
        <p>基于 Vue 3 Composition API 和 TypeScript 构建</p>
      </div>
      <div class="feature-card">
        <h3>📦 按需引入</h3>
        <p>支持 Tree Shaking，按需加载组件</p>
      </div>
      <div class="feature-card">
        <h3>🎨 主题定制</h3>
        <p>灵活的主题系统，轻松定制样式</p>
      </div>
      <div class="feature-card">
        <h3>🧪 完善测试</h3>
        <p>完整的单元测试覆盖率</p>
      </div>
    </div>

    <div class="quick-start">
      <h3>快速开始</h3>
      <pre><code class="language-bash"># 安装
pnpm add forever-ui

# 使用
import { Button } from 'forever-ui'
import 'forever-ui/style.css'</code></pre>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.feature-card {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}

.feature-card h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.quick-start {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
}

.quick-start pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 15px 0 0 0;
}
</style>
