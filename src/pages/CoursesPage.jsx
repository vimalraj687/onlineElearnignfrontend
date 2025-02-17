import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; 
import CourseCard from "../components/course/CourseCard";
import { getCourses } from "../services/courseService";
import { Link } from "react-router-dom";

// const courses = [
//   { id: 1, title: "React Basics", description: "Learn the fundamentals of React. Learn the fundamentals of React. Learn the fundamentals of React.", price: "15,000", image: "https://s3.ap-south-1.amazonaws.com/cdn.pwskills.com/assets/uploads/course-thumbnail/3541e64a-d774-48b0-81d4-b6d9a7d179a0.png" },
//   { id: 2, title: "Next.js Mastery", description: "Build powerful web apps with Next.js. Learn the fundamentals of React.", price: "18,500", image: "https://s3.ap-south-1.amazonaws.com/cdn.pwskills.com/assets/uploads/course-thumbnail/be80ac56-20f0-4383-8741-fc290723389d.png" },
//   { id: 3, title: "JavaScript Essentials", description: "Master core JavaScript concepts. Learn the fundamentals of React.", price: "12,000", image: "https://s3.ap-south-1.amazonaws.com/cdn.pwskills.com/assets/uploads/course-thumbnail/6997f478-01b3-44d8-bf9a-a7574312fe64.jpeg" },
//   { id: 4, title: "Tailwind CSS Pro", description: "Create modern, responsive UIs. Learn the fundamentals of React.", price: "10,000", image: "https://s3.ap-south-1.amazonaws.com/cdn.pwskills.com/assets/uploads/course-thumbnail/d56ff818-62d9-4b70-b660-c378d366c80c.jpeg" },
// ];

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
   useEffect(() => {
      fetchCourses();
    }, []);
   const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    console.log(courses);
  return (

    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Our Courses</h1>

      {/* Grid Layout */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {courses.map((course) => (
  <motion.div 
    key={course.id}
    className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
    whileHover={{ scale: 1.05 }}
  >
    <div className="relative">
      <img 
        // src={`http://localhost:5000/${course.image.replace(/\\/g, "/")}`} 
        src={`https://onlineelearnignbacend-1.onrender.com${course.image.replace(/\\/g, "/")}`} 
        alt="Course" 
        className="w-full h-40 object-cover"
      />
      <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 text-xs rounded-full">
        Free
      </div>
    </div>

    <div className="p-5">
      <h2 className="text-xl font-semibold">{course.title}</h2>
      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{course?.description}</p>
      <p className="text-lg font-bold text-gray-800 mt-3">₹ {course?.price}</p>

      {/* Explore Button */}
      <div className="flex gap-3 mt-5">
        <Link to={`/courses/${course._id}`} className="border border-primary text-primary px-4 py-2 rounded-lg flex-1 hover:bg-primary hover:text-white transition-all text-center">
          Explore
        </Link>
      </div>
    </div>
  </motion.div>
))}
      </motion.div>
    </div>
  );
};

export default CoursesPage;
