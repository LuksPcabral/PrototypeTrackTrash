import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
﻿import React, { useState, useEffect } from "react"
import { 
  LayoutDashboard, 
  Compass, 
  Share2, 
  Database, 
  ShieldCheck, 
  Terminal,
  Activity,
  MapPin,
  Truck,
  PackageCheck,
  TrendingUp,
  Leaf,
  Loader2,
  LogOut,
  Lock
} from "lucide-react"

// --- Components ---

const GlassCard = ({ children, className = "", title = "", rightAction = null, flex = "none", style = {} }) => {
  return (
    <div className={`glass-card ${className}`} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", flex: flex, ...style }}>
      {(title || rightAction) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <h3 style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px", color: "var(--text-secondary)" }}>
            {title}
          </h3>
          {rightAction}
        </div>
      )}
      {children}
    </div>
  )
}

const MetricCard = ({ label, value, unit, color }) => (
  <div className="glass-card" style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <div style={{ fontSize: "0.65rem", fontWeight: "600", color: "var(--text-secondary)", letterSpacing: "1px", textTransform: "uppercase" }}>
      {label}
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: "4px", margin: "0.75rem 0" }}>
      <span style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-primary)", lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600" }}>{unit}</span>
    </div>
    <div style={{ height: "3px", width: "100%", background: "rgba(255, 255, 255, 0.05)", borderRadius: "3px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: "70%", background: color, boxShadow: `0 0 10px ${color}` }}></div>
    </div>
  </div>
)

const FeedItem = ({ icon, label, origin, weight, isWarning }) => {
  const color = isWarning ? "#FFB800" : "#00D1FF";
  const bg = isWarning ? "rgba(255, 184, 0, 0.1)" : "rgba(0, 209, 255, 0.1)";
  
  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "1rem", 
      padding: "1rem", 
      background: "rgba(0,0,0,0.02)", 
      border: "1px solid rgba(0,0,0,0.02)",
      borderRadius: "12px",
      transition: "background 0.2s"
    }}>
      <div style={{ 
        width: "42px", height: "42px", borderRadius: "10px", 
        background: bg, display: "flex", alignItems: "center", justifyContent: "center", 
        color: color, fontSize: "0.9rem", fontWeight: "800", 
        border: `1px solid ${color}33`, flexShrink: 0, boxShadow: `inset 0 0 10px ${color}11`
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</div>
        <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{origin}</div>
      </div>
      <div style={{ color: "var(--accent-neon)", fontSize: "0.85rem", fontWeight: "700", background: "rgba(0,255,194,0.1)", padding: "4px 8px", borderRadius: "6px", whiteSpace: "nowrap" }}>
        {weight}
      </div>
    </div>
  )
}

// --- Views ---

const cyberIcon = L.divIcon({
  className: "custom-cyber-icon",
  html: "<div style='width: 14px; height: 14px; background: var(--accent-neon); border-radius: 50%; box-shadow: 0 0 10px var(--accent-neon), 0 0 20px var(--accent-neon)'></div>",
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});
const truckIcon = L.divIcon({
  className: "custom-cyber-icon",
  html: "<div style='width: 18px; height: 18px; background: var(--text-primary); border-radius: 5px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid var(--accent-neon); display: flex; align-items: center; justify-content: center'><div style='width: 6px; height: 6px; background: var(--accent-neon); border-radius: 50%' class='pulse-dot'></div></div>",
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const SatelliteIntelView = () => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
      <GlassCard style={{ flex: 1, padding: 0, overflow: 'hidden', position: 'relative' }}>
         <div style={{ position: 'absolute', top: '15px', left: '60px', zIndex: 1000, background: 'rgba(255,255,255,0.95)', padding: '12px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', fontSize: '0.8rem', fontWeight: 700, borderLeft: '4px solid var(--accent-neon)' }}>
            <span style={{color: 'var(--text-primary)'}}>TRACKTRASH UNIT #A1</span><br/>
            <span style={{color: 'var(--accent-neon)', fontSize: '0.7rem'}}>EM ROTA DE COLETA MÚLTIPLA 🚚</span>
         </div>
         <MapContainer center={[-23.5505, -46.6333]} zoom={13} style={{ height: '100%', minHeight: '300px', width: '100%', borderRadius: '14px', zIndex: 1 }}>
           <TileLayer
             attribution='&copy; OpenStreetMap'
             url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
           />
           <Marker position={[-23.5505, -46.6333]} icon={cyberIcon}>
             <Popup><strong>TechFix Ltda</strong><br/>Coleta Pendente: 50x Placas Mãe</Popup>
           </Marker>
           <Marker position={[-23.5600, -46.6500]} icon={cyberIcon}>
             <Popup><strong>Loja Eletrônica Sul</strong><br/>Coleta Pendente: Cabos e Monitores</Popup>
           </Marker>
           <Marker position={[-23.5415, -46.6233]} icon={truckIcon}>
             <Popup><strong>Caminhão Autônomo (Cérebro Logístico)</strong><br/>Capacidade Carga: 38%</Popup>
           </Marker>
         </MapContainer>
      </GlassCard>
    </div>
  );
};


const DashboardView = () => (
  <>
    {/* Top Metrics Row */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
      <MetricCard label="CO2 REDUZIDO" value="1,584" unit="kg" color="var(--accent-neon)" />
      <MetricCard label="DIESEL ECONOMIZADO" value="520" unit="L" color="#00D1FF" />
      <MetricCard label="EFICIÊNCIA DE CARGA" value="94.8" unit="%" color="#FFB800" />
      <MetricCard label="RECUPERAÇÃO DE METAIS" value="342" unit="kg" color="var(--accent-neon)" />
    </div>

    {/* Bottom Content Row */}
    <div style={{ display: "flex", gap: "1.5rem", flex: 1, minHeight: 0 }}>
      {/* Map/Scanner Area */}
      <GlassCard title="ORBIT-EYE SCANNER" flex="2" rightAction={
        <div style={{ fontSize: "0.6rem", color: "var(--accent-blue)", fontFamily: "monospace", letterSpacing: "1px" }}>COORD: -23.5505 / -46.6333</div>
      }>
        <div style={{ 
          flex: 1, background: "#f1f5f9", borderRadius: "10px", 
          position: "relative", overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)" 
        }}>
           <div style={{ position: "absolute", inset: 0, opacity: 0.15, background: "linear-gradient(rgba(0, 255, 194, 0.4) 1px, transparent 1px) 0 0 / 50px 50px, linear-gradient(90deg, rgba(0, 255, 194, 0.4) 1px, transparent 1px) 0 0 / 50px 50px" }}></div>
           <div className="radar-sweep"></div>
           <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", color: "var(--accent-neon)", fontSize: "0.7rem", fontWeight: "600", opacity: 0.8, letterSpacing: "2px" }}>[ RADAR LINK ESTABLISHED ]</div>
           <div className="hotspot-dot" style={{ top: "35%", left: "40%" }}></div>
           <div className="hotspot-dot" style={{ top: "60%", left: "75%", animationDelay: "0.5s" }}></div>
           <div className="hotspot-dot" style={{ top: "20%", left: "80%", animationDelay: "1.2s" }}></div>
           <div className="hotspot-dot" style={{ top: "70%", left: "25%", animationDelay: "1.8s" }}></div>
        </div>
      </GlassCard>

      {/* Feed & Logistics Status */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <GlassCard title="URBAN MINING FEED" flex="1" style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto", paddingRight: "4px", height: "100%" }}>
            <FeedItem icon="Cu" label="Cobre de Alta Pureza" origin="Indústria Metal-X | Lote #982" weight="+ 84kg" />
            <FeedItem icon="Au" label="Ouro (24k Recovery)" origin="Electronic Refinery | Placas Mãe" weight="+ 1.5g" isWarning />
            <FeedItem icon="Pl" label="Polímeros Reciclados" origin="Plast-Cycle Hub" weight="+ 1.2ton" />
            <FeedItem icon="Al" label="Alumínio Estrutural" origin="Eco-Drive Systems" weight="+ 150kg" />
          </div>
        </GlassCard>

        <GlassCard>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: "700", color: "var(--text-secondary)", letterSpacing: "1px", textTransform: "uppercase" }}>PRÓXIMO FRETE COMPARTILHADO</div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--accent-neon)", fontSize: "0.65rem", fontWeight: "700" }}>
              <Activity size={12} /> LIVE
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-primary)", fontWeight: "600" }}>Ocupação Projetada</span>
            <span style={{ fontSize: "1.8rem", color: "var(--accent-neon)", fontWeight: "800" }}>98.2%</span>
          </div>
          <div style={{ height: "6px", width: "100%", background: "rgba(0,0,0,0.05)", borderRadius: "3px", marginTop: "0.5rem", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "98.2%", background: "linear-gradient(90deg, var(--accent-blue), var(--accent-neon))" }}></div>
          </div>
        </GlassCard>
      </div>
    </div>
  </>
);

const ComingSoonView = ({ icon: Icon, title, desc }) => {
  const [status, setStatus] = useState("idle");

  const handleUplink = () => {
    if (status !== "idle") return;
    setStatus("connecting");
    setTimeout(() => {
      setStatus("locked");
    }, 2500);
  };

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <GlassCard style={{ width: "400px", alignItems: "center", textAlign: "center", padding: "3rem" }}>
        <div style={{ 
          width: "64px", height: "64px", borderRadius: "50%", background: "rgba(0, 255, 194, 0.1)", 
          display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-neon)",
          marginBottom: "1rem", border: "1px solid rgba(0, 255, 194, 0.2)",
          boxShadow: "0 0 20px rgba(0, 255, 194, 0.1)"
        }}>
          <Icon size={32} />
        </div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "1px" }}>{title}</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, marginTop: "0.5rem" }}>
          {desc}
        </p>

        <button 
          onClick={handleUplink}
          disabled={status !== "idle"}
          style={{ 
            marginTop: "2rem", padding: "0.6rem 1.2rem", background: status === "locked" ? "rgba(255, 50, 50, 0.1)" : "rgba(255,255,255,0.05)", 
            borderRadius: "20px", fontSize: "0.7rem", 
            color: status === "locked" ? "#ff4444" : "var(--accent-blue)", 
            fontWeight: "700", border: status === "locked" ? "1px solid rgba(255, 50, 50, 0.3)" : "1px solid rgba(0, 209, 255, 0.2)",
            cursor: status === "idle" ? "pointer" : "default", display: "flex", alignItems: "center", gap: "8px",
            transition: "all 0.3s ease",
            outline: "none"
          }}
          onMouseOver={(e) => {
            if (status === "idle") {
              e.currentTarget.style.background = "rgba(0, 209, 255, 0.1)";
              e.currentTarget.style.borderColor = "var(--accent-blue)";
              e.currentTarget.style.color = "#fff";
            }
          }}
          onMouseOut={(e) => {
            if (status === "idle") {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(0, 209, 255, 0.2)";
              e.currentTarget.style.color = "var(--accent-blue)";
            }
          }}
        >
          {status === "idle" && "MÓDULO OFFLINE - FORÇAR UPLINK"}
          {status === "connecting" && (
            <>
              <Loader2 size={12} className="spin-animation" />
              ESTABELECENDO CONEXÃO...
            </>
          )}
          {status === "locked" && (
            <>
              <Lock size={12} />
              ACESSO RESTRITO
            </>
          )}
        </button>
      </GlassCard>
    </div>
  );
};

// --- App ---

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "DASHBOARD", icon: LayoutDashboard },
    { id: "satellite", label: "SATELLITE INTEL", icon: Compass },
    { id: "logistics", label: "LOGISTICS FLOW", icon: Share2 },
    { id: "recovery", label: "RECOVERY HUB", icon: Database },
    { id: "esg", label: "ESG LEDGER", icon: ShieldCheck },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "satellite":
        return <SatelliteIntelView />;
      case "logistics":
        return <ComingSoonView icon={Truck} title="FLUXO DE LOGÍSTICA" desc="Acompanhamento em tempo real das frotas de coleta e otimização de rotas por IA." />;
      case "recovery":
        return <ComingSoonView icon={PackageCheck} title="HUB DE RECUPERAÇÃO" desc="Inventário atualizado das matérias primas separadas na usina de reciclagem." />;
      case "esg":
        return <ComingSoonView icon={Leaf} title="LIVRO-RAZÃO ESG" desc="Blockchain de certificação ambiental para os relatórios corporativos." />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", padding: "1.5rem", gap: "1.5rem", overflow: "hidden" }}>
      
      {/* --- SIDEBAR --- */}
      <aside className="glass-card" style={{ width: "280px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column" }}>
        
        <div style={{ padding: "0 0.5rem", marginBottom: "3rem" }}>
          <h1 style={{ color: "var(--accent-neon)", fontSize: "1.75rem", fontWeight: "900", letterSpacing: "2.5px" }}>
            TRACK<span style={{ color: "var(--text-primary)" }}>TRASH</span>
          </h1>
          <p style={{ fontSize: "0.55rem", color: "var(--text-secondary)", marginTop: "6px", letterSpacing: "1px", fontWeight: "600" }}>
            LOGÍSTICA REVERSA INTELIGENTE
          </p>
        </div>
        
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={20} />
              <span style={{ fontSize: "0.8rem", fontWeight: "600", letterSpacing: "1px" }}>{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Security Terminal Mock */}
        <div style={{ 
          marginTop: "auto", padding: "1rem", background: "rgba(0, 0, 0, 0.03)", 
          borderRadius: "10px", fontSize: "0.7rem", 
          border: "1px solid rgba(0,0,0,0.05)", borderLeft: "3px solid var(--accent-neon)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-neon)", marginBottom: "8px", fontWeight: "600" }}>
            <Terminal size={12} />
            <span>[SEC-02] &gt; SYSTEM_SCAN</span>
          </div>
          <div style={{ color: "var(--text-secondary)", lineHeight: "1.5" }}>
             Monitorando setor 9C.<br/>
             Nenhuma anomalia detectada.
          </div>
        </div>
              <div onClick={onLogout} style={{ marginTop: '1rem', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center', color: '#ef4444', fontWeight: 600, fontSize: '0.9rem', padding: '0.5rem' }}><LogOut size={20} /> Sair do Sistema (Logoff)</div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem", overflow: "hidden" }}>
        
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0.5rem 0" }}>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", letterSpacing: "0.5px", color: "var(--text-primary)" }}>
              CÉREBRO LOGÍSTICO COMPARTILHADO
            </h2>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "4px" }}>
              Monitoramento orbital de resíduos tecnológicos em tempo real.
            </p>
          </div>
          <div style={{ 
            display: "flex", alignItems: "center", gap: "8px", 
            background: "rgba(0, 255, 194, 0.05)", padding: "0.5rem 1.2rem", 
            borderRadius: "30px", border: "1px solid rgba(0, 255, 194, 0.2)" 
          }}>
             <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-neon)", boxShadow: "0 0 10px var(--accent-neon)" }}></div>
             <span style={{ fontSize: "0.65rem", fontWeight: "700", letterSpacing: "1px", color: "var(--accent-neon)" }}>NEXUS-9 LINK: ACTIVE</span>
          </div>
        </header>

        {renderContent()}

      </main>

    </div>
  )
}







