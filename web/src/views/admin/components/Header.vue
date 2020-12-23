<template>
  <div class="header">
    <div class="left">
      <span>博客后台管理系统</span>
      <span>欢迎你：{{ user.username }}</span>
    </div>
    <div class="right">
      <div class="btn" @click="updatePassword">修改密码</div>
      <div class="btn" @click="exit">退出</div>
    </div>
    <div class="password_pop">
      <el-dialog
        title="修改密码"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-form>
          <el-form-item label="旧密码">
            <el-input
              v-model="password"
              type="password"
              autocomplete="off"
              placeholder="请输入旧密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input
              v-model="newPassword"
              type="password"
              autocomplete="off"
              placeholder="请输入新密码"
            ></el-input>
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
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { resetPassword } from "@/api/index";
import { cookie } from "@/utils/cookie";

@Component({})
export default class Header extends Vue {
  password: string = "";
  newPassword: string = "";
  dialogFormVisible: boolean = false;
  get user() {
    return this.$store.state.user;
  }
  exit() {
    cookie.del("token");
    this.$router.replace("/login");
  }
  updatePassword() {
    this.dialogFormVisible = true;
    // this.$Modal.confirm({
    //   render: (h: any) => {
    //     return h("Input", {
    //       props: {
    //         autofocus: true,
    //         type: "password",
    //         placeholder: "请输入新密码"
    //       },
    //       on: {
    //         input: (val: string) => {
    //           this.password = val;
    //         }
    //       }
    //     });
    //   },
    //   onOk: () => {
    //     if (this.password) {
    //       resetPassword({
    //         username: this.user.username,
    //         newPassword: this.password
    //       }).then((res: any) => {
    //         this.$message({
    //           message: "更新成功",
    //           type: "success"
    //         });
    //       });
    //     } else {
    //       this.$message({
    //         message: "请输入密码",
    //         type: "warning"
    //       });
    //     }
    //   }
    // });
  }
  confirm() {
    if (this.password && this.newPassword) {
      resetPassword({
        username: this.user.username,
        password: this.password,
        newPassword: this.newPassword
      }).then((res: any) => {
        this.$message({
          message: "更新成功",
          type: "success"
        });
        this.dialogFormVisible = false;
      });
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../styles/config.less";
.header {
  display: flex;
  align-items: center;
  padding: 0.1rem 0.2rem;
  background-color: @c_bg_text;
  .left {
    font-size: 0.2rem;
    color: @c_main;
    line-height: 1.5;
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .btn {
      margin-left: 0.2rem;
      width: 1rem;
      height: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: @c_bg_tips;
      font-size: 0.16rem;
      color: @c_title;
      line-height: 1.5;
      cursor: pointer;
      border-radius: 0.1rem;
    }
  }
}
</style>
