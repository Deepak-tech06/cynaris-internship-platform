import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Company = sequelize.define("Company", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  location: { type: DataTypes.STRING },
});

export default Company;
