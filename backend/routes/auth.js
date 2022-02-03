const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "Ammyiscoolhacker$";
const fetchUser = require('../middleware/fetchUser');


//ROUTE:1  Create User using: POST "api/auth/createUser". No login required.
router.post('/createUser', [
    //Validators declaration at the server side for [name | email | password]
    body('name', 'Username must be atleast 3 characters.').isLength({ min: 3 }),
    body('email', 'Please provide a valid Email-ID').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 })
], async (req, res) => {
    console.log(req.body);

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //Check whether the user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            return res.status(400).json({ error: "A user with same email-Id already exists !!" });
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        //Create a new user record
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET_KEY);
        // console.log(authToken);

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
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please provide valid credentials to access." });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please provide valid credentials to access." });
        }

        const payload = {
            user: {
                id: user.id
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
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }

})

module.exports = router;