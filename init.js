var express = require('express');
var path = require('path');
var app = express();

var fs = require("fs");

var particleDir = fs.readdirSync("res/particle");
var validList = [];

for(var i = 0;i<particleDir.length;i++){

    particleDir[i] = "res/particle/" + particleDir[i];
    if(particleDir[i].substring(particleDir[i].length-3) != "ccb" && particleDir[i].substring(particleDir[i].length-3) != "tga") {
        validList.push(particleDir[i]);
    }
}


console.log(validList);


app.use('/', express.static(path.join(__dirname, '')));
app.use('/res', express.static(path.join(__dirname, 'res')));
app.use('/particle', express.static(path.join(__dirname, 'res/particle')));

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port %s', server.address().port);
});
