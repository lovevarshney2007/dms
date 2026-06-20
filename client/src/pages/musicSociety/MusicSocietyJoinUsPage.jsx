import { useState } from "react";
import JoinUsForm from "../../components/forms/JoinUsForm";
import FormNotice from "../../components/common/FormNotice";

function MusicSocietyJoinUsPage() {
  const [status, setStatus] = useState({ type: "", message: "" });

  const benefits = [
    { title: "Premium Stage", desc: "Perform in front of thousands at Delhi's top venues." },
    { title: "Professional Audio", desc: "Sing with our live band, DO-RE-MI, and top-tier sound engineers." },
    { title: "Global Exposure", desc: "Your performances get featured on our popular YouTube channel." },
    { title: "Alumni Network", desc: "Connect with veteran musicians and industry professionals." }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-24">
      
      {/* 1. Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-sm font-bold uppercase tracking-widest text-orange-600 mb-2 block">DMS Aarohi</span>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-stone-900 mb-6">
          Auditions & Registrations
        </h1>
        <p className="text-stone-600 text-lg sm:text-xl">
          Whether you are a singer looking for your next big break, or a music lover wanting to join our audience, fill out the form below to become a part of the DMS Aarohi family.
        </p>
      </div>

      {/* 2. Main Content Grid (Form + Info) */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
        
        {/* Form Section */}
        <section className="bg-white rounded-[3rem] border border-stone-100 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 z-0"></div>
          
          <div className="relative z-10">
            <div className="mb-10">
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-2">Registration Form</h2>
              <p className="text-stone-500 font-medium">Please fill in your details carefully. Our team will contact you shortly after submission.</p>
            </div>
            
            <FormNotice status={status} />
            <JoinUsForm showClose={false} onClose={() => {}} onStatusChange={setStatus} />
          </div>
        </section>

        {/* Sidebar Info */}
        <aside className="space-y-8">
          <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            <div className="relative z-10">
              <h3 className="font-serif text-2xl font-bold mb-6 text-orange-400">Why Perform With Us?</h3>
              <ul className="space-y-6">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-orange-400 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{benefit.title}</h4>
                      <p className="text-stone-400 text-sm">{benefit.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-[2.5rem] p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Need Help?</h3>
            <p className="text-stone-600 text-sm mb-4">Having trouble with the registration? Contact our support team.</p>
            <a href="mailto:contact@dmsaarohi.com" className="font-bold text-orange-600 hover:text-orange-700">contact@dmsaarohi.com</a>
          </div>
        </aside>
      </div>

    </div>
  );
}

export default MusicSocietyJoinUsPage;
