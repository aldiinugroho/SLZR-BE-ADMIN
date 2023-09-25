const { Response } = require("../response")
const reqCarBookKeeping = require("../business/carbookkeeping")
const { ModelCarBookKeepingCreate } = require("../models/request/carbookkeeping/create")
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
            await reqCarBookKeeping.create(reqData)
            new Response().success(res)
        } catch (error) {
            new Response().fail(res,error)
        }
    }
}

module.exports = carbookkeeping
