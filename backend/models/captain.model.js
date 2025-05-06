const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters"],
            maxlength: [20, "First name must be at most 20 characters"],
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters"],
            maxlength: [20, "Last name must be at most 20 characters"],
        },
    },
    email: {
        type: String,
        required: true,
        minlength: [5, "Email must be at least 5 characters"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    sockedtid: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [5, "Plate must be at least 5 characters"],
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, "Capacity must be at least 1"],
        },
        vehicletypes: {
            type: String,
            enum: ['car', 'auto', 'bike'],
            required: true,
        },
    },
    location: {
        lat: {
            type: Number,
        }, lng: {
            type: Number,

        },
    }
})

captainSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashpassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const Captain = mongoose.model("Captain", captainSchema);
module.exports = Captain;