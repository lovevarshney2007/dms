function LogoLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f1729] text-white">
      <div className="relative flex items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/20" />
          <div className="absolute inset-1 rounded-full border-4 border-transparent border-t-orange-400 animate-spin-slow" />
          <img
            src="/legacy/tal_logo1.png"
            alt="Logo"
            className="absolute inset-3 h-10 w-10 rounded-full bg-white object-cover shadow-lg"
          />
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-300">Loading</p>
          <p className="font-serif text-2xl">DMS Aarohi</p>
          <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
            <div className="animate-loader h-1 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoLoader;
