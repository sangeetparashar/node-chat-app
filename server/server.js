const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
var app = express();

var publicPath = path.join(__dirname, '../public');



app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index.html');
});


app.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
});

