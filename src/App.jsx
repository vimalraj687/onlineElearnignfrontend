import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import CoursesPage from "./pages/CoursesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import OurTeam from "./pages/OurTeam";
// import CourseDetailPage from "./pages/CourseDetailPage";
import CreateCourse from "./components/CreateCourse";
import CourseDetailPage from "./pages/CourseDetailPage";
 
 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="signin" element={<LoginPage />} />
      <Route path="signUp" element={<SignupPage />} />
      <Route path="profile" element={<ProfilePage/>} />
      <Route path="/courses" element={<CoursesPage />} />  
     <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/createCourse" element={<CreateCourse />} />
      <Route path="/team" element={<OurTeam />} /> 
      <Route path="/courses/:id" element={<CourseDetailPage />} />
    </Routes>
  );
};

export default App;
