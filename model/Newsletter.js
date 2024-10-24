const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: { type: String , required: true },
}, { timestamps: true });

mongoose.models = {}

export default mongoose.model('NewsLetter', newsletterSchema);
