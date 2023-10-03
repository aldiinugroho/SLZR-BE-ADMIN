const CustomUuid = require("../../utils/customuuid")
const msTransactionPayment = require("../db/mstransactionpayment")
const msCarBookKeeping = require("../db/mscarbookkeeping");
const { sequelize } = require("../../config/sequelize");

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

module.exports = {
  createMsTransactionPaymentXUpdateMsCarBookKeepingTPID
}
