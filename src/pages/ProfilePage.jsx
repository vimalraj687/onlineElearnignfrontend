import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse user data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 text-center">
        <h2 className="text-2xl font-semibold">No Profile Found</h2>
        <p className="text-gray-600 mt-2">Please log in to view your profile.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Enrolled Courses</h3>
        {user.enrolledCourses?.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {user.enrolledCourses.map((course) => (
              <li
                key={course.id}
                className="p-3 bg-gray-100 rounded-lg flex justify-between items-center"
              >
                <span className="font-medium">{course.title}</span>
                <span className="text-sm text-gray-600">{course.progress} Completed</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">You haven't enrolled in any courses yet.</p>
        )}
      </div>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
