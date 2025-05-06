const usermodel = require('../models/user.model');

module.exports.createuser = async({firstname, lastname, email, password}) => {
    if(!firstname || !lastname || !email || !password) {
        throw new Error("All fields are required");
    }
    const user = new usermodel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
    return await user.save();
}