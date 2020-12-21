<template>
  <div class="header">
    <div class="left">
      <span>博客后台管理系统</span>
      <span>欢迎你：{{ user.username }}</span>
    </div>
    <div class="right">
      <div class="btn" @click="updatePassword">修改密码</div>
      <div class="btn">退出</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { resetPassword } from "@/api/index";

@Component({})
export default class Header extends Vue {
  password: string = "";
  newPassword: string = "";
  get user() {
    return this.$store.state.user;
  }
  updatePassword(){
    this.$Modal.confirm({
      render: (h: any) => {
        return h("Input", {
          props: {
            autofocus: true,
            type: "password",
            placeholder: "请输入新密码"
          },
          on: {
            input: (val: string) => {
              this.password = val;
            }
          }
        });
      },
      onOk: () => {
        if (this.password) {
          resetPassword({
            username: this.user.username,
            newPassword: this.password
          }).then((res: any) => {
            this.$Message.info("更新成功");
          });
        } else {
          this.$Message.info("请输入密码");
        }
      }
    });
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
