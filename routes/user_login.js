require('dotenv-safe').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user_schema');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    try {
        if (await !User.findOne({ email, pass }))
            res.status(404).json({ message: 'Login failed' });

        let user = await User.findOne({
            email : email
        }).then( user => {
            if (!user) {
                res.status(404).json({ message: 'Email not found' })
            } else {
                bcrypt.compare(req.body.pass, user.pass, (err, result) => {
                    if (!result){
                        res.status(404).json({ message: 'password incorrect' });
                    } 
                    
                    let _email_user = user.email;

                    const _token = jwt.sign({ _email_user }, process.env.SECRET, {
                        expiresIn: '604800'
                    });

                    return res.status(200).json({
                        message: 'Authenticated',
                        token: _token
                    })
                })
            }
        });
    } catch(err) {
        if (err) throw err;
        return res.status(404).json({
            message: 'Failed to authentication',
            token: null,
            auth: false
        });
    }

});

module.exports = app => app.use('/api', router);