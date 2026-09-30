import React, { useState, useEffect, useRef } from 'react';

const SplashScreen = ({ finishLoading }) => {
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // SISTEM POSISI KURSOR & SENTUHAN
    // ==========================================
    const mouse = {
      x: width / 2,
      y: height / 2,
      active: false,
      lastMoved: 0
    };

    const updateMousePos = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      mouse.active = true;
      mouse.lastMoved = Date.now();
    };

    const handleMouseMove = (e) => {
      updateMousePos(e.clientX, e.clientY);
      if (Math.random() < 0.12) {
        ripples.push(new Ripple(mouse.x, mouse.y, 1.2, 35));
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
        if (Math.random() < 0.15) {
          ripples.push(new Ripple(mouse.x, mouse.y, 1.2, 40));
        }
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // ==========================================
    // SISTEM IKAN KOI BERENANG & MENGIKUTI KURSOR
    // ==========================================
    class KoiFish {
      constructor(x, y, color, size, baseSpeed, fishIndex) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.baseSpeed = baseSpeed;
        this.speed = baseSpeed;
        this.angle = Math.random() * Math.PI * 2;
        this.targetAngle = this.angle;
        this.wiggle = Math.random() * 10;
        this.wiggleSpeed = 0.15;
        this.history = [];
        this.maxHistory = 14;
        this.fishIndex = fishIndex;
        this.orbitRadius = 40 + fishIndex * 22;
        this.orbitAngle = Math.random() * Math.PI * 2;
      }

      update() {
        this.wiggle += this.wiggleSpeed;

        const isMouseRecent = mouse.active && (Date.now() - mouse.lastMoved < 3500);

        if (isMouseRecent) {
          this.orbitAngle += 0.02;
          const targetX = mouse.x + Math.cos(this.orbitAngle + this.fishIndex * 1.2) * this.orbitRadius;
          const targetY = mouse.y + Math.sin(this.orbitAngle + this.fishIndex * 1.2) * this.orbitRadius;

          const dx = targetX - this.x;
          const dy = targetY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          this.targetAngle = Math.atan2(dy, dx);

          if (dist > 80) {
            this.speed = this.baseSpeed * 1.4;
            this.wiggleSpeed = 0.24;
          } else {
            this.speed = this.baseSpeed * 0.9;
            this.wiggleSpeed = 0.16;
          }
        } else {
          this.speed = this.baseSpeed;
          this.wiggleSpeed = 0.14;

          if (Math.random() < 0.02) {
            this.targetAngle += (Math.random() - 0.5) * 1.4;
          }

          const margin = 80;
          if (this.x < margin) this.targetAngle = 0;
          if (this.x > width - margin) this.targetAngle = Math.PI;
          if (this.y < margin) this.targetAngle = Math.PI / 2;
          if (this.y > height - margin) this.targetAngle = -Math.PI / 2;
        }

        let diff = this.targetAngle - this.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        this.angle += diff * 0.06;

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.history.unshift({ x: this.x, y: this.y, angle: this.angle });
        if (this.history.length > this.maxHistory) {
          this.history.pop();
        }
      }

      draw(ctx) {
        if (this.history.length < 5) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const s = this.size;
        const wiggleOffset = Math.sin(this.wiggle) * 4;

        // 1. Bayangan Ikan di Dasar Kolam
        ctx.save();
        ctx.translate(14, 18);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 1.8, s * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 2. Sirip Dada
        const finWiggle = Math.sin(this.wiggle * 0.8) * 0.2;
        ctx.fillStyle = this.color.fin;
        
        // Sirip Kiri
        ctx.save();
        ctx.translate(-s * 0.3, -s * 0.6);
        ctx.rotate(-0.6 + finWiggle);
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.8, s * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Sirip Kanan
        ctx.save();
        ctx.translate(-s * 0.3, s * 0.6);
        ctx.rotate(0.6 - finWiggle);
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.8, s * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 3. Ekor Liuk
        ctx.save();
        ctx.translate(-s * 1.8, wiggleOffset);
        ctx.rotate(wiggleOffset * 0.15);
        ctx.fillStyle = this.color.fin;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s * 1.2, -s * 0.8, -s * 1.4, s * 0.8, 0, 0);
        ctx.fill();
        ctx.restore();

        // 4. Badan Utama Ikan Koi
        ctx.fillStyle = this.color.body;
        ctx.beginPath();
        ctx.moveTo(s * 1.8, 0);
        ctx.bezierCurveTo(s * 0.8, -s * 0.9, -s * 1.2, -s * 0.6, -s * 1.8, wiggleOffset * 0.5);
        ctx.bezierCurveTo(-s * 1.2, s * 0.6, s * 0.8, s * 0.9, s * 1.8, 0);
        ctx.fill();

        // 5. Corak Warna
        if (this.color.spot) {
          ctx.fillStyle = this.color.spot;
          ctx.beginPath();
          ctx.ellipse(s * 0.4, 0, s * 0.6, s * 0.45, 0.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(-s * 0.6, wiggleOffset * 0.3, s * 0.4, s * 0.3, -0.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // 6. Mata
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(s * 1.2, -s * 0.4, 2, 0, Math.PI * 2);
        ctx.arc(s * 1.2, s * 0.4, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // ==========================================
    // SISTEM GELOMBANG AIR & DAUN TERATAI
    // ==========================================
    const ripples = [];
    class Ripple {
      constructor(x, y, speed = 1.2, maxRadius = 70) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.maxRadius = maxRadius + Math.random() * 20;
        this.opacity = 0.5;
        this.speed = speed;
      }
      update() {
        this.radius += this.speed;
        this.opacity = Math.max(0, 0.5 * (1 - this.radius / this.maxRadius));
      }
      draw(ctx) {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Daun Teratai
    const lilyPads = [
      { x: width * 0.15, y: height * 0.2, radius: 45, angle: 0.5 },
      { x: width * 0.85, y: height * 0.25, radius: 55, angle: 1.2 },
      { x: width * 0.18, y: height * 0.8, radius: 60, angle: 2.1 },
      { x: width * 0.82, y: height * 0.78, radius: 48, angle: 3.8 }
    ];

    // 5 Ikan Koi yang berenang
    const koiFishes = [
      new KoiFish(width * 0.3, height * 0.4, { body: '#ea580c', spot: '#ffffff', fin: 'rgba(254, 215, 170, 0.7)' }, 19, 1.9, 0),
      new KoiFish(width * 0.6, height * 0.6, { body: '#ffffff', spot: '#dc2626', fin: 'rgba(255, 255, 255, 0.7)' }, 21, 1.6, 1),
      new KoiFish(width * 0.4, height * 0.7, { body: '#f59e0b', spot: '#ffffff', fin: 'rgba(254, 240, 138, 0.7)' }, 17, 2.1, 2),
      new KoiFish(width * 0.7, height * 0.3, { body: '#ea580c', spot: '#0f172a', fin: 'rgba(254, 215, 170, 0.7)' }, 20, 1.7, 3),
      new KoiFish(width * 0.5, height * 0.2, { body: '#ffffff', spot: '#f97316', fin: 'rgba(255, 255, 255, 0.7)' }, 18, 1.8, 4)
    ];

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      ripples.push(new Ripple(clickX, clickY, 1.5, 90));
      ripples.push(new Ripple(clickX, clickY, 1.0, 60));
      updateMousePos(clientX, clientY);
    };

    window.addEventListener('click', handleCanvasClick);

    // Loop Animasi
    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Warna Air Kolam
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0d2238');
      gradient.addColorStop(0.5, '#0f2b48');
      gradient.addColorStop(1, '#0a192c');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Efek Cahaya Air
      ctx.fillStyle = 'rgba(56, 189, 248, 0.03)';
      ctx.beginPath();
      ctx.arc(width * 0.5 + Math.sin(frame * 0.01) * 50, height * 0.5 + Math.cos(frame * 0.01) * 50, width * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Riak air berkala
      if (frame % 80 === 0) {
        const randomFish = koiFishes[Math.floor(Math.random() * koiFishes.length)];
        ripples.push(new Ripple(randomFish.x, randomFish.y, 1.0, 50));
      }

      // Gambar riak air
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].update();
        ripples[i].draw(ctx);
        if (ripples[i].opacity <= 0) {
          ripples.splice(i, 1);
        }
      }

      // Gambar ikan koi
      koiFishes.forEach((koi) => {
        koi.update();
        koi.draw(ctx);
      });

      // Gambar daun teratai
      lilyPads.forEach((pad) => {
        ctx.save();
        ctx.translate(pad.x, pad.y);
        ctx.rotate(pad.angle + Math.sin(frame * 0.02) * 0.05);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(8, 10, pad.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#065f46';
        ctx.beginPath();
        ctx.arc(0, 0, pad.radius, 0.2, Math.PI * 2 - 0.2);
        ctx.lineTo(0, 0);
        ctx.fill();

        ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
        ctx.lineWidth = 1.5;
        for (let a = 0.5; a < Math.PI * 2; a += 0.8) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * pad.radius * 0.85, Math.sin(a) * pad.radius * 0.85);
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      finishLoading();
    }, 750);
  };

  return (
    <>
      <style>{`
        /* Container Kolam Ikan */
        .pond-splash-wrapper {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
          user-select: none;
          transition: transform 0.75s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.75s ease;
        }

        .pond-splash-wrapper.exit {
          transform: translateY(-100%);
          opacity: 0.9;
        }

        .pond-canvas {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 1;
          cursor: crosshair;
        }

        /* Kartu Kaca Mengambang */
        .pond-center-card {
          position: relative;
          z-index: 10;
          max-width: 440px;
          width: 90%;
          background: rgba(13, 34, 56, 0.78);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 28px;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
          animation: cardFloatIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: auto;
        }

        .pond-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #a5f3fc;
          margin-bottom: 18px;
          letter-spacing: 0.5px;
        }

        .pond-title {
          font-size: clamp(1.8rem, 5vw, 2.3rem);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.8px;
          line-height: 1.15;
          margin-bottom: 8px;
        }

        .pond-subtitle {
          font-size: 0.92rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 28px;
          max-width: 340px;
        }

        .btn-pond-enter {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 34px;
          background: #ffffff;
          color: #0f172a;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 25px -5px rgba(255, 255, 255, 0.25);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-pond-enter:hover {
          background: #f8fafc;
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 16px 32px -5px rgba(255, 255, 255, 0.4);
        }

        .btn-pond-enter:active {
          transform: translateY(0) scale(0.98);
        }

        .btn-pond-enter .pond-arrow {
          transition: transform 0.3s ease;
        }

        .btn-pond-enter:hover .pond-arrow {
          transform: translateX(4px);
        }

        @keyframes cardFloatIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <div className={`pond-splash-wrapper ${isExiting ? 'exit' : ''}`}>
        {/* Kanvas Kolam Ikan Interaktif */}
        <canvas ref={canvasRef} className="pond-canvas" />

        {/* Kartu Selamat Datang Kaca */}
        <div className="pond-center-card">
          <div className="pond-badge">
            <span>Selamat Datang</span>
          </div>

          <h1 className="pond-title">Galang Ega Yudistira</h1>
          <p className="pond-subtitle">
            Mahasiswa D3 Teknologi Informasi Universitas Brawijaya & Developer.
          </p>

          <button className="btn-pond-enter" onClick={handleEnter} autoFocus>
            <span>Masuk ke Portofolio</span>
            <svg className="pond-arrow" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default SplashScreen;
