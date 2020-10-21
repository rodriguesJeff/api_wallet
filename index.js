const express = require('express');
const bodyParser = require('body-parser');
const db = require('./model/bd');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

router.get('/api', (req, res, next) => {
    res.status(200).send({
        title: 'MyWallet API',
        version:'1.0.0'
    });
});

router.post('/api/users', (req, res) => {
    var email = req.body.email;
    var name = req.body.name;
    var username = req.body.username;
    var pass = req.body.pass;
    console.log(email);

    db.query(`INSERT INTO user(email, name, username, pass) VALUES('${email}', '${name}', '${username}', '${pass}')`, (error, results, fields) => {
        if (error) {
            res.status(500).send({
                message: 'Erro no servidor!'
            });    
            console.log(error);
        } else {
            res.status(200).send({
                message: 'Dados inseridos com sucesso!',
                data: results
            });
        }      
        return null;  
    });
});

router.get('/api/users', (req, res) => {
    db.query("SELECT * FROM user", (error, results, fields) => {
        if (error){
            res.status(500).send({
                message: 'Erro no servidor'
            });
        }
        res.status(200).send({
            message: 'Dados obtidos com sucesso',
            data: results
        });
    });
});

router.patch('/api/users/:id', (req, res) => {
    var pass = req.body.pass;
    db.query(`UPDATE user SET pass='${pass}' WHERE id_user = `+ parseInt(req.params.id), (error, results) => {
        if (error){
            res.status(500).send({
                message: 'Erro no servidor'
            });
            console.log(error);
        } else {
            res.status(200).send({
                message: 'Senha atualizada'
            });
        } 
        return null;
    });
});

router.delete('/api/users/:id', (req, res) => {
    db.query('DELETE FROM user WHERE id_user =' + parseInt(req.params.id), (error, results, fields) => {
        if (error) {
            res.status(500).send({
                message: 'Erro no servidor'
            });
        } else {
            res.status(200).send({
                message: 'Usuário apagado com sucesso!'
            });
        }
        return null;
    });
});

router.get('/api/users/:username', (req, res) => {
    db.query(`SELECT * FROM user WHERE username = '${req.params.username}'`, (error, results) => {
        if (error) {
            res.status(500).send({
                message: 'Erro no servidor'
            });
            console.log(error);
        } else {
            res.status(200).send({
                message: 'Usuários encontrados:',
                data: results
            });
        }
        return null;
    });
});

app.listen(8080, (req, res) => {
    console.log('server rodando na porta 9900')
});