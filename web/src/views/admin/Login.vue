<template>
  <div class="login">
    <div class="content">
      <div class="form">
        <div class="title">登录</div>
        <div class="line">
          <div class="name">用户名</div>
          <div class="input_box">
            <input
              type="text"
              class="input"
              autocomplete="false"
              placeholder="请输入用户名"
              v-model="username"
            />
          </div>
        </div>
        <div class="line">
          <div class="name">密码</div>
          <div class="input_box">
            <input
              type="password"
              class="input"
              autocomplete="false"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
        </div>
        <div class="btn_box">
          <div class="btn" @click="login">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import tips from "@/components/Tips/index";
import { login } from "@/api/index";
import router from "@/router";
@Component({})
export default class Login extends Vue {
  username: string = "";
  password: string = "";
  async login() {
    if (!this.username) {
      tips("请输入用户名");
      return;
    }
    if (!this.password) {
      tips("请输入密码");
      return;
    }
    await login(this.username, this.password);
    tips("登录成功");
    this.$router.push({ path: "/admin" });
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/config.less";
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: @c_bg_tips;
  .content {
    width: 3rem;
    padding: 0.1rem 0.2rem;
    border-radius: 0.1rem;
    background-color: @c_white;
    box-shadow: 0 0 0.1rem 0.1rem @c_tips;
    .form {
      padding: 0 0.1rem;
      .title {
        padding: 0.1rem 0;
        font-size: 0.3rem;
        font-weight: bold;
        color: @c_active;
        line-height: 1.5;
        text-align: center;
      }
      .line {
        padding: 0.1rem 0;
        display: flex;
        align-items: center;
        .name {
          width: 0.8rem;
          font-size: 0.2rem;
          color: @c_title;
          line-height: 1.5;
        }
        .input_box {
          flex: 1;
          .input {
            display: block;
            width: 100%;
            height: 0.32rem;
            padding: 0 0.1rem;
            border: none;
            border-radius: 0.2rem;
            background-color: transparent;
            font-size: 0.2rem;
            color: @c_title;
            line-height: 1.5;
            &:focus {
              outline: none;
            }
          }
        }
      }
      .btn_box {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.1rem 0;
        .btn {
          width: 1.6rem;
          height: 0.4rem;
          border-radius: 0.25rem;
          background-color: @c_bg_active;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.2rem;
          color: @c_title;
          cursor: pointer;
          &:hover {
            box-shadow: 0 0 0.1rem 0.05rem @c_bg_tips;
          }
        }
      }
    }
  }
}
</style>
