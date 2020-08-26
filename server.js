const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/employees-ui'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/employees-ui/index.html')
})

app.listen(process.env.PORT || 4200);
