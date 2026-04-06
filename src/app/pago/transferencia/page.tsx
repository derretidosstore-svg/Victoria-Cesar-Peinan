import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import PrintButton from '@/components/PrintButton';
import CopyBankingDataButton from '@/components/CopyBankingDataButton';

export const revalidate = 0;

export default async function TransferenciaInstruccionesPage(props: { searchParams: Promise<{ solicitudId?: string }> }) {
  const searchParams = await props.searchParams;
  const solicitudId = searchParams.solicitudId;

  if (!solicitudId) redirect('/');

  const supabase = await createClient();
  const { data: solicitud } = await supabase
    .from('solicitudes_cesar_peinan')
    .select('*, servicio:servicios_cesar_peinan(titulo, arancel, documentos_necesarios)')
    .eq('id', solicitudId)
    .single();

  if (!solicitud) redirect('/');

  // Update payment method if it's not already set to transferencia
  if (solicitud.metodo_pago !== 'transferencia') {
    await supabase
      .from('solicitudes_cesar_peinan')
      .update({ metodo_pago: 'transferencia' })
      .eq('id', solicitudId);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 lg:py-12 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Primary Content */}
        <div className="lg:col-span-7 space-y-6">
          <header className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-label text-primary font-bold">Estado del Trámite: Pendiente de Pago</span>
            <h1 className="text-4xl lg:text-5xl font-bold font-headline text-on-background leading-tight">Instrucciones de Transferencia.</h1>
            <p className="text-lg text-on-surface-variant font-body">Su solicitud <span className="font-bold text-on-background">#{solicitud.id.substring(0, 8).toUpperCase()}</span> ha sido registrada con éxito.</p>
          </header>

          {/* Next Steps Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1 & 2 Card */}
            <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-primary/10">
              <div className="space-y-8">
                <div className="flex gap-6">
                  <span className="text-4xl font-headline font-bold text-primary/30">01</span>
                  <p className="text-lg font-body leading-relaxed">Realice la transferencia exacta por <span className="font-bold text-xl tabular-nums">${solicitud.servicio?.arancel?.toLocaleString('es-CL')}</span>.</p>
                </div>
                <div className="flex gap-6">
                  <span className="text-4xl font-headline font-bold text-primary/30">02</span>
                  <p className="text-lg font-body leading-relaxed">En el comentario o asunto, incluya el código: <span className="font-bold font-label tracking-tight">#{solicitud.id.substring(0, 8).toUpperCase()}</span>.</p>
                </div>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-primary/10 flex flex-col justify-between">
              <div className="flex gap-6">
                <span className="text-4xl font-headline font-bold text-primary/30">03</span>
                <p className="text-lg font-body leading-relaxed">Envíe el comprobante al correo indicado. Su trámite avanzará una vez validado.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/30 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">mail</span>
                <span className="font-label text-sm font-semibold">contacto@notariavictoria.cl</span>
              </div>
            </div>
          </div>

          {/* CRITICAL EMPHASIS SECTION */}
          <section className="bg-tertiary-container/5 rounded-2xl border-l-8 border-tertiary p-8 sm:p-10 shadow-xl">
            <div className="flex items-start gap-6">
              <div className="bg-tertiary p-3">
                <span className="material-symbols-outlined text-on-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold font-headline text-tertiary">IMPORTANTE: Envíe los documentos requeridos a contacto@notariavictoria.cl o preséntelos en notaría al momento de realizar el trámite.</h2>
                <div className="space-y-3">
                  <p className="font-label text-[10px] uppercase tracking-widest text-tertiary/70 font-bold">Requisitos Obligatorios</p>
                  <div className="flex flex-wrap gap-3">
                    {solicitud.servicio?.documentos_necesarios ? (
                      solicitud.servicio.documentos_necesarios.split(',').map((doc: string, idx: number) => (
                        <span key={idx} className="bg-white px-4 py-2 border border-tertiary/20 font-body text-sm flex items-center gap-2">
                          <span className="material-symbols-outlined text-xs">description</span> {doc.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="bg-white px-4 py-2 border border-tertiary/20 font-body text-sm flex items-center gap-2 italic text-tertiary/80">
                        Sin documentos adicionales requeridos.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Banking Details Card */}
        <aside className="lg:col-span-5 sticky top-8">
          <div className="bg-surface-container-lowest ring-1 ring-black/5 rounded-3xl overflow-hidden shadow-2xl p-0">
            <div className="bg-primary p-6 sm:p-8 flex justify-between items-end">
              <div className="text-on-primary">
                <p className="font-label text-[10px] uppercase tracking-widest opacity-80 mb-2">Monto Total</p>
                <h3 className="text-4xl font-bold font-headline tabular-nums">${solicitud.servicio?.arancel?.toLocaleString('es-CL')}</h3>
              </div>
              <span className="material-symbols-outlined text-on-primary text-4xl opacity-50">payments</span>
            </div>
            <div className="p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="font-label text-[10px] uppercase tracking-wider text-outline">Banco</label>
                  <p className="text-xl font-bold font-body leading-none mt-1">Banco Estado</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label text-[10px] uppercase tracking-wider text-outline">Tipo de Cuenta</label>
                    <p className="text-lg font-medium font-body leading-none mt-1">Cuenta Corriente</p>
                  </div>
                  <div>
                    <label className="font-label text-[10px] uppercase tracking-wider text-outline">Número</label>
                    <p className="text-lg font-bold font-label tabular-nums leading-none mt-1">123456789</p>
                  </div>
                </div>
                <div>
                  <label className="font-label text-[10px] uppercase tracking-wider text-outline">RUT Destinatario</label>
                  <p className="text-lg font-bold font-label tabular-nums leading-none mt-1">76.123.456-7</p>
                </div>
                <div>
                  <label className="font-label text-[10px] uppercase tracking-wider text-outline">Nombre</label>
                  <p className="text-lg font-bold font-body leading-none mt-1">Notaría SpA</p>
                </div>
                <div>
                  <label className="font-label text-[10px] uppercase tracking-wider text-outline">Correo Confirmación</label>
                  <p className="text-lg font-medium font-body text-primary leading-none mt-1">contacto@notariavictoria.cl</p>
                </div>
              </div>

              <CopyBankingDataButton
                amount={solicitud.servicio?.arancel || 0}
                id={solicitud.id}
              />

              <p className="text-center font-label text-[10px] text-outline italic">
                Certificado por Notaría - Firma Digital Avanzada
              </p>
            </div>
          </div>

          {/* Acciones Finales (Debajo de datos del banco) */}
          <div className="mt-8 flex flex-col gap-4">
            <Link href={`/pago/exito?solicitudId=${solicitud.id}`} className="bg-primary rounded-xl text-center text-on-primary px-8 font-body text-base font-bold py-4 hover:bg-primary-container transition-all w-full active:scale-95 shadow-md">
              Transferencia Realizada
            </Link>
            <PrintButton />
          </div>

        </aside>

      </div>
    </main>
  );
}
