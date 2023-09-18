const EmptyChecker = require("../../../utils/emptychecker")

class ModelRequestShowroomDetail {
  showroomId = ""
  constructor({
    showroomId = "",
  }) {
    this.showroomId = new EmptyChecker().emptyString(showroomId, "showroomId tidak boleh kosong.")
  }
}

module.exports = {
  ModelRequestShowroomDetail
}