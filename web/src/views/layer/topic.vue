<template>
  <div class="topic">
    <div class="list_box">
      <router-link
        class="item"
        v-for="item in list"
        :key="item.id"
        :to="{ path: '/article', query: { id: item.id } }"
      >
        <div class="title">{{ item.title }}</div>
        <div class="info">
          <div class="time">
            {{ item.created_at | timeFormat("yyyy年MM月dd日") }}
          </div>
          <div class="read">阅读：0</div>
          <div class="label">
            {{ classificationList[item.classification_id] }}
          </div>
        </div>
        <div class="details">
          <div class="cover">
            <img class="img" :src="item.cover" alt="图片" />
          </div>
          <div class="text">
            {{ item.content | htmlToText }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import router from "@/router";
import { classificationList } from "@/api";
const img = require("@/assets/bg3.jpg");
@Component
export default class Topic extends Vue {
  img: String = img;
  classificationList: any = {};
  @Prop(Array) list!: Array<any>;
  constructor() {
    super();
  }
  created() {
    classificationList({
      pageSize: 100,
      pageIndex: 1
    }).then((res: any) => {
      res.data.list.forEach((item: any) => {
        this.classificationList[item.id] = item.name;
      });
      this.$forceUpdate();
    });
  }
}
</script>

<style lang="less" scoped>
@import "../../styles/config.less";
@import "../../styles/lib.less";
.topic {
  width: 100%;
  padding: 0 0.1rem;
  .list_box {
    .item {
      display: block;
      margin-top: 0.2rem;
      padding: 0.1rem 0.2rem;
      background-color: @c_tips;
      border-radius: 0.05rem;
      &:first-child {
        margin-top: 0;
      }
      .title {
        display: block;
        padding: 0.05rem 0;
        font-size: 0.2rem;
        color: @c_333;
        line-height: 1.5;
        font-weight: bold;
        .text_ellipsis;
      }
      .info {
        padding: 0.1rem 0;
        font-size: 0.14rem;
        color: @c_text;
        line-height: 1.2;
        display: flex;
        align-items: center;
        div {
          flex-basis: 20%;
        }
      }
      .details {
        padding: 0.1rem 0;
        display: flex;
        align-items: flex-start;
        .cover {
          width: 1.5rem;
          margin-right: 0.2rem;
        }
        .img {
          display: block;
          width: 1.5rem;
          height: 1.5rem;
          margin-right: 0.1rem;
          border-radius: 0.05rem;
          object-fit: cover;
        }
        .text {
          flex: 1;
          font-size: 0.16rem;
          color: @c_title;
          line-height: 1.8;
          text-align: justify;
          -webkit-line-clamp: 5;
          .multi_text_ellipsis;
        }
      }
    }
  }
}
</style>
