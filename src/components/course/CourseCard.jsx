import React from "react";
import { motion } from "framer-motion";

const CourseCard = ({ title, description, price, image }) => {
  return (
    <motion.div 
      className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      {/* Course Image Section */}

      <div className="relative">
        
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 text-xs rounded-full">
          DATA ANALYTICS
        </div>
      </div>

      {/* Course Info Section */}
      <div className="p-5">
        <h2 className="text-xl font-semibold">{title}</h2>

        {/* Truncated Description */}
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {description}
        </p>

        <p className="text-lg font-bold text-gray-800 mt-3">₹ {price}</p>

        {/* Buttons Section */}
        <div className="flex gap-3 mt-5">
          <button className="border border-primary text-primary px-4 py-2 rounded-lg flex-1 hover:bg-primary hover:text-white transition-all">
            Explore
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex-1 hover:bg-primary-dark transition-all">
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
