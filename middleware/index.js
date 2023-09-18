const { Response } = require("../response")
const serviceCredential = require('../models/service/credential');
const ConfigToken = require('../config/configtoken');

async function middleware(req,res,next) {
    try {
        if (req?.headers?.authorization === undefined) {
            throw "no authorization"
        }
        let authorization = req?.headers?.authorization.split(" ")[1]
        let result = await serviceCredential.getToken(authorization)
        if (result === null || result === undefined) {
            throw "no authorization"
        }
        let decrypted = new ConfigToken().decodeToken(authorization)
        req.decodedToken = decrypted
        next()
    } catch (error) {
        new Response().fail(res,error)
    }
}

async function mastermiddleware(req,res,next) {
    try {
        if (req?.headers?.authorization === undefined) {
            throw "no authorization"
        }
        const authOnHeader = req?.headers?.authorization.split(" ")[1]
        if (authOnHeader !== "22aldi01nugroho2000") {
            throw "no authorization"
        }
        next()
    } catch (error) {
        new Response().fail(res,error)
    }
}

module.exports = {
    middleware,
    mastermiddleware
}
