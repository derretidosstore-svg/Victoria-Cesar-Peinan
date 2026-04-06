import { createClient } from '@/lib/supabase/server';
import ServiceSearch from '@/components/ServiceSearch';
import Link from 'next/link';

export const revalidate = 3600; // 1 hora — los aranceles cambian ~1 vez al año

export const metadata = {
  title: 'Trámites y Servicios | Notaría Cesar Peiñan Aillapan',
  description:
    'Catálogo de trámites y servicios notariales con aranceles y requisitos. Solicite en línea de forma rápida y segura.',
};

export default async function ServiciosPage() {
  const supabase = await createClient();
  const { data: servicios, error } = await supabase
    .from('servicios_cesar_peinan')
    .select('id, titulo, descripcion, arancel, documentos_necesarios')
    .eq('activo', true)
    .order('titulo');

  return (
    <main className="bg-[#f9f9ff] min-h-screen">

      {/* ── HERO ── */}
      <section className="mb-16 flex flex-col md:flex-row gap-12 items-end px-6 sm:px-12 pt-16 max-w-screen-xl mx-auto">
        <div className="md:w-2/3">
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#964400] mb-4 block">
            Transparencia Institucional
          </span>
          <h1 className="font-headline text-6xl md:text-7xl font-light text-slate-900 leading-none mb-8">
            Trámites y Servicios
          </h1>
          <p className="font-body text-lg text-slate-500 max-w-xl leading-relaxed">
            Seleccione el trámite que desea realizar. Nuestro proceso es rápido, seguro y
            puede iniciarse completamente en línea.
          </p>
        </div>
        <div className="md:w-1/3 w-full bg-[#f2f3fd] p-8 border-y-2 border-[#005ab4]/10 rounded-xl">
          <h3 className="font-headline italic text-2xl mb-3 text-[#005ab4]">Información Relevante</h3>
          <p className="font-body text-sm text-slate-600 leading-relaxed">
            Los valores indicados son referenciales. Los precios pueden variar según la
            complejidad del documento o el número de comparecientes. Los precios incluyen IVA.
          </p>
        </div>
      </section>

      {/* ── CATÁLOGO ── */}
      <section className="px-6 sm:px-12 pb-20 max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold text-slate-900">
            Catálogo General de Servicios
          </h2>
          <div className="w-24 h-1 bg-[#005ab4] mx-auto mt-5 rounded-full" />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-xl">
            <p className="font-body text-red-700">Ocurrió un error al cargar los servicios.</p>
          </div>
        )}

        {servicios && servicios.length > 0 && (
          <ServiceSearch initialServicios={servicios} />
        )}
      </section>

      {/* ── CTA ── */}
      <section className="mx-6 sm:mx-12 mb-20 max-w-screen-xl xl:mx-auto bg-white p-12 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] flex flex-col md:flex-row justify-between items-center gap-10 border border-slate-100 rounded-2xl">
        <div className="max-w-xl">
          <h3 className="font-headline text-4xl font-bold text-slate-900 mb-3">
            ¿Necesita un presupuesto personalizado?
          </h3>
          <p className="font-body text-slate-500">
            Para trámites de alta complejidad o múltiples comparecientes, contáctenos
            y le brindamos asesoría directa.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <Link
            href="/contacto"
            className="font-label bg-[#005ab4] text-white px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-[#004a96] transition-colors rounded-xl text-center"
          >
            Contactar Notaría
          </Link>
          <Link
            href="/aranceles"
            className="font-label ring-2 ring-[#005ab4] text-[#005ab4] px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-[#005ab4]/5 transition-colors rounded-xl text-center"
          >
            Ver Aranceles
          </Link>
        </div>
      </section>

    </main>
  );
}
