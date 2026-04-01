export default function OgImagePage() {
  return (
    <div style={{ width: '1200px', height: '630px', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif', background: 'linear-gradient(135deg, #ffffff 60%, #EFF6FF 100%)', padding: '56px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

      {/* Blob decorativo */}
      <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '300px', height: '300px', background: '#BFDBFE', borderRadius: '50%', opacity: 0.3, filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Contenido */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#2563EB', marginBottom: '20px' }}>
          📍 Badalona · Barcelona
        </div>
        <h1 style={{ fontSize: '72px', fontWeight: 900, color: '#0F2137', lineHeight: 1.05, margin: 0, marginBottom: '20px' }}>
          Imprimimos<br />lo que imaginas.
        </h1>
        <p style={{ fontSize: '22px', fontWeight: 500, color: '#475569', lineHeight: 1.5, maxWidth: '640px', margin: 0 }}>
          Servicio local de impresión 3D en Badalona.<br />
          Prototipos, piezas técnicas y coleccionables.
        </p>
      </div>

      {/* Stats + dominio */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#0F2137' }}>24h</div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>respuesta</div>
          </div>
          <div style={{ width: '1px', height: '40px', background: '#E5EAF0' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#0F2137' }}>3+</div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>materiales</div>
          </div>
          <div style={{ width: '1px', height: '40px', background: '#E5EAF0' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#0F2137' }}>5★</div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>valoración</div>
          </div>
        </div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#94A3B8', letterSpacing: '1px' }}>
          print3dbadalona.com
        </div>
      </div>
    </div>
  )
}
