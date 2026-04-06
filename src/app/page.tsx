import Link from 'next/link';
import Image from 'next/image';
import WelcomeModal from '@/components/WelcomeModal';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <WelcomeModal />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDKJumQIat-Y_VSM1hc5ZE3E4qHXSIMjxRlr8XRecRCQP4QlpSTGASsa7FwIKMgnpUy3Nbdhj7TT4XoUkkVNMZQA744-Pho477-rlj3mMgf_FvWIH1SBCKynwSA1PjY_YUpjnjy9CzOi47QRJju11OfccDqQy7yS9G0NnygtOy34dtoNwVZD5_fcvGhrVjg5Td-RVSpBPuNko_F9WH_3rw73rrCyioU_BV2bkgncgOoRxNJQbE41HMVyLlXqozTSAeC0uZHW6xMGa-"
            alt="Interior biblioteca jurídica de lujo"
            className="object-cover"
            fill
            priority
            sizes="100vw"
          />
          {/* Directional gradient: dark left → transparent right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full py-24">
          <div className="max-w-3xl space-y-9">

            {/* Eyebrow badge */}
            <span className="inline-block py-1 px-3 border border-white/20 text-blue-200 text-[10px] font-label font-semibold uppercase tracking-[0.4em] bg-blue-900/30 backdrop-blur-sm rounded-md">
              Excelencia &amp; Tradición
            </span>

            {/* Hero headline — Newsreader serif */}
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[0.97] text-white font-light tracking-tight">
              Seguridad que
              <br />
              <span className="italic font-normal text-blue-200">
                Respalda su Legado
              </span>
            </h1>

            {/* Lead body copy — Public Sans */}
            <p className="font-body text-white/70 text-lg md:text-xl max-w-xl leading-relaxed border-l-2 border-primary/50 pl-5">
              Comprometidos con la fe pública y la agilidad notarial. Brindamos
              asesoría integral para sus trámites legales más importantes.
            </p>

            {/* CTAs — no "Agendar Cita" */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/servicios"
                className="font-label text-white border-2 border-white px-10 py-4 font-bold uppercase tracking-[0.15em] text-xs hover:bg-white hover:text-black transition-all text-center rounded-lg"
              >
                Nuestros Servicios
              </Link>
              <Link
                href="/aranceles"
                className="font-label text-white border border-white/15 px-10 py-4 font-bold uppercase tracking-[0.15em] text-xs hover:bg-white/10 transition-all text-center rounded-lg"
              >
                Consultar Precios
              </Link>
            </div>
          </div>
        </div>



      </section>

      {/* ══════════════════════════════════════
          VALORES
      ══════════════════════════════════════ */}
      <section className="bg-white py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

            {/* Left — image with floating card */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-[30px_30px_0px_0px_rgba(242,243,253,1)]">
                <Image
                  alt="Interior oficina notarial"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDKJumQIat-Y_VSM1hc5ZE3E4qHXSIMjxRlr8XRecRCQP4QlpSTGASsa7FwIKMgnpUy3Nbdhj7TT4XoUkkVNMZQA744-Pho477-rlj3mMgf_FvWIH1SBCKynwSA1PjY_YUpjnjy9CzOi47QRJju11OfccDqQy7yS9G0NnygtOy34dtoNwVZD5_fcvGhrVjg5Td-RVSpBPuNko_F9WH_3rw73rrCyioU_BV2bkgncgOoRxNJQbE41HMVyLlXqozTSAeC0uZHW6xMGa-"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-8 -right-6 lg:-right-12 bg-[#005ab4] p-8 lg:p-10 shadow-2xl max-w-xs z-20 rounded-xl">
                <span className="font-label text-[9px] uppercase tracking-[0.4em] font-semibold text-white/60 mb-3 block">
                  Protocolo
                </span>
                <h2 className="font-headline text-3xl md:text-4xl leading-tight text-white mb-4">
                  Atención<br />Preferencial
                </h2>
                <p className="font-body text-white/75 text-sm leading-relaxed">
                  Un servicio diseñado para la exclusividad y la eficiencia en
                  cada firma.
                </p>
              </div>
            </div>

            {/* Right — value propositions */}
            <div className="lg:col-span-7 space-y-14 lg:pl-10 pt-20 lg:pt-0">
              <div className="space-y-4">
                <h2 className="font-headline text-4xl lg:text-6xl leading-[1.08] text-slate-900">
                  Compromiso con la<br />
                  <span className="italic font-light text-[#005ab4]/60">Transparencia Total</span>
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
                {[
                  {
                    num: '01',
                    title: 'Seguridad Jurídica',
                    desc: 'Validamos rigurosamente cada proceso bajo el marco legal vigente, garantizando la validez de sus documentos.',
                  },
                  {
                    num: '02',
                    title: 'Eficiencia Digital',
                    desc: 'Tecnología de vanguardia para la gestión de trámites, reduciendo tiempos de espera y facilitando el seguimiento.',
                  },
                  {
                    num: '03',
                    title: 'Asesoría Directa',
                    desc: 'Atención personalizada y comunicación fluida con el Notario para resolver casos de alta complejidad legal.',
                  },
                  {
                    num: '04',
                    title: 'Ética Profesional',
                    desc: 'Integridad absoluta en el manejo de la fe pública, asegurando la imparcialidad en todos nuestros actos.',
                  },
                ].map((item) => (
                  <div key={item.num} className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="font-headline text-5xl font-bold text-[#005ab4]/15 select-none">
                        {item.num}
                      </span>
                      <h3 className="font-body text-lg font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="font-body text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          REGISTROS & CONTACTO
      ══════════════════════════════════════ */}
      <section className="py-28 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Public registries */}
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">
                  Consulta Pública
                </p>
                <h3 className="font-headline text-4xl text-on-surface">Registros Disponibles</h3>
              </div>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Acceda libremente al Repertorio de Instrumentos Públicos de la notaría.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  {
                    href: '/repertorio-instrumentos',
                    sub: 'Escrituras Públicas',
                    label: 'Repertorio de Instrumentos',
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between p-6 bg-surface-container-lowest border border-outline-variant/30 hover:border-primary hover:shadow-lg transition-all group rounded-xl"
                  >
                    <div>
                      <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">
                        {item.sub}
                      </p>
                      <p className="font-body font-bold text-on-surface group-hover:text-primary transition-colors">
                        {item.label}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-outline-variant group-hover:text-primary group-hover:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact + hours */}
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">
                  Contacto Directo
                </p>
                <h3 className="font-headline text-4xl text-on-surface">¿Dudas o Requerimientos?</h3>
              </div>

              {/* Contact cards — 2x2 grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Phone 1 */}
                <a
                  href="tel:+5645213636"
                  className="block p-6 bg-white border border-slate-200 hover:bg-[#005ab4]/8 hover:border-[#005ab4] transition-all group rounded-xl shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mb-3 text-[#005ab4] group-hover:text-[#005ab4] transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <p className="font-label text-[9px] uppercase tracking-widest text-slate-400 mb-1">Atención General</p>
                  <p className="font-body text-base font-bold tabular-nums text-slate-900">45 2 213 636</p>
                </a>

                {/* Phone 2 */}
                <a
                  href="tel:+5645887478"
                  className="block p-6 bg-white border border-slate-200 hover:bg-[#005ab4]/8 hover:border-[#005ab4] transition-all group rounded-xl shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mb-3 text-[#005ab4] group-hover:text-[#005ab4] transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <p className="font-label text-[9px] uppercase tracking-widest text-slate-400 mb-1">Escrituras Públicas</p>
                  <p className="font-body text-base font-bold tabular-nums text-slate-900">45 2 887 478</p>
                </a>

                {/* Email 1 */}
                <a
                  href="mailto:contacto@notariavictoria.cl"
                  className="block p-6 bg-white border border-slate-200 hover:bg-[#005ab4]/8 hover:border-[#005ab4] transition-all group rounded-xl shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mb-3 text-[#005ab4]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <p className="font-label text-[9px] uppercase tracking-widest text-slate-400 mb-1">Atención General</p>
                  <p className="font-body text-sm font-bold break-all text-slate-900">contacto@notariavictoria.cl</p>
                </a>

                {/* Email 2 */}
                <a
                  href="mailto:escrituras@notariavictoria.cl"
                  className="block p-6 bg-white border border-slate-200 hover:bg-[#005ab4]/8 hover:border-[#005ab4] transition-all group rounded-xl shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mb-3 text-[#005ab4]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <p className="font-label text-[9px] uppercase tracking-widest text-slate-400 mb-1">Escrituras Públicas</p>
                  <p className="font-body text-sm font-bold break-all text-slate-900">escrituras@notariavictoria.cl</p>
                </a>
              </div>


              {/* Hours */}
              <div className="p-8 bg-surface-container-lowest border border-outline-variant/30 space-y-6 rounded-xl">
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
                  <h4 className="font-headline text-xl text-on-surface">Horarios</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-outline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-on-surface text-sm">Lunes a Viernes</span>
                    <span className="font-label font-bold tracking-wider text-on-surface text-sm tabular-nums">
                      09:00 — 14:00 / 15:00 — 17:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-on-surface text-sm">Sábado</span>
                    <span className="font-label text-error text-[10px] uppercase font-bold tracking-widest">Cerrado</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-on-surface text-sm">Domingo</span>
                    <span className="font-label text-error text-[10px] uppercase font-bold tracking-widest">Cerrado</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
