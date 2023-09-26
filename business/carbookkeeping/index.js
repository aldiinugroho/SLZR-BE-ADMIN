const { ModelCarBookKeepingCreate } = require("../../models/request/carbookkeeping/create")
const serviceCarBookKeeping = require("../../models/service/carbookkeeping")
const serviceCar = require("../../models/service/car")
const { ModelRequestCarBookKeepingCancel } = require("../../models/request/carbookkeeping/cancel")

const paymentToolsList = async () => {
  try {
    // get list
    const result = await serviceCarBookKeeping.carBookKeepingPaymentToolsList()
    return result
  } catch (error) {
    throw error
  }
}

const create = async (reqData = new ModelCarBookKeepingCreate({})) => {
  try {
    // carBookKeepingPaymentToolsId
    // CBKPT01: KREDIT
    // CBKPT02: CASH

    // carBuyFromId
    // CBFI1: DIRECT
    // CBFI2: WEBSITE

    // only for direct
    if (reqData.carBuyFromId === "CBFI1") {
      if (reqData.carBookKeepingPaymentToolsId === "CBKPT01") {
        // insert to car book keeping & car leasing
        await serviceCarBookKeeping.carBookKeepingXCarLeasingCreate(reqData)
        // set car to BOOKED
        await serviceCar.updateCarStatus({
          carId: reqData.carId,
          carStatus: "BOOKED"
        })
      }
      if (reqData.carBookKeepingPaymentToolsId === "CBKPT02") {
        // insert to car book keeping
        await serviceCarBookKeeping.carBookKeepingXCarLeasingCreate(reqData, "SUCCESS")
        // set car to SOLD
        await serviceCar.updateCarStatus({
          carId: reqData.carId,
          carStatus: "SOLD"
        })
      }
    }

    // only for website
    if (reqData.carBuyFromId === "CBFI2") {
      // insert to car book keeping
      await serviceCarBookKeeping.carBookKeepingXCarLeasingCreate(reqData)
      // set car to BOOKED
      await serviceCar.updateCarStatus({
        carId: reqData.carId,
        carStatus: "BOOKED"
      })
    }
  } catch (error) {
    throw error
  }
}

const cancel = async (reqData = new ModelRequestCarBookKeepingCancel({})) => {
  try {
    // cancel car book keeping
    const result = await serviceCarBookKeeping.cancelCarBookKeeping(reqData)
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  paymentToolsList,
  create,
  cancel
}