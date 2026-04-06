'use client';

import { useState, useMemo } from 'react';

interface Solicitud {
  id: string;
  estado_trabajo: string;
  estado_pago: string;
  metodo_pago: string;
  creado_en: string;
  actualizado_en: string;
  servicio?: {
    titulo: string;
    arancel: number;
  };
}

type PresetRange = 'hoy' | 'semana' | 'mes' | 'anio' | 'custom';

function getPresetDates(preset: PresetRange): { desde: string; hasta: string } {
  const now = new Date();
  const hasta = now.toISOString().split('T')[0];

  switch (preset) {
    case 'hoy':
      return { desde: hasta, hasta };
    case 'semana': {
      const d = new Date(now);
      d.setDate(d.getDate() - d.getDay() + 1); // Lunes
      return { desde: d.toISOString().split('T')[0], hasta };
    }
    case 'mes': {
      const d = new Date(now.getFullYear(), now.getMonth(), 1);
      return { desde: d.toISOString().split('T')[0], hasta };
    }
    case 'anio': {
      return { desde: `${now.getFullYear()}-01-01`, hasta };
    }
    default:
      return { desde: '', hasta: '' };
  }
}

export default function ReportesManager({ solicitudesListas }: { solicitudesListas: Solicitud[] }) {
  const [preset, setPreset] = useState<PresetRange>('mes');
  const [customDesde, setCustomDesde] = useState('');
  const [customHasta, setCustomHasta] = useState('');

  const { desde, hasta } = useMemo(() => {
    if (preset === 'custom') return { desde: customDesde, hasta: customHasta };
    return getPresetDates(preset);
  }, [preset, customDesde, customHasta]);

  // Filtrar solicitudes por rango de fechas
  const filtered = useMemo(() => {
    return solicitudesListas.filter(sol => {
      const dateStr = (sol.actualizado_en || sol.creado_en || '').split('T')[0];
      if (!dateStr) return false;
      if (desde && dateStr < desde) return false;
      if (hasta && dateStr > hasta) return false;
      return true;
    });
  }, [solicitudesListas, desde, hasta]);

  // Métricas principales
  const totalCompletados = filtered.length;
  const totalIngresos = filtered.reduce((sum, sol) => sum + (sol.servicio?.arancel || 0), 0);
  const promedioIngreso = totalCompletados > 0 ? Math.round(totalIngresos / totalCompletados) : 0;

  // Ingresos por método de pago
  const porMetodoPago = useMemo(() => {
    const map: Record<string, { count: number; total: number }> = {};
    filtered.forEach(sol => {
      const metodo = sol.metodo_pago || 'desconocido';
      if (!map[metodo]) map[metodo] = { count: 0, total: 0 };
      map[metodo].count++;
      map[metodo].total += sol.servicio?.arancel || 0;
    });
    return Object.entries(map).sort((a, b) => b[1].total - a[1].total);
  }, [filtered]);

  // Top trámites
  const topTramites = useMemo(() => {
    const map: Record<string, { titulo: string; count: number; total: number }> = {};
    filtered.forEach(sol => {
      const titulo = sol.servicio?.titulo || 'Desconocido';
      if (!map[titulo]) map[titulo] = { titulo, count: 0, total: 0 };
      map[titulo].count++;
      map[titulo].total += sol.servicio?.arancel || 0;
    });
    return Object.values(map).sort((a, b) => b.count - a.count).slice(0, 10);
  }, [filtered]);

  const maxTramiteCount = topTramites.length > 0 ? topTramites[0].count : 1;
  const maxMetodoTotal = porMetodoPago.length > 0 ? porMetodoPago[0][1].total : 1;

  const metodoLabel = (m: string) => {
    switch (m) {
      case 'getnet': return '💳 Webpay / Getnet';
      case 'pos_fisico': return '🏪 POS Físico';
      case 'transferencia': return '🏦 Transferencia';
      default: return m;
    }
  };

  const presets: { key: PresetRange; label: string }[] = [
    { key: 'hoy', label: 'Hoy' },
    { key: 'semana', label: 'Esta Semana' },
    { key: 'mes', label: 'Este Mes' },
    { key: 'anio', label: 'Este Año' },
    { key: 'custom', label: 'Personalizado' },
  ];

  return (
    <div className="p-8 mb-12">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
          <span className="hover:text-[#005ab4] cursor-pointer">Dashboard</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-[#005ab4]">Reportes</span>
        </nav>
        <h2 className="text-3xl font-extrabold text-[#181c22] tracking-tight">Reportes e Indicadores</h2>
        <p className="text-sm text-slate-500 mt-1">Métricas de gestión basadas en solicitudes completadas (estado: Listo)</p>
      </div>

      {/* Filtros de Fecha */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {presets.map(p => (
              <button
                key={p.key}
                onClick={() => setPreset(p.key)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  preset === p.key
                    ? 'bg-[#005ab4] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {preset === 'custom' && (
            <div className="flex items-center gap-3 ml-auto">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block mb-1">Desde</label>
                <input
                  type="date"
                  value={customDesde}
                  onChange={(e) => setCustomDesde(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#005ab4] focus:ring-1 focus:ring-[#005ab4]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block mb-1">Hasta</label>
                <input
                  type="date"
                  value={customHasta}
                  onChange={(e) => setCustomHasta(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#005ab4] focus:ring-1 focus:ring-[#005ab4]"
                />
              </div>
            </div>
          )}

          {preset !== 'custom' && desde && (
            <div className="ml-auto text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
              📅 {new Date(desde + 'T12:00:00').toLocaleDateString('es-CL')} — {new Date(hasta + 'T12:00:00').toLocaleDateString('es-CL')}
            </div>
          )}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Completados */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Trámites Completados</p>
          <p className="text-4xl font-black text-slate-900 mt-1 tabular-nums">{totalCompletados}</p>
        </div>

        {/* Ingresos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#005ab4]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Ingresos Totales</p>
          <p className="text-4xl font-black text-slate-900 mt-1 tabular-nums">${totalIngresos.toLocaleString('es-CL')}</p>
        </div>

        {/* Promedio */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
            </div>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Ingreso Promedio</p>
          <p className="text-4xl font-black text-slate-900 mt-1 tabular-nums">${promedioIngreso.toLocaleString('es-CL')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ingresos por Método de Pago */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Ingresos por Método de Pago</h3>
          </div>
          <div className="p-6">
            {porMetodoPago.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">Sin datos para este rango de fechas.</p>
            ) : (
              <div className="space-y-5">
                {porMetodoPago.map(([metodo, data]) => (
                  <div key={metodo}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-slate-700">{metodoLabel(metodo)}</span>
                      <div className="text-right">
                        <span className="text-lg font-black text-slate-900 tabular-nums">${data.total.toLocaleString('es-CL')}</span>
                        <span className="text-xs text-slate-400 ml-2">({data.count} trámites)</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#005ab4] to-[#0078f0]"
                        style={{ width: `${Math.max((data.total / maxMetodoTotal) * 100, 4)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trámites Más Solicitados */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Trámites Más Solicitados</h3>
          </div>
          <div className="p-6">
            {topTramites.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">Sin datos para este rango de fechas.</p>
            ) : (
              <div className="space-y-4">
                {topTramites.map((t, i) => (
                  <div key={t.titulo} className="flex items-center gap-4">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                      i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-slate-200 text-slate-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-2 mb-1">
                        <span className="text-sm font-bold text-slate-800 truncate">{t.titulo}</span>
                        <span className="text-xs font-bold text-slate-500 shrink-0 tabular-nums">{t.count}x · ${t.total.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-400 to-emerald-600"
                          style={{ width: `${Math.max((t.count / maxTramiteCount) * 100, 4)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabla Detallada */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Detalle de Trámites Completados</h3>
          <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-bold">{filtered.length} registros</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                <th className="px-6 py-3 border-b border-slate-100">Fecha</th>
                <th className="px-4 py-3 border-b border-slate-100">Trámite</th>
                <th className="px-4 py-3 border-b border-slate-100">Método</th>
                <th className="px-4 py-3 border-b border-slate-100 text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-50">
              {filtered.slice(0, 50).map(sol => (
                <tr key={sol.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-slate-600 tabular-nums">
                    {new Date(sol.actualizado_en || sol.creado_en).toLocaleDateString('es-CL')}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{sol.servicio?.titulo || '—'}</td>
                  <td className="px-4 py-3 text-slate-600">{metodoLabel(sol.metodo_pago)}</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900 tabular-nums">${(sol.servicio?.arancel || 0).toLocaleString('es-CL')}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Sin trámites completados en el rango seleccionado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 50 && (
          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500">
            Mostrando 50 de {filtered.length} registros. Ajuste el rango de fechas para ver más.
          </div>
        )}
      </div>
    </div>
  );
}
