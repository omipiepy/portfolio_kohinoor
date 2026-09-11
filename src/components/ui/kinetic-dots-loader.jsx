const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768

export default function KineticDotsLoader() {
  return (
    <div className='kd-container flex items-center justify-center min-h-[200px] sm:min-h-[250px] p-6 sm:p-8'>
      <div className='flex items-end gap-6 sm:gap-8'>
        {[0, 1, 2, 3].map((i) => {
          const d = `${(i * 0.2).toFixed(1)}s`
          return (
            <div key={i} className='relative flex flex-col items-center' style={{ width: IS_MOBILE ? 32 : 40 }}>
              <div style={{ animation: `kd-bounce 3s ease-in-out ${d} infinite`, willChange: 'transform' }}>
                <div style={{
                  animation: `kd-squash 3s ease-in-out ${d} infinite`,
                  willChange: 'transform',
                  width: IS_MOBILE ? 28 : 36,
                  height: IS_MOBILE ? 28 : 36,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #bae6fd 0%, #38bdf8 35%, #0284c7 70%, #0369a1 100%)',
                  boxShadow: IS_MOBILE
                    ? '0 0 8px rgba(56,189,248,0.4)'
                    : '0 0 16px rgba(56,189,248,0.5), 0 0 32px rgba(56,189,248,0.25), inset 0 -2px 6px rgba(3,105,161,0.4)',
                  position: 'relative',
                }}>
                  {!IS_MOBILE && (
                    <>
                      <div style={{ position: 'absolute', top: 5, left: 7, width: 13, height: 10, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.95), transparent 70%)', transform: 'rotate(-25deg)' }} />
                      <div style={{ position: 'absolute', top: 4, left: 5, width: 6, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', filter: 'blur(1px)', transform: 'rotate(-25deg)' }} />
                    </>
                  )}
                </div>
              </div>
              <div style={{ animation: `kd-shadow 3s ease-in-out ${d} infinite`, willChange: 'transform, opacity', position: 'absolute', bottom: -4, left: '50%', width: IS_MOBILE ? 28 : 36, height: 6, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(14,116,177,0.45), transparent 70%)' }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
