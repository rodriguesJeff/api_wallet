require('dotenv-safe').config();

const express = require('express');

const auth = require('../middlewares/auth');
const User = require('../model/user_schema');

const router = express.Router();

router.get('/user', auth, async (req, res) => {
    try {
        email = req.user;
        
        let user = await User.findOne({ email : email });

        let data = [
            name = user.name,
            lastname = user.lastname,
            email = user.email,
            username = user.username,
            pass = null
        ];
        return res.status(200).json({
            message: 'Authenticated',
            data: data
        })
    } catch(err) {
        if (err) throw err;
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = app => app.use('/api', router);