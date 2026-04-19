import React, { useState } from 'react';
import { Mail, Lock, LogIn, Chrome, ShieldAlert } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    if (email.includes('admin')) onLogin('admin');
    else onLogin('client');
  };
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'var(--bg-color)' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h1 style={{ color: 'var(--accent-neon)', fontSize: '2rem', fontWeight: '900', letterSpacing: '2px' }}>
            TRACK<span style={{ color: 'var(--text-primary)' }}>TRASH</span>
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', letterSpacing: '1px', fontWeight: '600' }}>LOGÍSTICA REVERSA B2B</p>
        </div>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="email" placeholder="E-mail Corporativo" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.5)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit', fontWeight: '600' }} required />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.5)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit' }} required />
          </div>
          <button type="submit" style={{ padding: '0.8rem', background: 'var(--accent-neon)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '0.5rem', boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)' }}>
            <LogIn size={18} /> ENTRAR NA PLATAFORMA
          </button>
        </form>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600' }}>OU</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
        </div>
        <button type="button" style={{ padding: '0.8rem', background: '#fff', color: 'var(--text-primary)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <Chrome size={18} /> Login com Google
        </button>
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Não tem uma conta corporativa? <span style={{ color: 'var(--accent-blue)', fontWeight: '700', cursor: 'pointer' }}>Criar Conta</span></div>
        <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(2, 132, 199, 0.1)', borderRadius: '8px', fontSize: '0.7rem', color: 'var(--accent-blue)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'}}><ShieldAlert size={14}/> ACESSO DEMO HACKATHON</div>
          <div>Lojista: <strong>qualquer email (ex: loja@ti.com)</strong></div>
          <div>Operador: <strong>admin@qualquer.com</strong></div>
        </div>
      </div>
    </div>
  );
}
