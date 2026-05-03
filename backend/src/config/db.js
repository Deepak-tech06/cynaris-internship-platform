import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST || "localhost",
            dialect: "postgres",
            logging: false,
        }
    );

try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
} catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
}

export default sequelize;
