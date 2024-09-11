<template>
  <el-button type="primary" style="margin-left: 16px" @click="handleClick">
    open
  </el-button>
  <external-mount v-if="dialogVisible">
    <el-dialog v-model="dialogVisible" title="Tips" width="500">
      <span @click="handleAdd">This is a message {{ counter }} </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </external-mount>
</template>

<script lang="ts" setup>
import ElementPlus from "element-plus";
import ExternalMount from "./components/ExternalMount.vue";
import Test from "./components/Test.vue";
import { ref, onMounted } from "vue";
import { createApp, h } from "vue";

const dialogVisible = ref(false);
const counter = ref(0);
function handleClick() {
  console.log("click");
  dialogVisible.value = true;
}
function handleAdd() {
  counter.value = counter.value + 1;
}
</script>

<style scoped>
.xxx {
  color: blue;
}
</style>
