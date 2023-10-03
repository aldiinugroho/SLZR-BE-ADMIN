class ModelResponseMidtransPaymentWithBank {
  transaction_id = ""
  order_id = ""
  transaction_status = ""
  fraud_status = ""
  va_number = ""
  va_bank = ""
  expiry_time = ""
  constructor({
    transaction_id = "",
    order_id = "",
    transaction_status = "",
    fraud_status = "",
    va_numbers = [{
      bank: "",
      va_number: ""
    }],
    expiry_time = ""
  }) {
    // check is fraud_status = accept
    if (fraud_status !== "accept" && transaction_status !== "pending") throw "failed creating VA"
    this.transaction_id = transaction_id
    this.order_id = order_id
    this.transaction_status = transaction_status
    this.fraud_status = fraud_status
    this.va_number = va_numbers[0]?.va_number
    this.va_bank = va_numbers[0]?.bank
    this.expiry_time = expiry_time
  }
}

module.exports = {
  ModelResponseMidtransPaymentWithBank
}