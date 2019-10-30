const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('User');

router.get('/:id', async (req, res) => {
  //const user = await User.findById(req.user.id);
  ///console.log("user: ", user);
  console.log('req.params: ', req.params);
  res.status(200).send('Ok');
});

router.get('/', async (req, res) => {
  try {
    const user = await User.find({}).select('-googleId');
    res.status(200).json(user);
  } catch (err) {
    res.status(200).send('Ok');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nLevel } = req.body;
    const user = await User.findById(id).select('-googleId');
    console.log('req.params: ', req.params);
    console.log('req.body: ', req.body);
    if (user && nLevel) {
      user.nLevel = nLevel;
      await user.save();
      res.status(200).send({ nLevel });
    } else {
      res.status(404).send({ msg: 'Error making PUT request for model User' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Error making PUT request for model User' });
  }
});

module.exports = router;
