<template>
  <div class="guide">
    <div class="wrap">
      <div class="box">
        <div class="logo_box">
          <img :src="logoUrl" alt="" class="img" />
          <!-- <div class="text">落落的个人博客</div> -->
        </div>
        <div class="menu_box">
          <div class="line" :style="{ left: lineLeft + '%' }"></div>
          <div
            class="item"
            :class="{ active: activeId == item.id }"
            v-for="(item, i) in guideList"
            :key="item.id"
            @mouseenter.self="lineCtrl(i)"
            @mouseleave.self="lineCtrl(activeIndex)"
          >
            <div class="title" @mouseleave.prevent.stop="doNone">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import router from "@/router";
const logo: string = require("@/assets/logo2.png");
@Component
export default class Guide extends Vue {
  @Prop(String) state!: string;
  activeId: number = 0;
  logoUrl: string = logo;
  lineLeft: number = 0;
  activeIndex: number = 0;
  guideList: Array<any> = [
    { id: 0, title: "主页", path: "/" },
    { id: 1, title: "音乐", path: "/music" },
    { id: 2, title: "旅行", path: "/travel" },
    { id: 3, title: "动漫", path: "/comic" },
    { id: 4, title: "电影", path: "/movie" },
    { id: 5, title: "技术", path: "/work" }
  ];
  constructor() {
    super();
    const index = this.guideList.findIndex(item => {
      return item.path == router.currentRoute.path;
    });
    if (index >= 0) {
      this.activeId = this.guideList[index];
      this.activeIndex = index;
      this.lineCtrl(index);
    }
  }
  lineCtrl(index: number) {
    this.lineLeft = 18 * index;
  }
  doNone() {}
}
</script>
<style lang="less" scoped>
@import "../../styles/config.less";
.guide {
  width: 100%;
  height: 0.6rem;
  .wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.6rem;
    background-color: @c_bg_tips;
    box-shadow: 0 0.02rem 0.1rem 0 rgba(0, 0, 0, 0.1);
    .box {
      width: 100%;
      height: 100%;
      max-width: @minWidth;
      margin: auto;
      padding: 0 0.3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo_box {
        // width: 1.5rem;
        height: 80%;
        margin-right: 20%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .img {
          display: block;
          // width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .text {
          font-size: @f_title_1;
          color: @c_main;
          line-height: 1.5;
          font-weight: bold;
        }
      }
      .menu_box {
        position: relative;
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .line {
          position: absolute;
          top: 0;
          left: 0;
          width: 10%;
          height: 0.03rem;
          background-color: @c_active;
          transition: all 0.5s;
        }
        .item {
          height: 100%;
          width: 10%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          &:hover {
            background-color: @c_bg_active;
          }
          .title {
            font-size: @f_title_2;
            color: @c_333;
            line-height: 1.5;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
