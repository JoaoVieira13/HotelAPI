let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { default: "DEFAULT", type: ["ADMIN", "DEFAULT"] }
});

let User = mongoose.model('Utilizadores', UserSchema);

module.exports = User