import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 pt-20 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 mb-16">

          {/* Brand column */}
          <div className="md:col-span-5 space-y-6">
            <div className="font-headline text-2xl font-bold text-white tracking-tight">
              Notaría Cesar Peiñan
            </div>
            <p className="font-body max-w-sm leading-relaxed text-stone-500 text-sm">
              Servicios notariales rápidos, seguros y transparentes para toda la
              comunidad.
            </p>
          </div>

          {/* Links grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* Accesos Rápidos */}
            <div className="space-y-5">
              <p className="font-label text-white text-[10px] uppercase tracking-[0.3em] font-bold">
                Accesos Rápidos
              </p>
              <ul className="space-y-3 text-sm font-body">
                <li>
                  <Link href="/" className="hover:text-[#005ab4] transition-colors duration-200">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/servicios" className="hover:text-[#005ab4] transition-colors duration-200">
                    Trámites y Servicios
                  </Link>
                </li>

                <li>
                  <Link href="/solicitud/revisar" className="hover:text-[#005ab4] transition-colors duration-200">
                    Revisar Solicitud
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-[#005ab4] transition-colors duration-200">
                    Horarios y Ubicación
                  </Link>
                </li>
              </ul>
            </div>

            {/* Información Pública */}
            <div className="space-y-5">
              <p className="font-label text-white text-[10px] uppercase tracking-[0.3em] font-bold">
                Información Pública
              </p>
              <ul className="space-y-3 text-sm font-body">

                <li>
                  <Link href="/privacidad" className="hover:text-[#005ab4] transition-colors duration-200">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/administracion" className="hover:text-[#005ab4] transition-colors duration-200">
                    Acceso Administración
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-stone-900 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-label text-[11px] uppercase tracking-widest text-stone-600">
            &copy; {new Date().getFullYear()} Notaría Cesar Peiñan Aillapan. Todos los derechos reservados.
          </p>
          <span className="font-label text-[10px] tracking-widest uppercase text-stone-600">
            Victoria, Chile
          </span>
        </div>

      </div>
    </footer>
  );
}
