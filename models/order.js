"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Food);
      this.belongsTo(models.User);
    }
  }
  Order.init(
    {
      customOrderId: DataTypes.STRING,
      status: DataTypes.STRING,
      FoodId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      table: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
