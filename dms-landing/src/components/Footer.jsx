import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const InstagramIcon = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const YoutubeIcon = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>;
const FacebookIcon = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TwitterIcon = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;

const Footer = () => {
  return (
    <footer className="w-full relative z-10 pt-20 pb-10 bg-[#050505] mt-auto overflow-hidden">
      {/* Top Border Glow & Continuity Lighting */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-gradient-to-b from-[#10B981]/5 to-transparent pointer-events-none filter blur-[80px]" />
      
      {/* Ambient background glow in footer */}
      <div className="absolute bottom-[-50%] left-[50%] -translate-x-1/2 w-[80vw] h-[50vh] rounded-[100%] bg-gradient-to-b from-[#10B981]/5 to-[#FF8C00]/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 lg:gap-24 justify-items-center">
        
        {/* Column 1: Brand & Mission */}
        <div className="flex flex-col items-center gap-4 w-full md:max-w-xs text-center">
          <a href="/" className="flex flex-col items-center gap-3">
            <img src="/images/DMS_Logo1%20(1).png" alt="DMS Aarohi" className="h-20 sm:h-24 object-contain" />
          </a>
          <div className="text-[10px] font-semibold uppercase tracking-[4px] text-white/50 mt-2">
            Music • Community • Impact
          </div>
          <p className="text-white/60 text-sm mt-4 leading-relaxed">
            Inspiring talent and creating meaningful social impact across India. Join our journey to make a difference through art and service.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center gap-6 w-full text-center">
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
        <div className="flex flex-col items-center gap-6 w-full text-center">
          <h3 className="text-white font-bold text-lg mb-2">Contact Us</h3>
          
          <div className="flex flex-col gap-3 text-sm text-white/70 items-center">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-white/50" />
              <span>Delhi NCR, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-white/50" />
              <span>+91 123 456 7890</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-white/50" />
              <span>contact@dmsaarohi.com</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            {[InstagramIcon, YoutubeIcon, FacebookIcon, TwitterIcon].map((Icon, idx) => (
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
