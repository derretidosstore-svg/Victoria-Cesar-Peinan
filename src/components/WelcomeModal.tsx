'use client';

import { useState, useEffect } from 'react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenWelcomeModal', 'true');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      {/* Modal Container */}
      <div
        className="bg-white w-full max-w-xl relative shadow-2xl ring-1 ring-black/5 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 hover:bg-slate-100 transition-colors group"
          aria-label="Cerrar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700 group-active:scale-95 duration-150 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content Section */}
        <div className="p-8 md:p-12 text-center">

          {/* Header */}
          <header className="mb-12">
            <h1 id="modal-title" className="text-3xl md:text-4xl font-bold leading-tight text-slate-900 mb-3 tracking-tight">
              NOTARÍA<br />
              Cesar Peiñan Aillapan
            </h1>
            <p className="text-lg italic text-amber-700 font-medium">Notario Público</p>
          </header>

          {/* Information Sections */}
          <div className="space-y-10">

            {/* Hours Section */}
            <section className="bg-slate-50 p-8 border-y-2 border-[#000080]/10">
              <div className="flex items-center justify-center gap-3 mb-6">
                {/* Clock Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#000080] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                </svg>
                <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-700">Horario Lunes a Viernes</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 border border-slate-200">
                  <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Mañana</span>
                  <span className="text-xl font-bold tabular-nums text-slate-900">09:00 A 14:00</span>
                </div>
                <div className="bg-white p-5 border border-slate-200">
                  <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Tarde</span>
                  <span className="text-xl font-bold tabular-nums text-slate-900">15:00 A 17:00</span>
                </div>
              </div>
            </section>

            {/* Contact Details Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {/* Phones */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-2.5 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Contacto</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-medium text-slate-900">45 2 213 636</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">Atención General</p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-slate-900">45 2 887 478</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">Escrituras Públicas</p>
                  </div>
                </div>
              </div>

              {/* Emails */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-2.5 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Mail</h3>
                </div>
                <div className="space-y-4">
                  <a
                    href="mailto:escrituras@notariavictoria.cl"
                    className="block text-slate-900 hover:text-[#000080] transition-colors underline decoration-slate-200 underline-offset-4 text-sm font-bold break-all"
                  >
                    escrituras@notariavictoria.cl
                  </a>
                  <a
                    href="mailto:contacto@notariavictoria.cl"
                    className="block text-slate-900 hover:text-[#000080] transition-colors underline decoration-slate-200 underline-offset-4 text-sm font-bold break-all"
                  >
                    contacto@notariavictoria.cl
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex justify-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-900 inline-block" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Victoria, Chile</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
