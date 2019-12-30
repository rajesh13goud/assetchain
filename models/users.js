var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema(
    {
        user_id: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        mobile: {type: String, unique: true, required: true},
        otp: {type: String},
        assets: [{type: Schema.Types.ObjectId, ref: 'Asset'}]
    }
)

UserSchema.methods.validOtp = function(otp) {
    return otp === this.otp;
}

module.exports = mongoose.model('User', UserSchema);
