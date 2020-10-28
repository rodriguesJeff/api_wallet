const express = require('express');
const User = require('../model/user_schema');
const userSchema = require('../model/user_schema');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, username } = req.body;

    try {
        if (await User.findOne({ email }))
            return res.status(400).json({ message: 'Unauthorized, email has been registered' });
        if (await User.findOne({ username }))
            return res.status(400).json({ message: 'Unauthorized, username has been registered' });
        const user = User.create(req.body);

        user.pass = undefined;

        return res.status(200).json({ message: 'User Added' });
    }catch(err) {
        if (err) throw err;
        return res.status(400).json({message: 'Error on registration'});
    }
});

module.exports = app => app.use('/api', router);