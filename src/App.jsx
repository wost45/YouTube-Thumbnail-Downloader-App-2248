import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import UrlInput from './components/UrlInput';
import ThumbnailDisplay from './components/ThumbnailDisplay';
import AdBanner from './components/AdBanner';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailData, setThumbnailData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const extractVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleUrlSubmit = async (url) => {
    setIsLoading(true);
    setError('');
    setThumbnailData(null);

    try {
      const videoId = extractVideoId(url);
      
      if (!videoId) {
        throw new Error('URL do YouTube inválida. Por favor, verifique o link.');
      }

      // Generate thumbnail URLs for different qualities
      const thumbnails = {
        maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        hd: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        default: `https://img.youtube.com/vi/${videoId}/default.jpg`
      };

      setThumbnailData({
        videoId,
        thumbnails,
        originalUrl: url
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Baixar Thumbnail do YouTube
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Baixe thumbnails do YouTube em alta qualidade gratuitamente
            </motion.p>
          </div>

          <div className="flex justify-end mb-6">
            <ThemeToggle />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <UrlInput 
              onSubmit={handleUrlSubmit}
              isLoading={isLoading}
              error={error}
            />
          </motion.div>

          {thumbnailData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ThumbnailDisplay thumbnailData={thumbnailData} />
            </motion.div>
          )}

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Como usar o Thumb Downloader
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">1. Cole a URL</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Copie e cole o link do vídeo do YouTube no campo acima
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">2. Visualize</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Veja a miniatura do vídeo em diferentes qualidades
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">3. Baixe</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Escolha a qualidade desejada e faça o download
                </p>
              </div>
            </div>
          </motion.div>
        </main>

        <AdBanner />
      </div>
    </ThemeProvider>
  );
}

export default App;