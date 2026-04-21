import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-darkBg"
    >
      {/* Logo Glow Effect */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5] 
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-20 h-20 bg-neonPurple rounded-full blur-2xl absolute"
      />
      
      <h1 className="text-white text-3xl font-bold tracking-widest relative z-10">
        KRIPTO<span className="text-neonPurple">CHAT</span>
      </h1>
      
      <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
        <motion.div 
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 bottom-0 w-1/2 bg-neonPurple shadow-[0_0_10px_#a855f7]"
        />
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;
