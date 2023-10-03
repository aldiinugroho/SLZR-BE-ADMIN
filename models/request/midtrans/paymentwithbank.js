const moment = require("moment/moment")
const EmptyChecker = require("../../../utils/emptychecker")

class ModelRequestMidtransPaymentWithBank {
  payment_type = "bank_transfer"
  transaction_details = {
    "gross_amount": 0,
    "order_id": ""
  }
  bank_transfer = {
    "bank": ""
  }
  custom_expiry = {
    "order_time": moment().format('YYYY-MM-DD HH:mm:ss ZZ'),
    "expiry_duration": 5,
    "unit": "minute"
  }
  constructor({
    gross_amount = 0,
    order_id = "",
    bank = ""
  }) {
    this.transaction_details.gross_amount = new EmptyChecker().emptyIntOrZero(gross_amount, "gross_amount tidak boleh kosong.")
    this.transaction_details.order_id = new EmptyChecker().emptyString(order_id, "order_id tidak boleh kosong.")
    new EmptyChecker().emptyString(bank, "bank tidak boleh kosong.")
    if (
      bank === "bca" ||
      bank === "bni" ||
      bank === "bri" ||
      bank === "cimb"
    ) {
      this.bank_transfer.bank = bank
    }
  }
}

module.exports = {
  ModelRequestMidtransPaymentWithBank
}