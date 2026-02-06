import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
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
    const wrapper = mount(Button);
    await wrapper.trigger("click");
    expect(wrapper.emitted().click).toBeTruthy();
  });
});