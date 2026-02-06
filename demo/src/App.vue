<template>
  <div class="app">
    <header class="header">
      <h1>Forever UI 组件库演示</h1>
      <nav class="nav">
        <button
          v-for="route in routes"
          :key="route.path"
          :class="{ active: currentRoute === route.path }"
          @click="currentRoute = route.path"
        >
          {{ route.name }}
        </button>
      </nav>
    </header>

    <main class="main">
      <component :is="routes.find((r) => r.path === currentRoute)?.component" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";

const routes = [
  {
    path: "/",
    name: "首页",
    component: defineAsyncComponent(() => import("./examples/Home.vue")),
  },
  {
    path: "/button",
    name: "Button 按钮",
    component: defineAsyncComponent(() => import("./examples/ButtonDemo.vue")),
  },
  {
    path: "/query-builder",
    name: "QueryBuilder 查询构建器",
    component: defineAsyncComponent(() => import("./examples/QueryBuilderDemo.vue")),
  },
];

const currentRoute = ref("/");
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e4e7ed;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 32px 24px;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.header h1 {
  margin: 0 0 16px 0;
  color: white;
  font-size: 28px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.nav {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.nav button {
  padding: 10px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.nav button.active {
  background: white;
  color: #667eea;
  border-color: white;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.main {
  min-height: 500px;
  animation: fadeIn 0.5s ease-out;
}
</style>
