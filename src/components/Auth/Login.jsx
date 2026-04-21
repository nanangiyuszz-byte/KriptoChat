import React, { useState } from 'react';
import { supabase } from '../../api/supabase';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState(['', '', '', '', '', '']); // 6 Digit PIN

  const handlePinChange = (value, index) => {
    let newPin = [...pin];
    newPin[index] = value.substring(0, 1);
    setPin(newPin);
    
    // Auto focus ke kotak sebelah
    if (value && index < 5) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  const handleLogin = async () => {
    const finalPin = pin.join('');
    // Di sini kita panggil Supabase Edge Function untuk verifikasi PIN 
    // agar kodenya tidak bisa diintip di Inspect Element.
    console.log("Mencoba login dengan:", phone, finalPin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg p-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <h2 className="text-white text-2xl font-semibold text-center mb-2">Selamat Datang</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">Masuk ke KriptoChat dengan PIN rahasia kamu.</p>
        
        <input 
          type="tel"
          placeholder="Nomor WhatsApp (Contoh: 62812...)"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white mb-6 focus:border-neonPurple outline-none transition-all"
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="flex justify-between gap-2 mb-8">
          {pin.map((digit, i) => (
            <input
              key={i}
              id={`pin-${i}`}
              type="password"
              maxLength="1"
              value={digit}
              className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-center text-white text-xl focus:border-neonPurple outline-none transition-all"
              onChange={(e) => handlePinChange(e.target.value, i)}
            />
          ))}
        </div>

        <button 
          onClick={handleLogin}
          className="w-full bg-neonPurple hover:bg-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 transition-all active:scale-95"
        >
          Masuk Sekarang
        </button>
      </div>
    </div>
  );
};

export default Login;
