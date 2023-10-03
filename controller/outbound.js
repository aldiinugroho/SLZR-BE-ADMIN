const { ModelRequestMidtransPaymentNotification } = require("../models/request/midtrans/paymentnotification")
const { Response } = require("../response")
// const serviceMsAccount = require("../models/service/account")
// const Kurasi = require("../outservice/kurasi/kurasi")

const outbound = {
  midtransPaymentNotification: async (req, res) => {
    try {
      const reqData = new ModelRequestMidtransPaymentNotification(req.body)
      new Response().success(res,reqData)
    } catch (error) {
      new Response().fail(res,error)
    }
  },
}

module.exports = outbound
