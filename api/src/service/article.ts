import ArticleModel from "../model/article";
import exception from "../exception/index";
import { levelAuth } from "../auth/auth";

/**
 * 获取文章
 */
async function list(ctx: any, next: any) {
    const { pageSize = 10, pageIndex = 1 } = ctx.request.body;
    const list = await ArticleModel.findAll({
        offset: pageSize * (pageIndex - 1),
        limit: pageSize,
    });
    const total = await ArticleModel.count();
    const res = {
        code: 0,
        data: {
            pageSize: pageSize,
            pageIndex: pageIndex,
            list: list || [],
            total: total,
        },
        message: "查询成功",
    };
    ctx.body = JSON.stringify(res);
    next();
}
async function getOne(ctx: any, next: any) {
    const { id } = ctx.request.body;
    if(id){
        const article = await ArticleModel.findOne({ where: { id: id } });
        if (article === null) {
            ctx.body = exception(2001);
        } else {
            const res = {
                code: 0,
                data: article,
                message: "查询成功",
            };
            ctx.body = JSON.stringify(res);
        }
    }else{
        ctx.body = exception(400);
    }
    
    next();
}
/**
 * 新增一篇文章
 */
async function creat(ctx: any, next: any) {
    if (levelAuth(ctx, 50)) {
        const { title, cover, classificationId, content } = ctx.request.body;
        if (title && content) {
            const aritcle: any = await ArticleModel.create({
                title,
                cover,
                classification_id: classificationId,
                content,
            });
            const res = {
                code: 0,
                data: {
                    id: aritcle.id,
                },
                message: "创建成功",
            };
            ctx.body = JSON.stringify(res);
        } else {
            ctx.body = exception(400);
        }
    } else {
        ctx.body = exception(1010);
    }
    next();
}
async function update(ctx: any, next: any) {
    if (levelAuth(ctx, 50)) {
        const {
            id,
            title,
            cover,
            classificationId,
            content,
        } = ctx.request.body;
        if (id && title && content) {
            const aritcle: any = await ArticleModel.update(
                { title, cover, classification_id: classificationId, content },
                {
                    where: {
                        id: id,
                    },
                }
            );
            const res = {
                code: 0,
                data: {
                    id: aritcle.id,
                },
                message: "更新成功",
            };
            ctx.body = JSON.stringify(res);
        } else {
            ctx.body = exception(400);
        }
    } else {
        ctx.body = exception(1010);
    }
    next();
}
async function del(ctx: any, next: any) {
    if (levelAuth(ctx, 50)) {
        const id = ctx.request.body.id;
        if (id) {
            const aritcle: any = await ArticleModel.destroy({
                where: {
                    id: id,
                },
            });
            const res = {
                code: 0,
                data: {},
                message: "删除成功",
            };
            ctx.body = JSON.stringify(res);
        } else {
            ctx.body = exception(400);
        }
    } else {
        ctx.body = exception(1010);
    }
    next();
}
export { list, getOne,creat,update,del };
