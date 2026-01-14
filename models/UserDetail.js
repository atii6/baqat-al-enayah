import { DataTypes } from "sequelize";

const UserDetails = (sequelize) => {
  const options = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "user_details",
  };

  const definition = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    creating_for: {
      type: DataTypes.ENUM("myself", "someone_else"),
      allowNull: false,
      defaultValue: "myself",
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

    journey: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    street_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address_line: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    limit_account_access: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    limit_others_adding_gifts: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    enable_contribution_alerts: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    terms_policy: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  };

  return sequelize.define("user_details", definition, options);
};

export default UserDetails;
