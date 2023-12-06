const express = require("express");
const { courseModel } = require("../models/course.model");
const { auth } = require("../Middleware/Authorization.middleware");
const { BlacklistAuth } = require("../Middleware/BlacklistAuth.middleware");

const courseRouter = express.Router();

courseRouter.use(auth);
courseRouter.use(BlacklistAuth)

courseRouter.post("/add", async (req, res) => {
  try {

    // if (req.body.role == "admin") {
      
        const post = new courseModel(req.body);
        await post.save();
        res.status(200).send({ msg: "Course Sucessfully Added" });
       
    // }else{
    //   res.status(400).send({ error:"you are not authorized!!" });
    // }
   
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

courseRouter.get("/", async (req, res) => {


  try {
    const post = await courseModel.find();
    res.status(200).send({ msg: "All Courses", Courses: post });
  } catch (err) {
    res.status(400).send(err);
  }
});

courseRouter.patch("/update/:courseId", async (req, res) => {
  try {
    // if (req.body.role == "admin") {
      const { courseId } = req.params;
    
    const post = await courseModel.findByIdAndUpdate(
      {_id: courseId },
      req.body
    );
    if (!post) {
      res.status(400).send({ error: "Course Not Found" });
    } else {
      res.status(200).send({ msg: "Course updated Successfull" });
    }
    // }else{
    //   res.status(400).send({ error:"you are not authorized!!" });
    // }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

courseRouter.delete("/delete/:courseId", async (req, res) => {
  try {
    // if (req.body.role == "admin") {
      const { courseId } = req.params;
    
    const post = await courseModel.findByIdAndDelete({_id: courseId });
    if (!post) {
      res.status(400).send({ error: "Course Not Found" });
    } else {
      res.status(200).send({ msg: "Course Deleted Successfull" });
    }
    // }else{
    //   res.status(400).send({ error:"you are not authorized!!" });
    // }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});



// courseRouter.post("/addCourse/:courseId", async (req, res) => {
//   try {
//     // const { userID } = req.body;
//     // const { courseId } = req.params;
//     const {courseId} = req.params;
//     const { userID } =  req.body;

//     // Check if the course is already present for the user
//     const user = await UserModel.findOne({ _id: userID, course: courseId });

//     if (user) {
//       return res.status(400).json({ error: "Course is already present for the user" });
//     }

//     // If course is not present, add it to the user's course array
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       userID,
//       { $push: { course: courseId } },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     return res.status(201).json({ message: "Course added", user: updatedUser });
//   } catch (err) {
//     return res.status(400).json({ message: "Something Went Wrong", error: err.message });
//   }
// });
courseRouter.post("/addUser/:courseID", async (req, res) => {
  try {
    const { userID } = req.body;
    const { courseID } = req.params;

    // Check if the user is already affiliated with the course
    const course = await courseModel.findOne({ _id: courseID, applications: userID });

    if (course) {
      return res.status(400).json({ error: "User is already affiliated with the course" });
    }

    // If user is not affiliated, add user to the course's applications array
    const updatedCourse = await courseModel.findByIdAndUpdate(
      courseID,
      { $push: { applications: userID } },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(400).json({ error: "Course not found" });
    }

    return res.status(201).json({ message: "User added to course", course: updatedCourse });
  } catch (err) {
    return res.status(400).json({ message: "Something Went Wrong", error: err.message });
  }
});

module.exports = {
  courseRouter,
};
