const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(async (req, res, next) => {
    const tokenProvided = !!req.query.valid;
    // I'm using valid as the name of the token
    const validData = await checkToken(req.query.valid, req.query.user_id);
    const error = !tokenProvided ? "No token provided" : "Invalid token";
    
    if(!validData || !tokenProvided) return res.send({ ok: false,  error });
    else next();
});

router.route('/:id')
    .get((req, res) => {
        res.send("ok")
    });


async function checkToken(token, id) {
    try {
        const user = await User.findOne({ token }).exec();
        return !!user.email && user._id.toString() === id;
    } catch (error) {
        return false;
    }
}

module.exports = router;