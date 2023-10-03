const axios = require('axios');
const { ModelRequestMidtransPaymentWithBank } = require("../models/request/midtrans/paymentwithbank")

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
      return rawresult.data
    } catch (error) {
      console.log(error);
      throw "error charge - outbound servicemidtrans"
    }
  }
}

module.exports = servicemidtrans