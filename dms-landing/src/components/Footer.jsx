import { Camera, Tv, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="w-full relative z-10 pt-20 pb-10 bg-[#050505] mt-auto overflow-hidden">
      {/* Top Border Glow & Continuity Lighting */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-gradient-to-b from-[#10B981]/5 to-transparent pointer-events-none filter blur-[80px]" />
      
      {/* Ambient background glow in footer */}
      <div className="absolute bottom-[-50%] left-[50%] -translate-x-1/2 w-[80vw] h-[50vh] rounded-[100%] bg-gradient-to-b from-[#10B981]/5 to-[#FF8C00]/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
        
        {/* Column 1: Brand & Mission */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <a href="/" className="flex items-center gap-3">
            <img src="/images/DMS_Logo1%20(1).png" alt="DMS Aarohi" className="h-8 object-contain" />
            <span className="text-2xl font-bold tracking-tight text-white">DMS Aarohi</span>
          </a>
          <div className="text-[10px] font-semibold uppercase tracking-[4px] text-white/50 text-center md:text-left mt-2">
            Music • Community • Impact
          </div>
          <p className="text-white/60 text-sm mt-4 text-center md:text-left leading-relaxed max-w-[300px]">
            Inspiring talent and creating meaningful social impact across India. Join our journey to make a difference through art and service.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <h3 className="text-white font-bold text-lg mb-2">Quick Links</h3>
          <div className="flex flex-col gap-4">
            {[
              { name: 'Talent Platform', url: 'https://dms-ten-gamma.vercel.app' },
              { name: 'Social Initiatives', url: 'https://dms-homepage.vercel.app' },
              { name: 'About Us', url: '#' },
              { name: 'Contact', url: '#' }
            ].map((link) => (
              <a key={link.name} href={link.url} className="group relative text-white/70 text-sm font-medium w-fit">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">{link.name}</span>
                <span className="absolute left-0 bottom-[-2px] w-0 h-[1px] bg-gradient-to-r from-[#FF8C00] to-[#10B981] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: Contact & Socials */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <h3 className="text-white font-bold text-lg mb-2">Connect</h3>
          
          <div className="flex flex-col gap-3 text-sm text-white/70 w-full items-center md:items-start">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-white/50" />
              <span>Delhi NCR, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-white/50" />
              <span>+91 123 456 7890</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            {[Camera, Tv, MessageCircle, Mail].map((Icon, idx) => (
              <motion.a 
                key={idx}
                href="#" 
                whileHover={{ y: -8, rotate: 8, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,140,0,0.3)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C00] to-[#10B981] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Icon className="w-4 h-4 relative z-10" />
              </motion.a>
            ))}
          </div>
        </div>

      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 mt-20 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40 text-xs relative z-10">
        <div>&copy; {new Date().getFullYear()} DMS Aarohi. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
