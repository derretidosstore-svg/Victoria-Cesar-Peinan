import { createClient } from '@/lib/supabase/server';
import SolicitudForm from '@/components/SolicitudForm';
import Script from 'next/script';

export const metadata = {
  title: 'Solicitar Trámite | Notaría Cesar Peiñan Aillapan',
  description: 'Complete el formulario para solicitar su trámite notarial en línea de forma rápida y segura.',
};

export default async function SolicitarPage(
  props: { searchParams: Promise<{ servicio?: string }> }
) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const { data: servicios, error } = await supabase
    .from('servicios_cesar_peinan')
    .select('id, titulo, arancel, documentos_necesarios')
    .eq('activo', true)
    .order('titulo');

  return (
    <main className="bg-[#f9f9ff] min-h-screen">
      {/* Google Maps Places API */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&language=es`}
        strategy="lazyOnload"
        id="google-maps"
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">

            <div className="space-y-5">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#964400] font-bold block">
                Institución Notarial
              </span>
              <h1 className="font-headline text-5xl md:text-6xl font-light text-slate-900 leading-tight">
                Solicitar Trámite Notarial
              </h1>
              <p className="font-body text-lg text-slate-500 leading-relaxed">
                Complete el formulario con sus datos personales. Asegúrese de ingresar la información
                correctamente para poder contactarle durante el proceso.
              </p>
            </div>

            {/* Info box */}
            <div className="bg-white border-l-4 border-[#005ab4] rounded-xl p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] space-y-3">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#005ab4] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <h3 className="font-headline text-lg font-bold text-slate-900">Envío de Documentos</h3>
              </div>
              <p className="font-body text-sm text-slate-500 leading-relaxed">
                Una vez completado el pago, envíe sus documentos digitalizados a{' '}
                <strong className="text-[#005ab4]">tramites@notariavictoria.cl</strong>{' '}
                adjuntando el código de solicitud generado por el sistema.
              </p>
            </div>

            {/* Security badge */}
            <div className="flex items-center gap-4 pt-2">
              <div className="w-10 h-10 flex items-center justify-center bg-[#005ab4]/8 rounded-xl flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#005ab4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-slate-400">Datos protegidos</p>
                <p className="font-body text-sm font-semibold text-slate-700">Información cifrada y segura</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: FORM ── */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.10)] border-t-4 border-[#005ab4] overflow-hidden">
              {error ? (
                <div className="p-10">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
                    <p className="font-body text-red-700">Error al cargar los servicios. Por favor, intente más tarde.</p>
                  </div>
                </div>
              ) : (
                <SolicitudForm servicios={servicios || []} preselectedId={searchParams.servicio} />
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
