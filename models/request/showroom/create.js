const EmptyChecker = require("../../../utils/emptychecker")

class ModelRequestShowroomCreate {
  showroomName = ""
  userId = ""
  showroomAddress = ""
  showroomPhone = "" 
  constructor({
    showroomName = "",
    userId = "",
    showroomAddress = "",
    showroomPhone = "" 
  }) {
    this.showroomName = new EmptyChecker().emptyString(showroomName, "showroomName tidak boleh kosong.")
    this.userId = new EmptyChecker().emptyString(userId, "userId tidak boleh kosong.")
    this.showroomAddress = new EmptyChecker().emptyString(showroomAddress, "showroomAddress tidak boleh kosong.")
    this.showroomPhone = new EmptyChecker().emptyString(showroomPhone, "showroomPhone tidak boleh kosong.")
  }
}

module.exports = {
  ModelRequestShowroomCreate
}