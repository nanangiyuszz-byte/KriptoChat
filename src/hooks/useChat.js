import { useState, useEffect } from 'react';
import { ably } from '../api/ably';
import { supabase } from '../api/supabase';

export const useChat = (roomName) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const channel = ably.channels.get(`chat:${roomName}`);
    
    // Ambil riwayat dari Supabase saat pertama kali buka
    const fetchHistory = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomName)
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    };

    fetchHistory();

    // Subscribe pesan baru dari Ably
    channel.subscribe('message', (msg) => {
      setMessages((prev) => [...prev, msg.data]);
    });

    return () => channel.unsubscribe();
  }, [roomName]);

  const sendKriptoMsg = async (text, isViewOnce, senderId) => {
    const channel = ably.channels.get(`chat:${roomName}`);
    const payload = {
      text,
      sender_id: senderId,
      view_once: isViewOnce,
      created_at: new Date().toISOString()
    };

    // 1. Kirim Real-time via Ably
    await channel.publish('message', payload);

    // 2. Simpan permanen ke Supabase
    await supabase.from('messages').insert([{ ...payload, room_id: roomName }]);
  };

  return { messages, sendKriptoMsg };
};
