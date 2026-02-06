export type ConditionType = {
  id: number;
  type: "group" | "item";
  field: string;
  operator?: string;
  relation?: "and" | "or";
  value?: string;
  children?: ConditionType[];
};
export type FieldTypeName = "number" | "string" | "date" | "boolean";

export type FieldOption = {
  value: string;
  label: string;
};

export type FieldType = {
  value: string;
  label: string;
  type: FieldTypeName;
  options?: FieldOption[];
};
export type Operator = {
  value: string;
  label: string;
};
export type Value = {
  value: string;
  label: string;
};
export type QueryBuilderProps = {
  fields: FieldType[];
  operators: Operator[];
  values: Value[];
  condition: ConditionType;
};
export type QueryBuilderState = {
  fields: FieldType[];
  operators: Operator[];
  values: Value[];
  condition: ConditionType;
};
export type QueryBuilderMethods = {
  addGroup: (condition: ConditionType) => void;
  addItem: (condition: ConditionType) => void;
  remove: (condition: ConditionType) => void;
  update: (condition: ConditionType) => void;
};
export type OperatorConfig = {
  [key in FieldTypeName]: Array<{
    value: string;
    label: string;
  }>;
};

export type QueryBuilderConfig = {
  operators?: OperatorConfig;
  relationLabels?: {
    and: string;
    or: string;
  };
  placeholderTexts?: {
    field: string;
    operator: string;
    value: string;
    numberValue: string;
    dateValue: string;
  };
  buttonTexts?: {
    addCondition: string;
    addGroup: string;
    removeCondition: string;
    removeGroup: string;
  };
  emptyText?: string;
};

export type QueryBuilder = QueryBuilderProps & QueryBuilderState & QueryBuilderMethods;
