const { Response } = require("../response")
const reqCarBookKeeping = require("../models/service/carbookkeeping")
// const Kurasi = require("../outservice/kurasi/kurasi")

const carbookkeeping = {
    paymentToolsList: async (req, res) => {
        try {
            const result = await reqCarBookKeeping.carBookKeepingPaymentToolsList()
            new Response().success(res,result)
        } catch (error) {
            console.log("error",error);
            new Response().fail(res,error)
        }
    },
    about: async (req, res) => {
        try {
            new Response().success(res)
        } catch (error) {
            new Response().fail(res,error)
        }
    }
}

module.exports = carbookkeeping
