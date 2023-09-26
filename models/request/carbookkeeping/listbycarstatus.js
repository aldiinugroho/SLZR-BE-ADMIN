class ModelRequestListByCarStatus {
  userId = ""
  carStatus = ""
  constructor({
    userId = "",
    carStatus = ""
  }) {
    this.userId = userId
    this.carStatus = carStatus.toUpperCase()
  }
}

module.exports = {
  ModelRequestListByCarStatus
}