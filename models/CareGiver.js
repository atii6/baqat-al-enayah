import { DataTypes } from "sequelize";

const CareGiver = (sequelize) => {
  const options = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "care_givers",
  };

  const definition = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipient_first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recipient_last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recipient_email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  };

  return sequelize.define("care_giver", definition, options);
};

export default CareGiver;
