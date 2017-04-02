const md5 = require('md5')

const userObj = {
    'username': 'stubbed username',
    'salt': '',
    'hash': '',
};
exports.userObj = userObj;

let sessions = {};

const postLogin = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.sendStatus(400);
        return;
    }

    /*
    var userObj = getUser(username);
    if (!userObj || userObj.password !== password) {
        res.sendStatus(400);
        return;
    }
    */

    if (userObj.username != req.body.username) {
        res.sendStatus(401);
        return;
    }

    var hash = md5(req.body.password + userObj.salt);
    if (userObj.hash != hash) {
        res.sendStatus(401);
        return;
    }

    sessions[req.body.username] = req.body.username;

    // cookie lasts for 1 hour
    //res.cookie(cookieKey, generateCode(userObj),
    res.cookie('sessionId', req.body.username,
            {maxAge: 3600 * 1000, httpOnly: true});

    var msg = {username: req.body.username, result: 'success'};
    res.send(msg);
}

const postRegister = (req, res) => {
    userObj.username = req.body.username;
    var salt = 'salty';
    userObj.salt = salt;
    userObj.hash = md5(req.body.password + salt);

    var msg = {username: req.body.username, result: 'success'};
    res.send(msg);
}

const putLogout = (req, res) => {
    res.send('OK');
}

const putPassword = (req, res) => {
    const msg = {
        username: userObj.username,
        status: 'will not change',
    }

    res.send(msg);
}

module.exports = (app) => {
	app.post('/register', postRegister),
	app.post('/login', postLogin),
	app.put('/logout', putLogout),
	app.put('/password', putPassword)
}
