<template>
  <div class="classification">
    <div class="title_box">
      <div class="title">分类管理</div>
    </div>
    <div class="menu_box">
      <el-button type="primary" icon="el-icon-plus" @click="creat"
        >新增</el-button
      >
    </div>
    <div class="list_box">
      <el-table stripe style="width: 100%" :data="list">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="name" label="分类名称"> </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="update(scope.row)"
              >编辑</el-button
            >
            <el-button size="small" type="danger" @click="del(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page_box">
      <el-pagination :page-count="totalPage" @current-change="resetPageIndex" />
    </div>
    <div class="editor_pop">
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="分类名称">
            <el-input v-model="name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
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
  id: any = undefined;
  dialogFormVisible: boolean = false;
  pageSize: number = 10;
  pageIndex: number = 0;
  listState: number = 0; // 0正常 1已无更多 2暂无数据
  totalPage: number = 0;
  list: Array<any> = [];
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
      this.$message({
        message: "删除成功",
        type: "success"
      });
      this.resetList();
    });
  }
  creat() {
    this.id = undefined;
    this.dialogFormVisible = true;
  }
  confirm() {
    if (this.name) {
      if (this.id) {
        classificationUpdate({
          id: this.id,
          name: this.name
        }).then((res: any) => {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          this.resetList();
          this.dialogFormVisible = false;
        });
      } else {
        classificationCreat({
          name: this.name
        }).then((res: any) => {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.resetList();
          this.dialogFormVisible = false;
        });
      }
    } else {
      this.$message({
        message: "请输入名称",
        type: "warning"
      });
    }
  }
  update(item: any) {
    this.id = item.id;
    this.name = item.name;
    this.dialogFormVisible = true;
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
