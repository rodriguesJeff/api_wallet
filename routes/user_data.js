require('dotenv-safe').config();

const express = require('express');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get('/user', (req, res) => {
    const { token } = req.body;

    
});