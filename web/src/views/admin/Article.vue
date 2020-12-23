<template>
  <div class="article">
    <div class="title_box">
      <div class="title">文章管理</div>
    </div>
    <div class="menu_box">
      <el-button type="primary" icon="el-icon-plus" @click="creat"
        >新增</el-button
      >
    </div>
    <div class="list_box">
      <el-table stripe style="width: 100%" :data="list">
        <el-table-column prop="id" label="ID" width="100"> </el-table-column>
        <el-table-column prop="classification_id" label="分类" width="200">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.classification_id"
              placeholder="暂无分类"
              :disabled="true"
            >
              <el-option
                v-for="item in classification"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
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
      <el-dialog
        title="编辑"
        :visible.sync="dialogFormVisible"
        width="80%"
        top="5vh"
      >
        <el-form label-position="top" size="small">
          <el-form-item label="标题">
            <el-input v-model="articleForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <div class="upload_box">
              <Upload :url="articleForm.cover" @change="coverChange"></Upload>
            </div>
          </el-form-item>
          <el-form-item label="分类">
            <el-select
              v-model="articleForm.classificationId"
              placeholder="请选择"
            >
              <el-option
                v-for="item in classification"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <WangEditor ref="editor" :height="300"></WangEditor>
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
import Upload from "@/components/Upload/upload.vue";
import WangEditor from "@/components/WangEditor/index.vue";
import {
  articleList,
  articleCreat,
  articleUpdate,
  articleDel,
  classificationList
} from "@/api/index";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    Upload,
    WangEditor
  }
})
export default class Article extends Vue {
  articleForm: any = {};
  dialogFormVisible: boolean = false;
  pageSize: number = 10;
  pageIndex: number = 0;
  listState: number = 0; // 0正常 1已无更多 2暂无数据
  totalPage: number = 0;
  list: Array<any> = [];
  classification: Array<any> = [];
  mounted() {
    this.getData();
    this.getClassification();
  }
  getClassification() {
    classificationList({
      pageIndex: 1,
      pageSize: 100
    }).then((res: any) => {
      this.classification = res.data.list;
    });
  }
  getData() {
    if (this.listState != 0) {
      return;
    }
    this.pageIndex++;
    articleList({
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
    articleDel(id).then((res: any) => {
      this.$message({
        message: "删除成功",
        type: "success"
      });
      this.resetList();
    });
  }
  creat() {
    this.articleForm = {};
    this.dialogFormVisible = true;
  }
  confirm() {
    let editor: any = this.$refs["editor"];
    this.articleForm.content = editor.getContent();
    if (this.articleForm.title && this.articleForm.content) {
      if (this.articleForm.id) {
        articleUpdate(this.articleForm).then((res: any) => {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          this.resetList();
          this.dialogFormVisible = false;
        });
      } else {
        articleCreat(this.articleForm).then((res: any) => {
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
        message: "表单不能为空",
        type: "warning"
      });
    }
  }
  update(item: any) {
    this.articleForm = Object.assign({}, item, {
      classificationId: item.classification_id
    });
    this.dialogFormVisible = true;
    this.$nextTick(() => {
      let editor: any = this.$refs["editor"];
      editor.setContent(this.articleForm.content);
    });
  }
  coverChange(list: any) {
    this.articleForm.cover = list && list[0];
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/config.less";
.article {
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
  .editor_pop {
    /deep/ .el-dialog__body {
      padding-top: 10px;
      padding-bottom: 10px;
      .el-form {
        /deep/ .el-form-item--small.el-form-item {
          margin-bottom: 10px;
          .el-form-item__label {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
