const { sequelize } = require("../../config/sequelize");
const { ModelRequestCarCreate } = require("../request/car/create")
const msCar = require("../db/mscar")
const msCarImage = require("../db/mscarimage")
const msCarOtherPrice = require("../db/mscarotherprice")

async function createCarXCarImageXCarOtherPrice(reqData = new ModelRequestCarCreate({})) {
  // using transaction
  const t = await sequelize.transaction();
  try {
    // insert new to mscar
    await msCar.create(reqData, { transaction: t })
    // insert new to mscarimage
    await msCarImage.bulkCreate(reqData.carImage, { transaction: t })
    // insert new to mscarotherprice
    await msCarOtherPrice.bulkCreate(reqData.carOtherPrice, { transaction: t })
    await t.commit();
  } catch (error) {
    await t.rollback();
    throw "Error msCar|msCarImage|msCarOtherPrice createCarXCarImageXCarOtherPrice - db execution"
  }
}

module.exports = {
  createCarXCarImageXCarOtherPrice
}
