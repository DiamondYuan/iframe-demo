<template>
  <div>加载到外部</div>
  <div>test</div>
</template>

<script setup>
import { ref, onMounted, onUpdated, onBeforeUnmount, useSlots } from "vue";

onMounted(() => {
  console.log("mount it");
});
</script>
