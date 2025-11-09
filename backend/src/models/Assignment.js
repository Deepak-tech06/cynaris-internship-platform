import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Project from "./Project.js";

const Assignment = sequelize.define("Assignment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM("assigned", "in_progress", "completed"),
    defaultValue: "assigned",
  },
  feedback: {
    type: DataTypes.TEXT,
  },
});

// 🔗 Relationships
User.hasMany(Assignment, { foreignKey: "userId", onDelete: "CASCADE" });
Assignment.belongsTo(User, { foreignKey: "userId" });

Project.hasMany(Assignment, { foreignKey: "projectId", onDelete: "CASCADE" });
Assignment.belongsTo(Project, { foreignKey: "projectId" });

export default Assignment;
