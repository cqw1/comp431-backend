
const getHeadlines = (req, res) => {
    headlines = [];

    if (req.params.user) {
        users = req.params.user.split(",");
        users.forEach(function(user) {
            headlines.push({ username: user, headline: user + ' headline'});
        })
    } else {
        headlines.push({ username: 'stubbed username', headline: 'stubbed headline' });
    }

    res.send({ headlines });
}

const putHeadline = (req, res) => {
    res.send({ username: 'stubbed username', headline: req.body.headline });
}

const getEmail = (req, res) => {
    var username = 'stubbed username';
    if (req.params.user) {
        username = req.params.user;
    }
    res.send({ username, email: 'emailAddress' });
}

const putEmail = (req, res) => {
    res.send({ username: 'stubbed username', email: req.body.email });
}

const getZipcode = (req, res) => {
    var username = 'stubbed username';

    if (req.params.user) {
        username = req.params.user;
    }

    res.send({ username, zipcode: 'zipcode' });
}

const putZipcode = (req, res) => {
    res.send({ username: 'stubbed username', zipcode: req.body.zipcode });
}

const getAvatars = (req, res) => {
    avatars = [];

    if (req.params.user) {
        users = req.params.user.split(",");
        users.forEach(function(user) {
            avatars.push({ username: user, avatar: user + ' avatar'});
        })
    } else {
        avatars.push({ username: 'stubbed username', avatar: 'stubbed avatar' });
    }

    res.send({ avatars });
}

const putAvatar = (req, res) => {
    res.send({ username: 'stubbed username', avatar: 'stubbed avatar' });
}

const getDob = (req, res) => {
    res.send({ username: 'stubbed username', dob: 1491169198471});
}

const index = (req, res) => {
     res.send({ hello: 'world' });
}

module.exports = app => {
     app.get('/headlines/:user?', getHeadlines),
     app.put('/headline', putHeadline),
     app.get('/email/:user?', getEmail),
     app.put('/email', putEmail),
     app.get('/zipcode/:user?', getZipcode),
     app.put('/zipcode', putZipcode),
     app.get('/avatars/:user?', getAvatars),
     app.put('/avatar', putAvatar),
     app.get('/dob', getDob),
     app.get('/', index)
}
