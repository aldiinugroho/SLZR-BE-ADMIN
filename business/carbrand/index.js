const Configpass = require("../../config/configpass");
const { ModelRequestCarBrandCreate } = require("../../models/request/carbrand/create");
const serviceCarBrand = require("../../models/service/carbrand")

const create = async (reqData = new ModelRequestCarBrandCreate({})) => {
  try {
    // insert db
    await serviceCarBrand.create({
      name: reqData.name
    })
  } catch (error) {
    throw error
  }
}

const list = async () => {
  try {
    // list db
    const result = await serviceCarBrand.list()
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  create,
  list
}