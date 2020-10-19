import { Sequelize } from "sequelize"
import config from "../config"
const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    dialect: 'mysql',
    host: config.mysql.host,
    port: config.mysql.port,
    logging: false,
    timezone: '+08:00',
    define: {
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false,
    },
    sync: {
        force: false,
        alter: false
    },
    pool: {
        max: config.mysql.connectionLimit
    }
});

export default sequelize