const { UserModel } = require("../models/registration");

const PhoneNumberCheck = async (phoneNumber) => {
    try {
        const check = await UserModel.findOne({ phoneNumber: phoneNumber })
        return (check ? false : true);
    } catch (error) {
        return false
    }
}

module.exports = { PhoneNumberCheck }