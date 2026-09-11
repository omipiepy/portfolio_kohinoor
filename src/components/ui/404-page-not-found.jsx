import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Button from "@/components/Button"
import KineticDotsLoader from "@/components/ui/kinetic-dots-loader"

export function NotFoundPage() {
  const navigate = useNavigate()
  const [navigating, setNavigating] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const goHome = () => {
    setNavigating(true)
    timerRef.current = setTimeout(() => navigate("/"), 3000)
  }

  if (navigating) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-white">
        <KineticDotsLoader />
      </div>
    )
  }

  return (
    <section className="bg-white min-h-screen flex items-center justify-center px-4">
      <div className="max-w-[700px] w-full text-center">
        {/* SVG Illustration: TV with no signal */}
        <div className="flex justify-center mb-6">
          <svg className="w-full max-w-[300px] h-auto" viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* TV stand */}
            <rect x="120" y="220" width="60" height="12" rx="3" fill="#94a3b8"/>
            <rect x="100" y="230" width="100" height="8" rx="4" fill="#94a3b8"/>

            {/* TV body */}
            <rect x="40" y="40" width="220" height="180" rx="16" fill="#1e293b"/>
            <rect x="48" y="48" width="204" height="156" rx="10" fill="#0f172a"/>

            {/* Screen */}
            <rect x="56" y="56" width="188" height="140" rx="6" fill="#111827"/>

            {/* Static / no signal animation */}
            <g opacity="0.6">
              <rect x="60" y="60" width="180" height="132" fill="url(#static)"/>
              <animate attributeName="opacity" values="0.4;0.7;0.3;0.6;0.4" dur="0.3s" repeatCount="indefinite"/>
            </g>

            {/* Scan lines */}
            <g opacity="0.15">
              {[...Array(28)].map((_, i) => (
                <rect key={i} x="56" y={56 + i * 5} width="188" height="2" fill="white"/>
              ))}
            </g>

            {/* NO SIGNAL text */}
            <text x="150" y="130" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="16" fontWeight="bold" opacity="0.9">
              NO SIGNAL
            </text>

            {/* Channel number */}
            <text x="220" y="180" textAnchor="middle" fill="#ef4444" fontFamily="monospace" fontSize="14" fontWeight="bold">
              404
            </text>

            {/* Power LED */}
            <circle cx="150" cy="212" r="3" fill="#22c55e">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
            </circle>

            {/* Knobs */}
            <circle cx="256" cy="100" r="6" fill="#475569"/>
            <circle cx="256" cy="120" r="5" fill="#475569"/>
            <circle cx="256" cy="138" r="4" fill="#475569"/>

            {/* Antenna */}
            <line x1="130" y1="40" x2="100" y2="10" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
            <line x1="170" y1="40" x2="200" y2="10" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="100" cy="10" r="4" fill="#94a3b8"/>
            <circle cx="200" cy="10" r="4" fill="#94a3b8"/>

            {/* Static noise pattern */}
            <defs>
              <pattern id="static" patternUnits="userSpaceOnUse" width="6" height="6">
                <rect width="6" height="6" fill="#111827"/>
                <rect x="0" y="0" width="3" height="3" fill="#1f2937" opacity="0.8"/>
                <rect x="3" y="3" width="3" height="3" fill="#374151" opacity="0.6"/>
                <rect x="1" y="4" width="2" height="2" fill="#4b5563" opacity="0.4"/>
                <rect x="4" y="1" width="2" height="2" fill="#6b7280" opacity="0.3"/>
              </pattern>
            </defs>
          </svg>
        </div>

        {/* 404 text */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-slate-200 leading-none tracking-tight">
          404
        </h1>

        <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mt-2 mb-3">
          Oops! Page not found
        </h3>
        <Button
          variant="primary"
          onClick={goHome}
        >
          Go to Home
        </Button>
      </div>
    </section>
  )
}
