export interface ButtonProps {
  type?: "default" | "primary" | "danger";
  size?: "small" | "medium" | "large";
}

export interface ButtonEmits {
  (e: "click", event: MouseEvent): void;
}
