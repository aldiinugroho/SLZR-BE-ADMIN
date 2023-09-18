const ConfigToken = require("../../config/configtoken")
const CustomUuid = require("../../utils/customuuid")
const msCredential = require("../db/mscredential")
const { Op } = require("../../config/sequelize")

async function createToken({
  userId = "",
  userName = "",
  userEmail = ""
}) {
  try {
    // check already token
    const issavedtoken = await msCredential.findOne({
      where: {
        [Op.and]: [
          {userId: userId},
          {credentialType: "TOKEN"}
        ]
      }
    })
    let data = {
      credentialId: new CustomUuid().v4(),
      credentialType: "TOKEN",
      credentialValue: new ConfigToken().setToken({
        userId: userId,
        userName: userName,
        userEmail: userEmail
      }),
      userId: userId
    }
    if (issavedtoken === null) {
      await msCredential.create(data)
    } else if (issavedtoken !== null) {
      await msCredential.update({
        credentialValue: data.credentialValue
      }, {
        where: {
          [Op.and]: [
            {userId: userId},
            {credentialType: "TOKEN"}
          ]
        }
      })
    } else {
      throw "Error unknown saving token"
    }
    return {token: data.credentialValue}
  } catch (error) {
    console.log("error",error);
    throw "Error msCredential createToken - db execution"
  }
}

async function getToken(credentialValue = "") {
  try {
    const result = await msCredential.findOne({
      where: {
        [Op.and]: [
          {credentialType: "TOKEN"},
          {credentialValue: credentialValue}
        ]
      }
    })
    return result
  } catch (error) {
    console.log("error",error);
    throw "Error msCredential getToken - db execution"
  }
}

module.exports = {
  createToken,
  getToken
}
