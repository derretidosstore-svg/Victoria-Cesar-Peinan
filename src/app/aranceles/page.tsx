import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import ArancelesSearch from '@/components/ArancelesSearch';

export const revalidate = 3600; // 1 hora — los aranceles cambian ~1 vez al año

export const metadata = {
  title: 'Precios y Aranceles | Notaría Cesar Peiñan Aillapan',
  description: 'Consulte nuestra lista actualizada de servicios notariales con transparencia total en cada trámite.',
};

export default async function ArancelesPage() {
  const supabase = await createClient();
  const { data: servicios, error } = await supabase
    .from('servicios_cesar_peinan')
    .select('id, titulo, arancel')
    .eq('activo', true)
    .order('titulo');

  return (
    <main className="pt-24 pb-24 px-6 max-w-4xl mx-auto">

      {/* ── Header ── */}
      <header className="mb-16 text-center">
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#964400] font-bold block mb-4">
          Institución Notarial
        </span>
        <h1 className="font-headline text-4xl md:text-5xl font-light text-slate-900 leading-tight mb-4">
          Precios y Aranceles
        </h1>
        <p className="font-body text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Consulte nuestra lista actualizada de servicios notariales. Transparencia total en cada trámite para su tranquilidad y confianza.
        </p>
      </header>

      {/* ── Error ── */}
      {error && (
        <div className="mb-8 flex items-center gap-3 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
          <p className="font-body text-sm text-red-700">Ocurrió un error al cargar los aranceles. Por favor, intente más tarde.</p>
        </div>
      )}

      {/* ── Search + Pricing list (client component) ── */}
      <ArancelesSearch servicios={servicios || []} />

      {/* ── Disclaimer ── */}
      <div className="mt-6 flex items-start gap-3 p-5 bg-[#f2f3fd] border border-[#005ab4]/10 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#005ab4] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="font-body text-sm text-slate-600 leading-relaxed">
          Los precios mostrados corresponden al arancel base de cada trámite. Dependiendo de las copias o carillas adicionales, el valor final podría variar ligeramente, lo cual será informado tras la solicitud.
        </p>
      </div>

      {/* ── CTA section ── */}
      <section className="mt-10 p-8 bg-[#005ab4] rounded-2xl text-white flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h4 className="font-headline text-xl font-bold mb-2">¿Necesita un trámite a medida?</h4>
          <p className="font-body text-sm text-white/80 leading-relaxed">
            Contamos con servicios especializados para empresas y grandes volúmenes. Contáctenos para una cotización personalizada.
          </p>
        </div>
        <div className="flex gap-4 flex-shrink-0">
          <Link
            href="/contacto"
            className="font-label text-[11px] uppercase tracking-widest font-bold bg-white text-[#005ab4] px-8 py-3.5 rounded-xl hover:bg-[#ecedf7] transition-all active:scale-95 whitespace-nowrap"
          >
            Hablar con un Ejecutivo
          </Link>
        </div>
      </section>

    </main>
  );
}
