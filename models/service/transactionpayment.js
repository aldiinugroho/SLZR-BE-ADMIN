const CustomUuid = require("../../utils/customuuid")
const msTransactionPayment = require("../db/mstransactionpayment")
const msCarBookKeeping = require("../db/mscarbookkeeping");
const msCar = require("../db/mscar");
const { sequelize } = require("../../config/sequelize");
const { ModelRequestMidtransPaymentNotification } = require("../request/midtrans/paymentnotification");

async function createMsTransactionPaymentXUpdateMsCarBookKeepingTPID({
  carBookKeepingId = "",
  midtransTransactionId = "",
  transactionPaymentStatus = "",
  transactionPaymentBank = "",
  transactionPaymentAmount = 0,
  transactionPaymentVA = "",
  transactionPaymentExpiry
}) {
  const t = await sequelize.transaction();
  try {
    const data = {
      transactionPaymentId: new CustomUuid().v4(),
      midtransTransactionId,
      transactionPaymentStatus: "PENDING",
      transactionPaymentBank,
      transactionPaymentAmount,
      transactionPaymentVA,
      transactionPaymentExpiry
    }
    await msTransactionPayment.create(data, { transaction: t })
    await msCarBookKeeping.update({
      transactionPaymentId: data.transactionPaymentId
    },{
      where: {
        carBookKeepingId: carBookKeepingId
      },
      transaction: t
    })
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log(error);
    throw "Error msTransactionPayment|msCarBookKeeping createMsTransactionPaymentXUpdateMsCarBookKeepingTPID - db execution"
  }
}

async function updateMidtransNotification(reqData = new ModelRequestMidtransPaymentNotification({})) {
  const t = await sequelize.transaction();
  try {
    if (reqData.transaction_status === "PAID") {
      // transaction status = PAID
      // update transaction payment status = PAID
      await msTransactionPayment.update({
        transactionPaymentStatus: "PAID"
      }, {
        where: {
          midtransTransactionId: reqData.transaction_id
        },
        transaction: t
      })
    } else {
      // transaction status = CANCEL
      // update transaction payment status = CANCEL
      // update car status = "READY"
      // update car book keeping status = "CANCEL"
      await msTransactionPayment.update({
        transactionPaymentStatus: "CANCEL"
      },{
        where: {
          midtransTransactionId: reqData.transaction_id
        },
        transaction: t
      })
      await msCarBookKeeping.update({
        carBookKeepingStatus: "CANCEL"
      },{
        where: {
          carBookKeepingId: reqData.carBookKeepingId
        },
        transaction: t
      })
      const result = await msCarBookKeeping.findOne({
        where: {
          carBookKeepingId: reqData.carBookKeepingId
        },
        transaction: t
      })
      await msCar.update({
        carStatus: "READY"
      },{
        where: {
          carId: result?.carId
        },
        transaction: t
      })
    }
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log(error);
    throw "Error msTransactionPayment|msCarBookKeeping|msCar updateMidtransNotification - db execution"
  }
}

module.exports = {
  createMsTransactionPaymentXUpdateMsCarBookKeepingTPID,
  updateMidtransNotification
}
