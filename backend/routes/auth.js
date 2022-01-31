const express = require('express');
const User = require('../models/User');
const router = express.Router();
 
//Create User using: POST "api/auth/". Doesn't require Authorization.
router.post('/', (req, res)=>{
    console.log(req.body);
    const userRecord = User(req.body);
    userRecord.save();
    res.send("Hello");
})

module.exports = router;