import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidad | Notaría Cesar Peiñan Aillapan',
  description: 'Política de privacidad y tratamiento de datos personales de la Notaría Cesar Peiñan Aillapan, Victoria, Chile.',
};

export default function PoliticaPrivacidadPage() {
  return (
    <main className="pt-24 pb-24 px-6 max-w-4xl mx-auto">

      {/* Header */}
      <header className="mb-16 text-center">
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#964400] font-bold block mb-4">
          Documento Legal
        </span>
        <h1 className="font-headline text-4xl md:text-5xl font-light text-slate-900 leading-tight mb-4">
          Política de Privacidad
        </h1>
        <p className="font-body text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Conozca cómo recopilamos, utilizamos y protegemos su información personal en cumplimiento con la legislación chilena vigente.
        </p>
        <p className="font-label text-[11px] text-slate-400 mt-6 uppercase tracking-widest">
          Última actualización: Abril 2026
        </p>
      </header>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-200/80 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">

          {/* 1. Responsable */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-headline text-4xl font-bold text-[#005ab4]/15 select-none">01</span>
              <h2 className="font-headline text-2xl font-bold text-slate-900">Responsable del Tratamiento</h2>
            </div>
            <p className="font-body text-slate-600 leading-relaxed">
              El responsable del tratamiento de sus datos personales es la <strong>Notaría Cesar Peiñan Aillapan</strong>,
              con domicilio en Victoria, Región de la Araucanía, Chile. Para cualquier consulta relacionada con el
              tratamiento de sus datos personales, puede contactarnos a través de:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Correo electrónico</span>
                <span className="font-body font-bold text-sm text-slate-800">contacto@notariavictoria.cl</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Teléfono</span>
                <span className="font-body font-bold text-sm text-slate-800">45 2 213 636</span>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 2. Datos recopilados */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-headline text-4xl font-bold text-[#005ab4]/15 select-none">02</span>
              <h2 className="font-headline text-2xl font-bold text-slate-900">Datos Personales que Recopilamos</h2>
            </div>
            <p className="font-body text-slate-600 leading-relaxed">
              En el ejercicio de nuestras funciones notariales y a través de este sitio web, podemos recopilar los siguientes datos personales:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Nombre completo',
                'Rol Único Tributario (RUT)',
                'Correo electrónico',
                'Número de teléfono',
                'Dirección domiciliaria',
                'Datos de pago (procesados por Getnet)',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#f2f3fd] p-3 rounded-lg border border-[#005ab4]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#005ab4] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  <span className="font-body text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 3. Finalidad */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-headline text-4xl font-bold text-[#005ab4]/15 select-none">03</span>
              <h2 className="font-headline text-2xl font-bold text-slate-900">Finalidad del Tratamiento</h2>
            </div>
            <p className="font-body text-slate-600 leading-relaxed">
              Sus datos personales son tratados exclusivamente para las siguientes finalidades:
            </p>
            <ul className="space-y-3">
              {[
                { title: 'Gestión de trámites notariales', desc: 'Procesamiento, registro y seguimiento de las solicitudes de trámites ingresadas a través de este sitio o en nuestras oficinas.' },
                { title: 'Emisión de documentos legales', desc: 'Elaboración de escrituras públicas, certificaciones, legalizaciones y demás instrumentos notariales.' },
                { title: 'Comunicación con el cliente', desc: 'Notificación sobre el estado de sus trámites, cambios en el servicio, o información relevante para la gestión de su solicitud.' },
                { title: 'Procesamiento de pagos', desc: 'Gestión de cobros y emisión de boletas o facturas correspondientes a los servicios notariales prestados.' },
                { title: 'Cumplimiento legal', desc: 'Cumplimiento de las obligaciones legales y reglamentarias impuestas a los Notarios Públicos por la legislación chilena.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#005ab4]/40 flex-shrink-0" />
                  <div>
                    <span className="font-body text-sm font-bold text-slate-900">{item.title}:</span>{' '}
                    <span className="font-body text-sm text-slate-600">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-slate-100" />

          {/* 4. Base legal */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-headline text-4xl font-bold text-[#005ab4]/15 select-none">04</span>
              <h2 className="font-headline text-2xl font-bold text-slate-900">Base Legal</h2>
            </div>
            <p className="font-body text-slate-600 leading-relaxed">
              El tratamiento de sus datos personales se fundamenta en:
            </p>
            <div className="bg-[#f2f3fd] border border-[#005ab4]/10 rounded-xl p-6 space-y-3">
              <p className="font-body text-sm text-slate-700 leading-relaxed">
                <strong>Ley N° 19.628</strong> sobre Protección de la Vida Privada (y sus modificaciones), que regula
                el tratamiento de datos personales en Chile.
              </p>
              <p className="font-body text-sm text-slate-700 leading-relaxed">
                <strong>Código Orgánico de Tribunales</strong>, que establece las obligaciones y facultades de los
                Notarios Públicos en el ejercicio de sus funciones.
              </p>
              <p className="font-body text-sm text-slate-700 leading-relaxed">
                <strong>Consentimiento del titular</strong>, otorgado al completar formularios en este sitio web
                o al presentarse en nuestras oficinas para la realización de trámites.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 5. Seguridad */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-headline text-4xl font-bold text-[#005ab4]/15 select-none">05</span>
              <h2 className="font-headline text-2xl font-bold text-slate-900">Medidas de Seguridad</h2>
            </div>
            <p className="font-body text-slate-600 leading-relaxed">
              Implementamos medidas técnicas y organizativas para proteger sus datos personales contra el acceso
              no autorizado, la alteración, divulgación o destrucción. Entre estas medidas se incluyen:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
                  title: 'Cifrado SSL/TLS', 
                  desc: 'Toda la comunicación con nuestro sitio web está cifrada.' 
                },
                { 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                  title: 'Acceso restringido', 
                  desc: 'Solo personal autorizado accede a los datos de clientes.' 
                },
                { 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>,
                  title: 'Pagos seguros', 
                  desc: 'Los pagos son procesados por Getnet/Webpay, nunca almacenamos datos de tarjetas.' 
                },
                { 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>,
                  title: 'Respaldos periódicos', 
                  desc: 'La información se respalda de forma segura y periódica.' 
                },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#005ab4]">{item.icon}</span>
                    <span className="font-body font-bold text-sm text-slate-900">{item.title}</span>
                  </div>
                  <p className="font-body text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 6. Derechos */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-headline text-4xl font-bold text-[#005ab4]/15 select-none">06</span>
              <h2 className="font-headline text-2xl font-bold text-slate-900">Sus Derechos</h2>
            </div>
            <p className="font-body text-slate-600 leading-relaxed">
              De acuerdo con la Ley N° 19.628, usted tiene derecho a:
            </p>
            <ul className="space-y-3">
              {[
                { title: 'Acceso', desc: 'Solicitar información sobre los datos personales que tenemos registrados sobre usted.' },
                { title: 'Rectificación', desc: 'Solicitar la corrección de datos personales inexactos o incompletos.' },
                { title: 'Cancelación', desc: 'Solicitar la eliminación de sus datos personales cuando ya no sean necesarios para la finalidad para la cual fueron recopilados.' },
                { title: 'Oposición', desc: 'Oponerse al tratamiento de sus datos personales en determinadas circunstancias previstas por la ley.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 bg-[#005ab4] text-white text-[10px] font-bold w-5 h-5 rounded flex items-center justify-center flex-shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <div>
                    <span className="font-body text-sm font-bold text-slate-900">{item.title}:</span>{' '}
                    <span className="font-body text-sm text-slate-600">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-slate-500 italic leading-relaxed">
              Para ejercer estos derechos, envíe una solicitud escrita a <strong className="text-[#005ab4]">contacto@notariavictoria.cl</strong> indicando
              su nombre completo, RUT y el derecho que desea ejercer.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 7. Cookies */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-headline text-4xl font-bold text-[#005ab4]/15 select-none">07</span>
              <h2 className="font-headline text-2xl font-bold text-slate-900">Cookies y Tecnologías Similares</h2>
            </div>
            <p className="font-body text-slate-600 leading-relaxed">
              Este sitio web utiliza cookies estrictamente necesarias para su funcionamiento, incluyendo la gestión
              de sesiones de usuario y la seguridad del sitio. No utilizamos cookies con fines publicitarios ni de
              seguimiento de terceros.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 8. Terceros */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-headline text-4xl font-bold text-[#005ab4]/15 select-none">08</span>
              <h2 className="font-headline text-2xl font-bold text-slate-900">Transferencia a Terceros</h2>
            </div>
            <p className="font-body text-slate-600 leading-relaxed">
              No compartimos, vendemos ni transferimos sus datos personales a terceros, salvo en los siguientes casos:
            </p>
            <ul className="space-y-2">
              {[
                'Cuando sea requerido por ley, orden judicial o autoridad competente.',
                'Para el procesamiento de pagos a través de plataformas autorizadas (Getnet/Webpay).',
                'Cuando sea estrictamente necesario para el cumplimiento de las funciones notariales.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span className="font-body text-sm text-slate-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-slate-100" />

          {/* 9. Modificaciones */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-headline text-4xl font-bold text-[#005ab4]/15 select-none">09</span>
              <h2 className="font-headline text-2xl font-bold text-slate-900">Modificaciones</h2>
            </div>
            <p className="font-body text-slate-600 leading-relaxed">
              Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Las
              modificaciones serán publicadas en esta misma página con la fecha de la última actualización.
              Le recomendamos revisar esta política periódicamente.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* 10. Transparencia */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-headline text-4xl font-bold text-[#005ab4]/15 select-none">10</span>
              <h2 className="font-headline text-2xl font-bold text-slate-900">Transparencia Institucional</h2>
            </div>
            <p className="font-body text-slate-600 leading-relaxed">
              En nuestro compromiso con la claridad y la ética notarial, disponemos de un portal con información
              acerca de nuestro equipo y sus correspondientes remuneraciones. Puede consultar estos 
              detalles a través de nuestro{' '}
              <Link href="/transparencia" className="text-[#005ab4] font-bold hover:underline">
                Portal de Transparencia
              </Link>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
