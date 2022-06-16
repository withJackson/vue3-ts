<template>
  <div class="input">
    <van-cell-group inset>
      <van-field v-model="value" label="搜索" placeholder="作者名称/小说名称" />
    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"; // props emit
import { useRouter } from "vue-router";

const router = useRouter();
const value = ref("");
</script>

<style scoped lang="scss">
.input {
  margin-top: 20px;
  .van-cell-group--inset {
    overflow: visible;
  }
  .van-cell {
    border: 1px solid #000;
  }
}
</style>
