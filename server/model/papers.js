var mongoose = require('./../db');
var Schema = mongoose.Schema;
var PapersSchema = new Schema({
	teacher: String,
	name: String,
    totalPoints: Number,
    time: String,
    startTime: Date,
    endTime: Date,
    examnum: Number
})
module.exports = mongoose.model('Paper', PapersSchema);

