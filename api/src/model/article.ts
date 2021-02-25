import { Sequelize, Model, DataTypes, QueryTypes } from "sequelize";
import sequelize from "../db/sequelize";

class ArticleModel extends Model {}

ArticleModel.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title:DataTypes.STRING,
    cover:DataTypes.STRING,
    classification_id:DataTypes.BIGINT,
    content:DataTypes.TEXT,
    readed:DataTypes.BIGINT,
    commented: DataTypes.BIGINT
}, {
    sequelize,
    tableName: 'ARTICLE',
});

export default ArticleModel
