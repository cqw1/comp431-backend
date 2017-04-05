const md5 = require('md5');
const index = require('../index');

var exports =  module.exports = {};

let sessions = {};

const postLogin = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.sendStatus(400);
        return;
    }

    /*
    var index.user = getUser(username);
    if (!index.user || index.user.password !== password) {
        res.sendStatus(400);
        return;
    }
    */

    /*
    if (index.user.username != req.body.username) {
        res.sendStatus(401);
        return;
    }

    var hash = md5(req.body.password + index.user.salt);
    if (index.user.hash != hash) {
        res.sendStatus(401);
        return;
    }

    sessions[req.body.username] = req.body.username;

    // cookie lasts for 1 hour
    //res.cookie(cookieKey, generateCode(index.user),
    res.cookie('sessionId', req.body.username,
            {maxAge: 3600 * 1000, httpOnly: true});
    */

    var msg = {username: req.body.username, result: 'success'};
    res.send(msg);
}

const postRegister = (req, res) => {
    /*
    index.user.username = req.body.username;
    var salt = 'salty';
    index.user.salt = salt;
    index.user.hash = md5(req.body.password + salt);
    */

    var msg = {username: req.body.username, result: 'success'};
    res.send(msg);
}

const putLogout = (req, res) => {
    res.send('OK');
}

const putPassword = (req, res) => {
    const msg = {
        username: index.user.username,
        status: 'will not change',
    }

    res.send(msg);
}

exports.endpoints = function(app) {
    app.post('/register', postRegister),
    app.post('/login', postLogin),
    app.put('/logout', putLogout),
    app.put('/password', putPassword)
}
