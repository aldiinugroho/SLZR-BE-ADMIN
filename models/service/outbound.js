const { Op } = require("../../config/sequelize")
const msCar = require("../db/mscar")
const msCarImage = require("../db/mscarimage")

const lzrauto = {
  getListCar: async (reqData = 0) => {
    try {
      const result = await msCar.findAll({
        limit: 5,
        offset: parseInt(reqData),
        where: {
          [Op.and]: [
            {carStatus: "READY"},
            {softdelete: false}
          ]
        },
        attributes: [
          'carId', 
          'carName',
          'carDescription',
          'carTransmission',
          'carYear',
          'carFuel',
          'carTax',
          'carSTNK',
          'carBPKB',
          'carSellPrice'
        ],
        include: [
          {
            model: msCarImage,
            limit: 1
          },
        ]
      })
      return result
    } catch (error) {
      throw "Error msCar|msCarImage lzrauto getListCar - db execution"
    }
  },
  getDetailCar: async (reqData = "") => {
    try {
      const result = await msCar.findOne({
        where: {
          [Op.and]: [
            {carId: reqData},
            {softdelete: false}
          ]
        },
        attributes: [
          'carId', 
          'carName',
          'carDescription',
          'carTransmission',
          'carYear',
          'carFuel',
          'carTax',
          'carSTNK',
          'carBPKB',
          'carSellPrice'
        ],
        include: [
          {
            model: msCarImage,
            limit: 1
          },
        ]
      })
      return result
    } catch (error) {
      throw "Error msCar|msCarImage lzrauto getDetailCar - db execution"
    }
  },
}

module.exports = {
  lzrauto
}
