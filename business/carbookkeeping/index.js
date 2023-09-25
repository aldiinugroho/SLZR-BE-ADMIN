const serviceCarBookKeeping = require("../../models/service/carbookkeeping")

const paymentToolsList = async () => {
  try {
    // get list
    const result = await serviceCarBookKeeping.carBookKeepingPaymentToolsList()
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  paymentToolsList
}