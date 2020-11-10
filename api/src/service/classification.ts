import ClassificationModel from "../model/classification";
import exception from "../exception/index";
import { levelAuth } from "../auth/auth";

/**
 * 获取分类列表
 */
async function list(ctx: any, next: any) {
    if (levelAuth(ctx, 50)) {
        const { pageSize = 10, pageIndex = 1 } = ctx.request.body;
        const list = await ClassificationModel.findAll({
            offset: pageSize * (pageIndex - 1),
            limit: pageSize,
        });
        const total = await ClassificationModel.count();
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
    } else {
        ctx.body = exception(1010);
    }
    next();
}

async function creat(ctx: any, next: any) {
    if (levelAuth(ctx, 50)) {
        const name: string = ctx.request.body.name;
        if (name) {
            const classification: any = await ClassificationModel.create({
                name: name,
            });
            const res = {
                code: 0,
                data: {
                    id: classification.id,
                    name: classification.name,
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
        const { id, name } = ctx.request.body;
        if (id && name) {
            const classification: any = await ClassificationModel.update(
                { name: name },
                {
                    where: {
                        id: id,
                    },
                }
            );
            const res = {
                code: 0,
                data: {
                    id: classification.id,
                    name: classification.name,
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
            const classification: any = await ClassificationModel.destroy({
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

export {
    list,
    creat,
    update,
    del,
};
