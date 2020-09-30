<template>
  <div class="home">
    <div class="nav_wrap">
      <Guide />
    </div>
    <div class="banner_wrap">
      <div class="swiper-container" id="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in bgList" :key="item">
            <div class="item">
              <img :src="item" alt="" class="img" />
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="banner_content">
        <div class="title">落落的个人博客</div>
        <div class="tips">博客建设中</div>
        <router-link class="link" :to="{ path: '/gobang' }"
          >点击这里下五子棋,适合手机上玩</router-link
        >
      </div>
    </div>
    <div class="content_wrap">
      <div class="content_box">
        <div class="auth_box">
          <Auth></Auth>
        </div>
        <div class="article_box"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const bg1 = require("@/assets/bg1.jpg");
const bg2 = require("@/assets/bg2.jpg");
const bg3 = require("@/assets/bg3.jpg");
const bg4 = require("@/assets/bg4.jpg");
const icon = require("@/assets/ic_comic.png");
import Guide from "@/views/layer/guide.vue";
import Swiper from "swiper";
import "swiper/css/swiper.css";
import Auth from "@/views/layer/auth.vue";
@Component({
  components: {
    Guide,
    Auth
  }
})
export default class Home extends Vue {
  bgList: Array<string> = [bg1, bg2, bg3, bg4];
  swiper: any;
  paginationImg: string = icon;
  created() {}
  mounted() {
    this.swiper = new Swiper("#swiper", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        type: "custom",
        renderCustom: (swiper: any, current: number, total: number) => {
          const item =
            '<span class="swiper-pagination-bullet"><img src="' +
            icon +
            '" class="img" /></span>';
          const activeItem =
            '<span class="swiper-pagination-bullet swiper-pagination-bullet-active"><img src="' +
            icon +
            '" class="img" /></span>';
          let str: string = "";
          for (let i = 1; i <= total; i++) {
            if (current == i) {
              str += activeItem;
            } else {
              str += item;
            }
          }
          return str;
        }
      },
      speed: 1500,
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false
      },
      observer: true,
      observeParents: true
    });
  }
  onmounted() {}
}
</script>
<style lang="less" scoped>
@import "../styles/config.less";
.home {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  .nav_wrap {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .banner_wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-wrapper {
        height: 100%;
        .swiper-slide {
          width: 100%;
          height: 100%;
          .item {
            width: 100%;
            height: 100%;
            .img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
      .swiper-pagination {
        bottom: 5%;
        line-height: 0;
        /deep/ .swiper-pagination-bullet {
          display: inline-block;
          margin-left: 0.2rem;
          width: 0.15rem;
          height: 0.15rem;
          border: 0.02rem solid transparent;
          border-radius: 50%;
          background-color: @c_tips;
          vertical-align: middle;
          cursor: pointer;
          transition: all 0.2s;
          opacity: 0.8;
          &:hover {
            border: 0.02rem solid #fff;
            background-color: @c_active;
            transform: scale(1.3);
          }
          .img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: none;
          }
          &.swiper-pagination-bullet-active {
            border-width: 0;
            border-color: transparent;
            transform: scale(1.8);
            background-color: transparent;
            .img {
              display: block;
            }
          }
        }
      }
    }
    .banner_content {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      width: 6rem;
      height: 3rem;
      max-width: 80%;
      max-height: 60%;
      margin: auto;
      background-color: rgba(255, 255, 255, 0.8);
      box-shadow: 0px 0.02rem 0.08rem rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.1rem;
      .title {
        font-size: 0.3rem;
        color: #333;
        font-weight: bold;
        line-height: 2;
        margin-bottom: 0.2rem;
      }
      .tips {
        font-size: 0.14rem;
        color: #666;
        line-height: 1.5;
      }
      .link {
        font-size: 0.14rem;
        line-height: 1.5;
      }
    }
  }
  .content_wrap {
    .content_box {
      max-width: @minWidth;
      margin: auto;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0.3rem;
      .auth_box {
        width: 20%;
      }
    }
  }
}
</style>
