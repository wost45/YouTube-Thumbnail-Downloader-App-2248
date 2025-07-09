import React, { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    // Initialize AdSense ads
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.log('AdSense not loaded');
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="text-center">
          {/* Google AdSense Banner */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-1234567890123456"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          
          {/* Developer credit */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Desenvolvido por Washington Souza
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;