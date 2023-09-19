class ModelRequestCarDetail {
  userId = ""
  carId = ""
  constructor({
    userId = "",
    carId = ""
  }) {
    this.userId = userId
    this.carId = carId
  }
}

module.exports = {
  ModelRequestCarDetail
}