const Configpass = require("../../config/configpass");
const { ModelRequestCarCreate } = require("../../models/request/car/create");
const { ModelRequestCarDetail } = require("../../models/request/car/detail");
const { ModelRequestCarUpdate } = require("../../models/request/car/update");
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

const detail = async (reqData = new ModelRequestCarDetail({})) => {
  try {
    // get detail
    const result = await serviceCar.detail(reqData)
    return result
  } catch (error) {
    throw error
  }
}

const softDelete = async ({
  carId = "",
  userId = ""
}) => {
  try {
    // soft delete
    await serviceCar.softDelete(carId)
    // get list updated
    const result = await serviceCar.list(userId)
    return result
  } catch (error) {
    throw error
  }
}

const update = async (reqData = new ModelRequestCarUpdate({})) => {
  try {
    // perform update
    await serviceCar.updateCarXCarImageXCarOtherPrice(reqData)
    // get updated list
    const result = await serviceCar.list(reqData.userId)
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  create,
  list,
  detail,
  softDelete,
  update
}