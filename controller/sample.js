const { Response } = require("../response")
// const serviceMsAccount = require("../models/service/account")
// const Kurasi = require("../outservice/kurasi/kurasi")

const sample = {
    base: async (req, res) => {
        try {
            new Response().success(res)
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

module.exports = sample
