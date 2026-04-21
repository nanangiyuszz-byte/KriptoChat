import React, { useState, useEffect } from 'react';
import LoadingAnimation from './components/Shared/LoadingAnimation';
import Login from './components/Auth/Login';
import ChatRoom from './components/Chat/ChatRoom';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulasi inisialisasi koneksi (Ably & Supabase)
    setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Animasi aesthetic berjalan selama 2.5 detik
  }, []);

  return (
    <div className="bg-darkBg min-h-screen selection:bg-neonPurple selection:text-white">
      <AnimatePresence>
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>

      {!isLoading && (
        <div className="transition-opacity duration-1000">
          {!isAuthenticated ? (
            // Kirim prop setter agar setelah PIN benar, langsung masuk chat
            <div onClick={() => setIsAuthenticated(true)}> 
              {/* Note: Dummy onClick untuk testing, nanti dipindah ke fungsi Login */}
              <Login />
            </div>
          ) : (
            <ChatRoom />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
