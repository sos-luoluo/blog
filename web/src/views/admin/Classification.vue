<template>
  <div class="classification">
    <div class="title_box">
      <div class="title">分类管理</div>
    </div>
    <div class="menu_box">
      <Button type="info" icon="md-add" @click="creat">新增</Button>
    </div>
    <div class="list_box">
      <Table stripe :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 0.1rem;"
            @click="update(row.id)"
            >编辑</Button
          >
          <Button type="error" size="small" @click="del(row.id)">删除</Button>
        </template>
      </Table>
    </div>
    <div class="page_box">
      <Page :total="totalPage" @change="resetPageIndex" />
    </div>
  </div>
</template>
<script lang="ts">
import {
  classificationList,
  classificationCreat,
  classificationUpdate,
  classificationDel
} from "@/api/index";
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
      title: "id",
      key: "id"
    },
    {
      title: "名称",
      key: "name"
    },
    {
      title: "操作",
      slot: "action"
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
    classificationList({
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
  del(id: number) {
    classificationDel({
      id: id
    }).then((res: any) => {
      this.$Message.info("删除成功");
      this.resetList();
    });
  }
  creat() {
    this.$Modal.confirm({
      render: (h: any) => {
        return h("Input", {
          props: {
            value: this.name,
            autofocus: true,
            placeholder: "请输入名称"
          },
          on: {
            input: (val: string) => {
              this.name = val;
            }
          }
        });
      },
      onOk: () => {
        if (this.name) {
          classificationCreat({
            name: this.name
          }).then((res: any) => {
            this.$Message.info("添加成功");
            this.resetList();
          });
        } else {
          this.$Message.info("请输入名称");
        }
      }
    });
  }
  update(id: number) {
    this.$Modal.confirm({
      render: (h: any) => {
        return h("Input", {
          props: {
            value: this.name,
            autofocus: true,
            placeholder: "请输入名称"
          },
          on: {
            input: (val: string) => {
              this.name = val;
            }
          }
        });
      },
      onOk: () => {
        if (this.name) {
          classificationUpdate({
            id: id,
            name: this.name
          }).then((res: any) => {
            this.$Message.info("更新成功");
            this.resetList();
          });
        } else {
          this.$Message.info("请输入名称");
        }
      }
    });
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/config.less";
.classification {
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
