const { Food } = require("../models");

class FoodController {
  static async getAll(req, res, next) {
    try {
      const data = await Food.findAll({
        where: {
          status: "ready",
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Food.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          status: "ready",
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
      const { name, price, status } = req.body;

      const data = {
        name,
        price,
        status,
      };

      const response = await Food.create(data);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Food.findByPk(+id);
      if (!response) throw "DataNotFound";

      await Food.destroy({
        where: { id },
      });
      res
        .status(200)
        .json({ message: `${response.name} Successfully Deleted` });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const response = await Food.findByPk(+id);

      if (!response) throw "DataNotFound";

      await Food.update(status, {
        where: {
          id,
        },
      });

      res.status(200).json({
        message: `Status changed from ${response.status} to ${status}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FoodController;
