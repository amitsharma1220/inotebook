//Require to setup the express server endpoints request
const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { body, validationResult } = require('express-validator');

//Require for password hashing and JWT token authorization
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "Ammyiscoolhacker$";

//To validate the userToken
const fetchUser = require('../middleware/fetchUser');


//ROUTE:1  Create New User using: POST "api/auth/createUser". No login required.
router.post('/createUser', [
    //Validators declaration at the server side for [name | email | password]
    body('name', 'Username must be atleast 3 characters.').isLength({ min: 3 }),
    body('email', 'Please provide a valid Email-ID').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //Check whether the user with this email already exists
        let userRecord = await User.findOne({ email: req.body.email });
        if (userRecord) {
            return res.status(400).json({ error: "User already exists!!" });
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        //Create a new user record
        userRecord = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
        })

        const dataToSign = {
            userData: {
                id: userRecord.id
            }
        }
        const authToken = jwt.sign(dataToSign, JWT_SECRET_KEY);
        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
})

//ROUTE:2 Authenticate User Details: POST "api/auth/login". No login required.
router.post('/login', [
    //Validators declaration at the server side for [email | password]
    body('email', 'Please provide a valid Email-ID').isEmail(),
    body('password', 'Password cannot be empty').exists(),
], async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let userRecord = await User.findOne({ email });
        if (!userRecord) {
            return res.status(400).json({ error: "Please provide valid credentials to access." });
        }

        const passwordCompare = await bcrypt.compare(password, userRecord.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please provide valid credentials to access." });
        }

        const payload = {
            userData: {
                id: userRecord.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET_KEY);
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
})


//ROUTE:3 Get Logged-In User Details: POST "api/auth/getUser". Login required.
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        const userId = req.userData.id;
        const userRecord = await User.findById(userId).select('-password');
        res.send(userRecord);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }

})

module.exports = router;