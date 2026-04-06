'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Servicio = {
  id: string;
  titulo: string;
  descripcion: string | null;
  arancel: number | null;
  documentos_necesarios: string | null;
};

// Format price Chilean style
function formatPrice(n: number | null) {
  if (!n && n !== 0) return '—';
  return `$\u00a0${n.toLocaleString('es-CL')}`;
}

// Parse comma-separated requisitos
function parseRequisitos(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((r) => r.trim())
    .filter(Boolean);
}

export default function ServiceSearch({
  initialServicios,
}: {
  initialServicios: Servicio[];
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServicio, setSelectedServicio] = useState<Servicio | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedServicio(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedServicio) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedServicio]);

  const filtered = initialServicios.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.titulo.toLowerCase().includes(term) ||
      (s.descripcion ?? '').toLowerCase().includes(term)
    );
  });

  return (
    <>
      {/* Search bar */}
      <div className="mb-10 max-w-2xl mx-auto">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-[#005ab4]/20 focus-within:border-[#005ab4] transition-all"
        >
          {/* Lupa */}
          <div className="pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          {/* Input */}
          <input
            type="text"
            className="flex-grow px-3 py-3.5 bg-transparent placeholder-slate-400 focus:outline-none text-sm font-body text-slate-900"
            placeholder="Buscar por nombre de trámite o palabras clave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Botón Buscar */}
          <button
            type="submit"
            className="h-full font-label text-[11px] uppercase tracking-widest font-bold bg-[#005ab4] text-white px-6 py-3.5 hover:bg-[#004a96] transition-colors flex-shrink-0 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            Buscar
          </button>
        </form>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="font-body text-slate-500">No se encontraron trámites para su búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((servicio) => {
            const requisitos = parseRequisitos(servicio.documentos_necesarios);
            return (
              <div
                key={servicio.id}
                onClick={() => setSelectedServicio(servicio)}
                className="bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
              >
                {/* Card body */}
                <div className="p-8 flex flex-col flex-grow">
                  {/* Icon only */}
                  <div className="w-10 h-10 bg-[#005ab4]/5 rounded-xl flex items-center justify-center flex-shrink-0 mb-5 group-hover:bg-[#005ab4]/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#005ab4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h2 className="font-headline text-xl font-bold text-slate-900 mb-3 group-hover:text-[#005ab4] transition-colors leading-snug">
                    {servicio.titulo}
                  </h2>

                  {/* Descripcion Corta */}
                  {servicio.descripcion && (
                    <p className="font-body text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                      {servicio.descripcion}
                    </p>
                  )}

                  {/* Requisitos */}
                  {requisitos.length > 0 && (
                    <div className="mt-auto pt-4">
                      <p className="font-label text-[9px] uppercase tracking-widest text-slate-400 mb-2">
                        Requisitos Clave
                      </p>
                      <ul className="space-y-1">
                        {requisitos.slice(0, 3).map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#005ab4]/40 flex-shrink-0" />
                            <span className="font-body text-sm italic text-slate-500 leading-snug line-clamp-1">{req}</span>
                          </li>
                        ))}
                        {requisitos.length > 3 && (
                          <li className="font-body text-[10px] text-[#005ab4] font-medium pt-1 italic">
                            + {requisitos.length - 3} más...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card footer — precio + acción */}
                <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-label text-[9px] uppercase tracking-widest text-slate-400 mb-0.5">Arancel</p>
                    <p className="font-label font-bold text-lg tabular-nums text-slate-900">
                      {formatPrice(servicio.arancel)}
                    </p>
                  </div>
                  <div className="text-[10px] font-label font-bold uppercase tracking-widest text-[#005ab4] flex items-center gap-1 transition-all">
                    Ver Detalles
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── MODAL DE DETALLES ── */}
      {selectedServicio && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedServicio(null)}
          />
          
          {/* Modal Content container */}
          <div className="bg-white w-full max-w-2xl relative shadow-2xl rounded-3xl ring-1 ring-black/5 overflow-hidden flex flex-col md:max-h-[90vh] animate-in zoom-in-95 fade-in duration-300">
            {/* Close Button */}
            <button
              onClick={() => setSelectedServicio(null)}
              className="absolute top-6 right-6 z-20 p-2 bg-slate-100/50 hover:bg-slate-100 rounded-full transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 group-active:scale-95 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header / Accent top */}
            <div className="h-2 w-full bg-[#005ab4]" />

            <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar">
              {/* Service Icon & Badge */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#005ab4]/5 rounded-2xl flex items-center justify-center text-[#005ab4]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#005ab4] font-bold">Catálogo de Servicios</span>
                  <h1 className="font-headline text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                    {selectedServicio.titulo}
                  </h1>
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
                {/* Description */}
                <div className="space-y-4">
                  <h3 className="font-label text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                    <span className="w-6 h-[1px] bg-slate-200" /> Descripción del Trámite
                  </h3>
                  <p className="font-body text-base text-slate-600 leading-relaxed italic">
                    {selectedServicio.descripcion || 'Sin descripción disponible para este trámite.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-slate-100 pt-10">
                  {/* Requisitos */}
                  <div className="space-y-4">
                    <h3 className="font-label text-xs uppercase tracking-widest text-[#005ab4] font-bold">Requisitos Obligatorios</h3>
                    {selectedServicio.documentos_necesarios ? (
                      <ul className="space-y-3">
                        {parseRequisitos(selectedServicio.documentos_necesarios).map((req, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-sm text-[#005ab4] mt-0.5">check_circle</span>
                            <span className="font-body text-sm text-slate-700 leading-relaxed">{req}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="font-body text-sm text-slate-400 italic">No requiere documentación especial.</p>
                    )}
                  </div>

                  {/* Arancel & Info */}
                  <div className="space-y-6">
                    <div className="bg-[#f2f3fd] p-6 rounded-2xl border border-[#005ab4]/10 shadow-sm">
                      <p className="font-label text-[10px] uppercase tracking-widest text-[#717785] mb-2">Arancel Referencial</p>
                      <p className="font-headline text-4xl font-bold text-slate-900 tabular-nums">
                        {formatPrice(selectedServicio.arancel)}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2 font-body italic">Precios pueden variar según complejidad.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón Acción */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/solicitar?servicio=${selectedServicio.id}`}
                  className="flex-1 bg-primary text-on-primary py-5 rounded-2xl font-body font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#bd5700] transition-colors active:scale-[0.98] shadow-lg shadow-[#005ab4]/10"
                >
                  <span className="material-symbols-outlined">add_task</span>
                  Iniciar Trámite Ahora
                </Link>
                <button
                  onClick={() => setSelectedServicio(null)}
                  className="sm:px-8 py-5 text-slate-500 font-body font-medium hover:text-slate-800 transition-colors"
                >
                  Volver al Catálogo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

