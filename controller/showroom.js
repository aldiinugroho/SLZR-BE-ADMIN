const { ModelRequestShowroomCreate } = require("../models/request/showroom/create");
const { Response } = require("../response")
const reqShowroom = require('../business/showroom');
const { ModelRequestShowroomUpdate } = require("../models/request/showroom/update");
const { ModelRequestShowroomDelete } = require("../models/request/showroom/delete");
const { ModelRequestShowroomDetail } = require("../models/request/showroom/detail");

const showroom = {
  create: async (req, res) => {
    try {
      const reqData = new ModelRequestShowroomCreate({
        ...req.body,
        userId: req.decodedToken?.userId
      })
      const result = await reqShowroom.create(reqData)
      new Response().success(res,result)
    } catch (error) {
      new Response().fail(res,error)
    }
  },
  list: async (req, res) => {
    try {
      const result = await reqShowroom.list(req.decodedToken.userId)
      new Response().success(res,result)
    } catch (error) {
      new Response().fail(res,error)
    }
  },
  update: async (req, res) => {
    try {
      const reqData = new ModelRequestShowroomUpdate({
        ...req.body,
        userId: req.decodedToken.userId
      })
      const result = await reqShowroom.update(reqData)
      new Response().success(res,result)
    } catch (error) {
      new Response().fail(res,error)
    }
  },
  delete: async (req, res) => {
    try {
      const reqData = new ModelRequestShowroomDelete({
        ...req.params,
        userId: req.decodedToken.userId
      })
      const result = await reqShowroom.reqDelete(reqData)
      new Response().success(res,result)
    } catch (error) {
      new Response().fail(res,error)
    }
  },
  detail: async (req, res) => {
    try {
      const reqData = new ModelRequestShowroomDetail(req.params)
      const result = await reqShowroom.detail(reqData)
      new Response().success(res,result)
    } catch (error) {
      new Response().fail(res,error)
    }
  }
}

module.exports = showroom
