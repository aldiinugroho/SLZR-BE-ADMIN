const serviceTransactionPayment = require("../../models/service/transactionpayment")
const { ModelRequestMidtransPaymentNotification } = require("../../models/request/midtrans/paymentnotification")

const midtransPaymentNotification = async (reqData = new ModelRequestMidtransPaymentNotification({})) => {
  try {
    await serviceTransactionPayment.updateMidtransNotification(reqData)
  } catch (error) {
    throw error
  }
}

module.exports = {
  midtransPaymentNotification
}