import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createCourse, deleteCourse, getCourses, updateCourse } from "../services/courseService";

const CreateCourse = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    // courseType:"",
    price:"",
    lessons: [{ title: "", content: "", videoUrl:"",  }],
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLessonChange = (index, e) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons[index][e.target.name] = e.target.value;
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const addLesson = () => {
    setFormData({ ...formData, lessons: [...formData.lessons, { title: "", content: "" }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("instructor", formData.instructor);
    // formDataToSend.append("courseType", formData.courseType);
    formDataToSend.append("price", formData.price);

    formData.lessons.forEach((lesson, index) => {
      formDataToSend.append(`lessons[${index}][title]`, lesson.title);
      formDataToSend.append(`lessons[${index}][content]`, lesson.content);
      formDataToSend.append(`lessons[${index}][videoUrl]`, lesson.videoUrl);
    });

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    const token = localStorage.getItem("token");

    try {
      if (editingCourseId) {
        // Update course if editing
        await updateCourse(editingCourseId, formDataToSend, token);
        alert("Course Updated Successfully!");
      } else {
        // Create new course
        await createCourse(formDataToSend, token);
        alert("Course Created Successfully!");
      }
      setFormData({
        title: "",
        description: "",
        instructor: "",
        price:"",
        // courseType:"",
        lessons: [{ title: "", content: "", videoUrl:"" }],
        image: null,
      });
      setEditingCourseId(null);
      fetchCourses();
    } catch (error) {
      console.error("Error submitting course:", error.message);
      alert(error.message);
    }
  };

  const handleEdit = (course) => {
    setEditingCourseId(course._id);
    setFormData({
      title: course.title,
      description: course.description,
      // courseType: course.courseType,
      price: course.price,
      instructor: course.instructor?._id || course.instructor, // Ensure it's a string
      lessons: course.lessons,
      image: null,
    });
    setPreviewImage(null);
  };
  

  const handleDelete = async (courseId) => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
  
    if (!token) {
      alert("Unauthorized! Please log in.");
      return;
    }
  
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId, token);
        setCourses(prevCourses => prevCourses.filter(course => course._id !== courseId));
        alert("Course deleted successfully!");
      } catch (error) {
        console.error("Error deleting course:", error.message);
        alert("Failed to delete course");
      }
    }
  };
  

  console.log(courses, "sdfg");
  return (
    <div className="bg-light  pt-11">
    
    <motion.div
      className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">{editingCourseId ? "Update Course" : "Create Course"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Course Title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Course Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
        <textarea name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
         <input type="text" name="instructor" placeholder="Instructor ID" value={formData.instructor} onChange={handleChange} required className="w-full p-2 border rounded" />
        {/* <select
  name="courseType"
  value={formData.courseType}
  onChange={handleChange}
  required
  className="w-full p-2 border rounded"
>
  <option value="">Select Course Type</option>
  <option value="Web Development">Web Development</option>
  <option value="Data Science">Data Science</option>
  <option value="UI/UX">UI/UX</option>
  <option value="Machine Learning">Machine Learning</option>
</select> */}

        {formData.lessons.map((lesson, index) => (
          <div key={index} className="space-y-2">
            <input type="text" name="title" placeholder="Lesson Title" value={lesson.title} onChange={(e) => handleLessonChange(index, e)} required className="w-full p-2 border rounded" />
            <input type="url" name="videoUrl" placeholder="Lesson Url" value={lesson.videoUrl} onChange={(e) => handleLessonChange(index, e)} required className="w-full p-2 border rounded" />
            <textarea name="content" placeholder="Lesson Content" value={lesson.content} onChange={(e) => handleLessonChange(index, e)} required className="w-full p-2 border rounded"></textarea>
          </div>
        ))}
        <button type="button" onClick={addLesson} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">Add Lesson</button>

        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
        {previewImage && <img src={previewImage} alt="Preview" className="mt-2 h-24 w-24 rounded-lg" />}

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          {editingCourseId ? "Update Course" : "Create Course"}
        </button>
      </form>

      

    </motion.div>
    <div className="px-36 py-14">
  <h2 className="text-2xl font-bold mb-4">All Courses</h2>
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 p-2">Title</th>
        <th className="border border-gray-300 p-2">Description</th>
        <th className="border border-gray-300 p-2">Price</th>
        {/* <th className="border border-gray-300 p-2">Course Type</th> */}
        <th className="border border-gray-300 p-2">Actions</th>
        <th className="border border-gray-300 p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {courses.map((course) => (
        <tr key={course._id} className="text-center">
          <td className="border border-gray-300 p-2">{course.title}</td>
          <td className="border border-gray-300 p-2">{course.description}</td>
          <td className="border border-gray-300 p-2">{course.price}</td>
          {/* <td className="border border-gray-300 p-2">{course.courseType}</td> */}
          <td className="border border-gray-300 p-2">
          <img 
  src={`http://localhost:5000/${course.image.replace(/\\/g, "/")}`} 
  alt="Course" 
  className="w-20 h-20 object-cover rounded"
/>
             </td>
          <td className="border border-gray-300 p-2">
            <button onClick={() => handleEdit(course)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
              Edit
            </button>
            <button onClick={() => handleDelete(course._id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default CreateCourse;
