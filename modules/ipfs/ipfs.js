var ipfsClient = require('ipfs-http-client');
var ipfs = ipfsClient('/ip4/127.0.0.1/tcp/5001');

function ipfsUpload(data, callback) {
    let content = ipfs.types.Buffer.from(data)
    ipfs.add(content, (err, res) => {
        if (err) {
            console.log(err);
            var data = {
                status: "error",
                message: " INTERNAL ERROR : Please refresh and try again"
            }
            callback(data);
        }
        else {
            console.log(res)
            callback(res);
        }   
    })

}


exports.ipfsUpload = ipfsUpload;