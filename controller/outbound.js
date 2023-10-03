const { ModelRequestMidtransPaymentNotification } = require("../models/request/midtrans/paymentnotification")
const { Response } = require("../response")
const reqOutbound = require("../business/outbound")

const outbound = {
  midtransPaymentNotification: async (req, res) => {
    try {
      const reqData = new ModelRequestMidtransPaymentNotification(req.body)
      await reqOutbound.midtransPaymentNotification(reqData)
      new Response().success(res)
    } catch (error) {
      new Response().fail(res,error)
    }
  },
}

module.exports = outbound
