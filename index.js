const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//app.use(cookieParser());

var exports = module.exports = {};

const user = {
    'username': 'stub username',
    'salt': '',
    'hash': '',
};
exports.user = user;

const profile = {
    'avatar': 'stub avatar',
    'email': 'stub email',
    'dob': 'stub dob',
    'zipcode': 'stub zipcode',
    'headline': 'stub headline',
};
exports.profile = profile;

const app = express();
app.use(bodyParser.json());
require('./src/profile').endpoints(app);
require('./src/articles').endpoints(app);
require('./src/auth').endpoints(app);
require('./src/following').endpoints(app);

if (process.env.NODE_ENV !== 'production') {
    require('dot-env')
}

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
