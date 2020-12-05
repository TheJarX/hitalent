const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

const requestData = {
  params: null,
};

router.use(express.urlencoded({ extended: true }));

router.use((req, res, next) => {
  const { name, surname, gender, email, phone, birthday, token, } = req.body;

  requestData.params = {
    name,
    surname,
    gender,
    email,
    phone,
    birthday,
    token,
    valid: !!(name && surname && email && phone), // required params to register an user
  };
  next();
});

router.use((req, res, next) => {
  if (!requestData.params.valid)
    return res.status(400).json({
      ok: false,
      code: 400,
      error: "Empty param(s)",
      request: { body: requestData },
    });
  next();
});

router.post('/', (req, res) => {
  const { params } = requestData;

  const token = jwt.sign({ email: params.email }, process.env.JWT_SECRET);

  User.create({
    ...params,
    token,
  })
    .then((newUser) => {
      res.status(201).send({ ok: true, newUser });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        ok: false,
        code: 500,
        error: "Something happened while creating User",
        errors: error.errors,
      });
    });
});

router.post('/validate', (req, res) => {

})

module.exports = router;
