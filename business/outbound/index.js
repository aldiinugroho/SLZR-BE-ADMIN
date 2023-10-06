const serviceTransactionPayment = require("../../models/service/transactionpayment")
const serviceOutbound = require("../../models/service/outbound")
const { ModelRequestMidtransPaymentNotification } = require("../../models/request/midtrans/paymentnotification")

const midtransPaymentNotification = async (reqData = new ModelRequestMidtransPaymentNotification({})) => {
  try {
    await serviceTransactionPayment.updateMidtransNotification(reqData)
  } catch (error) {
    throw error
  }
}

const lzrauto = {
  listCar: async (reqData = 0) => {
    try {
      const result = await serviceOutbound.lzrauto.getListCar(reqData)
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = {
  midtransPaymentNotification,
  lzrauto
}