import { useEffect, useRef } from "react";

function ConfettiCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const colors = ["#f97316","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899","#ef4444"];
    const pieces = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 3 + 1.5,
      opacity: 1,
    }));
    let frame;
    let tick = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;
      pieces.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.rotation += p.rotationSpeed;
        if (tick > 80) p.opacity = Math.max(0, p.opacity - 0.012);
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (pieces.some((p) => p.opacity > 0)) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 w-full h-full z-0" />;
}

export default function RegistrationSuccessModal({ isOpen, onClose, refNo, name }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const steps = [
    { icon: "📧", title: "Check Your Email", desc: "Confirmation details have been sent to your registered email." },
    { icon: "📱", title: "WhatsApp Update", desc: "You'll receive competition updates on your WhatsApp number." },
    { icon: "🎤", title: "Prepare Your Act", desc: "Practice your best performance for the upcoming auditions." },
  ];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
        style={{ animation: "successPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        <div className="relative overflow-hidden">
          <ConfettiCanvas />
          <div className="relative z-10 flex flex-col items-center px-8 pt-10 pb-8 text-center bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600">
            <div className="relative mb-5">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center shadow-2xl" style={{ animation: "successPulse 2s ease-in-out infinite" }}>
                <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl">
                    <svg className="w-9 h-9 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" style={{ animation: "drawCheck 0.5s 0.2s ease both", strokeDasharray: 30, strokeDashoffset: 30 }} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/80 text-sm font-semibold uppercase tracking-[0.2em] mb-1">Registration Successful</p>
            <h2 className="text-white font-bold text-2xl md:text-3xl leading-tight mb-2">
              {name ? `You're in, ${name.split(" ")[0]}! 🎉` : "You're Registered! 🎉"}
            </h2>
            <p className="text-white/85 text-sm">Welcome to Voice of Delhi NCR. We'll be in touch soon!</p>
          </div>
        </div>

        <div className="mx-6 -mt-5 relative z-20">
          <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 px-5 py-4 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-0.5">Your Reference Number</p>
              <p className="text-2xl font-black text-orange-700 tracking-wide">{refNo || "DMS-XXXXXX"}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <p className="text-center text-xs text-stone-400 mt-2">Save this number for future reference.</p>
        </div>

        <div className="px-6 pt-5 pb-2">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">What's Next?</p>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-stone-50 border border-stone-100 px-4 py-3">
                <span className="text-xl mt-0.5">{step.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-stone-800">{step.title}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col sm:flex-row gap-3">
          <button onClick={onClose} className="flex-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Done ✓
          </button>
          <a href="https://www.instagram.com/dmsaarohi" target="_blank" rel="noopener noreferrer" onClick={onClose} className="flex-1 rounded-full border-2 border-stone-200 px-6 py-3 text-sm font-bold text-stone-700 hover:border-orange-300 hover:text-orange-600 transition-all text-center">
            Follow Us 🎵
          </a>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 transition-all flex items-center justify-center text-white" aria-label="Close">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <style>{`
        @keyframes successPop {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.07); }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
