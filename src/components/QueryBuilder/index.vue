<template>
  <div class="query-builder">
    <div class="btn-group">
      <div class="btn-add" @click="addChild">{{ mergedConfig.buttonTexts.addCondition }}</div>
      <div class="btn-add-group" @click="addGroup">{{ mergedConfig.buttonTexts.addGroup }}</div>
    </div>
    <VueDraggableNext class="dragArea" tag="ul" :list="children" :group="{ name: 'g1' }">
      <li
        v-for="(item, index) in children"
        :key="item.id"
        class="condition-item"
        :data-type="item.type"
      >
        <div v-if="item.type === 'item'" class="condition-item__content">
          <div class="btn-remove" @click="removeChild(item)"></div>
          <select v-model="item.field" class="native-select" style="margin-right: 10px">
            <option value="" disabled>{{ mergedConfig.placeholderTexts.field }}</option>
            <option v-for="field in fields" :key="field.value" :value="field.value">
              {{ field.label }}
            </option>
          </select>

          <select
            v-if="item.field"
            v-model="item.operator"
            class="native-select native-select-sm"
            style="margin-right: 10px"
          >
            <option value="" disabled>{{ mergedConfig.placeholderTexts.operator }}</option>
            <option
              v-for="op in getOperatorsByFieldType(getFieldType(item.field))"
              :key="op.value"
              :value="op.value"
            >
              {{ op.label }}
            </option>
          </select>

          <select
            v-if="getFieldOptions(item.field) && showValueInput(item.operator)"
            v-model="item.value"
            class="native-select native-select-sm"
            style="margin-right: 10px"
          >
            <option value="">{{ mergedConfig.placeholderTexts.value }}</option>
            <option
              v-for="option in getFieldOptions(item.field)"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
          <input
            v-else-if="showValueInput(item.operator) && item.field"
            v-model="item.value"
            :type="getInputType(item.field)"
            :placeholder="getValuePlaceholder(item.field)"
            class="native-input"
            style="margin-right: 10px"
          />
        </div>
        <div v-else>
          <div class="btn-remove-group" @click="removeGroup(item)">
            {{ mergedConfig.buttonTexts.removeGroup }}
          </div>
          <query-builder
            v-if="item.children"
            :children="item.children"
            :fields="fields"
            @update:children="
              (newChildren) => {
                item.children = newChildren;
              }
            "
          />
        </div>
        <div
          class="condition-item__relation"
          v-show="index < children.length - 1"
          @click="item.relation = item.relation === 'and' ? 'or' : 'and'"
        >
          {{
            item.relation === "and"
              ? mergedConfig.relationLabels.and
              : mergedConfig.relationLabels.or
          }}
        </div>
      </li>
    </VueDraggableNext>
  </div>
</template>

<script setup lang="ts">
import { VueDraggableNext } from "vue-draggable-next";
import { computed } from "vue";
defineOptions({ name: "QueryBuilder" });
import type { ConditionType, FieldType, FieldTypeName, QueryBuilderConfig } from "./types";

const props = withDefaults(
  defineProps<{
    children: ConditionType[];
    fields: FieldType[];
    config?: QueryBuilderConfig;
  }>(),
  {
    config: () => ({}),
  }
);

// 获取字段类型
const getFieldType = (fieldName: string): FieldTypeName => {
  if (!fieldName) return "string";
  const field = props.fields.find((f) => f.value === fieldName);
  return field ? field.type : "string";
};

// 默认操作符配置
const defaultOperators = {
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
    { value: "equals", label: "等于" },
    { value: "notEquals", label: "不等于" },
    { value: "contains", label: "包含" },
    { value: "notContains", label: "不包含" },
    { value: "startsWith", label: "开始于" },
    { value: "endsWith", label: "结束于" },
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
};

// 合并配置
const mergedConfig = computed(() => ({
  operators: { ...defaultOperators, ...props.config.operators },
  relationLabels: {
    and: "AND",
    or: "OR",
    ...props.config.relationLabels,
  },
  placeholderTexts: {
    field: "选择字段",
    operator: "选择条件",
    value: "请输入值",
    numberValue: "请输入数值",
    dateValue: "请选择日期",
    ...props.config.placeholderTexts,
  },
  buttonTexts: {
    addCondition: "添加条件",
    addGroup: "添加组",
    removeCondition: "删除条件",
    removeGroup: "删除组",
    ...props.config.buttonTexts,
  },
  emptyText: "暂无条件",
  ...props.config,
}));

// 根据字段类型获取对应的操作符
const getOperatorsByFieldType = (fieldType: FieldTypeName) => {
  return mergedConfig.value.operators[fieldType] || [];
};

// 判断是否显示值输入框
const showValueInput = (operator: string | undefined): boolean => {
  if (!operator) return false;
  return !["isNull", "isNotNull"].includes(operator);
};

// 获取值输入框的占位符
const getValuePlaceholder = (fieldName: string): string => {
  if (!fieldName) return "请输入值";
  const fieldType = getFieldType(fieldName);
  switch (fieldType) {
    case "number":
      return "请输入数值";
    case "date":
      return "请选择日期";
    default:
      return "请输入值";
  }
};

// 根据字段类型选择适合的 input type
const getInputType = (fieldName: string): string => {
  if (!fieldName) return "text";
  const fieldType = getFieldType(fieldName);
  if (fieldType === "number") return "number";
  if (fieldType === "date") return "date";
  return "text";
};

// 获取字段的选项
const getFieldOptions = (fieldName: string) => {
  if (!fieldName) return null;
  const field = props.fields.find((f) => f.value === fieldName);
  return field?.options || null;
};

const emit = defineEmits<{ (e: "update:children", value: ConditionType[]): void }>();

const addChild = () => {
  const newChildren: ConditionType[] = [
    ...props.children,
    {
      id: Date.now(),
      type: "item",
      field: "",
      operator: "",
      value: "",
      relation: "and",
    },
  ];
  emit("update:children", newChildren);
};

const removeChild = (item: ConditionType) => {
  const index = props.children.indexOf(item);
  if (index > -1) {
    const newChildren = [...props.children];
    newChildren.splice(index, 1);
    emit("update:children", newChildren);
  }
};

const addGroup = () => {
  const newChildren: ConditionType[] = [
    ...props.children,
    {
      id: Date.now(),
      field: "",
      operator: "",
      value: "",
      type: "group",
      relation: "and",
      children: [],
    },
  ];
  emit("update:children", newChildren);
};

const removeGroup = (item: ConditionType) => {
  const index = props.children.indexOf(item);
  if (index > -1) {
    const newChildren = [...props.children];
    newChildren.splice(index, 1);
    emit("update:children", newChildren);
  }
};

// 操作符映射
const operatorMap: Record<string, string> = {
  equals: "=",
  notEquals: "!=",
  contains: "LIKE",
  notContains: "NOT LIKE",
  startsWith: "LIKE",
  endsWith: "LIKE",
  "=": "=",
  "!=": "!=",
  ">": ">",
  "<": "<",
  ">=": ">=",
  "<=": "<=",
  isNull: "IS NULL",
  isNotNull: "IS NOT NULL",
};

// 将操作符转换为可读格式
const formatOperator = (operator: string, value: string): string => {
  const op = operatorMap[operator] || operator;

  switch (operator) {
    case "contains":
      return `${op} '%${value}%'`;
    case "notContains":
      return `${op} '%${value}%'`;
    case "startsWith":
      return `${op} '${value}%'`;
    case "endsWith":
      return `${op} '%${value}'`;
    case "isNull":
    case "isNotNull":
      return op;
    default:
      return `${op} '${value}'`;
  }
};

// 格式化单个条件
const formatCondition = (condition: ConditionType, isLast: boolean = false): string => {
  if (condition.type === "group" && condition.children) {
    const childrenHtml = condition.children
      .map((child, index) => formatCondition(child, index === condition.children!.length - 1))
      .join("");
    return `(
${childrenHtml}  )${!isLast ? ` ${condition.relation?.toUpperCase() || "AND"}` : ""}\n`;
  }

  if (condition.type === "item") {
    const field = condition.field;
    const operator = condition.operator || "";
    const value = condition.value || "";
    const relation = condition.relation?.toUpperCase() || "AND";

    if (!field || !operator) {
      return "";
    }

    const conditionStr = `${field} ${formatOperator(operator, value)}`;
    return `  ${conditionStr}${!isLast ? ` ${relation}` : ""}\n`;
  }

  return "";
};

const formattedConditions = () => {
  if (!props.children || props.children.length === 0) {
    return "";
  }
  return props.children
    .map((condition, index) => formatCondition(condition, index === props.children.length - 1))
    .join("");
};

defineExpose({ formattedConditions });
</script>

<style scoped>
.query-builder {
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
}

.condition-item {
  position: relative;
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  margin-bottom: 16px;
  background: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.condition-item:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.15);
  transform: translateY(-1px);
}

/* Group item styling */
.condition-item[data-type="group"] {
  background: #f8f9fa;
  border-left: 3px solid #409eff;
}

.condition-item[data-type="group"]:hover {
  background: #f0f5ff;
}

.condition-item__content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.condition-item .condition-item__relation {
  width: 80px;
  text-align: center;
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  background: linear-gradient(135deg, #409eff 0%, #337ecc 100%);
  color: white;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.3);
}

.condition-item .condition-item__relation:hover {
  background: linear-gradient(135deg, #66b1ff 0%, #409eff 100%);
  transform: translateX(-50%) scale(1.05);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
}

.btn-remove {
  background: url("./icon-remove.svg") no-repeat center center;
  background-size: contain;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.btn-remove:hover {
  opacity: 1;
  transform: scale(1.2) rotate(90deg);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.btn-remove-group {
  background: url("./icon-remove-group.svg") no-repeat left center;
  background-size: 16px 16px;
  line-height: 32px;
  padding-left: 24px;
  cursor: pointer;
  color: #f56c6c;
  font-weight: 500;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.btn-remove-group:hover {
  opacity: 1;
  color: #f56c6c;
  transform: translateX(4px);
  text-shadow: 0 2px 4px rgba(245, 108, 108, 0.3);
}

.btn-add {
  line-height: 36px;
  padding: 4px 24px;
  cursor: pointer;
  background-color: #409eff;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(64, 158, 255, 0.3);
}

.btn-add:hover {
  background-color: #66b1ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
}

.btn-add-group {
  line-height: 36px;
  padding: 4px 24px;
  cursor: pointer;
  background-color: #67c23a;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(103, 194, 58, 0.3);
}

.btn-add-group:hover {
  background-color: #85ce61;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(103, 194, 58, 0.4);
}

.btn-group {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
}

/* Enhanced form controls */
.native-select,
.native-input {
  height: 38px;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background-color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  outline: none;
}

.native-select:focus,
.native-input:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.native-select:hover,
.native-input:hover {
  border-color: #c0c4cc;
}

.native-select {
  width: 200px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23909399' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 36px;
}

.native-select-sm {
  width: 150px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23909399' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/Polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 14px;
  padding-right: 32px;
}

.native-input {
  width: 200px;
}

.dragArea {
  min-height: 60px;
  outline: 1px dashed #dcdfe6;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: #fafafa;
  position: relative;
  overflow: hidden;
}

.dragArea::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 49%, rgba(64, 158, 255, 0.1) 50%, transparent 51%);
  background-size: 20px 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dragArea:hover {
  outline-color: #409eff;
  background: #f0f5ff;
}

.dragArea:hover::before {
  opacity: 1;
}

/* Empty state */
.dragArea:empty::after {
  content: "拖拽条件到这里或点击上方按钮添加";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #909399;
  font-size: 14px;
  text-align: center;
  pointer-events: none;
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.condition-item {
  animation: slideInUp 0.3s ease-out;
}

/* Button hover effects */
.btn-add:active,
.btn-add-group:active {
  animation: pulse 0.3s ease-in-out;
}

/* Smooth transitions for all interactive elements */
.condition-item *,
.btn-group *,
.native-select,
.native-input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus rings for accessibility */
.native-select:focus-visible,
.native-input:focus-visible {
  outline: 2px solid #409eff;
  outline-offset: 2px;
}

/* Disabled states */
.native-select:disabled,
.native-input:disabled {
  background-color: #f5f7fa;
  color: #c0c4cc;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Loading state */
.condition-item.loading {
  opacity: 0.6;
  pointer-events: none;
}
</style>
