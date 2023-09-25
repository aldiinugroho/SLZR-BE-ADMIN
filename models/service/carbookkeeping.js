const { sequelize, Op } = require("../../config/sequelize");
const msCarBookKeepingPaymentTools = require("../db/mscarbookkeepingpaymenttools")

async function carBookKeepingPaymentToolsList() {
  try {
    // get list
    const result = await msCarBookKeepingPaymentTools.findAll()
    return result
  } catch (error) {
    throw "Error msCarBookKeepingPaymentTools carBookKeepingPaymentToolsList - db execution"
  }
}

module.exports = {
  carBookKeepingPaymentToolsList
}