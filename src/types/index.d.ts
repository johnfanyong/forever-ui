declare module "my-vue-components" {
  import { App, Plugin } from "vue";
  interface ButtonProps {
    type?: "default" | "primary" | "danger";
    size?: "small" | "medium" | "large";
  }
  export const Button: import("vue").DefineComponent<ButtonProps>;
  const plugin: Plugin;
  export default plugin;
}
