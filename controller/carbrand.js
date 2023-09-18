const { ModelRequestCarBrandCreate } = require("../models/request/carbrand/create");
const { Response } = require("../response")
const reqCarBrand = require('../business/carbrand');
// const serviceMsAccount = require("../models/service/account")
// const Kurasi = require("../outservice/kurasi/kurasi")

const carbrand = {
    list: async (req, res) => {
        try {
            const result = await reqCarBrand.list()
            new Response().success(res,result)
        } catch (error) {
            new Response().fail(res,error)
        }
    },
    create: async (req, res) => {
        try {
            const reqData = new ModelRequestCarBrandCreate(req.body)
            await reqCarBrand.create(reqData)
            new Response().success(res)
        } catch (error) {
            new Response().fail(res,error)
        }
    }
}

module.exports = carbrand
