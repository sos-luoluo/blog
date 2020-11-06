import { Sequelize } from "sequelize"
import config from "../config"
const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    dialect: 'mysql',
    host: config.mysql.host,
    port: config.mysql.port,
    logging: true,
    timezone: '+08:00',
    define: {
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false,
        freezeTableName: true,
    },
    sync: {
        force: false,
        alter: true
    },
    pool: {
        max: config.mysql.connectionLimit
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("db init success");
    } catch (error) {
        console.error("db init error", error);
    }
})();

export default sequelize