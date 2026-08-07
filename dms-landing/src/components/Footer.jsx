import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { ENV } from '../config/env';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="ig" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="25%" stopColor="#e6683c"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="75%" stopColor="#cc2366"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" fill="url(#ig)" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42C1 8.16 1 12 1 12s0 3.84.46 5.58a2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96C23 15.84 23 12 23 12s0-3.84-.46-5.58z" fill="#FF0000"/>
    <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" fill="white"/>
  </svg>
);
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
    <path d="M16.671 15.542l.532-3.469h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.514V5.001s-1.374-.235-2.686-.235c-2.74 0-4.533 1.662-4.533 4.669v2.637H7.078v3.469h3.047v8.385a12.09 12.09 0 0 0 3.75 0v-8.385h2.796z" fill="white"/>
  </svg>
);
const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="#1DA1F2"/>
  </svg>
);

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
              { name: 'Talent Platform', url: ENV.TALENT_HUNT_URL },
              { name: 'Social Initiatives', url: ENV.NGO_URL },
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
              <Phone className="w-4 h-4 text-white/50" />
              <span>+91-9810225442</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-white/50" />
              <span>dmsaarohi@gmail.com</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            {[
              { Icon: InstagramIcon, url: 'https://instagram.com/dmsaarohi' },
              { Icon: YoutubeIcon, url: 'https://www.youtube.com/@dmsaarohi5483' },
              { Icon: FacebookIcon, url: 'https://www.facebook.com/dms.aarohi' },
              { Icon: TwitterIcon, url: 'https://twitter.com/dmsaarohi' }
            ].map(({ Icon, url }, idx) => (
              <motion.a 
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, rotate: 8, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-10 h-10 flex items-center justify-center transition-all duration-300 overflow-hidden"
              >
                <Icon className="w-8 h-8 relative z-10" />
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
