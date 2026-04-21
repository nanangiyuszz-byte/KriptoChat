import Ably from 'ably';

// Menggunakan Promise agar lebih modern dan asinkron
export const ably = new Ably.Realtime.Promise({ 
  key: import.meta.env.VITE_ABLY_KEY,
  clientId: 'user_' + Math.random().toString(36).substring(7) // ID sementara
});
