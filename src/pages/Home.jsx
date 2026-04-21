// Tambahkan di bagian atas
import NewChatModal from '../components/Chat/NewChatModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  const startChat = (userData) => {
    setActiveChat(userData);
    // Di sini kamu bisa arahkan ke room ID tertentu
    console.log("Memulai chat dengan:", userData.username);
  };

  return (
    <div className="flex h-screen bg-darkBg">
      <div className="w-20 bg-white/5 border-r border-white/10 flex flex-col items-center py-8 gap-8">
        <div className="text-neonPurple font-bold text-2xl italic">K</div>
        
        {/* Tombol Plus (+) yang kamu mau */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-12 h-12 bg-neonPurple/20 border border-neonPurple text-neonPurple rounded-full flex items-center justify-center text-2xl hover:bg-neonPurple hover:text-white transition-all shadow-lg shadow-purple-500/10"
        >
          +
        </button>
        
        {/* Navigasi lainnya... */}
      </div>

      <div className="flex-1">
        <ChatRoom roomName={activeChat ? activeChat.username : "Global_Room"} />
      </div>

      <NewChatModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onChatCreated={startChat} 
      />
    </div>
  );
};
