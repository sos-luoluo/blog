<template>
  <div class="articledetails">
    <div class="nav_wrap">
      <Guide />
    </div>
    <div class="details_wrap">
      <div class="details_box">
        <div class="title_box">
          <div class="title">{{ article.title }}</div>
          <div class="time">
            {{ article.created_at | timeFormat("yyyy年MM月dd日") }}
          </div>
        </div>
        <div class="content_box">
          <div class="content" v-html="article.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { getArticleDetails } from "@/api/index";
import Guide from "@/views/layer/guide.vue";
@Component({
  components: {
    Guide
  }
})
export default class ArticleDetails extends Vue {
  article: any = {};
  created() {
    getArticleDetails(this.$route.query.id).then((res: any) => {
      this.article = res.data;
    });
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/config.less";
.articledetails {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: @c_bg_line;
  .nav_wrap {
    position: relative;
  }
  .details_wrap {
    .details_box {
      width: 12rem;
      max-width: 100%;
      margin: auto;
      padding: 0.3rem 0.2rem;
      .title_box {
        padding: 0.1rem 0;
        .title {
          padding: 0.1rem 0;
          text-align: center;
          font-size: 0.3rem;
          color: @c_main;
          text-align: center;
          font-weight: bold;
        }
        .time {
          padding: 0.1rem 0;
          text-align: center;
          font-size: 0.16rem;
          color: @c_active;
          text-align: center;
        }
      }
      .content_box {
        padding: 0.1rem 0;
        .content {
          padding: 0.1rem 0;
          text-align: left;
          color: @c_title;
          font-size: 0.16rem;
          line-height: 1.8;
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .articledetails {
    .details_wrap {
      .details_box {
        padding: 0.2rem 0.15rem;
      }
    }
  }
}
</style>
