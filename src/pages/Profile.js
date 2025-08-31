import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddressEditor() {
  const [address, setAddress] = useState({ apartment: '', building: '', street: '', city: '' });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://gas-agency-server.onrender.com/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setAddress(res.data.address || {});
      setLoading(false);
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put('https://gas-agency-server.onrender.com/api/user/update-address', address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg(res.data.message);
    } catch {
      setMsg('Failed to update address');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSave} className="address-editor-form">
      <h3>Edit Address</h3>
      {msg && <p>{msg}</p>}
      <input type="text" placeholder="Apartment" value={address.apartment} onChange={(e) => setAddress({ ...address, apartment: e.target.value })} />
      <input type="text" placeholder="Building" value={address.building} onChange={(e) => setAddress({ ...address, building: e.target.value })} />
      <input type="text" placeholder="Street" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
      <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
      <button type="submit">Save Address</button>
    </form>
  );
}
