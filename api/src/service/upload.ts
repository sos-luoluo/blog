import exception from "../exception/index";
const fs = require("fs");
const path = require("path");
// 文件上传接口，必须以表单形式上传
 async function file(ctx: any, next: any) {
    if (ctx.user) {
        // 上传单个文件
        const file = ctx.request.files.file; // 获取上传文件
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let filePath = path.join(__dirname, "../../upload/") + `${Date.now()}-${file.name}`;
        filePath=filePath.replace(/\\/g,"/")
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        ctx.body = JSON.stringify({
            code: 0,
            data: {
                url: filePath
            },
            message: "文件上传成功",
        });
    } else {
        ctx.body = exception(1002);
    }
    next();
}

export {file}