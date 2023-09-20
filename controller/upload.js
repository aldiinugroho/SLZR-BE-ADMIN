const { ModelRequestAuthCreateUser } = require("../models/request/auth/create");
const { ModelRequestAuthLogin } = require("../models/request/auth/login");
const { Response } = require("../response")
const reqAuth = require('../business/auth');
const secretKey = require("../constant/secretkey");
const reqUpload = require('../business/upload');
// const serviceMsAccount = require("../models/service/account")
// const Kurasi = require("../outservice/kurasi/kurasi")

const upload = {
  create: async (req, res) => {
    try {
      const { body, files } = req;
      if (files.length === 0) {
        throw "gambar tidak boleh kosong"
      }
      const result = await reqUpload.create(files)
      new Response().success(res,result)
    } catch (error) {
      new Response().fail(res,error)
    }
  }
}

module.exports = upload
