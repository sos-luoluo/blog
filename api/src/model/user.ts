import { Sequelize, Model, DataTypes, QueryTypes } from "sequelize";
import sequelize from "../db/sequelize";

class UserModel extends Model {}

UserModel.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: "column"
    },
    password: DataTypes.STRING,
    level:{
        type: DataTypes.BIGINT,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'USER',
});

export default UserModel
