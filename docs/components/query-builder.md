# QueryBuilder 查询构建器

用于构建复杂的查询条件。

## 基础用法

```vue
<template>
  <query-builder ref="queryBuilderRef" v-model:children="queryConditions" :fields="fields" />
  <div>{{ queryBuilderRef?.formattedConditions() }}</div>
</template>

<script setup>
import { ref } from "vue";
import QueryBuilder from "forever-ui/components/QueryBuilder/index.vue";

const queryConditions = ref([
  {
    id: Date.now(),
    type: "group",
    field: "",
    operator: "",
    value: "",
    relation: "and",
    children: [],
  },
]);

const fields = [
  { value: "name", label: "姓名", type: "string" },
  { value: "age", label: "年龄", type: "number" },
  { value: "email", label: "邮箱", type: "string" },
];
</script>
```

## API

### QueryBuilder Props

| 参数             | 说明         | 类型              | 默认值 |
| ---------------- | ------------ | ----------------- | ------ |
| v-model:children | 查询条件数据 | `ConditionType[]` | `[]`   |
| fields           | 可选字段配置 | `FieldType[]`     | `-`    |

### QueryBuilder Methods

| 方法名              | 说明                   | 返回值类型 | 参数 |
| ------------------- | ---------------------- | ---------- | ---- |
| formattedConditions | 获取格式化后的查询语句 | `string`   | 无   |

### 数据结构

#### ConditionType

```typescript
interface ConditionType {
  id: number;
  type: "group" | "item";
  field: string;
  operator?: string;
  relation?: "and" | "or";
  value?: string;
  children?: ConditionType[];
}
```

#### FieldType

```typescript
interface FieldType {
  value: string;
  label: string;
  type: "number" | "string" | "date" | "boolean";
}
```

### 事件

QueryBuilder 通过 `v-model:children` 实现双向绑定，当条件发生变化时会自动更新绑定的数据。

### 使用示例

```vue
<template>
  <div>
    <query-builder ref="queryBuilderRef" v-model:children="conditions" :fields="fieldOptions" />
    <div class="query-result">
      <h3>生成的 SQL 查询:</h3>
      <pre>{{ queryBuilderRef?.formattedConditions() }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { QueryBuilder } from "forever-ui";

const queryBuilderRef = ref();
const conditions = ref([
  {
    id: Date.now(),
    type: "group",
    field: "",
    operator: "",
    value: "",
    relation: "and",
    children: [],
  },
]);

const fieldOptions = [
  { value: "name", label: "姓名", type: "string" },
  { value: "age", label: "年龄", type: "number" },
  { value: "email", label: "邮箱", type: "string" },
];
</script>
```
