<template>
  <div class="topic">
    <div class="list_box">
      <div class="item">
        <router-link :to="{ path: '/' }" class="title"
          >这是文章标题</router-link
        >
        <div class="info">
          <div class="time">2020年10月13日</div>
          <div class="read">阅读：23</div>
          <div class="label">技术</div>
        </div>
        <div class="details">
          <div class="cover">
            <img class="img" :src="img" alt="示例图片" />
          </div>
          <div class="text">
            最近沉迷于微信公众号的开发，之前做了文本消息、语音消息的处理，今天准备来看看图片消息的处理，但是看了看接口权限，瞬间失去了大部分兴趣，由于我申请的是个人公众号，所以接口权限这个问题比较严重，微信给的权最近沉迷于微信公众号的开发，之前做了文本消息、语音消息的处理，今天准备来看看图片消息的处理，但是看了看接口权限，瞬间失去了大部分兴趣，由于我申请的是个人公众号，所以接口权限这个问题比较严重，微信给的权
          </div>
        </div>
      </div>
      <div class="item">
        <router-link :to="{ path: '/' }" class="title"
          >这是文章标题</router-link
        >
        <div class="info">
          <div class="time">2020年10月13日</div>
          <div class="read">阅读：23</div>
          <div class="label">技术</div>
        </div>
        <div class="details">
          <div class="cover">
            <img class="img" :src="img" alt="示例图片" />
          </div>
          <div class="text">
            最近沉迷于微信公众号的开发，之前做了文本消息、语音消息的处理，今天准备来看看图片消息的处理，但是看了看接口权限，瞬间失去了大部分兴趣，由于我申请的是个人公众号，所以接口权限这个问题比较严重，微信给的权最近沉迷于微信公众号的开发，之前做了文本消息、语音消息的处理，今天准备来看看图片消息的处理，但是看了看接口权限，瞬间失去了大部分兴趣，由于我申请的是个人公众号，所以接口权限这个问题比较严重，微信给的权
          </div>
        </div>
      </div>
      <div class="item">
        <router-link :to="{ path: '/' }" class="title"
          >这是文章标题</router-link
        >
        <div class="info">
          <div class="time">2020年10月13日</div>
          <div class="read">阅读：23</div>
          <div class="label">技术</div>
        </div>
        <div class="details">
          <div class="cover">
            <img class="img" :src="img" alt="示例图片" />
          </div>
          <div class="text">
            最近沉迷于微信公众号的开发，之前做了文本消息、语音消息的处理，今天准备来看看图片消息的处理，但是看了看接口权限，瞬间失去了大部分兴趣，由于我申请的是个人公众号，所以接口权限这个问题比较严重，微信给的权最近沉迷于微信公众号的开发，之前做了文本消息、语音消息的处理，今天准备来看看图片消息的处理，但是看了看接口权限，瞬间失去了大部分兴趣，由于我申请的是个人公众号，所以接口权限这个问题比较严重，微信给的权
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import router from "@/router";
const img = require("@/assets/bg3.jpg");
@Component
export default class Topic extends Vue {
  img: String = img;
  constructor() {
    super();
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
        padding: 0.05rem 0;
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
        padding: 0.05rem 0;
        display: flex;
        align-items: flex-start;
        .img {
          display: block;
          width: 2rem;
          height: 2rem;
          margin-right: 0.1rem;
          border-radius: 0.05rem;
          object-fit: cover;
        }
        .text {
          font-size: 0.16rem;
          color: @c_title;
          line-height: 1.5;
          text-align: justify;
          -webkit-line-clamp: 8;
          .multi_text_ellipsis;
        }
      }
    }
  }
}
</style>
