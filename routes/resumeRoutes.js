//const mongoose = require('mongoose');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const mailOptions = require('../services/email').mailOptions;
const transporter = require('../services/email').transporter;
const Email = require('../models/Email'); //mongoose.model('emails');

router.post(
  '/email',
  [
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('message', 'Message is required')
        .not()
        .isEmpty(),
      check('checked', 'The checked boolean is required')
        .not()
        .isEmpty()
        .isBoolean()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { checked, email, message } = req.body;
    let options = { ...mailOptions, text: message };
    if (checked) {
      options = { ...options, to: [...options.to, email] };
    }

    transporter.sendMail(options, async (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({ error });
      } else {
        console.log('Email sent: ' + info.response);
        const email = new Email(req.body);
        try {
          await email.save();
          res.status(200).send(email);
        } catch (error) {
          console.log(error);
          res.status(500).send({ error });
        }
      }
    });
  }
);

module.exports = router;
