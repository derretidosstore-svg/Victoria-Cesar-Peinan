import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const revalidate = 0;

// ── Helpers ──────────────────────────────────────────────

type EstadoKey = 'pendiente' | 'en_proceso' | 'listo' | 'pagado' | 'fallido' | 'enviada' | string;

function getStepIndex(estado: EstadoKey) {
  if (estado === 'pendiente' || estado === 'sin enviar') return 0;
  if (estado === 'en_proceso') return 1;
  return 2; // listo / pagado / enviada
}

function estadoLabel(estado: EstadoKey) {
  const map: Record<string, string> = {
    pendiente: 'Ingresado / Pendiente',
    en_proceso: 'En Revisión',
    listo: 'Finalizado',
    pagado: 'Finalizado',
    enviada: 'Finalizado',
    fallido: 'Con Observaciones',
    'sin enviar': 'Pendiente',
  };
  return map[estado] ?? estado.replace('_', ' ');
}

// ── Page ─────────────────────────────────────────────────

export default async function EstadoSolicitudPage(
  props: { searchParams: Promise<{ codigo?: string; rut?: string }> }
) {
  const searchParams = await props.searchParams;
  const codigo = searchParams.codigo?.toLowerCase()?.replace(/^#/, '');
  const rut    = searchParams.rut?.trim();

  if (!codigo) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-sm">
          <p className="font-body text-slate-600">No se proporcionó un código de solicitud.</p>
          <Link href="/solicitud/revisar" className="inline-block bg-[#005ab4] text-white px-8 py-3 rounded-xl font-label text-xs uppercase tracking-widest hover:bg-[#004a96] transition-colors">
            Volver a la búsqueda
          </Link>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: solicitudes } = await supabase
    .from('solicitudes_cesar_peinan')
    .select('*, servicio:servicios_cesar_peinan(titulo, arancel)')
    .eq('codigo', codigo.toUpperCase())
    .limit(1);

  const solicitud = solicitudes?.[0];
  const step = solicitud ? getStepIndex(solicitud.estado_trabajo) : 0;

  // Steps definition
  const steps = [
    { label: 'Ingresado', date: solicitud ? new Date(solicitud.creado_en).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' }) : '—' },
    { label: 'En Revisión', date: 'En progreso' },
    { label: 'Finalizado',  date: 'Pendiente' },
  ];

  return (
    <main className="min-h-screen bg-[#f9f9ff] flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-16 md:py-24">

        {/* ── NOT FOUND ─────────────────────────────── */}
        {!solicitud ? (
          <div className="w-full max-w-md">
            <div className="bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] rounded-2xl border-t-4 border-red-500 p-10 text-center">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="font-headline text-2xl font-bold text-slate-900 mb-2">Solicitud no encontrada</h1>
              <p className="font-body text-slate-500 mb-6 text-sm leading-relaxed">
                No encontramos una solicitud con el código{' '}
                <span className="font-mono font-bold text-slate-800">#{codigo.toUpperCase()}</span>
                {rut && <> y RUT <span className="font-bold">{rut}</span></>}.
                Verifique los datos e intente nuevamente.
              </p>
              <Link href="/solicitud/revisar" className="inline-block bg-[#005ab4] text-white px-8 py-3 rounded-xl font-label text-xs uppercase tracking-widest hover:bg-[#004a96] transition-colors">
                Buscar de nuevo
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* ── HEADER ─────────────────────────────── */}
            <section className="w-full max-w-4xl text-center mb-14">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-3 block">
                Resultado de Búsqueda
              </span>
              <h1 className="font-headline text-4xl md:text-6xl font-light text-[#005ab4] mb-3 italic leading-tight">
                {solicitud.servicio?.titulo || 'Trámite Notarial'}
              </h1>
              <p className="font-body text-lg text-slate-500">
                Identificador:{' '}
                <span className="font-bold text-slate-900 select-all font-mono">
                  #{solicitud.codigo || solicitud.id.substring(0, 8).toUpperCase()}
                </span>
              </p>
            </section>

            {/* ── BENTO GRID ─────────────────────────── */}
            <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 items-start">

              {/* ── Main progress card ── */}
              <div className="md:col-span-8 bg-white ring-1 ring-black/5 shadow-2xl p-8 md:p-10 flex flex-col gap-6 rounded-2xl">
                <div>
                  <h2 className="font-headline text-3xl font-bold text-slate-900 mb-4">Estado Actual</h2>

                  {/* Progress line */}
                  <div className="relative mb-4">
                    {/* Track */}
                    <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-100" />
                    {/* Fill */}
                    <div
                      className="absolute top-6 left-0 h-1 bg-[#005ab4] transition-all duration-700"
                      style={{ width: step === 0 ? '0%' : step === 1 ? '50%' : '100%' }}
                    />
                    {/* Steps */}
                    <div className="relative flex justify-between">
                      {steps.map((s, i) => {
                        const done   = i < step;
                        const active = i === step;
                        return (
                          <div key={i} className="flex flex-col items-center gap-3">
                            <div className={`w-12 h-12 flex items-center justify-center rounded-xl z-10 ring-8 ring-white transition-all ${
                              done   ? 'bg-[#005ab4] text-white' :
                              active ? 'bg-[#005ab4] text-white animate-pulse' :
                                       'bg-slate-100 text-slate-400'
                            }`}>
                              {done ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              ) : active ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                            </div>
                            <div className="text-center">
                              <span className={`block font-label text-[9px] uppercase tracking-widest mb-0.5 ${active ? 'text-[#005ab4] font-bold' : 'text-slate-400'}`}>
                                Paso 0{i + 1}
                              </span>
                              <span className={`block font-body font-bold text-sm ${active ? 'text-[#005ab4]' : done ? 'text-slate-800' : 'text-slate-400'}`}>
                                {s.label}
                              </span>
                              <span className="block font-label text-[10px] text-slate-400">{s.date}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <p className="font-body text-sm text-slate-500 italic max-w-sm leading-relaxed">
                    {step === 0 && 'Su solicitud ha sido recibida y está en espera de proceso.'}
                    {step === 1 && 'El notario asignado está validando la documentación presentada.'}
                    {step === 2 && 'Su trámite ha sido procesado y está listo para retirar.'}
                  </p>
                  <Link
                    href="/solicitud/revisar"
                    className="font-label text-[11px] uppercase tracking-widest font-bold text-[#005ab4] hover:text-[#964400] transition-colors flex items-center gap-2 flex-shrink-0"
                  >
                    Buscar otra solicitud
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* ── Side panel ── */}
              <div className="md:col-span-4 space-y-5">
                {/* Detalles del expediente */}
                <div className="bg-[#f2f3fd] p-8 ring-1 ring-black/5 rounded-2xl">
                  <h3 className="font-headline text-xl font-bold mb-6 text-[#005ab4]">Detalles del Expediente</h3>
                  <div className="space-y-5">
                    <div>
                      <span className="font-label text-[9px] uppercase tracking-widest text-slate-400 block mb-0.5">Solicitante</span>
                      <span className="font-body font-bold text-slate-900">{solicitud.cliente_nombre || '—'}</span>
                    </div>
                    <div>
                      <span className="font-label text-[9px] uppercase tracking-widest text-slate-400 block mb-0.5">Estado actual</span>
                      <span className={`inline-block font-label text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg ${
                        solicitud.estado_trabajo === 'listo' || solicitud.estado_trabajo === 'pagado' || solicitud.estado_trabajo === 'enviada'
                          ? 'bg-emerald-100 text-emerald-700'
                          : solicitud.estado_trabajo === 'en_proceso'
                          ? 'bg-[#005ab4]/10 text-[#005ab4]'
                          : solicitud.estado_trabajo === 'fallido'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {estadoLabel(solicitud.estado_trabajo)}
                      </span>
                    </div>
                    <div>
                      <span className="font-label text-[9px] uppercase tracking-widest text-slate-400 block mb-0.5">Tipo de Documento</span>
                      <span className="font-body font-bold text-slate-900">{solicitud.servicio?.titulo || '—'}</span>
                    </div>
                    <div>
                      <span className="font-label text-[9px] uppercase tracking-widest text-slate-400 block mb-0.5">Fecha de Ingreso</span>
                      <span className="font-body text-sm text-slate-700">
                        {new Date(solicitud.creado_en).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </section>

            {/* ── FULL-WIDTH CONTACT SECTION ───────── */}
            <section className="w-full max-w-6xl mb-12">
              <div className="bg-[#005ab4] rounded-2xl p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                    <div>
                      <h3 className="font-headline text-2xl font-bold text-white">¿Necesita Asistencia?</h3>
                      <p className="font-body text-sm text-white/70">Contáctenos directamente por cualquiera de estos medios</p>
                    </div>
                  </div>
                </div>

                {/* 4 contact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                  {/* Phone 1 */}
                  <a href="tel:+5645213636"
                    className="p-4 bg-white/10 hover:bg-white hover:text-[#005ab4] text-white rounded-xl flex items-start gap-3 group transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5 group-hover:text-[#005ab4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <div>
                      <p className="font-label text-[9px] uppercase tracking-widest text-white/60 group-hover:text-[#005ab4]/60 mb-0.5">Atención General</p>
                      <p className="font-body font-bold tabular-nums text-lg">45 2 213 636</p>
                    </div>
                  </a>

                  {/* Phone 2 */}
                  <a href="tel:+5645887478"
                    className="p-4 bg-white/10 hover:bg-white hover:text-[#005ab4] text-white rounded-xl flex items-start gap-3 group transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5 group-hover:text-[#005ab4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <div>
                      <p className="font-label text-[9px] uppercase tracking-widest text-white/60 group-hover:text-[#005ab4]/60 mb-0.5">Escrituras Públicas</p>
                      <p className="font-body font-bold tabular-nums text-lg">45 2 887 478</p>
                    </div>
                  </a>

                  {/* Email 1 */}
                  <a href="mailto:contacto@notariavictoria.cl"
                    className="p-4 bg-white/10 hover:bg-white hover:text-[#005ab4] text-white rounded-xl flex items-start gap-3 group transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5 group-hover:text-[#005ab4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <div>
                      <p className="font-label text-[9px] uppercase tracking-widest text-white/60 group-hover:text-[#005ab4]/60 mb-0.5">Consultas Generales</p>
                      <p className="font-body font-bold text-sm break-all">contacto@notariavictoria.cl</p>
                    </div>
                  </a>

                  {/* Email 2 */}
                  <a href="mailto:escrituras@notariavictoria.cl"
                    className="p-4 bg-white/10 hover:bg-white hover:text-[#005ab4] text-white rounded-xl flex items-start gap-3 group transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5 group-hover:text-[#005ab4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <div>
                      <p className="font-label text-[9px] uppercase tracking-widest text-white/60 group-hover:text-[#005ab4]/60 mb-0.5">Escrituras Públicas</p>
                      <p className="font-body font-bold text-sm break-all">escrituras@notariavictoria.cl</p>
                    </div>
                  </a>

                </div>
              </div>
            </section>
          </>
        )}

      </div>
    </main>
  );
}
