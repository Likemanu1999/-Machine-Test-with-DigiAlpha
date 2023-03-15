const mongoose = require("mongoose")

let isValidEmail = function (email) {
    let emailRegex = /^([A-Za-z0-9._-]{2,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/
    return emailRegex.test(email)
}

let isValidPhone = function (number) {
    let phoneRegex = /^[+91]{3}?[6789]{1}\d{9}$/;
    return phoneRegex.test(number);
}

let isValidObjectId = function (ObjectId) {
    return mongoose.isValidObjectId(ObjectId)
}

module.exports ={ isValidEmail, isValidPhone , isValidObjectId}