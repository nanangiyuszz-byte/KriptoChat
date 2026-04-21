import React, { useState } from 'react';
import { supabase } from '../../api/supabase';

const ProfileSettings = ({ userSession }) => {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');

  const uploadAvatar = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${userSession.id}/${fileName}`;

      // 1. Upload ke Supabase Storage
      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Update URL foto di tabel profiles
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', userSession.id);

      alert('Foto profil berhasil diupdate!');
    } catch (error) {
      alert('Gagal upload: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-white">
      <h3 className="text-xl font-bold mb-4">Pengaturan Profil Aesthetic</h3>
      
      {/* Upload Foto */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-dashed border-neonPurple flex items-center justify-center overflow-hidden">
          {loading ? "..." : "📸"}
        </div>
        <input 
          type="file" 
          accept="image/*" 
          onChange={uploadAvatar} 
          className="mt-4 text-xs text-gray-400 file:bg-neonPurple file:border-none file:px-4 file:py-1 file:rounded-full file:text-white cursor-pointer"
        />
      </div>

      {/* Input Status */}
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Tulis status kamu..." 
          className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-neonPurple"
          onChange={(e) => setStatusText(e.target.value)}
        />
        <button 
          className="w-full bg-neonPurple/20 border border-neonPurple text-neonPurple py-2 rounded-xl hover:bg-neonPurple hover:text-white transition"
          onClick={() => alert('Status tersimpan: ' + statusText)}
        >
          Simpan Status
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
