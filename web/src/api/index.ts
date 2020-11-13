/**
 * 项目中所有api均写在这个地方，包括列表
 * @author [luoluo]
 * @version 2.0.0
 */
import { ajax } from "@/utils/ajax";

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
