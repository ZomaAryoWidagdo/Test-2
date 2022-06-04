const customOrderIdgenerator = require("../helpers/customOrderIdGenerator");
const { Order } = require("../models");

class OrderController {
  static async getAll(req, res, next) {
    try {
      const data = await Order.findAll({
        group: "customOrderId",
        where: {
          status: "active",
        },
        attributes: ["customOrderId"],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Order.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          customOrderId: id,
          status: "active",
        },
      });
      if (!data) {
        throw `DataNotFound`;
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { FoodId, table, quantity } = req.body;
      const UserId = req.user.id;
      let newOrder;
      const response = await Order.findAll({
        order: [["id", "DESC"]],
        limit: 1,
      });

      if (FoodId.length === 1) {
        const customOrderId = customOrderIdgenerator(
          response[0]?.customOrderId
        );
        const data = {
          FoodId,
          UserId,
          status: "active",
          table,
          customOrderId: customOrderId,
          quantity,
        };
        newOrder = await Order.create(data);
      } else {
        let bulkData = FoodId.map((x, i) => {
          const customOrderId = customOrderIdgenerator(
            response[0]?.customOrderId
          );
          const data = {
            FoodId: x,
            UserId,
            status: "active",
            table,
            quantity: quantity[i],
            customOrderId: customOrderId,
          };
          return data;
        });
        newOrder = await Order.bulkCreate(bulkData);
      }

      res.status(201).json(newOrder);
    } catch (err) {
      next(err);
    }
  }
  static async deleteFood(req, res, next) {
    try {
      const { id } = req.params;
      const { FoodId } = req.body;
      const response = await Order.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          customOrderId: id,
          FoodId: FoodId,
        },
      });

      if (!response) throw "DataNotFound";

      await Order.destroy({
        where: {
          customOrderId: id,
          FoodId: FoodId,
        },
      });
      res.status(200).json({
        message: `Food Id ${FoodId} has been removed from Order ${id}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Order.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          customOrderId: id,
        },
      });

      if (!response) throw "DataNotFound";

      await Order.destroy({
        where: {
          customOrderId: id,
        },
      });
      res.status(200).json({
        message: `Order Id ${id} has been deleted`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateQuantity(req, res, next) {
    try {
      const { id } = req.params;
      const { action, FoodId } = req.body;

      const found = await Order.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          customOrderId: id,
          FoodId: FoodId,
        },
      });

      if (!found) throw "DataNotFound";
      let newQty = found[0].quantity;
      if (action === "increment") {
        await Order.increment("quantity", {
          by: 1,
          where: {
            customOrderId: id,
            FoodId: FoodId,
          },
        });
        newQty += 1;
      } else if (action === "decrement") {
        await Order.decrement("quantity", {
          by: 1,
          where: {
            customOrderId: id,
            FoodId: FoodId,
          },
        });
        newQty -= 1;
      }

      let message = `Quantity updated from ${found[0].quantity} to ${newQty}`;

      if (newQty === 0) {
        Order.destroy({
          where: {
            customOrderId: id,
            FoodId: FoodId,
          },
        });
        message = `Food Id ${FoodId} has been removed from Order ${id}`;
      }

      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;

      const found = await Order.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          customOrderId: id,
        },
      });

      if (!found) throw "DataNotFound";

      await Order.update(
        { status: "paid" },
        {
          where: {
            customOrderId: id,
          },
        }
      );

      res.status(200).json({ message: `Order Id ${id} has been paid` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
