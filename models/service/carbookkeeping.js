const { sequelize, Op } = require("../../config/sequelize");
const msCarBookKeepingPaymentTools = require("../db/mscarbookkeepingpaymenttools")
const msCarBookKeeping = require("../db/mscarbookkeeping")
const msCarLeasing = require("../db/mscarleasing");
const { ModelCarBookKeepingCreate } = require("../request/carbookkeeping/create");
const { ModelRequestCarBookKeepingCancel } = require("../request/carbookkeeping/cancel");
const msCar = require("../db/mscar");
const { ModelRequestListByCarStatus } = require("../request/carbookkeeping/listbycarstatus");
const msShowroom = require("../db/msshowroom");
const msCarBrand = require("../db/mscarbrand");
const msCarImage = require("../db/mscarimage");
const msCarOtherPrice = require("../db/mscarotherprice");
const msCarBuyFrom = require("../db/mscarbuyfrom");
const { ModelRequestCarBookKeepingDetail } = require("../request/carbookkeeping/detail");
const { ModelRequestUpdateWeb } = require("../request/carbookkeeping/updateweb");
const { ModelRequestMarkSold } = require("../request/carbookkeeping/marksold");

async function carBookKeepingPaymentToolsList() {
  try {
    // get list
    const result = await msCarBookKeepingPaymentTools.findAll()
    return result
  } catch (error) {
    throw "Error msCarBookKeepingPaymentTools carBookKeepingPaymentToolsList - db execution"
  }
}

async function carBookKeepingXCarLeasingCreate(reqData = new ModelCarBookKeepingCreate({}), carBookKeepingStatus = "ON PROGRESS") {
  const t = await sequelize.transaction();
  try {
    // insert new to msCarBookKeeping
    await msCarBookKeeping.create({
      ...reqData,
      carBookKeepingStatus: carBookKeepingStatus
    }, { transaction: t })
    // insert new to msCarLeasing
    if (reqData.carLeasing !== null) {
      await msCarLeasing.create(reqData.carLeasing, { transaction: t })
    }
    await t.commit();
  } catch (error) {
    await t.rollback();
    throw "Error msCarBookKeeping|msCarLeasing carBookKeepingXCarLeasingCreate - db execution"
  }
}

async function cancelCarBookKeeping(reqData = new ModelRequestCarBookKeepingCancel({})) {
  const t = await sequelize.transaction();
  try {
    // set carBookKeepingStatus = CANCEL 
    await msCarBookKeeping.update({
      carBookKeepingStatus: "CANCEL"
    }, {
      where: {
        [Op.and]: [
          {carBookKeepingId: reqData.carBookKeepingId},
          {carId: reqData.carId}
        ]
      },
      transaction: t
    })
    // set carStatus = READY
    await msCar.update({
      carStatus: "READY"
    }, {
      where: {
        carId: reqData.carId
      },
      transaction: t
    })
    await t.commit();
  } catch (error) {
    await t.rollback();
    throw "Error msCarBookKeeping|msCar cancelCarBookKeeping - db execution"
  }
}

async function getListByCarStatus(reqData = new ModelRequestListByCarStatus({})) {
  try {
    // get list
    const result = await msCar.findAll({
      where: {
        [Op.and]: [
          {userId: reqData.userId},
          {carStatus: reqData.carStatus},
          {softdelete: false}
        ]
      },
      include: [
        {
          model: msShowroom
        },
        {
          model: msCarBrand
        },
        {
          model: msCarImage
        },
        {
          model: msCarOtherPrice
        },
        {
          model: msCarBookKeeping,
          include: [
            {
              model: msCarBookKeepingPaymentTools
            },
            {
              model: msCarBuyFrom,
              // where: {
              //   [Op.and]: [
              //     { carBuyFromId: 'CBFI1' }, // Exclude 'CBFI2'
              //   ],
              // },
            },
            {
              model: msCarLeasing
            },
          ],
          // where: {
          //   [Op.and]: [
          //     {carBookKeepingStatus: 'ON PROGRESS'}
          //   ]
          // },
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [msCarBookKeeping, 'updatedAt', 'DESC']
      ],
      nest: true
    })
    return result
  } catch (error) {
    console.log(error);
    throw "Error msCarBookKeepingPaymentTools carBookKeepingPaymentToolsList - db execution"
  }
}

async function getDetail(reqData = new ModelRequestCarBookKeepingDetail({})) {
  try {
    // get list
    const result = await msCar.findOne({
      where: {
        [Op.and]: [
          {userId: reqData.userId},
          {carId: reqData.carId},
          {softdelete: false}
        ]
      },
      include: [
        {
          model: msShowroom
        },
        {
          model: msCarBrand
        },
        {
          model: msCarImage
        },
        {
          model: msCarOtherPrice
        },
        {
          model: msCarBookKeeping,
          include: [
            {
              model: msCarBookKeepingPaymentTools
            },
            {
              model: msCarBuyFrom
            },
            {
              model: msCarLeasing
            },
          ]
        },
      ],
      order: [
        [msCarBookKeeping, 'updatedAt', 'DESC']
      ],
      nest: true
    })
    return result
  } catch (error) {
    throw "Error msCar|msShowroom|msCarBrand|msCarImage|msCarOtherPrice|msCarBookKeeping|msCarBookKeepingPaymentTools|msCarBuyFrom|msCarLeasing getDetail - db execution"
  }
}

async function carBookKeepingDetail(reqData = "") {
  try {
    // get list
    const result = await msCarBookKeeping.findOne({
      where: {
        [Op.and]: [
          {carBookKeepingId: reqData}
        ]
      },
      include: [
        {
          model: msCarBookKeepingPaymentTools
        },
        {
          model: msCarBuyFrom
        },
        {
          model: msCarLeasing
        },
      ],
      order: [
        ['updatedAt', 'DESC']
      ],
      nest: true
    })
    return result
  } catch (error) {
    throw "Error msCarBookKeeping|msCarBookKeepingPaymentTools|msCarBuyFrom|msCarLeasing carBookKeepingDetail - db execution"
  }
}

async function getListByCarStatusOnlyOnProgress(reqData = "",userId = "") {
  try {
    // get list
    const result = await msCar.findAll({
      where: {
        [Op.and]: [
          {userId: userId},
          {carStatus: "BOOKED"},
          {softdelete: false}
        ]
      },
      include: [
        {
          model: msShowroom
        },
        {
          model: msCarBrand
        },
        {
          model: msCarImage
        },
        {
          model: msCarOtherPrice
        },
        {
          model: msCarBookKeeping,
          include: [
            {
              model: msCarBookKeepingPaymentTools
            },
            {
              model: msCarBuyFrom,
              where: {
                [Op.and]: [
                  { carBuyFromId: reqData }, // Exclude 'CBFI2'
                ],
              },
            },
            {
              model: msCarLeasing
            },
          ],
          where: {
            [Op.and]: [
              {carBookKeepingStatus: 'ON PROGRESS'}
            ]
          },
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [msCarBookKeeping, 'updatedAt', 'DESC']
      ],
      nest: true
    })
    return result
  } catch (error) {
    console.log(error);
    throw "Error msShowroom|msCarBrand|msCarImage|msCarOtherPrice|msCarBookKeeping|msCarBookKeepingPaymentTools|msCarBuyFrom|msCarLeasing getListByCarStatusOnlyOnProgress - db execution"
  }
}

async function updateWeb(reqData = new ModelRequestUpdateWeb({})) {
  const t = await sequelize.transaction();
  try {
    await msCarBookKeeping.update({
      carBookKeepingPaymentToolsId: reqData.carBookKeepingPaymentToolsId,
      carBookKeepingName: reqData.carBookKeepingName,
      carBookKeepingPhone: reqData.carBookKeepingPhone,
      carBookKeepingKTP: reqData.carBookKeepingKTP,
      carBookKeepingSoldPrice: reqData.carBookKeepingSoldPrice
    },{
      where: {
        carBookKeepingId: reqData.carBookKeepingId
      },
      transaction: t
    })

    // using kredit
    // update for type kredit/CBKPT01
    // make carbookkeeping still ON PROGRESS
    // make car still BOOKED
    if (reqData.carLeasing !== null && reqData.carBookKeepingPaymentToolsId === "CBKPT01") {
      await msCarLeasing.create(reqData.carLeasing, { transaction: t })
    }

    // using cash
    // update for type cash/CBKPT02
    // make carbookkeeping SUCCESS
    // make car SOLD
    if (reqData.carLeasing === null && reqData.carBookKeepingPaymentToolsId === "CBKPT02") {
      // make carbookkeeping stat success
      await msCarBookKeeping.update({
        carBookKeepingStatus: "SUCCESS"
      }, { 
        where: {
          carBookKeepingId: reqData.carBookKeepingId
        },
        transaction: t
      })
      // make car stat SOLD
      await msCar.update({
        carStatus: "SOLD"
      }, { 
        where: {
          carId: reqData.carId
        },
        transaction: t
      })
    }
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log(error);
    throw "Error msCar|msCarBookKeeping updateWeb - db execution"
  }
}

async function updateSold(reqData = new ModelRequestMarkSold({})) {
  const t = await sequelize.transaction();
  try {
    // mark car SOLD
    await msCar.update({
      carStatus: "SOLD"
    }, {
      where: {
        carId: reqData.carId
      },
      transaction: t
    })
    // mark car book keeping SUCCESS
    await msCarBookKeeping.update({
      carStatus: "SUCCESS"
    }, {
      where: {
        carBookKeepingId: reqData.carBookKeepingId
      },
      transaction: t
    })
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log(error);
    throw "Error msCar|msCarBookKeeping updateSold - db execution"
  }
}

module.exports = {
  carBookKeepingPaymentToolsList,
  carBookKeepingXCarLeasingCreate,
  cancelCarBookKeeping,
  getListByCarStatus,
  getDetail,
  carBookKeepingDetail,
  getListByCarStatusOnlyOnProgress,
  updateWeb,
  updateSold
}