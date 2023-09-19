const { sequelize, Op } = require("../../config/sequelize");
const { ModelRequestCarCreate } = require("../request/car/create")
const msCar = require("../db/mscar")
const msCarImage = require("../db/mscarimage")
const msCarOtherPrice = require("../db/mscarotherprice")
const msShowroom = require("../db/msshowroom")
const msCarBrand = require("../db/mscarbrand");
const { ModelRequestCarDetail } = require("../request/car/detail");
const { ModelRequestCarUpdate } = require("../request/car/update");

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

async function list(userId = "") {
  try {
    // insert new to mscar
    const result = await msCar.findAll({
      where: {
        userId: userId,
        softdelete: false
      },
      attributes: { exclude: ['showroomId','carBrandId','userId','softdelete'] },
      include: [
        {
          model: msShowroom,
          attributes: { exclude: ['softdelete'] },
        },
        {
          model: msCarBrand,
        },
        {
          model: msCarImage,
        },
        {
          model: msCarOtherPrice,
        }
      ],
      nest: true
    })
    return result
  } catch (error) {
    throw "Error msCar|msCarImage|msCarOtherPrice list - db execution"
  }
}

async function detail(reqData = new ModelRequestCarDetail({})) {
  try {
    // insert new to mscar
    const result = await msCar.findOne({
      where: {
        [Op.and]: [
          {userId: reqData.userId},
          {carId: reqData.carId},
          {softdelete: false}
        ]
      },
      attributes: { exclude: ['showroomId','carBrandId','userId','softdelete'] },
      include: [
        {
          model: msShowroom,
          attributes: { exclude: ['softdelete'] },
        },
        {
          model: msCarBrand,
        },
        {
          model: msCarImage,
        },
        {
          model: msCarOtherPrice,
        }
      ],
      nest: true
    })
    return result
  } catch (error) {
    throw "Error msCar|msCarImage|msCarOtherPrice detail - db execution"
  }
}

async function softDelete(reqData = "") {
  try {
    // update softdelete new to mscar
    await msCar.update({
      softdelete: true,
    },{
      where: {
        carId: reqData
      }
    })
  } catch (error) {
    throw "Error msCar|msCarImage|msCarOtherPrice softDelete - db execution"
  }
}

async function updateCarXCarImageXCarOtherPrice(reqData = new ModelRequestCarUpdate({})) {
  // using transaction
  const t = await sequelize.transaction();
  try {
    // delete car image
    // delete car other price

    // update car

    // insert car image
    // insert car other price

    // await msCar.create(reqData, { transaction: t })
    // // insert new to mscarimage
    // await msCarImage.bulkCreate(reqData.carImage, { transaction: t })
    // // insert new to mscarotherprice
    // await msCarOtherPrice.bulkCreate(reqData.carOtherPrice, { transaction: t })
    // await t.commit();
  } catch (error) {
    await t.rollback();
    throw "Error msCar|msCarImage|msCarOtherPrice createCarXCarImageXCarOtherPrice - db execution"
  }
}


module.exports = {
  createCarXCarImageXCarOtherPrice,
  list,
  detail,
  softDelete,
  updateCarXCarImageXCarOtherPrice
}
