const { ModelRequestCarCreate } = require("../models/request/car/create")
const { Response } = require("../response")
const reqCar = require('../business/car');
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
  }
}

module.exports = car
