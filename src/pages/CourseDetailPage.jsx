import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseById } from "../services/courseService";
import { motion } from "framer-motion";

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      if (!id) {
        console.error("Course ID is undefined");
        return;
      }

      const data = await getCourseById(id);
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <motion.div
      className="container mx-auto py-10 px-5 md:px-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Course Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.img
          src={`http://localhost:5000/${course.image}`}
          alt={course.title}
          className="w-full h-72 object-cover rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        <div>
          <motion.h1
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {course.title}
          </motion.h1>
          <motion.p
            className="text-gray-600 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {course.description}
          </motion.p>
          <motion.p
            className="text-2xl font-semibold text-blue-600 mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            ₹ {course.price}
          </motion.p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <motion.button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Enroll Now
            </motion.button>
            {/* <motion.button
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Explore More
            </motion.button> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetailPage;
