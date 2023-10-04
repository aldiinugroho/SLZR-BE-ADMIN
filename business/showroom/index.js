const Configpass = require("../../config/configpass");
const { ModelRequestShowroomCreate } = require("../../models/request/showroom/create");
const { ModelRequestShowroomDelete } = require("../../models/request/showroom/delete");
const { ModelRequestShowroomDetail } = require("../../models/request/showroom/detail");
const { ModelRequestShowroomUpdate } = require("../../models/request/showroom/update");
const serviceShowroom = require("../../models/service/showroom")

const create = async (reqData = new ModelRequestShowroomCreate({})) => {
  try {
    // insert db
    await serviceShowroom.create(reqData)
    // get new list
    const result = await serviceShowroom.getAllByUserId(reqData.userId)
    return result
  } catch (error) {
    throw error
  }
}

const list = async (reqData = "") => {
  try {
    // get new list
    const result = await serviceShowroom.getAllByUserId(reqData)
    return result
  } catch (error) {
    throw error
  }
}

const update = async (reqData = new ModelRequestShowroomUpdate({})) => {
  try {
    // update db
    await serviceShowroom.update(reqData)
    // get new list
    const result = await serviceShowroom.getAllByUserId(reqData.userId)
    return result
  } catch (error) {
    throw error
  }
}

const reqDelete = async (reqData = new ModelRequestShowroomDelete({})) => {
  try {
    // delete db
    await serviceShowroom.softDelete(reqData.showroomId)
    // get new list
    const result = await serviceShowroom.getAllByUserId(reqData.userId)
    return result
  } catch (error) {
    throw error
  }
}

const detail = async (reqData = new ModelRequestShowroomDetail({})) => {
  try {
    // detail db
    const result = await serviceShowroom.detail(reqData.showroomId)
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  create,
  list,
  update,
  reqDelete,
  detail
}