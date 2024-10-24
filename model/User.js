const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: {type: String},
  image : {type: String},
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer' 
  },
  gender: { type: String },
  active: { type: Boolean, default: true }, 
  cardDetail: { type: Boolean, default: false }, 
  DOB : {type : Date}

},{ timestamps: true});

mongoose.models = {}

export default mongoose.model('users', userSchema);




