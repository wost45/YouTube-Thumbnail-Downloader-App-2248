import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSun, FiMoon } = FiIcons;

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <SafeIcon 
        icon={isDark ? FiSun : FiMoon} 
        className="text-orange-500" 
      />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {isDark ? 'Modo Claro' : 'Modo Escuro'}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;