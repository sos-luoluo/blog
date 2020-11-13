<template>
  <div class="user">
    <div class="title_box">
      <div class="title">用户管理</div>
    </div>
    <div class="menu_box"></div>
    <div class="list_box">
      <Table stripe :columns="columns" :data="list"> </Table>
    </div>
    <div class="page_box">
      <Page :total="totalPage" @change="resetPageIndex" />
    </div>
  </div>
</template>
<script lang="ts">
import { userList } from "@/api/index";
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Classification extends Vue {
  name: string = "";
  pageSize: number = 10;
  pageIndex: number = 0;
  listState: number = 0; // 0正常 1已无更多 2暂无数据
  totalPage: number = 0;
  list: Array<any> = [];
  columns: Array<any> = [
    {
      title: "名称",
      key: "username"
    },
    {
      title: "等级",
      key: "level"
    }
  ];
  mounted() {
    this.getData();
  }
  getData() {
    if (this.listState != 0) {
      return;
    }
    this.pageIndex++;
    userList({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }).then((res: any) => {
      this.list = res.data.list;
      this.totalPage = Math.ceil(res.data.total / this.pageSize);
      if (res.data.list.length == 0) {
        if (this.pageIndex == 1) {
          this.listState = 2;
        } else {
          this.listState = 1;
        }
      }
    });
  }
  resetList() {
    this.listState = 0;
    this.pageIndex = 0;
    this.list = [];
    this.getData();
  }
  resetPageIndex(pageIndex: number) {
    if (pageIndex > 1) {
      this.pageIndex = pageIndex - 1;
      this.listState = 0;
      this.getData();
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/config.less";
.user {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0.1rem 0.2rem;
  .title_box {
    padding: 0.1rem 0;
    .title {
      font-size: 0.2rem;
      color: @c_main;
      line-height: 1.5;
      font-weight: bold;
    }
  }
  .menu_box {
    padding: 0.1rem 0;
    font-size: 0;
    display: flex;
    align-items: center;
  }
  .list_box {
    padding: 0.2rem 0;
  }
  .page_box {
    padding: 0.2rem 0;
    font-size: 0.2rem;
  }
}
</style>
