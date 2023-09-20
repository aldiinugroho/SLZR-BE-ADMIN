const Configpass = require("../../config/configPass");
const { ModelRequestShowroomCreate } = require("../../models/request/showroom/create");
const { ModelRequestShowroomDelete } = require("../../models/request/showroom/delete");
const { ModelRequestShowroomDetail } = require("../../models/request/showroom/detail");
const { ModelRequestShowroomUpdate } = require("../../models/request/showroom/update");
const serviceShowroom = require("../../models/service/showroom");
const { GDriver } = require("../gdrive");

const create = async (reqData = [
  {
    originalname: null,
    mimetype: null,
    buffer: null
  }
]) => {
  try {
    const gdrive = new GDriver()
    const dataToSubmit = {
      fieldname: reqData[0].originalname,
      buffer: reqData[0].buffer,
      mimetype: reqData[0].mimetype
    }
    const result = await gdrive.saveFile(dataToSubmit.fieldname,dataToSubmit.buffer,dataToSubmit.mimetype)
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  create
}