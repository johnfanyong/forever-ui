import Button from "./components/Button/Button.vue";
import QueryBuilder from "./components/QueryBuilder/index.vue";
export type { ConditionType, FieldType, FieldTypeName } from "./components/QueryBuilder/types";

export { Button, QueryBuilder };

const components = [Button, QueryBuilder];

const install = (app: any) => {
  components.forEach((component) => {
    const componentName = component.name || component.__name || "UnknownComponent";
    app.component(componentName, component);
  });
};

export default {
  install,
  Button,
  QueryBuilder,
};
