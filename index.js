const app = require('./app');
let port = process.env.APP_PORT || 3000;
app.listen(port);
console.log(`listening on port ${port}`);