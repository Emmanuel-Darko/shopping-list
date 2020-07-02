const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User model
const User = require('../../models/User');

// @route POST api/auth
// @desc Authenticate user
// @access Public
router.post('/', (req,res)=>{
    
    const { email, password } = req.body

    //Simple validation
    if( !email || !password ) {
        return res.status(400).json({msg: 'Please enter all fields'})
    }

    //Check for existing user
    User.findOne({ email })
    .then(user => {
        if( !user ) return res.status(400).json({msg: 'User does not exist'}) // if null

        // Validate user
        bcrypt.compare(password, user.password)
            .then (isMatch => {
                if( isMatch === false ) return res.status(400).json({msg: 'Invalid credentials'})

                // if it matches,
                // jwt sign
                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 600 }, // expires in 10 minutes
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token: token,
                            user:{
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )

            })
    })
});

// @route GET api/auth/user
// @desc Get user data from individual tokens
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})
module.exports = router 