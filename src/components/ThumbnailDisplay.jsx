import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDownload, FiImage, FiCheck } = FiIcons;

const ThumbnailDisplay = ({ thumbnailData }) => {
  const [selectedQuality, setSelectedQuality] = useState('maxres');
  const [downloadStatus, setDownloadStatus] = useState({});

  const qualities = [
    { key: 'maxres', label: 'Máxima Resolução', description: '1280x720' },
    { key: 'hd', label: 'Alta Qualidade (HD)', description: '480x360' },
    { key: 'sd', label: 'Qualidade Padrão (SD)', description: '640x480' },
    { key: 'medium', label: 'Média Qualidade', description: '320x180' }
  ];

  const handleDownload = async (quality) => {
    setDownloadStatus(prev => ({ ...prev, [quality]: 'downloading' }));
    
    try {
      const response = await fetch(thumbnailData.thumbnails[quality]);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `youtube-thumbnail-${thumbnailData.videoId}-${quality}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setDownloadStatus(prev => ({ ...prev, [quality]: 'success' }));
      setTimeout(() => {
        setDownloadStatus(prev => ({ ...prev, [quality]: null }));
      }, 2000);
    } catch (error) {
      setDownloadStatus(prev => ({ ...prev, [quality]: 'error' }));
      setTimeout(() => {
        setDownloadStatus(prev => ({ ...prev, [quality]: null }));
      }, 2000);
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Miniatura do Vídeo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Escolha a qualidade desejada para baixar a capa de vídeo YouTube
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Thumbnail Preview */}
          <div className="space-y-4">
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={thumbnailData.thumbnails[selectedQuality]}
                alt="Thumbnail do YouTube"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = thumbnailData.thumbnails.hd;
                }}
              />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <SafeIcon icon={FiImage} />
              <span>ID do Vídeo: {thumbnailData.videoId}</span>
            </div>
          </div>

          {/* Download Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Opções de Download
            </h3>
            
            <div className="space-y-3">
              {qualities.map((quality) => (
                <motion.div
                  key={quality.key}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    selectedQuality === quality.key
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-400'
                  }`}
                  onClick={() => setSelectedQuality(quality.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        {quality.label}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {quality.description}
                      </p>
                    </div>
                    
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(quality.key);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {downloadStatus[quality.key] === 'downloading' && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      )}
                      {downloadStatus[quality.key] === 'success' && (
                        <SafeIcon icon={FiCheck} />
                      )}
                      {!downloadStatus[quality.key] && (
                        <SafeIcon icon={FiDownload} />
                      )}
                      
                      {downloadStatus[quality.key] === 'downloading' && 'Baixando...'}
                      {downloadStatus[quality.key] === 'success' && 'Baixado!'}
                      {downloadStatus[quality.key] === 'error' && 'Erro'}
                      {!downloadStatus[quality.key] && 'Baixar'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailDisplay;