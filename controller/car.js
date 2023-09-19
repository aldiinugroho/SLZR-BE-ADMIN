const { ModelRequestCarCreate } = require("../models/request/car/create")
const { Response } = require("../response")
const reqCar = require('../business/car');
const { ModelRequestCarDetail } = require("../models/request/car/detail");
// const serviceMsAccount = require("../models/service/account")
// const Kurasi = require("../outservice/kurasi/kurasi")

const car = {
  create: async (req, res) => {
    try {
      const reqData = new ModelRequestCarCreate({
        ...req.body,
        userId: req.decodedToken.userId,
      })
      const result = await reqCar.create(reqData)
      new Response().success(res,result)
    } catch (error) {
      new Response().fail(res,error)
    }
  },
  list: async (req, res) => {
    try {
      const result = await reqCar.list(req.decodedToken.userId)
      new Response().success(res,result)
    } catch (error) {
      new Response().fail(res,error)
    }
  },
  detail: async (req, res) => {
    try {
      const reqData = new ModelRequestCarDetail({
        ...req.params,
        userId: req.decodedToken.userId
      })
      const result = await reqCar.detail(reqData)
      new Response().success(res,result)
    } catch (error) {
      new Response().fail(res,error)
    }
  }
}

module.exports = car
