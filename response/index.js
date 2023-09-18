const CustomMoment = require('../utils/custommoment');

const errorModelAccount = {
    "DBAC1": "gagal getListAccount"
}

const errorCode = {
    "A0001": "Data tidak ditemukan.",
    ...errorModelAccount
}

class Response {
    date = new CustomMoment().now()
    success(res,data) {
        res.json({
            message: "success",
            data: data,
            responseTime: this.date
        })
    }
    fail(res,error) {
        console.log("error",error);
        if (typeof error === "string") {
            if (errorCode[error] === undefined) {
                res.status(500).json({
                    message: error,
                    data: null,
                    responseTime: this.date
                })
            } else {
                res.status(500).json({
                    message: errorCode[error],
                    data: null,
                    responseTime: this.date
                })
            }
        } else {
            res.status(500).json({
                message: "Internal Server Error",
                data: null,
                responseTime: this.date
            })
        }
    }
}

module.exports = { Response }
