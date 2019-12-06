const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const uuid = require("uuid/v1");

const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");

AWS.config.update({ region: "us-east-2", signatureVersion: "v4" });
const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
});

//router.get('/', requireLogin, (req, res) => {
//const key = `${req.user.id}/${uuid()}.jpeg`;
router.get("/resume/udemy-course/img", (req, res) => {
  const key = `resume/${uuid()}.jpeg`;
  s3.getSignedUrl(
    "putObject",
    {
      Bucket: "resume-files-32123",
      ContentType: "image/jpeg",
      Key: key
    },
    (err, url) => res.send({ key, url })
  );
});

router.get("/resume/projects/problem-statement", (req, res) => {
  const key = `resume/projects/${uuid()}.pdf`;
  s3.getSignedUrl(
    "putObject",
    {
      Bucket: "resume-files-32123",
      ContentType: "application/pdf",
      Key: key
    },
    (err, url) => {
      if (err) {
        res.status(500).send({ err });
      }
      res.send({ key, url });
    }
  );
});

router.get("/resume/projects/report", (req, res) => {
  const key = `resume/projects/${uuid()}.pdf`;
  s3.getSignedUrl(
    "putObject",
    {
      Bucket: "resume-files-32123",
      ContentType: "application/pdf",
      Key: key
    },
    (err, url) => {
      if (err) {
        res.status(500).send({ err });
      }
      res.send({ key, url });
    }
  );
});

// router.post("/", (req, res) => {
//   const { body } = res;
//   console.log(JSON.stringify(body));
// });

module.exports = router;
