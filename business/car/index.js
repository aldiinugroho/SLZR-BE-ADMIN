const Configpass = require("../../config/configPass");
const { ModelRequestCarCreate } = require("../../models/request/car/create");
const serviceCar = require("../../models/service/car")

const create = async (reqData = new ModelRequestCarCreate({})) => {
  try {
    // insert db
    await serviceCar.createCarXCarImageXCarOtherPrice(reqData)
    // get list

  } catch (error) {
    throw error
  }
}

module.exports = {
  create
}