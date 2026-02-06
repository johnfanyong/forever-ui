<template>
  <div class="demo">
    <h2>QueryBuilder 查询构建器演示</h2>

    <div class="section">
      <h3>基础用法</h3>
      <div class="demo-container">
        <query-builder
          ref="queryBuilderRef"
          v-model:children="queryConditions"
          :fields="fields"
          :config="customConfig"
        />
        <div class="result">
          <h4>生成的查询语句：</h4>
          <pre>{{ formattedQuery || "(暂无条件)" }}</pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>自定义配置示例</h3>
      <div class="demo-container">
        <query-builder
          ref="customQueryBuilderRef"
          v-model:children="customQueryConditions"
          :fields="customFields"
          :config="englishConfig"
        />
        <div class="result">
          <h4>Generated SQL Query:</h4>
          <pre>{{ customFormattedQuery || "(No conditions)" }}</pre>
        </div>
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
            <td>v-model:children</td>
            <td>查询条件数据</td>
            <td>ConditionType[]</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>fields</td>
            <td>可选字段配置</td>
            <td>FieldType[]</td>
            <td>-</td>
          </tr>
          <tr>
            <td>config</td>
            <td>组件配置选项</td>
            <td>QueryBuilderConfig</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>ref.formattedConditions()</td>
            <td>获取格式化后的查询语句</td>
            <td>() => string</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h3>配置选项说明</h3>
      <div class="config-doc">
        <h4>QueryBuilderConfig 配置项：</h4>
        <ul>
          <li><strong>operators</strong>: 自定义操作符配置</li>
          <li><strong>relationLabels</strong>: AND/OR 关系显示文案</li>
          <li><strong>placeholderTexts</strong>: 各种占位符文本</li>
          <li><strong>buttonTexts</strong>: 按钮显示文案</li>
          <li><strong>emptyText</strong>: 空状态提示文本</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { QueryBuilder } from "forever-ui";
import type { ConditionType, FieldType } from "forever-ui";

// 基础示例
const queryBuilderRef = ref();
const queryConditions = ref<ConditionType[]>([
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

const fields: FieldType[] = [
  { value: "name", label: "姓名", type: "string" },
  { value: "age", label: "年龄", type: "number" },
  { value: "email", label: "邮箱", type: "string" },
  { value: "createdDate", label: "创建日期", type: "date" },
  { value: "isActive", label: "是否激活", type: "boolean" },
  {
    value: "status",
    label: "状态",
    type: "string",
    options: [
      { value: "active", label: "活跃" },
      { value: "inactive", label: "非活跃" },
      { value: "pending", label: "待审核" },
    ],
  },
];

// 调用组件内部的格式化方法
const formattedQuery = computed(() => {
  if (queryBuilderRef.value) {
    return queryBuilderRef.value.formattedConditions();
  }
  return "";
});

// 自定义配置示例
const customQueryBuilderRef = ref();
const customQueryConditions = ref<ConditionType[]>([
  {
    id: Date.now() + 1,
    type: "group",
    field: "",
    operator: "",
    value: "",
    relation: "and",
    children: [],
  },
]);

const customFields: FieldType[] = [
  { value: "username", label: "Username", type: "string" },
  { value: "score", label: "Score", type: "number" },
  {
    value: "category",
    label: "Category",
    type: "string",
    options: [
      { value: "tech", label: "Technology" },
      { value: "business", label: "Business" },
      { value: "sports", label: "Sports" },
    ],
  },
];

// 英文配置
const englishConfig = {
  relationLabels: {
    and: "AND",
    or: "OR",
  },
  placeholderTexts: {
    field: "Select Field",
    operator: "Select Operator",
    value: "Enter Value",
    numberValue: "Enter Number",
    dateValue: "Select Date",
  },
  buttonTexts: {
    addCondition: "Add Condition",
    addGroup: "Add Group",
    removeCondition: "Remove Condition",
    removeGroup: "Remove Group",
  },
  emptyText: "No conditions",
};

// 中文自定义配置
const customConfig = {
  operators: {
    number: [
      { value: "=", label: "等于" },
      { value: "!=", label: "不等于" },
      { value: ">", label: "大于" },
      { value: "<", label: "小于" },
      { value: ">=", label: "大于等于" },
      { value: "<=", label: "小于等于" },
      { value: "isNull", label: "为空" },
      { value: "isNotNull", label: "不为空" },
    ],
    string: [
      { value: "equals", label: "完全匹配" },
      { value: "contains", label: "包含" },
      { value: "startsWith", label: "开头是" },
      { value: "endsWith", label: "结尾是" },
      { value: "isNull", label: "为空" },
      { value: "isNotNull", label: "不为空" },
    ],
    date: [
      { value: "=", label: "等于" },
      { value: "!=", label: "不等于" },
      { value: ">", label: "晚于" },
      { value: "<", label: "早于" },
      { value: ">=", label: "晚于等于" },
      { value: "<=", label: "早于等于" },
      { value: "isNull", label: "为空" },
      { value: "isNotNull", label: "不为空" },
    ],
    boolean: [
      { value: "=", label: "等于" },
      { value: "!=", label: "不等于" },
    ],
  },
  relationLabels: {
    and: "并且",
    or: "或者",
  },
};

const customFormattedQuery = computed(() => {
  if (customQueryBuilderRef.value) {
    return customQueryBuilderRef.value.formattedConditions();
  }
  return "";
});
</script>

// ... existing styles ...
