import React from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800">Coming Soon...</h1>
        <p className="text-lg text-gray-600 mt-2">We're working hard to bring you something amazing. Stay tuned!</p>
      </motion.div>
    </div>
  );
};

export default ContactPage;
