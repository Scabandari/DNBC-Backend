const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const mailOptions = require("../services/email").mailOptions;
const transporter = require("../services/email").transporter;
const Email = require("../models/resume/Email"); //mongoose.model('emails');
const UdemyCourse = require("../models/resume/UdemyCourse");
const Project = require("../models/resume/Project");

router.post(
  "/projects",
  [
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("subTitle", "A sub title is required")
        .not()
        .isEmpty(),
      check("description", "A description is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    console.log(
      `req.body while creating Project: ${JSON.stringify(req.body, null, 2)}`
    );
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(
        `Bad request. \nreq.body: ${JSON.stringify(req.body, null, 2)}\n`,
        `errors: ${JSON.stringify(errors.array(), null, 2)}`
      );
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const project = new Project(req.body);
      await project.save();
      console.log(`Success creating Project: ${project}`);
      res.status(200).send(project);
    } catch (err) {
      console.log(`Error while creating Project: ${err}`);
      res.status(500).send({ err });
    }
  }
);

router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find({});
    //console.log({ projects });
    res.status(200).send(projects);
  } catch (err) {
    console.log({ err });
    res.status(500).send({ err });
  }
});

router.post(
  "/udemy-courses",
  [
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("author", "Author is required")
        .not()
        .isEmpty(),
      check("link", "A valid URL is required")
        .not()
        .isEmpty()
        .isURL(),
      check("review", "Review is required")
        .not()
        .isEmpty(),
      check("completed", "Course completion true or false is required") // TODO more validation for URL?
        .not()
        .isEmpty()
        .isBoolean(),
      check("rating", "A rating is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(
        `Bad request. \nreq.body: ${JSON.stringify(req.body, null, 2)}\n`,
        `errors: ${JSON.stringify(errors.array(), null, 2)}`
      );
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const udemyCourse = new UdemyCourse(req.body);
      await udemyCourse.save();
      res.status(200).send(udemyCourse);
    } catch (err) {
      console.log(`Error while creating UdemyCourse: ${err}`);
      res.status(500).send({ err });
    }
  }
);

router.get("/udemy-courses", (req, res) => {
  UdemyCourse.find({})
    .then(courses => res.send(courses))
    .catch(err => res.send({ msg: "Could not find Udemy Courses", err }));
});

router.post(
  "/email",
  [
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check("message", "Message is required")
        .not()
        .isEmpty(),
      check("checked", "The checked boolean is required")
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
        console.log("Email sent: " + info.response);

        try {
          const email = new Email(req.body);
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
