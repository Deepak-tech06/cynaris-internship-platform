import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Invite = sequelize.define("Invite", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  tier_allowed: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("unused", "used", "expired"),
    defaultValue: "unused",
  },
  expiry: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Invite;
