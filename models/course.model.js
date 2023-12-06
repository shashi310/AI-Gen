const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    job_title:String,
    description: String,
    location: String,
    experience: Number,
    company_name: String,
    role_category:String,
    status:Boolean,
    required_skills: String,
    salary: Number,
    hr_Email: String,
    applications:Array,
  },
  { versionKey: false }
);

const courseModel = mongoose.model("job", courseSchema);

module.exports = {
  courseModel,
};