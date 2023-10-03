const axios = require('axios');
const { ModelRequestMidtransPaymentWithBank } = require("../models/request/midtrans/paymentwithbank");
const { ModelResponseMidtransPaymentWithBank } = require('../models/response/midtrans/paymentwithbank');

const servicemidtrans = {
  charge: async (reqData = new ModelRequestMidtransPaymentWithBank({})) => {
    try {
      console.log(reqData);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic U0ItTWlkLXNlcnZlci1aNHlNb1VBejhQRl91cmVUTHoyd0VtRXI6'
      };
      const rawresult = await axios({
        method: 'post',
        url: "https://api.sandbox.midtrans.com/v2/charge",
        headers: headers,
        data: reqData
      })
      const dataToMap = rawresult.data
      console.log(dataToMap);
      const result = new ModelResponseMidtransPaymentWithBank({
        transaction_id: dataToMap?.transaction_id,
        order_id: dataToMap?.order_id,
        transaction_status: dataToMap?.transaction_status,
        va_numbers: dataToMap?.va_numbers,
        expiry_time: dataToMap?.expiry_time,
        fraud_status: dataToMap?.fraud_status
      })
      return result
    } catch (error) {
      throw "error charge - outbound servicemidtrans"
    }
  }
}

module.exports = servicemidtrans