var request = require('request');
var wordSearch = require('./wordSearch.js')
var url = "https://api.ocr.space/parse/image";
function ocrCall(hashURL, callback) {
  console.log("yo man")
  console.log(hashURL)
  var formData = {
    apikey: "046b85867d88957",
    language: "eng",
    isOverlayRequired: "true",
    url: hashURL
  }
  console.log(formData);
  request.post({ url, formData: formData }, function optionalCallback(err, httpResponse, body) {
    console.log("its here also")
    if (err) {
      return console.error('upload failed:', err);
    }
    let res = JSON.parse(body)
    // console.log(res);
    console.log("The string response is:" + body);
    console.log("The response is :" + res.OCRExitCode);
    if (res.OCRExitCode == 3) {
      var response = {
        status: "error",
        message: "Internal Error : Please refersh and try again"
      }
      return callback(response);
    } else {
      //console.log('Upload successful!  Server responded with:',res.ParsedResults[0].TextOverlay.Lines[0].Words[0].WordText);
      wordSearch.wordSearch(res, (result) => {
        callback(result);
        console.log(result);
      });
    }
  })
}

//ocrCall("https://gateway.ipfs.io/ipfs/QmcmmK5LBydkCHtLgusti8uPjXtB5a6treHZbiok37WXLs")

exports.ocrCall = ocrCall;
