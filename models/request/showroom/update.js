const EmptyChecker = require("../../../utils/emptychecker")

class ModelRequestShowroomUpdate {
  showroomId = ""
  userId = ""
  showroomName = ""
  showroomAddress = ""
  showroomPhone = "" 
  constructor({
    showroomId = "",
    userId = "",
    showroomName = "",
    showroomAddress = "",
    showroomPhone = "" 
  }) {
    this.showroomId = new EmptyChecker().emptyString(showroomId, "showroomId tidak boleh kosong.")
    this.userId = new EmptyChecker().emptyString(userId, "userId tidak boleh kosong.")
    this.showroomName = new EmptyChecker().emptyString(showroomName, "showroomName tidak boleh kosong.")
    this.showroomAddress = new EmptyChecker().emptyString(showroomAddress, "showroomAddress tidak boleh kosong.")
    this.showroomPhone = new EmptyChecker().emptyString(showroomPhone, "showroomPhone tidak boleh kosong.")
  }
}

module.exports = {
  ModelRequestShowroomUpdate
}