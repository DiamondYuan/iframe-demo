<template></template>

<script setup>
import { ref, onMounted, onUpdated, onBeforeUnmount, useSlots } from "vue";
import { createApp } from "vue";
import ElementPlus from "element-plus";

const props = defineProps({});

const slots = useSlots();
let app = ref(null);
let dispose = ref(() => {});

function cloneStyleElement(originalStyle) {
  const clonedStyle = window.parent.document.createElement("style");

  // 复制所有属性
  for (let i = 0; i < originalStyle.attributes.length; i++) {
    const attr = originalStyle.attributes[i];
    clonedStyle.setAttribute(attr.name, attr.value);
  }

  // 复制内容
  clonedStyle.textContent = originalStyle.textContent
    .replaceAll(/(:root)/g, ":host")
    .replace("background-color: #242424", "")
    .replace("background-color: #fffff", "");

  return clonedStyle;
}

const mountComponent = () => {
  const xxx = window.parent.document.createElement("div");
  xxx.style = "width:100vw;height:100vh;position:fixed;top:0;left:0;";
  const shadowRoot = xxx.attachShadow({ mode: "open" }); // Create Shadow DOM
  const currentStyle = document.querySelectorAll("style");
  Array.from(currentStyle).forEach((item) => {
    const styl = cloneStyleElement(item);
    shadowRoot.appendChild(styl);
  });
  const sub = document.createElement("div");
  shadowRoot.appendChild(sub);
  if (app.value) {
    app.value.unmount();
  }
  window.parent.document.body.appendChild(xxx);
  dispose.value = () => {
    window.parent.document.body.removeChild(xxx);
  };
  app.value = createApp({
    setup() {
      return () => slots.default();
    },
  }).use(ElementPlus);
  app.value.mount(sub);
};

const unmountComponent = () => {
  if (app.value) {
    app.value.unmount();
    app.value = null;
  }
  if (dispose.value) {
    dispose.value();
  }
};

onMounted(mountComponent);
onUpdated(mountComponent);
onBeforeUnmount(unmountComponent);
</script>
