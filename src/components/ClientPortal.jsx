import React, { useState } from 'react';
import { LayoutDashboard, PlusCircle, Truck, ClipboardList, LogOut, FileCheck } from 'lucide-react';

const GlassCard = ({ children, title = "" }) => (
  <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
    {title && <h3 style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-secondary)", letterSpacing: "1px" }}>{title}</h3>}
    {children}
  </div>
);

export default function ClientPortal({ onLogout }) {
  const [tab, setTab] = useState('dashboard');
  const [wastes, setWastes] = useState([{ id: 1, type: 'Placas Mãe / Servidores', qty: '50 unidades', status: 'Disponível' }]);
  const [collections, setCollections] = useState([{ id: 101, items: '50 unidades - Placas Mãe', status: 'Coletado', date: 'Hoje', cert: 'CERT-2026-A1X7' }]);
  
  const [wfType, setWfType] = useState('Celulares e Baterias');
  const [wfQty, setWfQty] = useState('');
  
  const handleAddWaste = (e) => {
    e.preventDefault();
    setWastes([...wastes, { id: Date.now(), type: wfType, qty: wfQty, status: 'Disponível' }]);
    setWfQty('');
    setTab('dashboard');
  };

  const handleRequestCollection = (e) => {
    e.preventDefault();
    if(wastes.length === 0) return alert('Cadastre ao menos 1 resíduo antes de chamar a frota!');
    setCollections([{ id: Date.now(), items: wastes.map(w=>w.type).join(', '), status: 'Pendente (Na Fila)', date: 'Agendado', cert: 'Gerar na Conclusão' }, ...collections]);
    alert('Logística acionada! A rota da frota foi atualizada.');
    setTab('historico');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', padding: '1.5rem', gap: '1.5rem', overflow: 'hidden', flexDirection: window.innerWidth < 960 ? 'column' : 'row' }} id="client-layout">
      <aside className="glass-card sidebar" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 0.5rem', marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--accent-neon)', fontSize: '1.5rem', fontWeight: '900', letterSpacing: '1px' }}>TRACK<span style={{ color: 'var(--text-primary)' }}>TRASH</span></h1>
          <p style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', fontWeight: '600' }}>PORTAL B2B</p>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>Lojista / Assistência Téc.</div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {[
            { id: 'dashboard', label: 'Meu Painel', icon: LayoutDashboard },
            { id: 'add', label: 'Cadastrar Resíduo', icon: PlusCircle },
            { id: 'request', label: 'Solicitar Coleta', icon: Truck },
            { id: 'historico', label: 'Histórico & ESG', icon: ClipboardList },
          ].map((item) => (
            <div key={item.id} onClick={() => setTab(item.id)} className={`nav-item ${tab === item.id ? 'active' : ''}`} style={{ padding: '0.8rem', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <item.icon size={20} /> <span style={{fontWeight: 600, fontSize: '0.9rem'}}>{item.label}</span>
            </div>
          ))}
        </nav>
        <div onClick={onLogout} style={{ marginTop: 'auto', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center', color: '#ef4444', fontWeight: 600, fontSize: '0.9rem', padding: '1rem' }}><LogOut size={20} /> Sair</div>
      </aside>

      <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {tab === 'dashboard' && (
          <>
            <header>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>Resumo Corporativo</h2>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <GlassCard title="LIXO DESPACHADO"><div style={{fontSize:'2rem', fontWeight:800, color:'var(--accent-neon)'}}>124 <span style={{fontSize:'1rem'}}>kg</span></div></GlassCard>
              <div className="glass-card" style={{padding:'1.5rem', background: 'linear-gradient(135deg, rgba(5,150,105,0.1), rgba(2,132,199,0.1))'}}>
                 <h3 style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', letterSpacing: '1px', marginBottom:'1rem' }}>CERTIFICADOS ESG</h3>
                 <div style={{fontSize:'2rem', fontWeight:800, color:'var(--text-primary)'}}>12 <span style={{fontSize:'1rem'}}>Selos Digitais</span></div>
              </div>
            </div>
            <GlassCard title="MEU INVENTÁRIO (AGUARDANDO COLETA)">
              {wastes.length === 0 ? <p style={{color:'var(--text-secondary)'}}>Sem resíduos no estoque no momento.</p> : wastes.map(w => (
                <div key={w.id} style={{display:'flex', justifyContent:'space-between', padding:'1rem', background:'rgba(0,0,0,0.02)', borderRadius:'8px', border:'1px solid rgba(0,0,0,0.05)'}}>
                  <div><strong>{w.type}</strong><br/><span style={{fontSize:'0.8rem', color:'var(--text-secondary)'}}>{w.status}</span></div>
                  <div style={{fontWeight:800, color:'var(--text-primary)'}}>{w.qty}</div>
                </div>
              ))}
              <div style={{display:'flex', gap:'1rem', marginTop:'1rem', flexWrap:'wrap'}}>
                <button onClick={() => setTab('add')} style={{padding:'1rem', background:'rgba(0,0,0,0.05)', color:'var(--text-primary)', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:600, flex:1}}>+ Sugerir Novo Material</button>
                <button onClick={() => setTab('request')} style={{padding:'1rem', background:'var(--text-primary)', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:700, flex:1}}>Chamar Caminhão (Coleta)</button>
              </div>
            </GlassCard>
          </>
        )}

        {tab === 'add' && (
          <GlassCard title="5.3 CADASTRO NO INVENTÁRIO">
            <form onSubmit={handleAddWaste} style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
              <div>
                <label style={{fontSize:'0.8rem', fontWeight:600, color:'var(--text-secondary)'}}>Tipo de Resíduo E-Waste</label>
                <select value={wfType} onChange={e=>setWfType(e.target.value)} style={{width:'100%', padding:'1rem', borderRadius:'8px', border:'1px solid rgba(0,0,0,0.1)', marginTop:'4px'}}>
                  <option>Celulares e Baterias</option>
                  <option>Placas Mãe / Servidores</option>
                  <option>Cabos e Cobre</option>
                  <option>Monitores e Telas</option>
                  <option>Periféricos (Teclado, Mouse)</option>
                </select>
              </div>
              <div>
                <label style={{fontSize:'0.8rem', fontWeight:600, color:'var(--text-secondary)'}}>Quantidade / Peso</label>
                <input required value={wfQty} onChange={e=>setWfQty(e.target.value)} placeholder="Ex: 50Kg ou 20 caixas" style={{width:'100%', padding:'1rem', borderRadius:'8px', border:'1px solid rgba(0,0,0,0.1)', marginTop:'4px'}} />
              </div>
              <div>
                <label style={{fontSize:'0.8rem', fontWeight:600, color:'var(--text-secondary)'}}>Sua Localização</label>
                <input disabled value="Matriz Assistência (Puxado pelo GPS)" style={{width:'100%', padding:'1rem', borderRadius:'8px', border:'1px solid rgba(0,0,0,0.1)', background:'#f1f5f9', marginTop:'4px'}} />
              </div>
              <button type="submit" style={{padding:'1rem', background:'var(--accent-neon)', color:'#fff', border:'none', borderRadius:'8px', fontWeight:700, cursor:'pointer', marginTop:'1rem', boxShadow:'0 4px 10px rgba(5,150,105,0.2)'}}>SALVAR E ADICIONAR AO INVENTÁRIO</button>
            </form>
          </GlassCard>
        )}

        {tab === 'request' && (
           <GlassCard title="5.4 CHECKOUT DE LOGÍSTICA">
             <div style={{padding:'1.5rem', background:'rgba(2, 132, 199, 0.05)', borderRadius:'8px', border:'1px solid rgba(2,132,199,0.2)'}}>
               <h4 style={{marginBottom:'1rem', color:'var(--text-primary)'}}>Resíduos no seu Ponto de Coleta:</h4>
               <ul style={{marginLeft:'1.5rem', marginBottom:'1.5rem', color:'var(--text-secondary)'}}>
                 {wastes.map(w => <li key={w.id} style={{marginBottom:'0.5rem'}}><strong>{w.qty}</strong> de <strong>{w.type}</strong></li>)}
               </ul>
               <p style={{fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'1.5rem'}}>
                 Sem dores de cabeça! O sistema da TrackTrash irá integrar o seu pedido a uma coleta comunitária otimizada por IA.
               </p>
               <button onClick={handleRequestCollection} style={{width:'100%', padding:'1rem', background:'var(--text-primary)', color:'#fff', border:'none', borderRadius:'8px', fontWeight:700, cursor:'pointer'}}>CONFIRMAR E AGENDAR COLETA</button>
             </div>
           </GlassCard>
        )}

        {tab === 'historico' && (
           <GlassCard title="5.5 / 5.6 HISTÓRICO & STATUS">
             <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
               {collections.map(c => (
                 <div key={c.id} style={{display:'flex', flexDirection: window.innerWidth < 600 ? 'column' : 'row', justifyContent:'space-between', alignItems: window.innerWidth < 600 ? 'flex-start' : 'center', gap: '1rem', padding:'1.5rem', background:'rgba(0,0,0,0.02)', borderRadius:'8px', border:'1px solid rgba(0,0,0,0.05)'}}>
                   <div>
                     <div style={{fontWeight:800, color:'var(--text-primary)', marginBottom:'4px'}}>{c.items}</div>
                     <div style={{fontSize:'0.8rem', color:'var(--text-secondary)'}}>Data de Solicitação: {c.date}</div>
                     <div style={{display:'inline-flex', alignItems:'center', gap:'4px', marginTop:'8px', padding:'4px 10px', background: c.status.includes('Pendente') ? 'rgba(255,184,0,0.1)' : 'rgba(5,150,105,0.1)', color: c.status.includes('Pendente') ? '#FFB800' : 'var(--accent-neon)', borderRadius:'20px', fontSize:'0.75rem', fontWeight:800}}>
                       {c.status}
                     </div>
                   </div>
                   <div style={{display:'flex', flexDirection:'column', alignItems: window.innerWidth < 600 ? 'flex-start' : 'flex-end', gap:'8px'}}>
                     {c.cert.includes('CERT') ? (
                       <button onClick={()=>alert('Iniciando Download do PDF do Certificado Validade ESG na Blockchain...')} style={{display:'flex', alignItems:'center', gap:'6px', padding:'0.8rem 1rem', background:'rgba(5,150,105,0.1)', color:'var(--accent-neon)', border:'1px solid rgba(5,150,105,0.3)', borderRadius:'8px', cursor:'pointer', fontWeight:700, fontSize:'0.8rem'}}>
                         <FileCheck size={16} /> VER CERTIFICADO ESG
                       </button>
                     ) : (
                       <span style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>Certificado após conclusão</span>
                     )}
                   </div>
                 </div>
               ))}
             </div>
           </GlassCard>
        )}

      </main>
    </div>
  );
}
