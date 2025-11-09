import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Company from "./Company.js";

const Project = sequelize.define("Project", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: {
    type: DataTypes.ENUM("ongoing", "completed", "pending"),
    defaultValue: "pending",
  },
});

// ✅ Association (one company → many projects)
Company.hasMany(Project, { foreignKey: "companyId", onDelete: "CASCADE" });
Project.belongsTo(Company, { foreignKey: "companyId" });

// ✅ Must have default export (for ES modules)
export default Project;
