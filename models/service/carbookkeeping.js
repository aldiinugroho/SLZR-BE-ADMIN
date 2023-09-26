const { sequelize, Op } = require("../../config/sequelize");
const msCarBookKeepingPaymentTools = require("../db/mscarbookkeepingpaymenttools")
const msCarBookKeeping = require("../db/mscarbookkeeping")
const msCarLeasing = require("../db/mscarleasing");
const { ModelCarBookKeepingCreate } = require("../request/carbookkeeping/create");
const { ModelRequestCarBookKeepingCancel } = require("../request/carbookkeeping/cancel");
const msCar = require("../db/mscar");

async function carBookKeepingPaymentToolsList() {
  try {
    // get list
    const result = await msCarBookKeepingPaymentTools.findAll()
    return result
  } catch (error) {
    throw "Error msCarBookKeepingPaymentTools carBookKeepingPaymentToolsList - db execution"
  }
}

async function carBookKeepingXCarLeasingCreate(reqData = new ModelCarBookKeepingCreate({}), carBookKeepingStatus = "ON PROGRESS") {
  const t = await sequelize.transaction();
  try {
    // insert new to msCarBookKeeping
    await msCarBookKeeping.create({
      ...reqData,
      carBookKeepingStatus: carBookKeepingStatus
    }, { transaction: t })
    // insert new to msCarLeasing
    if (reqData.carLeasing !== null) {
      await msCarLeasing.create(reqData.carLeasing, { transaction: t })
    }
    await t.commit();
  } catch (error) {
    await t.rollback();
    throw "Error msCarBookKeeping|msCarLeasing carBookKeepingXCarLeasingCreate - db execution"
  }
}

async function cancelCarBookKeeping(reqData = new ModelRequestCarBookKeepingCancel({})) {
  const t = await sequelize.transaction();
  try {
    // set carBookKeepingStatus = CANCEL 
    await msCarBookKeeping.update({
      carBookKeepingStatus: "CANCEL"
    }, {
      where: {
        [Op.and]: [
          {carBookKeepingId: reqData.carBookKeepingId},
          {carId: reqData.carId}
        ]
      },
      transaction: t
    })
    // set carStatus = READY
    await msCar.update({
      carStatus: "READY"
    }, {
      where: {
        carId: reqData.carId
      },
      transaction: t
    })
    await t.commit();
  } catch (error) {
    await t.rollback();
    throw "Error msCarBookKeeping|msCar cancelCarBookKeeping - db execution"
  }
}

module.exports = {
  carBookKeepingPaymentToolsList,
  carBookKeepingXCarLeasingCreate,
  cancelCarBookKeeping
}