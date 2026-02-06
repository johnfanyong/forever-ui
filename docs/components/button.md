# Button 按钮组件

按钮用于开始一个即时操作。

## 基础用法

```vue
<template>
  <Button>默认按钮</Button>
  <Button type="primary">主要按钮</Button>
  <Button type="danger">危险按钮</Button>
</template>

<script setup>
import { Button } from "forever-ui";
</script>
```

## 不同尺寸

```vue
<template>
  <Button size="small">小按钮</Button>
  <Button size="medium">中按钮</Button>
  <Button size="large">大按钮</Button>
</template>
```

## 禁用状态

```vue
<template>
  <Button disabled>禁用按钮</Button>
  <Button type="primary" disabled>禁用主要按钮</Button>
</template>
```

## API

### Button Props

| 参数     | 说明     | 类型                                 | 默认值      |
| -------- | -------- | ------------------------------------ | ----------- |
| type     | 按钮类型 | `'default' \| 'primary' \| 'danger'` | `'default'` |
| size     | 按钮大小 | `'small' \| 'medium' \| 'large'`     | `'medium'`  |
| disabled | 是否禁用 | `boolean`                            | `false`     |

### Button Events

| 事件名 | 说明           | 回调参数              |
| ------ | -------------- | --------------------- |
| click  | 点击按钮时触发 | `(event: MouseEvent)` |

### Button Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |
| icon    | 图标内容 |
