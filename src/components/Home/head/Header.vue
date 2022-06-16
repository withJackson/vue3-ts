<template>
  <div class="header">
    <!-- 视图可以直接使用 -->
    <div class="title">{{ title }}</div>
    <div class="login">
      <div
        v-for="login in loginInfo"
        :key="login.name"
        class="clickItem"
        @click="clickRetive(login.router)"
      >
        {{ login.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmit, PropType } from "vue"; // props emit
import { useRouter } from "vue-router";
import { LoginType } from "@/types/login";

const props = defineProps({
  title: String,
  loginInfo: {
    type: Array as PropType<Array<LoginType>>,
  },
});

const router = useRouter();

const clickRetive = (url: string) => {
  router.push(url);
};

console.log("loginInfo", props.loginInfo); //数据需要props.
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  width: 100%;
  background-color: aliceblue;
  color: #000;
  display: flex;
  justify-content: space-between;
  font-size: 24px;
}
.login {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .clickItem {
    font-size: 18px;
    line-height: 40px;
    margin-right: 10px;
    cursor: pointer;
    align-self: center;
  }
}
</style>
