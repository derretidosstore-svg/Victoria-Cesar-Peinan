import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import PrintButton from '@/components/PrintButton';

export const revalidate = 0;

export default async function PagoExitoPage(props: { searchParams: Promise<{ solicitudId?: string }> }) {
  const searchParams = await props.searchParams;
  const solicitudId = searchParams.solicitudId;

  if (!solicitudId) redirect('/');

  const supabase = await createClient();
  const { data: solicitud } = await supabase
    .from('solicitudes_cesar_peinan')
    .select(`*, servicio:servicios_cesar_peinan(id, titulo, arancel, documentos_necesarios)`)
    .eq('id', solicitudId)
    .single();

  if (!solicitud) {
    return (
      <div className="flex flex-col min-h-[70vh] items-center justify-center p-4 bg-[#f9f9ff]">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border-t-4 border-red-500 text-center">
          <h1 className="font-headline text-2xl font-bold text-slate-900 mb-4">Solicitud no encontrada</h1>
          <Link href="/" className="font-label text-[11px] uppercase tracking-widest font-bold bg-[#005ab4] text-white px-8 py-3 rounded-xl hover:bg-[#004a96] transition-all">
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  const pagado = solicitud.estado_pago === 'pagado';
  const codigo = `#${solicitud.codigo || solicitud.id.substring(0, 8).toUpperCase()}`;
  const docs = solicitud.servicio?.documentos_necesarios
    ? solicitud.servicio.documentos_necesarios.split(',').map((d: string) => d.trim()).filter(Boolean)
    : [];

  return (
    <div className="flex flex-col min-h-screen py-16 px-4 bg-[#f9f9ff] items-center justify-center">
      <div className="max-w-2xl w-full space-y-5 print-receipt-wrapper">

        {/* ── Print-only header ── */}
        <div className="hidden print:block border-b border-slate-200 pb-4 mb-2">
          <p className="font-bold text-lg text-slate-900">Notaría Cesar Peiñan Aillapan</p>
          <p className="text-xs text-slate-500">Comprobante de Trámite Notarial — {new Date().toLocaleDateString('es-CL')}</p>
        </div>

        {/* ── Header card ── */}
        <div className="print-card bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.07)] border-t-4 border-[#005ab4] p-8">
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${pagado ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-500'}`}>
              {pagado ? (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div>
              <span className="font-label text-[10px] uppercase tracking-widest text-slate-400 block mb-0.5">
                Comprobante de Trámite Notarial
              </span>
              <h1 className="font-headline text-3xl font-light text-slate-900">
                {pagado ? '¡Pago Exitoso!' : 'Solicitud Ingresada'}
              </h1>
            </div>
          </div>
        </div>

        {/* ── Resumen del trámite ── */}
        <div className="print-card bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-7 space-y-5">
          <h2 className="font-label text-[10px] uppercase tracking-widest text-slate-400">Resumen del Trámite</h2>

          {/* Código + Estado — inline row */}
          <div className="flex flex-wrap gap-4">
            <div className="print-pill flex-1 min-w-[160px] bg-[#f2f3fd] rounded-xl px-5 py-3.5 flex items-center justify-between gap-4">
              <span className="font-label text-[9px] uppercase tracking-widest text-slate-400">Código</span>
              <span className="font-mono font-bold text-[#005ab4] text-sm tracking-wider">{codigo}</span>
            </div>
            <div className="print-pill flex-1 min-w-[160px] bg-[#f2f3fd] rounded-xl px-5 py-3.5 flex items-center justify-between gap-4">
              <span className="font-label text-[9px] uppercase tracking-widest text-slate-400">Estado de pago</span>
              <span className={`font-label text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${pagado ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {pagado ? 'Pagado' : 'Validando'}
              </span>
            </div>
          </div>

          {/* Trámite + Monto + Fecha — inline row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="print-pill sm:col-span-2 bg-[#f2f3fd] rounded-xl px-5 py-3.5">
              <span className="font-label text-[9px] uppercase tracking-widest text-slate-400 block mb-1">Trámite Solicitado</span>
              <span className="font-headline text-base font-semibold text-slate-900 leading-snug">{solicitud.servicio?.titulo}</span>
            </div>
            <div className="print-pill bg-[#f2f3fd] rounded-xl px-5 py-3.5">
              <span className="font-label text-[9px] uppercase tracking-widest text-slate-400 block mb-1">Monto</span>
              <span className="font-label text-lg font-bold text-[#005ab4]">
                ${solicitud.servicio?.arancel?.toLocaleString('es-CL')}
              </span>
            </div>
          </div>

          {/* Fecha — full width thin row */}
          <div className="print-pill flex items-center justify-between px-5 py-3 bg-slate-50 rounded-xl">
            <span className="font-label text-[9px] uppercase tracking-widest text-slate-400">Fecha de Ingreso</span>
            <span className="font-body text-sm text-slate-700">
              {new Date(solicitud.creado_en).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* ── Datos del solicitante — horizontal grid (sin salto de línea) ── */}
        <div className="print-card bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-7">
          <h2 className="font-label text-[10px] uppercase tracking-widest text-slate-400 mb-4">Datos del Solicitante</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Nombre', value: solicitud.cliente_nombre },
              { label: 'RUT', value: solicitud.cliente_rut },
              { label: 'Email', value: solicitud.cliente_email },
              { label: 'Teléfono', value: solicitud.cliente_telefono },
            ].map(({ label, value }) => (
              <div key={label} className="print-pill bg-[#f2f3fd] rounded-xl px-4 py-3">
                <span className="font-label text-[9px] uppercase tracking-widest text-slate-400 block mb-1">{label}</span>
                <span className="font-body text-sm font-semibold text-slate-800 truncate block" title={value ?? ''}>{value || '—'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Envío de documentos ── */}
        <div className="print-card print-card-blue bg-[#005ab4] rounded-2xl p-7 text-white space-y-4">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <h3 className="font-headline text-lg font-bold">Paso Final: Envío de Documentos</h3>
          </div>
          <p className="font-body text-sm text-white/80 leading-relaxed">
            Envíe los documentos requeridos a{' '}
            <a href="mailto:tramites@notariavictoria.cl" className="font-bold text-white underline decoration-white/40 hover:decoration-white transition-all">
              tramites@notariavictoria.cl
            </a>{' '}
            indicando en el asunto el código{' '}
            <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded-lg">{codigo}</span>
          </p>

          {docs.length > 0 && (
            <div className="pt-4 border-t border-white/20">
              <span className="font-label text-[10px] uppercase tracking-widest text-white/60 block mb-3">Documentos requeridos</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {docs.map((doc: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 font-body text-sm text-white/90">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0 text-white/50" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Actions (hidden on print) ── */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1 print:hidden" data-print-hide>
          <Link
            href="/"
            className="flex-1 text-center font-label text-[11px] uppercase tracking-widest font-bold bg-white text-[#005ab4] border border-[#005ab4]/20 px-8 py-4 rounded-xl hover:bg-[#f2f3fd] transition-all"
          >
            Volver al Inicio
          </Link>
          <PrintButton />
        </div>

      </div>
    </div>
  );
}
