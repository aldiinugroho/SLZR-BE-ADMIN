const { v4: uuidv4 } = require('uuid');

class CustomUuid {
    constructor() {}

    v4() {
        return uuidv4()
    }
}

module.exports = CustomUuid
