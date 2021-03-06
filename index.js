const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/bd');

const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

router.get('/api', (req, res, next) => {
    res.status(200).send({
        title: 'MyWallet API',
        version:'2.0.0'
    });
});

require('./routes/user_register')(app);
require('./routes/user_login')(app);
require('./routes/user_data')(app);

app.listen(port, (req, res) => {
    console.log('server rodando na porta 8080')
});
