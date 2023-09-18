const { ModelRequestAuthCreateUser } = require("../models/request/auth/create");
const { ModelRequestAuthLogin } = require("../models/request/auth/login");
const { Response } = require("../response")
const reqAuth = require('../business/auth');
// const serviceMsAccount = require("../models/service/account")
// const Kurasi = require("../outservice/kurasi/kurasi")

const sample = {
  base: async (req, res) => {
    try {
      // let result = await serviceMsAccount.getSpecificCustomer()
      // let result = await new Kurasi().getRegisteredCountry()
      new Response().success(res,"")
    } catch (error) {
      console.log("error",error);
      new Response().fail(res,error)
    }
  },
  login: async (req, res) => {
    try {
      const requestData = new ModelRequestAuthLogin(req.body)
      const result = await reqAuth.login(requestData)
      new Response().success(res,result)
    } catch (error) {
      new Response().fail(res,error)
    }
  },
  create: async (req, res) => {
    try {
      const requestData = new ModelRequestAuthCreateUser(req.body)
      await reqAuth.create(requestData)
      new Response().success(res)
    } catch (error) {
      new Response().fail(res,error)
    }
  }
}

module.exports = sample
