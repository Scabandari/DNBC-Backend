const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('User');

module.exports = app => {
    app.get('/user/:id', async (req, res) => {
        //const user = await User.findById(req.user.id);
        ///console.log("user: ", user);
        console.log("req.params: ", req.params);
        res.status(200).send("Ok");
    });

    app.get('/user', async (req, res) => {
        try {
            const user = await User.find({});
            res.status(200).json(user);
        } catch (err) {
            res.status(200).send("Ok");
        }
    });
};