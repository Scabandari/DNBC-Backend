const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'developer.rion@gmail.com',
    pass: 'developerpass'
  }
});

const mailOptions = {
  from: 'developer.rion@gmail.com',
  to: ['ryan3nichols@gmail.com'],
  subject: 'Message from ryannichols.com',
  text: 'Default message'
};

module.exports = { transporter, mailOptions };
