const { ModelCarBookKeepingCreate } = require("../../models/request/carbookkeeping/create")
const serviceCarBookKeeping = require("../../models/service/carbookkeeping")
const serviceCar = require("../../models/service/car")
const { ModelRequestCarBookKeepingCancel } = require("../../models/request/carbookkeeping/cancel")
const { ModelRequestListByCarStatus } = require("../../models/request/carbookkeeping/listbycarstatus")
const { ModelRequestCarBookKeepingDetail } = require("../../models/request/carbookkeeping/detail")
const { ModelRequestUpdateWeb } = require("../../models/request/carbookkeeping/updateweb")
const { ModelRequestMarkSold } = require("../../models/request/carbookkeeping/marksold")
const { ModelRequestMidtransPaymentWithBank } = require("../../models/request/midtrans/paymentwithbank")
const reqMidtrans = require('../midtrans');

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

    //check if theres already booked
    const checkready = await serviceCar.getCarStatus(reqData.carId)
    if (checkready === true) throw "Mobil telah Ter-Jual ataupun Ter-Booked"

    // carBookKeepingPaymentToolsId
    // CBKPT01: KREDIT
    // CBKPT02: CASH

    // carBuyFromId
    // CBFI1: DIRECT
    // CBFI2: WEBSITE
    
    // carbookkeeping stat:
    // CANCEL | ON PROGRESS | SUCCESS

    // car stat:
    // READY | BOOKED | SOLD

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

      // make payment midtrans
      const reqDataPayment = new ModelRequestMidtransPaymentWithBank({
        phone: reqData.carBookKeepingPhone,
        order_id: reqData.carBookKeepingId,
        gross_amount: reqData.carBookKeepingBookedFee,
        name: reqData.carBookKeepingName,
        bank: "bca"
      })
      const result = await reqMidtrans.paymentWithBankVA(reqDataPayment)

      // make data to table mstransactionpayment
      

      return result
    }
  } catch (error) {
    const reqDataCancel = new ModelRequestCarBookKeepingCancel({
      carId: reqData.carId,
      carBookKeepingId: reqData.carBookKeepingId
    })
    await cancel(reqDataCancel)
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

const listByCarStatus = async (reqData = new ModelRequestListByCarStatus({})) => {
  try {
    // get car list
    const result = await serviceCarBookKeeping.getListByCarStatus(reqData)
    return result
  } catch (error) {
    throw error
  }
}

const detail = async (reqData = new ModelRequestCarBookKeepingDetail({})) => {
  try {
    // get car detail
    const result = await serviceCarBookKeeping.getDetail(reqData)
    return result
  } catch (error) {
    throw error
  }
}

const carBookKeepingDetail = async (reqData = "") => {
  try {
    // get car detail
    const result = await serviceCarBookKeeping.carBookKeepingDetail(reqData)
    return result
  } catch (error) {
    throw error
  }
}

const listByCarStatusOnlyOnProgress = async (reqData = "",userId = "") => {
  try {
    // get car list by carbuyfromid and car status on progress
    const result = await serviceCarBookKeeping.getListByCarStatusOnlyOnProgress(reqData,userId)
    return result
  } catch (error) {
    throw error
  }
}

const updateWeb = async (reqData = new ModelRequestUpdateWeb({})) => {
  try {
    await serviceCarBookKeeping.updateWeb(reqData)
  } catch (error) {
    throw error
  }
}

const updateSold = async (reqData = new ModelRequestMarkSold({})) => {
  try {
    await serviceCarBookKeeping.updateSold(reqData)
  } catch (error) {
    throw error
  }
}

module.exports = {
  paymentToolsList,
  create,
  cancel,
  listByCarStatus,
  detail,
  carBookKeepingDetail,
  listByCarStatusOnlyOnProgress,
  updateWeb,
  updateSold
}