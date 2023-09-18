const CustomUuid = require("../../utils/customuuid")
const msUser = require("../db/msuser")

async function create({
  name = "",
  email = "",
  password = ""
}) {
  try {
    const data = {
      userId: new CustomUuid().v4(),
      userName: name,
      userEmail: email,
      userPassword: password
    }
    await msUser.create(data)
  } catch (error) {
    throw "Error msUser create - db execution"
  }
}

async function findOneByEmail({
  email = ""
}) {
  try {
    const result = await msUser.findOne({
      where: { 
        userEmail: email
      }
    })
    return result
  } catch (error) {
    throw "Error msUser findOneByEmail - db execution"
  }
}

module.exports = {
  create,
  findOneByEmail
}
