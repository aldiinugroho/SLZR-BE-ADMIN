const { Response } = require("../response")
const reqCarBookKeeping = require("../business/carbookkeeping")
const { ModelCarBookKeepingCreate } = require("../models/request/carbookkeeping/create")
const { ModelRequestCarBookKeepingCancel } = require("../models/request/carbookkeeping/cancel")
const { ModelRequestListByCarStatus } = require("../models/request/carbookkeeping/listbycarstatus")
const { ModelRequestCarBookKeepingDetail } = require("../models/request/carbookkeeping/detail")
const { ModelRequestUpdateWeb } = require("../models/request/carbookkeeping/updateweb")
const { ModelRequestMarkSold } = require("../models/request/carbookkeeping/marksold")
// const Kurasi = require("../outservice/kurasi/kurasi")

const carbookkeeping = {
    paymentToolsList: async (req, res) => {
        try {
            const result = await reqCarBookKeeping.paymentToolsList()
            new Response().success(res,result)
        } catch (error) {
            console.log("error",error);
            new Response().fail(res,error)
        }
    },
    create: async (req, res) => {
        try {
            const reqData = new ModelCarBookKeepingCreate(req.body)
            const result = await reqCarBookKeeping.create(reqData)
            new Response().success(res,result)
        } catch (error) {
            new Response().fail(res,error)
        }
    },
    cancel: async (req, res) => {
        try {
            const reqData = new ModelRequestCarBookKeepingCancel(req.body)
            await reqCarBookKeeping.cancel(reqData)
            new Response().success(res)
        } catch (error) {
            new Response().fail(res,error)
        }
    },
    listByCarStatus: async (req, res) => {
        try {
            const reqData = new ModelRequestListByCarStatus({
                carStatus: req.params?.carStatus,
                userId: req.decodedToken.userId
            })
            const result = await reqCarBookKeeping.listByCarStatus(reqData)
            new Response().success(res,result)
        } catch (error) {
            new Response().fail(res,error)
        }
    },
    detail: async (req, res) => {
        try {
            const reqData = new ModelRequestCarBookKeepingDetail({
                carId: req.params?.carId,
                userId: req.decodedToken.userId
            })
            const result = await reqCarBookKeeping.detail(reqData)
            new Response().success(res,result)
        } catch (error) {
            new Response().fail(res,error)
        }
    },
    carBookKeepingDetail: async (req, res) => {
        try {
            const result = await reqCarBookKeeping.carBookKeepingDetail(req.params?.carBookKeepingId)
            new Response().success(res,result)
        } catch (error) {
            new Response().fail(res,error)
        }
    },
    listByCarStatusOnlyOnProgress: async (req, res) => {
        try {
            const result = await reqCarBookKeeping.listByCarStatusOnlyOnProgress(req.params?.carBuyFromId,req.decodedToken.userId)
            new Response().success(res,result)
        } catch (error) {
            new Response().fail(res,error)
        }
    },
    updateWeb: async (req, res) => {
        try {
            const reqData = new ModelRequestUpdateWeb(req.body)
            await reqCarBookKeeping.updateWeb(reqData)
            new Response().success(res)
        } catch (error) {
            new Response().fail(res,error)
        }
    },
    updateSold: async (req, res) => {
        try {
            const reqData = new ModelRequestMarkSold(req.body)
            await reqCarBookKeeping.updateSold(reqData)
            new Response().success(res)
        } catch (error) {
            new Response().fail(res,error)
        }
    },
}

module.exports = carbookkeeping
