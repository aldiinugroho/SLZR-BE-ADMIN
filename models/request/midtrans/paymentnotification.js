class ModelRequestMidtransPaymentNotification {
  transaction_id = ""
  carBookKeepingId = ""
  transaction_status = ""
  payment_type = ""
  constructor({
    transaction_id = "",
    order_id = "",
    transaction_status = "",
    payment_type = ""
  }) {
    this.transaction_id = transaction_id
    this.carBookKeepingId = order_id
    if (transaction_status === "pending") {
      this.transaction_status = "PENDING"
    } else if (transaction_status === "settlement") {
      this.transaction_status = "PAID"
    } else if (transaction_status === "expire") {
      this.transaction_status = "CANCEL"
    } else if (transaction_status === "deny" ||
      transaction_status === "failure" ||
      transaction_status === "cancel"
    ) {
      this.transaction_status = "CANCEL"
    }
    this.payment_type = payment_type
  }
}

module.exports = {
  ModelRequestMidtransPaymentNotification
}