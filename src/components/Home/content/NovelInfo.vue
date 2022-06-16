<template>
  <div class="novelInfo">
    <img src="{{info.coverImg}}" alt="" />
    <div class="info">
      <p class="title">{{ info.title }}</p>
      <p class="author">{{ info.author }}</p>
      <div class="desc">
        {{ info.desc }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType } from "vue"; // props emit
import { useRouter } from "vue-router";
import { novelType } from "@/types/novel";

const initInfo = {
  coverImg: "",
  title: "",
  author: "",
  desc: "",
};

const props = defineProps({
  info: {
    type: Object as PropType<novelType>,
    // eslint-disable-next-line vue/valid-define-props
    default: initInfo,
  },
});
console.log("props", props.info);
</script>

<style scoped lang="scss">
.novelInfo {
  display: flex;
  justify-content: space-between;
  img {
    width: 180px;
    height: 200px;
  }

  .info {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 10px;
    display: flex;
    flex: 1;
    font-size: 14px;

    .title {
      font-size: 16px;
      font-weight: 600;
    }
    .desc {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
}
</style>
