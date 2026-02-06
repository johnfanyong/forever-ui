<template>
  <div class="demo">
    <h2>Button 按钮组件演示</h2>

    <div class="section">
      <h3>基础用法</h3>
      <div class="demo-row">
        <Button>默认按钮</Button>
        <Button type="primary">主要按钮</Button>
        <Button type="danger">危险按钮</Button>
      </div>
    </div>

    <div class="section">
      <h3>不同尺寸</h3>
      <div class="demo-row">
        <Button size="small">小按钮</Button>
        <Button size="medium">中按钮</Button>
        <Button size="large">大按钮</Button>
      </div>
    </div>

    <div class="section">
      <h3>禁用状态</h3>
      <div class="demo-row">
        <Button disabled>禁用按钮</Button>
        <Button type="primary" disabled>禁用主要按钮</Button>
      </div>
    </div>

    <div class="section">
      <h3>带图标的按钮</h3>
      <div class="demo-row">
        <Button>
          <template #icon>🔍</template>
          搜索
        </Button>
        <Button type="primary">
          <template #icon>➕</template>
          添加
        </Button>
      </div>
    </div>

    <div class="section">
      <h3>API 说明</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>type</td>
            <td>按钮类型</td>
            <td>'default' | 'primary' | 'danger'</td>
            <td>'default'</td>
          </tr>
          <tr>
            <td>size</td>
            <td>按钮大小</td>
            <td>'small' | 'medium' | 'large'</td>
            <td>'medium'</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>是否禁用</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from "forever-ui";
</script>

<style scoped>
.demo {
  padding: 20px;
}

.section {
  margin-bottom: 30px;
}

.section h3 {
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.demo-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.api-table th,
.api-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.api-table th {
  background: #f5f5f5;
  font-weight: 600;
}
</style>
