import { Sequelize, Model, DataTypes, QueryTypes } from "sequelize";
import sequelize from "../db/sequelize";

class ClassificationModel extends Model {}

ClassificationModel.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name:DataTypes.STRING,
}, {
    sequelize,
    tableName: 'CLASSIFICATION',
});

export default ClassificationModel
