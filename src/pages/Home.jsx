import React, { useState } from 'react';
import ChatRoom from '../components/Chat/ChatRoom';
import ProfileSettings from '../components/Chat/ProfileSettings';

const Home = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="flex h-screen bg-darkBg overflow-hidden">
      {/* Sidebar Navigasi Kecil */}
      <div className="w-20 bg-white/5 border-r border-white/10 flex flex-col items-center py-8 gap-8">
        <div className="text-neonPurple font-bold text-2xl">K</div>
        <button onClick={() => setActiveTab('chat')} className={`p-3 rounded-xl ${activeTab === 'chat' ? 'bg-neonPurple text-white' : 'text-gray-500'}`}>💬</button>
        <button onClick={() => setActiveTab('profile')} className={`p-3 rounded-xl ${activeTab === 'profile' ? 'bg-neonPurple text-white' : 'text-gray-500'}`}>👤</button>
      </div>

      {/* Konten Utama */}
      <div className="flex-1 relative">
        {activeTab === 'chat' ? (
          <ChatRoom roomName="Global_Kripto" />
        ) : (
          <div className="p-8 max-w-2xl mx-auto">
            <ProfileSettings userSession={{ id: 'current-user-id' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
