const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const volSchema = new Schema({
  destinationDepart: { type: String, required: true },
  destinationArrivee: { type: String, required: true },
  dateAller: { type: Date, required: true },
  dateRetour: { type: Date, required: false },
  nbrPassagers: { type: Number, required: true },
  adultes: { type: Number, required: true },
  enfants: { type: Number, required: false },
  bebes: { type: Number, required: false },
  user_id : { type: String, required: true }
});

module.exports = mongoose.model("Vol", volSchema);
