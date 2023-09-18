const { Op } = require("sequelize");
const CustomUuid = require("../../utils/customuuid")
const msShowroom = require("../db/msshowroom")

async function create({
  userId = "",
  showroomName = "",
  showroomAddress = "",
  showroomPhone = ""
}) {
  try {
    const data = {
      showroomId: new CustomUuid().v4(),
      userId: userId,
      showroomName: showroomName,
      showroomAddress: showroomAddress,
      showroomPhone: showroomPhone
    }
    await msShowroom.create(data)
  } catch (error) {
    console.log("err",error);
    throw "Error msShowroom create - db execution"
  }
}

async function getAllByUserId(userId = "") {
  try {
    const result = await msShowroom.findAll({
      where: {
        userId: userId,
        softdelete: false
      },
      attributes: { exclude: ['userId','softdelete'] }
    })
    return result
  } catch (error) {
    throw "Error msShowroom getAllByUserId - db execution"
  }
}

async function update({
  showroomId = "",
  showroomName = "",
  showroomAddress = "",
  showroomPhone = ""
}) {
  try {
    await msShowroom.update({
      showroomName: showroomName,
      showroomAddress: showroomAddress,
      showroomPhone: showroomPhone
    },{
      where: {
        showroomId: showroomId
      }
    })
  } catch (error) {
    throw "Error msShowroom update - db execution"
  }
}

async function softDelete(showroomId = "") {
  try {
    await msShowroom.update({
      softdelete: true,
    },{
      where: {
        showroomId: showroomId
      }
    })
  } catch (error) {
    throw "Error msShowroom softDelete - db execution"
  }
}

async function detail(showroomId = "") {
  try {
    const result = await msShowroom.findOne({
      where: {
        [Op.and]: [
          {softdelete: false},
          {showroomId: showroomId}
        ]
      },
      attributes: { exclude: ['userId','softdelete'] }
    })
    return result
  } catch (error) {
    throw "Error msShowroom softDelete - db execution"
  }
}

module.exports = {
  create,
  getAllByUserId,
  update,
  softDelete,
  detail
}
