import React, { useState, useEffect } from 'react';
import { ably } from '../../api/ably';
import { motion } from 'framer-motion';

const ChatRoom = ({ roomName = "Kripto_Global" }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isViewOnce, setIsViewOnce] = useState(false);

  useEffect(() => {
    // Subscribe ke private channel
    const channel = ably.channels.get(`chat:${roomName}`);
    
    channel.subscribe('message', (msg) => {
      setMessages((prev) => [...prev, msg.data]);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [roomName]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    const channel = ably.channels.get(`chat:${roomName}`);
    await channel.publish('message', {
      text: inputText,
      sender: 'Me', // Nanti diganti dengan username asli dari Supabase
      viewOnce: isViewOnce,
      id: Date.now()
    });

    setInputText('');
    setIsViewOnce(false); // Reset toggle
  };

  return (
    <div className="flex flex-col h-screen bg-darkBg text-white p-4">
      {/* Header Aesthetic */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10 p-4 rounded-t-2xl flex justify-between items-center shadow-lg">
        <h2 className="text-xl font-bold tracking-wider">🔒 {roomName}</h2>
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonPurple opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
        </span>
      </div>

      {/* Area Chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/5 backdrop-blur-xs">
        {messages.map((msg, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={idx} 
            className={`flex flex-col max-w-[75%] ${msg.sender === 'Me' ? 'self-end ml-auto' : 'self-start'}`}
          >
            {msg.viewOnce ? (
              <div className="bg-red-500/20 border border-red-500/50 p-3 rounded-2xl rounded-tr-none backdrop-blur-sm cursor-pointer hover:bg-red-500/40 transition">
                <span className="text-xs text-red-300 block mb-1">📸 Foto Sekali Lihat</span>
                <p className="italic text-sm">Klik untuk melihat</p>
              </div>
            ) : (
              <div className="bg-neonPurple/80 p-3 rounded-2xl rounded-tr-none shadow-[0_4px_15px_rgba(168,85,247,0.2)]">
                <p>{msg.text}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input Bar Mengambang */}
      <div className="bg-white/5 backdrop-blur-md p-4 rounded-b-2xl border-t border-white/10 flex gap-2 items-center">
        <button 
          onClick={() => setIsViewOnce(!isViewOnce)}
          className={`p-2 rounded-xl transition ${isViewOnce ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-white/10'}`}
          title="Aktifkan Mode Sekali Lihat"
        >
          👁️
        </button>
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ketik pesan rahasia..." 
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 px-4"
        />
        <button 
          onClick={sendMessage}
          className="bg-neonPurple hover:bg-purple-600 px-6 py-2 rounded-xl font-bold shadow-lg shadow-purple-500/30 transition-all active:scale-95"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
