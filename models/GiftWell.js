import { DataTypes } from "sequelize";

const GiftWell = (sequelize) => {
  const options = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "gift_wells",
  };

  const definition = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT },
    organizer_name: { type: DataTypes.STRING, allowNull: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    privacy: {
      type: DataTypes.ENUM("public", "private"),
      defaultValue: "private",
    },
  };

  return sequelize.define("giftWell", definition, options);
};

export default GiftWell;
