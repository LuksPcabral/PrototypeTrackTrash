import React, { useState } from 'react';
import Login from './components/Login';
import ClientPortal from './components/ClientPortal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [user, setUser] = useState(null); // null, 'client', 'admin'

  if (!user) return <Login onLogin={setUser} />;
  if (user === 'admin') return <AdminDashboard onLogout={() => setUser(null)} />;
  return <ClientPortal onLogout={() => setUser(null)} />;
}
