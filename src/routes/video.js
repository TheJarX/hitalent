const express = require('express');
const User = require('../models/user');
const router = express.Router();
const user = {
    data: null,
}
router.use(express.urlencoded({ extended: true }));

// TODO: refactor this middleware
router.use(async (req, res, next) => {
    const tokenProvided = !!req.query.valid;
    
    // I'm using valid as the name of the token
    const validData = await checkToken(req.query.valid);
    const error = !tokenProvided ? "No token provided" : "Invalid token";
    
    if(!validData || !tokenProvided) return res.send({ ok: false,  error });
    else next();
});

router.route('/:id')
    .get( async(req, res) => {

        res.json({ok: true, user});
    });


async function checkToken(urlParam) {
    try {
        const [token, id] = urlParam.split("$");
        
        if(!token || !id) throw new Error("Invalid identificator!");

        const userDB = await User.findOne({ token }).exec();
        const isValid = !!userDB.email && userDB._id.toString() === id;

        if (isValid) user.data = userDB;

        return isValid;
    } catch (error) {
        return false;
    }
}

module.exports = router;