const { ModelRequestMidtransPaymentWithBank } = require("../../models/request/midtrans/paymentwithbank")
const servicemidtrans = require("../../outbound/servicemidtrans")

const paymentWithBankVA = async (reqData = new ModelRequestMidtransPaymentWithBank({})) => {
  try {
    const result = await servicemidtrans.charge(reqData)
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  paymentWithBankVA
}