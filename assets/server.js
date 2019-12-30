var https = require('https');
var express = require('express');
var app = require('./app')

//app.set('port',9006);
var fs = require('fs');
var options = {
    ca: fs.readFileSync('./certs/alpha_assetzchain_com.ca-bundle'),
    key : fs.readFileSync('./certs/alpha_assetzchain_com.key'),
    cert : fs.readFileSync('./certs/alpha_assetzchain_com.crt')
}
var server = https.createServer(options,app)
var httpPort = 9007;
var httpApp = express();
var httpRouter = express.Router();
httpApp.use('*',httpRouter);
httpRouter.get('*',function(req,res){
    var host = req.get('Host');
    host = host.replace(/:\d+$/,":"+app.get('port'));
    var destination = ['https://',host,req.url].join('');
    return res.redirect(destination);
})

var httpServer = http.createServer(httpApp);
httpServer.listen(httpPort);

server.listen(9006);