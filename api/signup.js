const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');
const FollowerModel = require('../models/FollowerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";

// const userPng = 
//   "https://i.ya-webdesign.com/images/avatar-png-transparent-4.png";

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.get('/:username', async(req, res) => {
  const {username} = req.params;

  try {
    if(username.length < 1) return res.status(401).send('Ongeldig');

    if(!regexUserName.test(username)) return res.status(401).send('Ongeldig');

    const user = await UserModel.findOne({username: username.toLowerCase() });

    if(user) return res.status(401).send("Gebruikersnaam was al opgemerkt");

    return res.status(200).send("Available");
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Server error);
  }
});

router.post("/", async(req, res) => {
  const {
      name,
      email,
      username,
      password,
      bio,
      facebook,
      youtube,
      twitter,
      instagram
    } = req.body.user;

    if(!isEmail(email)) return res.status(401).send('Ongeldig Email');

    if (password.length < 6) {
      return res.status(401).send("Wachtwoord moet minstens uit 6 letters bestaan");
    }

    try {
    let user;
    user = await UserModel.findOne({email: email.tolLowerCase()})
    if(user) {
      return res.status(401).send("Gebruiker was al geregestreerd");
    }
    user = new UserModel({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password
    });
    } catch (error) {
      console.log(error);
      return res.status(500).send(`Server error`);
    }
  
});


module.exports = router;