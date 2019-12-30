var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assetSchema = new Schema(
    {
        assetId: {type: String, required: true, unique: true},
        user_id : { type : Schema.Types.ObjectId, ref: 'User', required : true},
        make : { type : String,required : true},
        invoices: [
            {   
                retailer : { type : String,required : true},
                date : {type : String},
                price : {type : Number},
                ocr_status : {type : Boolean, default : false},
                blockchain_status : {type : Boolean,default : false},
                multihash : {type : String},
                blockHash : {type : String},
                blockNumber : { type : String},
                contractAddress : { type : String},
                gasUsed : { type : String},
                txhash : {type: String, unique: true, sparse: true},
                invoiceType: {type: String, enum: ['INV', 'SRV', 'INS','WRT']}
            }
        ]
    }
)

module.exports = mongoose.model('Asset', assetSchema);
