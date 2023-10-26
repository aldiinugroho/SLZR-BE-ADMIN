const Configpass = require("../../config/configpass");
const { ModelRequestAuthCreateUser } = require("../../models/request/auth/create");
const { ModelRequestAuthLogin } = require("../../models/request/auth/login");
const serviceUser = require("../../models/service/user")
const serviceCredential = require("../../models/service/credential")

const create = async (reqData = new ModelRequestAuthCreateUser({})) => {
  try {
    // check registered user
    const checkregistered = await serviceUser.findOneByEmail({email: reqData.email})
    if (checkregistered !== null) throw "Error Email sudah ter-registrasi"
    // secure password
    const securepass = new Configpass().encrypt(reqData.password)
    // insert db
    await serviceUser.create({
      name: reqData.name,
      email: reqData.email,
      password: securepass
    })
  } catch (error) {
    throw error
  }
}

const login = async (reqData = new ModelRequestAuthLogin({})) => {
  try {
    // check registered user
    const checkregistered = await serviceUser.findOneByEmail({email: reqData.email})
    if (checkregistered === null) throw "Error Email Dan Password tidak valid."
    // get check match password
    const ismatchpass = new Configpass().check(reqData.password,checkregistered.userPassword)
    if (ismatchpass === false) throw "Error Email Dan Password tidak valid."
    // create token
    const result = await serviceCredential.createToken({
      userId: checkregistered.userId,
      userName: checkregistered.userName,
      userEmail: checkregistered.userEmail
    })
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  create,
  login
}