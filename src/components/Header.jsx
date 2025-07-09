import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDownload } = FiIcons;

const Header = () => {
  return (
    <motion.header 
      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <SafeIcon icon={FiDownload} className="text-2xl mr-3" />
          <h1 className="text-2xl font-bold">Thumb Downloader</h1>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;