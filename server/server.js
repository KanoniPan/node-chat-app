const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
// console.log(__dirname + '/../public'); or like this(way slower)
// console.log(publicPath);

var app = express();
const port = process.env.PORT || 3000;
// app.get('/',function(req,res){
//
//      res.sendFile(publicPath + '/index.html');
//
// }); or use like this
app.use(express.static(publicPath));
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
