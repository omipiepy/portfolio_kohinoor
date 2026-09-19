const sections = [
  { id: 'sec-1', bg: '#0F172A', accent: '#8B5CF6', label: 'Hero', title: 'Scroll Down' },
  { id: 'sec-2', bg: '#1E293B', accent: '#F472B6', label: 'About', title: 'About Section' },
  { id: 'sec-3', bg: '#0C4A6E', accent: '#22D3EE', label: 'Skills', title: 'Skills Section' },
  { id: 'sec-4', bg: '#4C1D95', accent: '#FDE047', label: 'Projects', title: 'Projects Section' },
  { id: 'sec-5', bg: '#14532D', accent: '#4ADE80', label: 'Contact', title: 'Contact Section' },
]

export default function ScrollDemo() {
  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      {sections.map((s, i) => (
        <section
          key={s.id}
          style={{
            width: '100vw',
            height: '100vh',
            background: s.bg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 50% 50%, ${s.accent}22, transparent 70%)`,
            }}
          />
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              letterSpacing: '0.1em',
              color: s.accent,
              marginBottom: 12,
              textTransform: 'uppercase',
            }}
          >
            {s.label}
          </p>
          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(48px, 10vw, 120px)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            {s.title}
          </h1>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 13,
              color: '#ffffff66',
              marginTop: 24,
            }}
          >
            Section {i + 1} of {sections.length}
          </p>
        </section>
      ))}

      <section
        style={{
          width: '100%',
          height: '50vh',
          background: '#111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 48,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.03em',
          }}
        >
          Footer
        </h1>
      </section>
    </div>
  )
}
