const EmptyChecker = require("../../../utils/emptychecker")

class ModelRequestShowroomDelete {
  showroomId = ""
  userId = ""
  constructor({
    showroomId = "",
    userId = ""
  }) {
    this.showroomId = new EmptyChecker().emptyString(showroomId, "showroomId tidak boleh kosong.")
    this.userId = new EmptyChecker().emptyString(userId, "userId tidak boleh kosong.")
  }
}

module.exports = {
  ModelRequestShowroomDelete
}