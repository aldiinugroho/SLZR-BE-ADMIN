const { ModelRequestMidtransPaymentWithBank } = require("../../models/request/midtrans/paymentwithbank")

const paymentWithBankVA = async (reqData = new ModelRequestMidtransPaymentWithBank({})) => {
  try {
    return reqData
  } catch (error) {
    throw error
  }
}

module.exports = {
  paymentWithBankVA
}