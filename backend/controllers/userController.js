const User = require("../models/userModel");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
return jwt.sign({_id}, 'aoksdijasjdisadj', { expiresIn: '3d' } )
}

const loginuser = async (req, res) => {
  const {nom, prenom, email, password} = req.body

  try {
    const user = await User.login(nom, prenom, email, password)

    const token = createToken(user._id)
    res.status(200).json({nom, prenom, email, token})
  } catch (error) {
res.status(400).json({error: error.message})
    }
}

const signupuser = async (req, res) => {
  const {nom, prenom, email, password} = req.body

  try {
    const user = await User.signup(nom, prenom, email, password)

    const token = createToken(user._id)
    res.status(200).json({nom, prenom, email, token})
  } catch (error) {
res.status(400).json({error: error.message})
    }
}

// -------------------------------------------------------------------------------------------------------------------------

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(201).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Utilisateur non trouvé!" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé!" });
  }
  res.status(201).json(user);
};

const createUser = async (req, res) => {
  const { nom, prenom, email, password } = req.body;

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return res.status(422).json({ error: "Données invalides" });
  }

  try {
    const user = await User.create({ nom, prenom, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Utilisateur non trouvé!" });
  }

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return res.status(422).json({ error: "Données invalides" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return res.status(404).json({ error: "erreur" });
  }
  res.status(201).json({ message: "Utilisateur modifié!" });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Utilisateur non trouvé!" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "Utilisateur non trouvé!" });
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  signupuser,
  loginuser
};
