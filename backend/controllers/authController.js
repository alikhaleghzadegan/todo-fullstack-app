const jwt = require('jsonwebtoken');
const User = require('../models/User');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.status(200).json("signup");
}

module.exports.signup_post = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await User.create({ email, password, name });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * maxAge });
        res.status(201).json({ user: user._id, name: user.name });
    } catch (err) {
        console.error(err);
        res.status(400).json(err.message);
    }
}

module.exports.login_get = (req, res) => {
    res.status(200).json("login");
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * maxAge });
        res.status(200).json({ user: user._id, name: user.name });
    } catch (err) {
        console.error(err);
        res.status(400).json(err.message);
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.status(200).json("logout successfull");
}