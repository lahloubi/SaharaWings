const express = require("express");
const { check } = require("express-validator");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginuser,
  signupuser
} = require("../controllers/userController");



const router = express.Router();


router.get("/", getUsers);

router.get("/:id", getUser);

router.post(
  "/",
  [
    check("nom").not().isEmpty(),
    check("prenom").not().isEmpty(),
    check("email")
      .isEmail()
      .withMessage("L'email doit contenir un @ et être au bon format!"),
    check("password").not().isEmpty().isLength({ min: 6 }),
  ],
  createUser
);

router.delete("/:id", deleteUser);

router.patch(
  "/:id",
  [
    check("nom").optional().not().isEmpty(),
    check("prenom").optional().not().isEmpty(),
    check("email")
      .optional()
      .isEmail()
      .withMessage("L'email doit contenir un @ et être au bon format!"),
    check("password").optional().not().isEmpty().isLength({ min: 6 }),
  ],
  updateUser
);

//login route

router.post('/login', loginuser)

//signup route

router.post('/signup', signupuser)

module.exports = router;
