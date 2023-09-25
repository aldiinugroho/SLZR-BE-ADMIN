const { sequelize, Op } = require("../../config/sequelize");
const msCarBookKeepingPaymentTools = require("../db/mscarbookkeepingpaymenttools")
const msCarBookKeeping = require("../db/mscarbookkeeping")
const msCarLeasing = require("../db/mscarleasing");
const { ModelCarBookKeepingCreate } = require("../request/carbookkeeping/create");

async function carBookKeepingPaymentToolsList() {
  try {
    // get list
    const result = await msCarBookKeepingPaymentTools.findAll()
    return result
  } catch (error) {
    throw "Error msCarBookKeepingPaymentTools carBookKeepingPaymentToolsList - db execution"
  }
}

async function carBookKeepingXCarLeasingCreate(reqData = new ModelCarBookKeepingCreate({})) {
  const t = await sequelize.transaction();
  try {
    // insert new to msCarBookKeeping
    await msCarBookKeeping.create(reqData, { transaction: t })
    // insert new to msCarLeasing
    if (reqData.carLeasing !== null) {
      await msCarLeasing.create(reqData.carLeasing, { transaction: t })
    }
    await t.commit();
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw "Error msCarBookKeeping|msCarLeasing carBookKeepingXCarLeasingCreate - db execution"
  }
}

module.exports = {
  carBookKeepingPaymentToolsList,
  carBookKeepingXCarLeasingCreate
}