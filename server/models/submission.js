var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  questionname: { type: String, required: true, max: 100 },
  solution: { type: String, required: true },
  language: {
    type: String,
    enum: ["java", "c", "c++", "javascript", "python"],
    default: "javascript"
  },
  status: {
    type: String,
    enum: ["initial", "pass", "fail"],
    default: "initial"
  },
  timeupdated: { type: Date, default: Date.now },
  timesubmitted: { type: Date },
  runtime: { type: Number, default: 0 }
});

// Export the model
module.exports = mongoose.model("Submission", SubmissionSchema);
