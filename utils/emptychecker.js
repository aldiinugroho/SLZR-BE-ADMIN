class EmptyChecker {
    constructor() {}

    emptyString(val = "", msg = "empty string") {
        if (val === "") {
            throw msg
        } return val
    }

    emptyArray(val = [], msg = "empty array") {
        if (val.length === 0) {
            throw msg
        } return val
    }

    emptyIntOrZero(val = 0, msg = "empty int") {
        if (val === 0) {
            throw msg
        } return val
    }

    emptyDate(val = new Date(), msg = "empty date") {
        if (val === null) {
            throw msg
        } return val
    }

    emptyBool(val = false, msg = "empty bool") {
        if (val === null) {
            throw msg
        } return val
    }
}

module.exports = EmptyChecker
