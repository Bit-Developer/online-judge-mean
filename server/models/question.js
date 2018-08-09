var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  uniquename: { type: String, required: true, unique: true, max: 100 }, // auto generated based on title
  sequence: { type: Number, required: true },
  title: { type: String, required: true, max: 50 },
  description: { type: String, required: true },
  mainfunction: { type: String },
  jsmain: { type: String },
  pythonmain: { type: String },
  solution: { type: String },
  difficulty: { type: Number, enum: [10, 20, 30], default: 10 }, // 10: easy, 20: medium, 30: hard
  frequency: { type: Number, required: true },
  rating: { type: Number, required: true },
  hints: { type: String }
});

// Export the model
module.exports = mongoose.model("Question", QuestionSchema);
