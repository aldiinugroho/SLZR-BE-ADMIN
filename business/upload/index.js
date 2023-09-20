const { GDriver } = require("../gdrive");

const create = async (reqData = {
  originalname: null,
  mimetype: null,
  buffer: null
}) => {
  try {
    const gdrive = new GDriver()
    const dataToSubmit = {
      fieldname: reqData.originalname,
      buffer: reqData.buffer,
      mimetype: reqData.mimetype
    }
    const result = "https://drive.google.com/uc?export=view&id=" + await gdrive.saveFile(dataToSubmit.fieldname,dataToSubmit.buffer,dataToSubmit.mimetype)
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  create
}