/**
 * 项目中所有api均写在这个地方，包括列表
 * @author [luoluo]
 * @version 2.0.0
 */
import { ajax } from "@/utils/ajax";
import { Upload } from "element-ui";

/**
 * 用户登录
 */
export function login(username: string, password: string) {
  return ajax({
    url: "/user/login",
    data: JSON.stringify({
      username,
      password
    })
  });
}
/**
 * 上传文件
 */
export function uploadFile(formDate: FormData) {
  return ajax({
    url: "/upload/file",
    data: formDate
  });
}
/**
 * 获取用户信息
 */
export function getUserInfo() {
  return ajax({
    url: "/user/info"
  });
}
/**
 * 获取用户列表
 */
export function userList(data: any) {
  return ajax({
    url: "/user/list",
    data: JSON.stringify(data)
  });
}
/**
 * 修改当前登录用户密码
 */
export function resetPassword(data: any) {
  return ajax({
    url: "/user/resetpassword",
    data: JSON.stringify(data)
  });
}
/**
 * 获取分类列表
 */
export function classificationList(data: any) {
  return ajax({
    url: "/classification/list",
    data: JSON.stringify(data)
  });
}
/**
 * 删除分类
 */
export function classificationDel(data: any) {
  return ajax({
    url: "/classification/del",
    data: JSON.stringify(data)
  });
}
/**
 * 新增分类
 */
export function classificationCreat(data: any) {
  return ajax({
    url: "/classification/creat",
    data: JSON.stringify(data)
  });
}
/**
 * 编辑分类
 */
export function classificationUpdate(data: any) {
  return ajax({
    url: "/classification/update",
    data: JSON.stringify(data)
  });
}
/**
 * 新增文章
 */
export function articleCreat(data: any) {
  return ajax({
    url: "/aritcle/creat",
    data: JSON.stringify(data)
  });
}
/**
 * 更新文章
 */
export function articleUpdate(data: any) {
  return ajax({
    url: "/aritcle/update",
    data: JSON.stringify(data)
  });
}
/**
 * 删除文章
 */
export function articleDel(id: number) {
  return ajax({
    url: "/aritcle/del",
    data: JSON.stringify({
      id
    })
  });
}
/**
 * 获取文章列表
 */
export function articleList(data: any) {
  return ajax({
    url: "/article/list",
    data: JSON.stringify(data)
  });
}
