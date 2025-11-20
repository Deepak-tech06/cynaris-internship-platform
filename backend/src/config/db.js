import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
} catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
}

export default sequelize;
