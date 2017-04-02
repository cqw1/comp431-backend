const sampleFollowing = [
    'john',
    'ann',
    'joe',
];

const getFollowing = (req, res) => {
    let username = 'stubbed username';
    if (req.params.user) {
        username = req.params.user;
    }

    const msg = {
        username,
        following: sampleFollowing
    };

    res.send(msg);
}

const putFollowing = (req, res) => {
    const msg = {
        username: 'stubbed username',
        following: [req.params.user, ...sampleFollowing]
    };

    res.send(msg);
}

const deleteFollowing = (req, res) => {
    const deleted = sampleFollowing.filter(function (user) {
        return user != req.params.user;
    })

    const msg = {
        username: 'stubbed username',
        following: deleted,
    };

    res.send(msg);
}

module.exports = (app) => {
	app.get('/following/:user?', getFollowing),
	app.put('/following/:user', putFollowing),
	app.delete('/following/:user', deleteFollowing)
}
