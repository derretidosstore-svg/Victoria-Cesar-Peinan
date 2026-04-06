'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RevisarSolicitudPage() {
  const [code, setCode] = useState('');
  const [rut, setRut] = useState('');
  const [errors, setErrors] = useState<{ code?: string; rut?: string }>({});
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { code?: string; rut?: string } = {};
    const cleanedCode = code.trim().replace(/^#/, '').toLowerCase();
    const cleanedRut  = rut.trim();

    if (!cleanedCode || cleanedCode.length < 6) {
      newErrors.code = 'Ingrese un código de solicitud válido (mín. 6 caracteres).';
    }
    if (!cleanedRut || cleanedRut.length < 7) {
      newErrors.rut = 'Ingrese un RUT válido. Ej: 12.345.678-9';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    router.push(
      `/solicitud/estado?codigo=${encodeURIComponent(cleanedCode)}&rut=${encodeURIComponent(cleanedRut)}`
    );
  };

  return (
    <main className="min-h-screen bg-[#f9f9ff] flex flex-col">
      <div className="flex-grow pt-12 pb-20 px-6 sm:px-12 max-w-7xl mx-auto w-full">

        {/* Grid: left info + right form */}
        <div className="flex flex-col lg:flex-row gap-14 items-start">

          {/* ─ LEFT: descripción ─ */}
          <div className="w-full lg:w-5/12 space-y-7">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#964400] font-bold block">
              Portal de Seguimiento
            </span>
            <h1 className="font-headline text-5xl md:text-6xl leading-[1.1] text-[#005ab4] font-light">
              Revisar Solicitud
            </h1>
            <p className="font-body text-lg leading-relaxed text-slate-600 max-w-md">
              Ingrese su RUT y el código de solicitud para consultar el estado actual
              de su trámite notarial.
            </p>

            {/* Security badge */}
            <div className="pt-7 border-t border-slate-200 flex items-center gap-5">
              <div className="w-12 h-12 flex items-center justify-center bg-[#005ab4]/8 rounded-xl flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#005ab4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-slate-400">Seguridad de Datos</p>
                <p className="font-body text-sm font-semibold text-slate-800">Conexión cifrada y segura</p>
              </div>
            </div>

            {/* Help card */}
            <div className="p-6 bg-[#f2f3fd] border-l-4 border-[#005ab4] rounded-xl flex gap-4 items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#005ab4] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <div>
                <h4 className="font-headline font-bold text-sm text-slate-900 mb-1">¿Necesita asistencia?</h4>
                <p className="font-body text-xs text-slate-500 leading-relaxed">
                  Si ha perdido su código, llámenos al{' '}
                  <a href="tel:+5645213636" className="text-[#005ab4] font-semibold hover:underline">45 2 213 636</a>
                  {' '}o acérquese con su cédula de identidad.
                </p>
              </div>
            </div>
          </div>

          {/* ─ RIGHT: formulario ─ */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/5 rounded-2xl relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#005ab4]/5 -mr-12 -mt-12 rotate-45 pointer-events-none" />

              {/* Form header */}
              <div className="px-8 pt-8 pb-6 border-b border-slate-100">
                <h2 className="font-headline text-2xl font-bold text-slate-900">
                  Datos de Identificación
                </h2>
                <p className="font-body text-sm text-slate-400 mt-1">
                  Ambos campos son requeridos para consultar su solicitud.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="px-8 py-10 space-y-8">

                {/* ── Campo: RUT ── */}
                <div className="group">
                  <label
                    className="font-label text-[10px] uppercase tracking-widest text-slate-400 block mb-2 group-focus-within:text-[#005ab4] transition-colors"
                    htmlFor="rut_field"
                  >
                    RUT del Solicitante
                  </label>
                  <div className={`flex items-center border-b-2 pb-2 transition-all ${errors.rut ? 'border-red-400' : 'border-slate-200 group-focus-within:border-[#005ab4]'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-focus-within:text-[#005ab4] mr-3 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <input
                      id="rut_field"
                      type="text"
                      value={rut}
                      onChange={(e) => { setRut(e.target.value); setErrors((p) => ({ ...p, rut: undefined })); }}
                      placeholder="12.345.678-9"
                      className="w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0 font-headline text-2xl placeholder:text-slate-300"
                      autoComplete="off"
                    />
                  </div>
                  {errors.rut ? (
                    <p className="font-body text-xs text-red-500 mt-2">{errors.rut}</p>
                  ) : (
                    <p className="font-label text-[10px] text-slate-400 mt-2 italic">Ingrese el RUT con punto y guión.</p>
                  )}
                </div>

                {/* ── Campo: Código ── */}
                <div className="group">
                  <label
                    className="font-label text-[10px] uppercase tracking-widest text-slate-400 block mb-2 group-focus-within:text-[#005ab4] transition-colors"
                    htmlFor="request_code"
                  >
                    Código de Solicitud
                  </label>
                  <div className={`flex items-center border-b-2 pb-2 transition-all ${errors.code ? 'border-red-400' : 'border-slate-200 group-focus-within:border-[#005ab4]'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-focus-within:text-[#005ab4] mr-3 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                    </svg>
                    <input
                      id="request_code"
                      type="text"
                      value={code}
                      onChange={(e) => { setCode(e.target.value); setErrors((p) => ({ ...p, code: undefined })); }}
                      placeholder="Ej: CB640AE4"
                      className="w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0 font-headline text-2xl placeholder:text-slate-300 uppercase tracking-widest"
                      autoComplete="off"
                    />
                  </div>
                  {errors.code ? (
                    <p className="font-body text-xs text-red-500 mt-2">{errors.code}</p>
                  ) : (
                    <p className="font-label text-[10px] text-slate-400 mt-2 italic">El código se encuentra en su comprobante de atención.</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#005ab4] text-white py-5 px-8 font-label text-[11px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 hover:bg-[#004a96] transition-all active:scale-[0.98] rounded-xl mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005ab4]/50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  Consultar Solicitud
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
