// Environment variable set by Heroku
if(process.env.NODE_ENV == 'production') {
    module.exports = require('./production');
}
else {
    module.exports = require('./development');
}