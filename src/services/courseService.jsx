import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/courses';
const API_URL = 'https://onlineelearnignbacend-1.onrender.com/api/users';

// Create a new course
export const createCourse = async (courseData, token) => {
  try {
    const response = await axios.post(API_URL, courseData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create course');
  }
};

// Fetch all courses
export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response, "res");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch courses');
  }
};

export const getCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch course details");
  }
};
// export const getCourseById = async (id) => {
//   const response = await fetch(`http://localhost:5000/api/courses/${id}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch course details");
//   }
//   return await response.json();
// };


 
export const updateCourse = async (courseId, updatedData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${courseId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Ensure proper content type
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update course");
  }
};

export const deleteCourse = async (courseId, token) => { 
  try {
    const response = await axios.delete(`${API_URL}/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete course");
  }
};
