const Vol = require("../models/volModel");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const getVols = async (req, res) => {
  const user_id = req.user._id;
  const vols = await Vol.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(vols);
};

const getVol = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Vol non trouvé!" });
  }

  const vol = await Vol.findById(id);

  if (!vol) {
    return res.status(404).json({ error: "Vol non trouvé!" });
  }
  res.status(201).json(vol);
};

const createVol = async (req, res) => {
  const {
    destinationDepart,
    destinationArrivee,
    dateAller,
    dateRetour,
    nbrPassagers,
    adultes,
    enfants,
    bebes,
  } = req.body;

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return res.status(422).json({ error: "Données invalides" });
  }

  const totalPassagers = adultes + enfants + bebes;
  if (totalPassagers > 9) {
    return res.status(400).json({
      message: "Le nombre total de passagers ne peut pas dépasser 9.",
    });
  }

  if (totalPassagers !== nbrPassagers) {
    return res.status(404).json({
      message:
        "Le nombre total de passagers ne correspond pas au nombre spécifié.",
    });
  }

  if (destinationArrivee === destinationDepart) {
    return res.status(400).json({
      message:
        "La destination de départ ne peut pas être la même que la destination d'arrivée.",
    });
  }

  if (dateRetour && dateRetour < dateAller) {
    return res.status(400).json({
      message:
        "La date de retour ne peut pas être inférieure à la date d'aller.",
    });
  }

  try {
    const user_id = req.user._id;
    const vol = await Vol.create({
      destinationDepart,
      destinationArrivee,
      dateAller,
      dateRetour,
      nbrPassagers,
      adultes,
      enfants,
      bebes,
      user_id,
    });
    res.status(201).json(vol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateVol = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Vol non trouvé!" });
  }

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return res.status(422).json({ error: "Données invalides" });
  }

  const vol = await Vol.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!vol) {
    return res.status(400).json({ error: "Vol non trouvé!" });
  }

  res.status(201).json({ message: "Vol modifié!" });
};

const deleteVol = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Vol non trouvé!" });
  }

  const vol = await Vol.findOneAndDelete({ _id: id });

  if (!vol) {
    return res.status(400).json({ error: "Vol non trouvé!" });
  }
  res.status(201).json({ message: "Vol supprimé!" });
};

module.exports = {
  createVol,
  getVols,
  getVol,
  updateVol,
  deleteVol,
};
