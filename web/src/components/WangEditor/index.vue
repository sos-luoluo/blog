<template>
  <div class="wangeditor">
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
// 警告，由于依赖的TS版本不一样，存在兼容问题，此组件用js语法完成
import WangEditor from "wangeditor";
import { uploadFile } from "@/api/index";
import tips from "@/components/Tips/index";

export default {
  name: "WangEditor",
  data() {
    return {
      editor: undefined
    };
  },
  methods: {
    getContent: function() {
      if (this.editor) {
        return this.editor.txt.html();
      } else {
        return "";
      }
    },
    setContent: function(html) {
      if (this.editor) {
        return this.editor.txt.html(html);
      }
    }
  },
  mounted() {
    var editor = new WangEditor(this.$refs.editor);
    this.editor = editor;
    editor.config.menus = [
      "head", // 标题
      "bold", // 粗体
      "italic", // 斜体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "image", // 插入图片
      "undo" // 撤销
    ];
    editor.config.uploadImgShowBase64 = false;
    // editor.config.onchange = html => {
    //   this.editorContent = html;
    // };
    editor.config.uploadImgMaxLength = 1;
    editor.config.uploadImgMaxSize = 2 * 1024 * 1024;
    editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp"];
    editor.config.customUploadImg = function(resultFiles, insertImgFn) {
      let file = resultFiles[0];
      let formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("type", file.type);
      uploadFile(formData).then(res => {
        insertImgFn(res.data.url);
      });
    };
    editor.config.zIndex = 10;
    editor.create();
  }
};
</script>

<style lang="less">
.wangeditor {
  .w-e-toolbar {
    .w-e-droplist {
      ul.w-e-list {
        li.w-e-item {
          vertical-align: middle;
          span,
          i,
          div {
            vertical-align: middle;
          }
        }
      }
    }
    .w-e-menu {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 8px;
    }
  }
}
</style>
