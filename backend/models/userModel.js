const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

userSchema.statics.signup = async function (nom, prenom, email, password) {
const exists = await this.findOne({email})

if (exists) {
  throw Error('Deja un email')
}

const user = await this.create({nom, prenom, email, password})
return user
}

userSchema.statics.login = async function (nom, prenom, email, password) {
  const exists = await this.findOne({email})
 
  if (!email || !password) {
    throw Error('Tout doit etre mit')
  }
  
  const user = await this.findOne({ nom, prenom, email})

  if (!user) {
    throw Error('donnees non valide')
  }

  if (user.password !== password) {
    throw Error('Mot de passe incorrect');
  }

  return user



  }

module.exports = mongoose.model("User", userSchema);
