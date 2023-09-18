const CustomUuid = require("../../utils/customuuid")
const msCarBrand = require("../db/mscarbrand")

async function create({
  name = ""
}) {
  try {
    const data = {
      carBrandId: new CustomUuid().v4(),
      carBrandName: name
    }
    await msCarBrand.create(data)
  } catch (error) {
    throw "Error msCarBrand create - db execution"
  }
}

async function list() {
  try {
    const result = await msCarBrand.findAll()
    return result
  } catch (error) {
    throw "Error msCarBrand create - db execution"
  }
}

module.exports = {
  create,
  list
}
