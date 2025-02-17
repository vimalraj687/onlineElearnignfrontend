import React, { useState, useContext } from 'react';
import { loginUser } from '../services/userService';
import { AuthContext } from '../context/AuthContext';
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

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // This function prevents the form from refreshing the page on submit
  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent page refresh
    try {
      setError('');
      const response = await loginUser(email, password);
      setAuth(response.data.token, { email });
      navigate('/profile'); 
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleSignUpClick = () => {
     navigate('/signup');
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Left Side (Form) */}
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
            Welcome Back!
          </motion.h1>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
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

            {/* Login Button */}
            <motion.button
              variants={FadeUp(1)}
              initial="initial"
              animate="animate"
              type="submit"  // Use type="submit" to trigger form submission
              className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition duration-300"
            >
              Login <IoIosArrowRoundForward className="inline ml-2" />
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <div className="flex justify-center mt-6">
            <motion.button
              variants={FadeUp(1.4)}
              initial="initial"
              animate="animate"
              className="text-primary font-medium"
              onClick={handleSignUpClick} 
            >
              Don't have an account?{' '}
              <span className="text-secondary underline cursor-pointer">
                Sign Up
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
