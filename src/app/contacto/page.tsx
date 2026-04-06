export const metadata = {
  title: 'Horarios y Contacto | Notaría Cesar Peiñan Aillapan',
  description:
    'Horarios de atención, teléfonos, correos y ubicación de la Notaría Cesar Peiñan Aillapan en Victoria, Chile.',
};

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-[#f9f9ff]">

      {/* ══════════════════════════════════════
          SECCIÓN 1: CONTACTO + MAPA (2 cols)
      ══════════════════════════════════════ */}
      <section className="px-6 sm:px-12 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* ─── LEFT: Info de contacto ─── */}
        <div className="flex flex-col gap-12">
          {/* Título */}
          <div className="space-y-4">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#005ab4] block">
              Atención al Ciudadano
            </span>
            <h1 className="font-headline text-6xl font-light text-slate-900 leading-tight">
              Contacto <br />
              <span className="italic font-normal">Directo</span>
            </h1>
          </div>

          {/* Tarjetas de contacto */}
          <div className="grid gap-6">

            {/* ── Teléfonos ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#005ab4]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="font-label text-[10px] uppercase tracking-widest font-bold">Líneas Telefónicas</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-2">
                {/* Phone 1 */}
                <a
                  href="tel:+5645213636"
                  className="p-6 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col gap-1 hover:bg-[#005ab4] hover:border-[#005ab4] group transition-all duration-300"
                >
                  <p className="font-label text-[9px] uppercase tracking-widest text-slate-400 group-hover:text-white/60">
                    Atención General
                  </p>
                  <p className="font-body text-xl font-bold tabular-nums text-slate-900 group-hover:text-white">
                    45 2 213 636
                  </p>
                </a>
                {/* Phone 2 */}
                <a
                  href="tel:+5645887478"
                  className="p-6 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col gap-1 hover:bg-[#005ab4] hover:border-[#005ab4] group transition-all duration-300"
                >
                  <p className="font-label text-[9px] uppercase tracking-widest text-slate-400 group-hover:text-white/60">
                    Escrituras Públicas
                  </p>
                  <p className="font-body text-xl font-bold tabular-nums text-slate-900 group-hover:text-white">
                    45 2 887 478
                  </p>
                </a>
              </div>
            </div>

            {/* ── Emails ── */}
            <div className="space-y-4 pt-4 border-t border-slate-200/60">
              <div className="flex items-center gap-3 text-[#005ab4]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="font-label text-[10px] uppercase tracking-widest font-bold">Correos Institucionales</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-2">
                {/* Email 1 */}
                <a
                  href="mailto:contacto@notariavictoria.cl"
                  className="p-6 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col gap-1 hover:bg-[#964400] hover:border-[#964400] group transition-all duration-300"
                >
                  <p className="font-label text-[9px] uppercase tracking-widest text-slate-400 group-hover:text-white/60">
                    Consultas Generales
                  </p>
                  <p className="font-body text-sm font-bold text-slate-900 group-hover:text-white break-all">
                    contacto@notariavictoria.cl
                  </p>
                </a>
                {/* Email 2 */}
                <a
                  href="mailto:escrituras@notariavictoria.cl"
                  className="p-6 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col gap-1 hover:bg-[#964400] hover:border-[#964400] group transition-all duration-300"
                >
                  <p className="font-label text-[9px] uppercase tracking-widest text-slate-400 group-hover:text-white/60">
                    Área Jurídica
                  </p>
                  <p className="font-body text-sm font-bold text-slate-900 group-hover:text-white break-all">
                    escrituras@notariavictoria.cl
                  </p>
                </a>
              </div>
            </div>

            {/* Punto de Referencia — fuera del mapa */}
            <div className="p-6 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-l-4 border-[#005ab4]">
              <h4 className="font-headline text-lg font-bold text-slate-900 mb-1">Punto de Referencia</h4>
              <p className="font-body text-sm text-slate-500 mb-3 leading-relaxed">
                Frente a la Plaza de Armas de Victoria, Región de La Araucanía.
              </p>
              <a
                href="https://maps.google.com/?q=Notaria+Victoria+Manuel+Rodriguez+355+Victoria+Chile"
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[#005ab4] font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 hover:text-[#964400] transition-colors"
              >
                Abrir en Google Maps
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Ubicación + Mapa ─── */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#964400] mb-2 block">
              Acceso Central
            </span>
            <h2 className="font-headline text-5xl font-bold text-slate-900 mb-4">Ubicación</h2>
            <p className="font-body text-lg text-slate-500 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#005ab4] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Manuel Rodríguez 355, Victoria, Araucanía
            </p>
          </div>

          {/* Map embed */}
          <div className="relative flex-grow min-h-[440px] rounded-2xl shadow-2xl overflow-hidden">
            <iframe
              title="Notaría Victoria — Google Maps"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3133.9892854454915!2d-72.3350592233546!3d-38.23335595813609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966b15462a846935%3A0xcd1d2ad8ddf4cbb7!2sNOTARIA%20VICTORIA!5e0!3m2!1ses!2scl!4v1774924510534!5m2!1ses!2scl"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECCIÓN 2: HORARIOS (full-width)
      ══════════════════════════════════════ */}
      <section className="bg-[#ecedf7] border-y border-slate-200/60 py-20 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-14">

          {/* Descripción */}
          <div className="max-w-sm flex-shrink-0">
            <h3 className="font-headline text-4xl font-bold text-[#005ab4] italic mb-4">
              Horarios de Atención
            </h3>
            <p className="font-body text-slate-600 leading-relaxed">
              Nuestro compromiso es brindar una atención expedita y rigurosa. Recomendamos
              agendar con antelación para trámites de mayor complejidad técnica.
            </p>
          </div>

          {/* Tabla de horarios */}
          <div className="flex-grow w-full max-w-2xl bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">

            {/* Row: Lunes-Viernes mañana */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center px-8 py-5 border-b border-slate-100 gap-3">
              <div>
                <p className="font-label text-[9px] uppercase tracking-widest text-slate-400 mb-0.5">Mañana</p>
                <p className="font-body text-lg font-semibold text-slate-800">Lunes a Viernes</p>
              </div>
              <span className="font-label font-bold tabular-nums text-[#005ab4] bg-[#005ab4]/8 px-4 py-2 rounded-lg text-base">
                09:00 — 14:00
              </span>
            </div>

            {/* Row: Lunes-Viernes tarde */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center px-8 py-5 border-b border-slate-100 gap-3">
              <div>
                <p className="font-label text-[9px] uppercase tracking-widest text-slate-400 mb-0.5">Tarde</p>
                <p className="font-body text-lg font-semibold text-slate-800">Lunes a Viernes</p>
              </div>
              <span className="font-label font-bold tabular-nums text-[#005ab4] bg-[#005ab4]/8 px-4 py-2 rounded-lg text-base">
                15:00 — 17:00
              </span>
            </div>

            {/* Row: Sábado y Domingo juntos */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center px-8 py-5 gap-3">
              <p className="font-body text-lg font-semibold text-slate-800">Sábado y Domingo</p>
              <span className="font-label font-bold text-red-500 bg-red-50 uppercase tracking-[0.15em] text-sm px-5 py-2 rounded-lg">
                CERRADO
              </span>
            </div>

            {/* Footer note */}
            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100">
              <p className="font-label text-[10px] text-slate-400 leading-relaxed">
                * Se recomienda agendar con 24 horas de antelación para firmas de escrituras públicas y testamentos.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
