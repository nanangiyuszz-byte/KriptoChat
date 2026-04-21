import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ViewOnceMedia = ({ mediaUrl, type = 'image' }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);

  const handleOpen = () => {
    if (!hasViewed) setIsOpened(true);
  };

  const handleClose = () => {
    setIsOpened(false);
    setHasViewed(true); // Setelah ditutup, tidak bisa dibuka lagi
  };

  return (
    <div>
      {!hasViewed ? (
        <div 
          onClick={handleOpen}
          className="bg-white/10 border border-white/20 p-4 rounded-2xl cursor-pointer hover:bg-white/20 transition text-center"
        >
          <p className="text-sm">📸 Pesan Sekali Lihat</p>
          <span className="text-[10px] text-gray-400">Klik untuk membuka</span>
        </div>
      ) : (
        <div className="bg-white/5 p-3 rounded-2xl text-gray-500 italic text-xs">
          ✅ Pesan telah dibuka
        </div>
      )}

      <AnimatePresence>
        {isOpened && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
          >
            <button onClick={handleClose} className="absolute top-10 right-10 text-white text-xl">✕ Tutup</button>
            {type === 'image' ? (
              <img src={mediaUrl} className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" alt="View Once" />
            ) : (
              <video src={mediaUrl} controls autoPlay className="max-w-full max-h-[80vh]" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewOnceMedia;
