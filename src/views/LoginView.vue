<template>
  <div class="login">
    <p class="title">{{ title }}</p>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-loading size="24px" vertical v-show="loading">加载中...</van-loading>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { LoginInfoType } from "@/types/login";

const title = ref("登录");
const username = ref("");
const password = ref("");
const router = useRouter();
const loading = ref(false);

const onSubmit = (values: LoginInfoType) => {
  console.log("submit", values);
  if (values.username && values.password) {
    console.log("成功了吗");
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      router.push("/");
    }, 500);
  }
  //发起请求
};
</script>

<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
</style>
