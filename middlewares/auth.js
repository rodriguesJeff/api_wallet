const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(404).json({ message: 'Token not past' });
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) 
            return res.status(401).json({ message: 'Invalid token' });
        req.user = decoded.email_login;
        next();
    });
}

module.exports = auth;