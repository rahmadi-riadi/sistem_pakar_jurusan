import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminHistoryDetail() {
  const { id_session } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/history/${id_session}`).then(res => setData(res.data));
  }, [id_session]);

  if (!data) return <p style={{ textAlign: 'center', marginTop: '3rem', fontFamily: 'sans-serif' }}>Memuat rincian...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigate('/admin/history')} style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>← Kembali</button>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Rangkuman Sesi Tes</h2>
      <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1.5rem' }}>ID: {id_session}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>Nama Pengguna</p>
          <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>{data.session.nama_user}</p>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>Jurusan Terpilih</p>
          <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#2563eb' }}>{data.session.nama_jurusan}</p>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>Waktu Tes</p>
          <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>{new Date(data.session.tanggal_tes).toLocaleString('id-ID')}</p>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>Nilai Kecocokan</p>
          <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>{data.session.nilai_keyakinan}%</p>
        </div>
      </div>
      <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Fakta Jawaban User:</h4>
      <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {data.answers.map((ans, idx) => <li key={idx}>{ans}</li>)}
      </ul>
    </div>
  );
}

//export default AdminHistoryDetail;