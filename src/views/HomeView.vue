<template>
  <div class="home">
    <Header :title="str" :loginInfo="loginRouter" />
    <Input />
    <div class="content">
      <NovelInfo :info="novelInfo" />
    </div>
    <!-- <body>
      </body>
      <footer>
      </footer> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import Header from "@/components/Home/head/Header.vue";
import Input from "@/components/Home/head/Input.vue";
import NovelInfo from "@/components/Home/content/NovelInfo.vue";
import { LoginType } from "@/types/login";
import { novelType } from "@/types/novel";

const str = ref("标题");
const loginRouter = reactive<LoginType[]>([
  { name: "登录", router: "/login" },
  { name: "注册", router: "/register" },
]);

const novelInfo = reactive<novelType>({
  coverImg: "",
  title: "万道剑尊",
  author: "作者：打死都要钱",
  desc: "【五百万收藏！2017最强热血神作！全平台玄幻收藏榜第一！五百万人疯狂追捧，你值得一看！】修逆天功法，踏天下苍生，誓以剑道冲九霄！我笑，即苍生笑，我怒，即苍生尽戮！少年剑无双，身怀大天造化诀，自修炼之始，便离经叛道，逆天而行。别人眼中的武道，为灵道七重境、灵力化海、先天金丹、阴阳虚境、超凡入圣！大天造化诀，却是神道九重天、扩极致灵海、筑无上金丹、斩阴破阳、问鼎尊者、直冲九霄！步步逆天，步步与众不同！剑无双，一剑在手，天下无双！他是独一无二的逆天君王，杀伐果断，杀尽世间一切该杀之人！他，更是掌控万道，亘古以",
});
</script>

<style lang="scss" scoped>
.content {
  padding: 40px;
  box-sizing: border-box;
}
</style>
