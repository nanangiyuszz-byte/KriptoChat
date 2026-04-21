import React, { useState } from 'react';
import { supabase } from '../../api/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const NewChatModal = ({ isOpen, onClose, onChatCreated }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('idle'); // idle, scanning, found, not_found

  const handleScanUser = async () => {
    if (!phoneNumber) return;
    setStatus('scanning');

    // Cek apakah user dengan nomor tersebut ada di tabel profiles
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, avatar_url')
      .eq('phone_number', phoneNumber)
      .single();

    setTimeout(() => { // Beri jeda sedikit biar efek scanning-nya terasa aesthetic
      if (data) {
        setStatus('found');
        // Buat ID Room unik (gabungan ID kamu & ID dia)
        onChatCreated(data); 
        onClose();
      } else {
        setStatus('not_found');
      }
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#1a1a1c] border border-white/10 p-6 rounded-3xl w-full max-w-sm shadow-2xl"
      >
        <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-neonPurple">+</span> Mulai Obrolan Baru
        </h3>

        <input 
          type="tel"
          placeholder="Masukkan No. WhatsApp (628...)"
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white mb-4 focus:border-neonPurple outline-none transition-all"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <div className="min-h-[40px] flex items-center justify-center mb-4">
          {status === 'scanning' && (
            <div className="flex items-center gap-2 text-neonPurple animate-pulse">
              <div className="w-2 h-2 bg-neonPurple rounded-full animate-bounce"></div>
              <p className="text-sm">Mencari pengguna...</p>
            </div>
          )}
          {status === 'not_found' && (
            <p className="text-red-400 text-sm">❌ Pengguna tidak terdaftar di KriptoChat.</p>
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 bg-white/5 text-gray-400 py-3 rounded-xl hover:bg-white/10">Batal</button>
          <button 
            onClick={handleScanUser}
            disabled={status === 'scanning'}
            className="flex-1 bg-neonPurple text-white py-3 rounded-xl font-bold shadow-lg shadow-purple-500/20 active:scale-95 transition"
          >
            Cari User
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NewChatModal;
