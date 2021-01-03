const app = require('./app');
let port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening on port ${port}`);

/*  //   "build": "npm run clean && npm run build-babel",
  //   "clean": "rm -rf build && mkdir build",
  //   "build-babel": "babel -d ./build . -s"*/