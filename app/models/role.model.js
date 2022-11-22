const mongoose = require("mongoose")
//Data Model for Roles
const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name: String
    })
)

module.exports = Role;