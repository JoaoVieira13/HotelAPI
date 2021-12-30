let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { default: "DEFAULT", type: ["ADMIN", "DEFAULT"] },
    reserve: [{
        checkIn: { type: String, unique: true },
        checkOut: { type: String, unique: true },
    }],
});

let User = mongoose.model('Utilizadores', UserSchema);

module.exports = User