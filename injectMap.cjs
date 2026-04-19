const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.jsx', 'utf8');

if (!code.includes('react-leaflet')) {
  code = `import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
` + code;
}

const mapComponent = `
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
`;

code = code.replace('// --- Views ---', '// --- Views ---\n' + mapComponent);
code = code.replace('case "satellite":\n        return <ComingSoonView icon={MapPin} title="SAT-INTEL" desc="Mapeamento geográfico detalhado e análises topográficas para rotas de extração de lixo eletrônico." />;', 'case "satellite":\n        return <SatelliteIntelView />;');

fs.writeFileSync('src/components/AdminDashboard.jsx', code);
