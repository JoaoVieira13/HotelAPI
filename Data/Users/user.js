let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const { QuartoSchema } = require("../Quartos/quartos");

let UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { default: "DEFAULT", type: ["ADMIN", "DEFAULT"] },
    image: { type: String, required: true, unique: true },
    reserve: [{
        checkIn: { type: String, unique: true },
        checkOut: { type: String, unique: true },
    }],
    favorites: [{ type: Schema.Types.ObjectId, ref: "Quartos" }],
});

let Quarto = mongoose.model('Quartos', QuartoSchema);
let User = mongoose.model('Utilizadores', UserSchema);

module.exports = User