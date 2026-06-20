import React, { useState, useEffect } from 'react';

const SplashScreen = ({ finishLoading }) => {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Mulai animasi layar tertarik ke atas (Curtain Pull) di detik ke-3.0
    const hideTimer = setTimeout(() => {
      setIsHiding(true);
    }, 3000);

    // Hapus komponen loading dari sistem di detik ke-4.2
    const removeTimer = setTimeout(() => {
      finishLoading();
    }, 4200);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [finishLoading]);

  return (
    <>
      <style>{`
        /* Container Utama Splash Screen */
        .splash-container {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #030712; /* Warna Hitam/Navy pekat */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          transition: transform 1s cubic-bezier(0.76, 0, 0.24, 1), border-radius 1s cubic-bezier(0.76, 0, 0.24, 1);
        }
        
        /* Layar ditarik ke atas saat loading selesai */
        .splash-container.hide {
          transform: translateY(-100%);
          border-bottom-left-radius: 50vw;
          border-bottom-right-radius: 50vw;
        }

        /* Efek Cahaya (Glow Orbs) melayang */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          animation: floatOrb 6s ease-in-out infinite alternate;
        }
        .orb-1 {
          width: 300px; height: 300px;
          background: #4f46e5;
          top: -10%; left: -10%;
        }
        .orb-2 {
          width: 250px; height: 250px;
          background: #7c3aed;
          bottom: -10%; right: -10%;
          animation-delay: -3s;
        }

        .splash-content {
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Teks IT Student */
        .code-tag {
          font-family: monospace;
          color: #a3a3a3;
          font-size: 1.1rem;
          letter-spacing: 2px;
          margin-bottom: 12px;
          opacity: 0;
          transform: translateY(20px);
          animation: slideFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }
        .code-tag span {
          color: #4f46e5;
        }

        /* Nama Anda dengan efek kilauan */
        .name-brand {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          letter-spacing: -1px;
          margin: 0;
          opacity: 0;
          transform: translateY(20px);
          background: linear-gradient(90deg, #ffffff 0%, #a5b4fc 50%, #ffffff 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: slideFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards, shineText 2s linear 1s forwards;
        }

        /* Loading Bar Neon */
        .loading-track {
          margin-top: 40px;
          width: 200px;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          opacity: 0;
          animation: slideFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
        }
        .loading-indicator {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 0%;
          background: #4f46e5;
          box-shadow: 0 0 10px #4f46e5, 0 0 20px #4f46e5;
          animation: fillLoading 1.5s cubic-bezier(0.65, 0, 0.35, 1) 1.2s forwards;
        }

        @keyframes floatOrb {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(40px) scale(1.1); }
        }
        @keyframes slideFadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shineText {
          to { background-position: 200% center; }
        }
        @keyframes fillLoading {
          0% { width: 0%; }
          50% { width: 60%; }
          100% { width: 100%; }
        }
      `}</style>
      
      <div className={`splash-container ${isHiding ? 'hide' : ''}`}>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>

        <div className="splash-content">
          <div className="code-tag"><span>&lt;</span> IT Student <span>/&gt;</span></div>
          <h1 className="name-brand">GALANG EGA YUDISTIRA</h1>
          <div className="loading-track">
            <div className="loading-indicator"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashScreen;