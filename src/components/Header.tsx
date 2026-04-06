'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/60 shadow-sm">
      <div className="flex justify-between items-center w-full px-6 sm:px-10 py-5 max-w-screen-xl mx-auto">

        {/* Logo / Brand */}
        <Link href="/" className="font-headline text-xl md:text-2xl font-bold tracking-tight text-slate-900 hover:text-[#005ab4] transition-colors">
          Notaría Cesar Peiñan
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link
            href="/"
            className="font-body text-[#005ab4] font-semibold border-b-2 border-[#005ab4] pb-0.5 text-sm transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/servicios"
            className="font-body text-slate-600 font-medium text-sm hover:text-[#005ab4] transition-colors duration-200"
          >
            Trámites y Servicios
          </Link>
          <Link
            href="/aranceles"
            className="font-body text-slate-600 font-medium text-sm hover:text-[#005ab4] transition-colors duration-200"
          >
            Precios y Aranceles
          </Link>
          <Link
            href="/solicitud/revisar"
            className="font-body text-slate-600 font-medium text-sm hover:text-[#005ab4] transition-colors duration-200"
          >
            Revisar Solicitud
          </Link>
          <Link
            href="/administracion"
            className="font-label bg-slate-900 text-white px-6 py-2.5 text-xs font-bold tracking-wide uppercase hover:bg-[#005ab4] transition-colors duration-200 rounded-lg"
          >
            Acceso Admin
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-slate-700 hover:text-[#005ab4] transition-colors focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col px-6 py-4 gap-1">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="font-body px-3 py-3 text-base font-semibold text-[#005ab4] border-b border-slate-100"
            >
              Inicio
            </Link>
            <Link
              href="/servicios"
              onClick={() => setIsMenuOpen(false)}
              className="font-body px-3 py-3 text-base font-medium text-slate-700 hover:text-[#005ab4] hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100"
            >
              Trámites y Servicios
            </Link>
            <Link
              href="/aranceles"
              onClick={() => setIsMenuOpen(false)}
              className="font-body px-3 py-3 text-base font-medium text-slate-700 hover:text-[#005ab4] hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100"
            >
              Precios y Aranceles
            </Link>
            <Link
              href="/solicitud/revisar"
              onClick={() => setIsMenuOpen(false)}
              className="font-body px-3 py-3 text-base font-medium text-slate-700 hover:text-[#005ab4] hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100"
            >
              Revisar Solicitud
            </Link>
            <Link
              href="/administracion"
              onClick={() => setIsMenuOpen(false)}
              className="font-label mt-2 text-center bg-slate-900 text-white px-6 py-3 text-sm font-bold tracking-wide uppercase hover:bg-[#005ab4] transition-colors rounded-lg"
            >
              Acceso Admin
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
