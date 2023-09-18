const Configpass = require("../../config/configPass");
const { ModelRequestCarCreate } = require("../../models/request/car/create");
const serviceCar = require("../../models/service/car")

const create = async (reqData = new ModelRequestCarCreate({})) => {
  try {
    // insert db
    await serviceCar.createCarXCarImageXCarOtherPrice(reqData)
    // get list
    const result = await serviceCar.list(reqData.userId)
    return result
  } catch (error) {
    throw error
  }
}

const list = async (userId = "") => {
  try {
    // get list
    const result = await serviceCar.list(userId)
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  create,
  list
}