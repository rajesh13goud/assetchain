var mongoose = require('mongoose');
var msg91 = require('msg91')("261403AIT8xYM25c595858", "ACHAIN", "4");
var users = require("../../models/users.js")

function validateEmailAvailability(email, mobile, callback) {
  users.findOne({ $or: [{ email: email }, { mobile: mobile }] }, (err, result) => {
    if (err) {
      console.log("Db error or user not found" + err);
      return;
    }
    console.log(result);
    callback(result);
  })
}

function sendOTP(mobile) {
  console.log("its here bro")
  var otp = generateOTP(4);
  msg91.send(mobile, otp, function (err, response) {
    users.updateOne({ mobile: mobile }, { otp: otp }, (err, raw) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(raw);

    })
  }
  );
}

function generateOTP(digits) {
  var numbers = '0123456789'
  let OTP = ''
  for (let i = 0; i < digits; i++) {
    OTP += numbers[Math.floor(Math.random() * 10)];
  }
  return OTP
}

function validateOTP(otp, user, callback) {
  users.findOne({ email: user.email }).then((result) => {
    console.log("This the save otp" + result.otp)
    console.log(otp)
    if (result.otp == otp) {
      callback(true);
    } else {
      callback(false);
    }
  })
}

exports.validateEmailAvailability = validateEmailAvailability;
exports.sendOTP = sendOTP;
exports.validateOTP = validateOTP;