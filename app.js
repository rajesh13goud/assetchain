const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
var path = require('path')
var multer = require('multer');
var upload = multer();
const cookieParser = require('cookie-parser');
var ExifImage = require('exif').ExifImage;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var uuidv4 = require('uuid/v4');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
//app.use('/public', express.static(path.join(process.env.PWD, './assets')));
app.set('view engine', 'html');
app.use(cookieParser());
require('./modules/signup/passport');
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session())
app.use(expressValidator());
app.use(express.static(__dirname + '/assets'));
var auth = require('./modules/signup/auth.js')
var ipfs = require('./modules/ipfs/ipfs.js')
var ocr = require('./modules/ocr/ocr.js')
var gasPrice = require('./modules/web3/gas.js')
var web3 = require('./modules/web3/web3');
var Users = require('./models/users.js');
var Assets = require('./models/assets.js');
var form1 = require('./solidity/test/form');
mongoose.connect("mongodb://har_hept:Mlab_95@ds163054.mlab.com:63054/assetzchain", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

var https = require('https');
var fs = require('fs');
var options = {
    ca: fs.readFileSync('./certs/alpha_assetzchain_com.ca-bundle'),
    key: fs.readFileSync('./certs/alpha_assetzchain_com.key'),
    cert: fs.readFileSync('./certs/alpha_assetzchain_com.crt')
}
var http = require('http');
//  var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {

//       var filename = file.originalname;
//       var fileExtension = filename.split(".")[1];
//       var name = filename.split(".")[0];

//       cb(null, name + "." + fileExtension);
//     }
//   })

//var upload = multer({ storage: storage,preservePath :true });

app.get("/", function (req, res) {
    var cookie = req.cookies;
    console.log(cookie.AssetzChain)
    jwt.verify(cookie.AssetzChain, "cipher", function (err, user) {
        if (err) {
            console.log(err.message);
        }
        if (user) {
            res.render("landing.html");
        } else {
            res.render("home.html");
        }
    })
})
app.post("/sendImage", upload.single('file'), function (req, res) {
    //    new ExifImage({image : "./uploads/sample.jpg"},function(error,exifData){
    //     if (error){
    //     console.log('Error: '+error.message);
    //     res.send(error)
    //     }
    // else{
    //     console.log(exifData.image.Model); 
    //     console.log(exifData.image.ModifyDate);
    //     res.send("File uploaded Successfully")
    // }
    //    })

    console.log(req.files);

})

app.get("/login", function (req, res) {
    res.render("login.html")
})


app.post("/login", function (req, res) {
    console.log(req.body);
    console.log("this is here atlease")
    passport.authenticate('local', { session: false, successRedirect: '/', failureRedirect: '/' }, (err, user, info) => {
        console.log("yes1")
        console.log("the authenticate user: " + user)
        if (err || !user) {
            return res.status(400).json({
                status: 'error',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            console.log("the login user: " + user);
            if (err) {
                let response = {
                    status: "error",
                    message: "Inavid email password"
                }
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user.toJSON(), 'cipher', { expiresIn: "60 days" });
            res.cookie('AssetzChain', token, { maxAge: 900000000 })
            //return res.json({user, token});
            res.render("landing.html")
        });
    })(req, res);
})

app.get("/registration", function (req, res) {
    res.render("auth.html")
})

app.post("/registration", function (req, response) {

    var { email, mobile, pass, cpass } = req.body;
    req.check('email', "Invalid Email Address").isEmail();
    req.check('mobile', "Invalid Mobile Number").isNumeric().isLength(10);
    req.check('pass', "Passwords dont match").equals(cpass);

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors)
        response.send(errors);
        response.end();
    } else {
        auth.validateEmailAvailability(email, mobile, (valid) => {
            console.log("please work")
            console.log(valid !== null);
            if (valid !== null) {
                response.send({ msg: "Email/Mobile Number already exists" });
            } else {
                var sch = new Users({
                    user_id: uuidv4(),
                    password: pass,
                    email: email,
                    mobile: mobile,
                })
                sch.save(function (err, res) {
                    if (err) {
                        console.log(err)
                        response.send(err)
                    }
                    else {
                        console.log(res)
                        var user = {
                            email: email,
                            mobile: mobile
                        }
                        auth.sendOTP(mobile);
                        const token = jwt.sign(user, 'cipher', { expiresIn: "60 days" });
                        response.cookie('AssetzChain', token, { expires: new Date(Date.now() + 1000 * 900000) })
                        response.send(
                            { msg: "success" })
                    }
                })
            }
        })
    }
})

app.get('/home', function (req, res) {
    res.render("landing.html")
})

app.get('/otp', function (req, res) {
    res.render("otp.html");
})

app.post('/image', upload.any(), function (req, res) {
    var cookie = req.cookies;
    var user;
    console.log(cookie.AssetzChain)
    jwt.verify(cookie.AssetzChain, "cipher", function (err, use) {
        if (err) {
            console.log(err.message);
            res.render('auth.html');
        }
        else if (use) {
            user = use;
            console.log(use);
        }
    })
    var ipfsURL = "https://gateway.ipfs.io/ipfs/"
    console.log("it is here atleast");
    if (req.files == null || req.files == 'undefined') {
        response = {
            status: "error",
            message: "The file was not uploaded properly"
        }
        return res.json(response);
    }
    console.log(req.files);
    ipfs.ipfsUpload(req.files[0].buffer, (result) => {
        if (result.status == "error") { return res.send(result); }
        //console.log(result[0].hash);
        var multihash = result[0].hash;
        ocr.ocrCall(ipfsURL + result[0].hash, (result) => {

            if (result.status == "error") {
                return res.send(result);
            }
            var asset = new Assets(
                {
                    assetId: uuidv4(),
                    user_id: user._id,
                    make: result.make
                }
            )
            let invoice = {
                invoiceId: uuidv4(),
                retailer: result.retailer,
                date: result.date,
                price: result.amount,
                multihash: multihash,
                invoiceType: 'INV'
            }
            var invId;
            asset.invoices.push(invoice)
            console.log('asset in user',asset);
            asset.save(function (err, asset) {
                if (err) {
                    console.log(err)
                    let response = {
                        status: 'error'
                    }
                    return res.json(response);
                }
                console.log("Asset saved");
                loop:
                for (let i = 0; i < asset.invoices.length; i++) {
                    if (asset.invoices[i].ocr_status == false) {
                        invId = asset.invoices[i]._id;
                        console.log(invId);
                        break loop;
                    }
                }
                Users.findById(user._id, (err, user) => {
                    if (err) {
                        let response = {
                            status: 'error',
                            message: err
                        }
                        return res.json(response);
                    }
                    user.assets.push(asset._id);
                    user.save((err, result) => {
                        if (err) {
                            let response = {
                                status: 'error'
                            }
                            return res.json(response);
                        }
                        let response = {
                            status: 'Success',
                            asset: asset,
                            invoiceId: invId
                        }
                        console.log("This is the response : " + JSON.stringify(response))
                        res.json(response);
                    })
                })
            })
        });


    })
})

app.post('/validateTP', function (req, res) {
    var cookie = req.cookies;
    console.log(cookie.AssetzChain)
    jwt.verify(cookie.AssetzChain, "cipher", function (err, user) {
        if (err) {
            res.send(err);
        }
        auth.validateOTP(req.body.otp, user, (result) => {
            console.log("i am here yo")
            if (result) {
                console.log("yes");
                res.send("success");
            } else {
                res.send("Invalid OTP");
            }
        })
    })
})


app.get('/ocr/:assetId/:invoiceId', function (req, res) {
    res.render('ocr.html');
})

app.get('/ocrResults/:assetId/:invoiceId', function (req, res) {
    console.log("fetching data");
    Assets.findById(req.params.assetId, (err, asset) => {
        if (err || !asset) {
            console.log(err);
            let response = {
                status: 'Failed',
            }
            return res.json(response);
        }
        console.log("its inside :" + asset);
        var inv;
        loop:
        for (let i = 0; i < asset.invoices.length; i++) {
            if (asset.invoices[i].ocr_status == false) {
                inv = asset.invoices[i];
                console.log(inv);
                asset.invoices[i].ocr_status = true;
                asset.save();
                break loop;
            }
        }
        let response = {
            status: 'Success',
            asset: asset,
            invoice: inv
        }
        console.log(response);
        return res.json(response)
    })
})

// app.get('/ocrResults',function(req,res){
//     let cookie = req.cookies;
//     jwt.verify(cookie.AssetzChain,"cipher",function(err,user){
//         if(err){
//             res.send(err);
//         }
//     else{
//         console.log("The search is : "+user.mobile)
//         Assets.findOne({mobile:user.mobile}),(err,result)=>{
//             console.log(result)
//             var inv;
//             loop:
//             for(let i =0;i<result.invoices.length;i++){
//                 if(result.invoices[i].ocr_status == false){
//                     inv = result.invoices[i];
//                     result.invoices[i].ocr_status = true;
//                     Assets.updateOne({mobile:user.mobile},{
//                         "invoices."
//                     })
//                     break loop;
//                 }
//             }
//             Assets.updateOne({mobile:user.mobile},{
//                 "invoices.ocr_status" : true
//            })
//             res.send(inv);

//         })
//     }})  

//     }
// )


app.get("/transaction/:assetId/:invoiceId", (req, res) => {
    console.log("yeah its here");
    res.render('transaction.html');
})

app.get("/ethResult/:assetId/:invoiceId", (req, res) => {
    var assetId = req.params.assetId;
    var invoiceId = req.params.invoiceId;
    var result = {};
    Assets.findById(assetId, (err, asset) => {
        if (err) {
            return res.json(err.errmsg);
        }
        loop:
        for (let i = 0; i < asset.invoices.length; i++) {
            if (asset.invoices[i]._id == invoiceId) {
                console.log("The invoice is : " + asset.invoices[i]);
                inv = asset.invoices[i];
                result.date = asset.invoices[i].date;
                result.blockHash = asset.invoices[i].blockHash;
                result.blockNumber = asset.invoices[i].blockNumber;
                result.transactionHash = asset.invoices[i].txhash;
                result.contract = asset.invoices[i].contractAddress;
                result.gasUsed = asset.invoices[i].gasUsed;
                asset.invoices[i].blockchain_status = true;
                console.log(inv);
                asset.save();
                break loop;
            }
        }
        return res.json(result);
    })
    console.log("the result being sent is :" + result)
})

app.get("/save/:assetId/:invoiceId", function (req, res) {
    res.render('save.html')
})


app.post("/save/:assetId/:invoiceId", function (req, res) {
    console.log(req.params.assetId);
    console.log("the inv id is :" + req.params.invoiceId)
    res.redirect('/transaction/' + req.params.assetId + '/' + req.params.invoiceId);
})

// app.get("/saveit/:assetId/:invoiceId",function(req,res){
//     res.send('')
// })

app.get("/gas", (req, res) => {

    gasPrice.getGasPrice((result) => {
        let obj = {
            message: result.gasPrice,
            txCost: result.txFee
        }
        console.log(obj);
        res.send(obj);
    });
});

app.get("/addBlockchain/:assetId/:invoiceId", (req, res) => {
    let cookie = req.cookies;
    var assetId = req.params.assetId;
    var invoiceId = req.params.invoiceId;
    // jwt.verify(cookie.AssetzChain, "cipher", function (err, user) {
    //     if (err) {
    //         res.send(err);
    //     }
    //     else {
            //console.log("The search is : "+user.mobile)
            Assets.findById(assetId, (err, asset) => {
                if (err || asset == null) {
                    console.log(err);
                    return res.JSON(err);
                }
                console.log(asset)
                var make = asset.make;
                var userid = asset.user_id;
                var inv;
                //res.send(result.invoice);
                loop:
                for (let i = 0; i < asset.invoices.length; i++) {
                    if (asset.invoices[i]._id == invoiceId) {
                        inv = asset.invoices[i];
                        console.log(inv);
                        //asset.invoices[i].blockchain_status = true;
                        asset.save();
                        break loop;
                    }
                }
                data = {
                    user_id: (JSON.stringify(asset.user_id)).replace(/"/g, ''),
                    asset_id: (JSON.stringify(asset._id)).replace(/"/g, ''),
                    date: inv.date,
                    act: "buy",
                    price: inv.price,
                    desc: "phone"
                }

                console.log("The data getting into the blockchain : " + JSON.stringify(data))

                web3.setDataBC(data, (result) => {
                    if (result == err) {
                        var data = {
                            status: "error",
                            message: "Couldn't add to blockchain"
                        }
                        return res.JSON(data);
                    }
                    console.log("We need to print this :" + result);
                    Assets.findById(assetId, (err, asset) => {
                        if (err) {
                            return res.JSON(err.errmsg);
                        }
                        loop:
                        for (let i = 0; i < asset.invoices.length; i++) {
                            if (asset.invoices[i]._id == invoiceId) {
                                inv = asset.invoices[i];
                                asset.invoices[i].blockHash = result.blockHash;
                                asset.invoices[i].blockNumber = result.blockNumber;
                                asset.invoices[i].txhash = result.transactionHash;
                                asset.invoices[i].contractAddress = result.contract;
                                asset.invoices[i].gasUsed = result.gasUsed;
                                //asset.invoices[i].blockchain_status = true;
                                //console.log(inv);
                                asset.save();
                                break loop;
                            }
                        }

                    })
                    res.send(result);
                })
            })
        }
    // })

// }
)

app.get('/mobileAssets', function (req, res) {
    res.render('displayAssets.html');
})

app.get('/displayAssets', function (req, res) {
    console.log("we are here")
    let cookie = req.cookies;
    jwt.verify(cookie.AssetzChain, "cipher", function (err, user) {
        console.log("the error is :" + err);
        console.log(user);
        Users.findById(user._id, { password: false, otp: false })
            .populate({ path: 'assets', model: 'Asset' })
            .exec(function (err, user) {
                if (err || !user) {
                    let response = {
                        status: 'Failed'
                    }
                    return res.json(response);
                }
                console.log(user);

                let response = {
                    user: user,
                    status: 'Success'
                }
                return res.json(response);
            })
    })
})

app.get('/singleAsset/:asset_id', (req, res) => {
    console.log(req.params.asset_id);
    res.render('singleAsset');
   

})
app.get('/buyProp/:assetid', (req, res) =>{
    let assetid = 'f023d2ea-3a47-46b7-b9d8-5b8a6d51b647'

    form1.postdb1(assetid,(result)=>{
        let obj = {
            blockhash: result.blockHash,
            blocknumber: result.blockNumber,
            contract: result.contract,
            gasused: result.gasUsed,
            trxused: result.trxUsed
        }
        res.send(obj);
        console.log(obj);
        res.render('purchase.html')
})
//exports.widgets = functions.https.onRequest(app);
app.post('/sell', (req, res) =>{
    let cookie = req.cookies;
    res.status(400).json('incorrect')
})

app.listen(9000);
})
// app.set('port', 9006);
// var server = https.createServer(options, app)
// var httpPort = 9007;
// var httpApp = express();
// var httpRouter = express.Router();
// httpApp.use('*', httpRouter);
// httpRouter.get('*', function (req, res) {
//     var host = req.get('Host');
//     host = host.replace(/:\d+$/, ":" + app.get('port'));
//     var destination = ['https://', host, req.url].join('');
//     return res.redirect(destination);
// })

// var httpServer = http.createServer(httpApp);
// httpServer.listen(httpPort);

// server.listen(9006,function(){
//     console.log("Started at port 9006");
// });
// server.on('error',onError);
// server.on('listening',onListening);