const express = require("express");
const router = express.Router();
const passport = require("passport");
const inspect = require("util").inspect;

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  console.log(`req.body: ${req.body}`);
  const redirect =
    process.env.FRONTEND_REDIRECT || "http://localhost:3000/profile";
  console.log(`redirect: ${redirect}`);
  res.redirect(redirect);
  //res.redirect("/profile");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/current_user", (req, res) => {
  //console.log(`req: ${JSON.stringify(req)}`);
  console.log(`req: ${inspect(req.user)}`);
  res.send(req.user);
});

module.exports = router;
