const express = require("express");
const { check } = require("express-validator");
const requireAuth = require('../middleware/requireAuth')

const {
  getVols,
  getVol,
  createVol,
  updateVol,
  deleteVol,
} = require("../controllers/volController");

const router = express.Router();

router.use(requireAuth)

router.get("/", getVols);

router.get("/:id", getVol);

router.post(
  "/",
  [
    check("destinationDepart").not().isEmpty(),
    check("destinationArrivee").not().isEmpty(),
    check("dateAller").not().isEmpty(),
    check("dateRetour").not().isEmpty(),
    check("nbrPassagers").isInt({ min: 1, max: 9 }),
    check("adultes").isInt({ min: 1, max: 9 }),
    check("enfants").isInt({ min: 0, max: 8 }),
    check("bebes").isInt({ min: 0, max: 4 }),
  ],
  createVol
);

router.delete("/:id", deleteVol);

router.patch(
  "/:id",
  [
    check("destinationDepart").optional().not().isEmpty(),
    check("destinationArrivee").optional().not().isEmpty(),
    check("dateAller").optional().not().isEmpty(),
    check("dateRetour").optional().not().isEmpty(),
    check("nbrPassagers").optional().isInt({ min: 1, max: 9 }),
    check("adultes").optional().isInt({ min: 1, max: 9 }),
    check("enfants").optional().isInt({ min: 0, max: 8 }),
    check("bebes").optional().isInt({ min: 0, max: 4 }),
  ],
  updateVol
);

module.exports = router;