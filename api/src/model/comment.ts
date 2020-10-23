import { Sequelize, Model, DataTypes, QueryTypes } from "sequelize";
import sequelize from "../db/sequelize";

class CommentModel extends Model {}

CommentModel.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    article_id: DataTypes.BIGINT,
    name:DataTypes.STRING,
    contact:DataTypes.STRING,
    comment:DataTypes.STRING,
}, {
    sequelize,
    tableName: 'COMMENT',
});

export default CommentModel
