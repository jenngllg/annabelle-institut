const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({

  host: 'smtp.gmail.com',
  provider: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'misskilleuse@gmail.com', // Enter here email address from which you want to send emails
    pass: 'petitejenny' // Enter here password for email account from which you want to send emails
  },
  tls: {
  rejectUnauthorized: false
  }
});

app.use(bodyParser.json());

app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/send', function (req, res) {

  let senderFirstName = req.body.contactFormFirstName;
  let senderLastName = req.body.contactFormLastName;
  let senderEmail = req.body.contactFormEmail;
  let senderMessage = req.body.contactFormMessage;
  let beRecalled = req.body.contactFormBeRecalled ? "Oui" : "Non";
  let phoneNumber = req.body.contactFormPhoneNumber ;

  let messageText = "Prénom : '" + senderFirstName
  + "'\Nom : '" + senderLastName
  + "'\nMail : '" + senderEmail
  + "'\nMessage : '" + senderMessage
  + "'\nSouhaite être rappelé(e) : '" + beRecalled
  + "'\nTéléphone : '" + phoneNumber;

  let mailOptions = {
    to: ['jenny@gullung.com', senderEmail], // Enter here the email address on which you want to send emails from your customers
    from: senderFirstName + " " + senderLastName,
    subject: "Nouveau message",
    text: messageText,
    replyTo: senderEmail
  };

  if (senderFirstName === '') {
    res.status(400);
    res.send({
    message: 'Veuillez renseigner votre prénom'
    });
    return;
  }

  if (senderLastName === '') {
    res.status(400);
    res.send({
    message: 'Veuillez renseigner votre nom'
    });
    return;
  }

  if (senderEmail === '') {
    res.status(400);
    res.send({
    message: 'Veuillez renseigner votre email'
    });
    return;
  }

  if (messageText === '') {
    res.status(400);
    res.send({
    message: 'Veuillez renseigner votre message'
    });
    return;
  }

  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end('error');
    } else {
      console.log('Message envoyé : ', response);
      res.end('sent');
    }
  });
});

app.listen(port, function () {
  console.log('Express started on port : ', port);
});