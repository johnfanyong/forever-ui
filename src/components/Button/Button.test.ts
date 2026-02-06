import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button.vue";

describe("Button组件", () => {
  it("应该正确渲染", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "点击我",
      },
    });
    expect(wrapper.text()).toBe("点击我");
  });

  it("点击事件应该触发", async () => {
    const onClick = vi.fn();
    const wrapper = mount(Button, {
      attrs: {
        onClick: onClick,
      },
    });

    // 触发点击
    await wrapper.find("button").trigger("click");

    // 验证事件被触发
    expect(onClick).toHaveBeenCalled();
  });

  it("应该支持自定义点击处理", async () => {
    const handleClick = vi.fn();
    const wrapper = mount(Button, {
      attrs: {
        onClick: handleClick,
      },
    });

    await wrapper.find("button").trigger("click");
    expect(handleClick).toHaveBeenCalled();
  });
});
