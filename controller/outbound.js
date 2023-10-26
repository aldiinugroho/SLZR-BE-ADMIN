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
  listCar: async (req, res) => {
    try {
      const result = await reqOutbound.lzrauto.listCar(req.params?.offset)
      new Response().success(res,result)
    } catch (error) {
      new Response().fail(res,error)
    }
  },
  detailCar: async (req, res) => {
    try {
      const result = await reqOutbound.lzrauto.detailCar(req.params?.carId)
      new Response().success(res,result)
    } catch (error) {
      new Response().fail(res,error)
    }
  },
}

module.exports = outbound
