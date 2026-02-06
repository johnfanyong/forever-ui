<template>
   <button :class="['btn', `btn-${type}`, `btn-${size}`]" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: "default",
    validator: (value: string) => {
      return ["default", "primary", "danger"].includes(value);
    },
  },
  size: {
    type: String,
    default: "medium",
    validator: (value: string) => {
      return ["small", "medium", "large"].includes(value);
    },
  },
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>

<style scoped>
.btn {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-default {
  background-color: #f5f5f5;
  color: #333;
}

.btn-primary {
  background-color: #1890ff;
  color: white;
}

.btn-small {
  padding: 4px 8px;
  font-size: 12px;
}

.btn-medium {
  padding: 6px 12px;
  font-size: 14px;
}
</style>
