import { Sequelize, Model, DataTypes, QueryTypes } from "sequelize";
import sequelize from "../db/sequelize";

class UserModel extends Model {}

UserModel.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name:DataTypes.STRING,
    password: DataTypes.STRING,
    level:DataTypes.BIGINT
}, {
    sequelize,
    tableName: 'USER',
});

export default UserModel
