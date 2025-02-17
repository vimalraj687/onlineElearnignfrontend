import React, { useState } from 'react';
import { registerUser } from '../services/userService';
import { motion } from 'framer-motion';
import { IoIosArrowRoundForward } from 'react-icons/io';
import loginImage from "../assets/login.webp";
import { useNavigate } from 'react-router-dom';

const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        duration: 0.6,
        delay: delay,
        ease: 'easeInOut',
      },
    },
  };
};

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setError('');
      await registerUser(name, email, password); 
      navigate('/signin');  
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error('Signup failed:', err);
    }
  };

  const handleLoginClick = () => {
    navigate('/signin'); // Navigate to login page
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Left Side (Image) */}
      <div className="flex justify-center items-center bg-light h-full">
        <motion.img
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeInOut' }}
          src={loginImage}
          alt="Login Illustration"
          className="max-w-[500px] w-full object-cover rounded-xl shadow-xl"
        />
      </div>

      {/* Right Side (Form) */}
      <motion.div
        className="flex justify-center items-center bg-light p-8 h-full"
        variants={FadeUp(0.2)}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-[500px]"
          variants={FadeUp(0.4)}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={FadeUp(0.4)}
            initial="initial"
            animate="animate"
            className="text-3xl font-bold text-center mb-8 text-primary"
          >
            Create Your Account
          </motion.h1>

          {/* Name Input */}
          <motion.input
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Email Input */}
          <motion.input
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Password Input */}
          <motion.input
            variants={FadeUp(0.8)}
            initial="initial"
            animate="animate"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Error Message */}
          {error && (
            <motion.p
              variants={FadeUp(1.2)}
              initial="initial"
              animate="animate"
              className="text-red-500 text-sm text-center mb-4"
            >
              {error}
            </motion.p>
          )}

          {/* Signup Button */}
          <motion.button
            variants={FadeUp(1)}
            initial="initial"
            animate="animate"
            onClick={handleSignup}
            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition duration-300"
          >
            Signup <IoIosArrowRoundForward className="inline ml-2" />
          </motion.button>

          {/* Login Link */}
          <div className="flex justify-center mt-6">
            <motion.button
              variants={FadeUp(1.4)}
              initial="initial"
              animate="animate"
              className="text-primary font-medium"
              onClick={handleLoginClick} // Redirect to login page
            >
              Already have an account?{' '}
              <span className="text-secondary underline cursor-pointer">
                Login
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
