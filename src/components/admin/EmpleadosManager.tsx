'use client';

import { useState, useMemo, useEffect } from 'react';
import { updateEmpleado, createEmpleado, toggleEmpleadoActivo } from '@/app/actions/admin';

export default function EmpleadosManager({ initialEmpleados, userRole }: { initialEmpleados: any[], userRole: string }) {
  const [empleados, setEmpleados] = useState(initialEmpleados);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const canEdit = ['notario', 'notario_suplente', 'supervisor'].includes(userRole);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterEstado]);

  const stats = useMemo(() => {
    let notarios = 0;
    let regulares = 0;
    let activos = 0;
    let inactivos = 0;
    empleados.forEach(e => {
      if (e.rol === 'notario') notarios++;
      else regulares++;
      if (e.activo === false) inactivos++;
      else activos++;
    });
    return {
      total: empleados.length,
      notarios,
      regulares,
      activos,
      inactivos
    };
  }, [empleados]);

  const listFiltered = useMemo(() => {
    return empleados.filter(e => {
      if (searchTerm && !e.nombre.toLowerCase().includes(searchTerm.toLowerCase()) && !e.email.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (filterEstado === 'activo' && e.activo === false) return false;
      if (filterEstado === 'inactivo' && e.activo !== false) return false;
      return true;
    });
  }, [empleados, searchTerm, filterEstado]);

  const totalPages = Math.ceil(listFiltered.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listFiltered.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (id: string) => {
    if (canEdit) setEditingId(id);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await updateEmpleado(formData);
    
    if (result.success) {
      setEditingId(null);
      window.location.reload(); 
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await createEmpleado(formData);
    
    if (result.success) {
      setEditingId(null);
      window.location.reload(); 
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const handleToggleActivo = async (empleadoId: string, currentActivo: boolean) => {
    const nuevoEstado = !currentActivo;
    const accion = nuevoEstado ? 'ACTIVAR' : 'DESACTIVAR';
    
    if (!confirm(`¿Está seguro de ${accion} a este empleado? ${!nuevoEstado ? 'No podrá iniciar sesión.' : 'Podrá iniciar sesión nuevamente.'}`)) {
      return;
    }

    setTogglingId(empleadoId);
    const result = await toggleEmpleadoActivo(empleadoId, nuevoEstado);
    
    if (result.success) {
      setEmpleados(prev => prev.map(e => 
        e.id === empleadoId ? { ...e, activo: nuevoEstado } : e
      ));
    } else {
      alert(result.error);
    }
    setTogglingId(null);
  };

  return (
    <section className="p-8 mb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
            <span className="hover:text-[#005ab4] cursor-pointer">Dashboard</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-[#005ab4]">Gestión de Empleados</span>
          </nav>
          <h2 className="text-3xl font-extrabold text-[#181c22] tracking-tight">Gestión de Empleados</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#005ab4]/20 focus:border-[#005ab4] placeholder:text-slate-400 shadow-sm"
              placeholder="Buscar por nombre o correo..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter by estado */}
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-[#005ab4]/20 focus:border-[#005ab4] shadow-sm cursor-pointer"
          >
            <option value="">Todos</option>
            <option value="activo">✅ Activos</option>
            <option value="inactivo">🚫 Inactivos</option>
          </select>

          {canEdit && (
            <button 
              onClick={() => setEditingId('new')}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-[#005ab4] text-white hover:bg-[#00458a] shadow-sm ml-0 sm:ml-2 w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Nuevo Empleado
            </button>
          )}
        </div>
      </div>

      {/* Dashboard Stats Bento */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Total */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-md">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-slate-50 text-slate-500">
              <span className="material-symbols-outlined text-[20px]">group</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Personal</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
          </div>
        </div>

        {/* Activos */}
        <div 
          onClick={() => setFilterEstado(filterEstado === 'activo' ? '' : 'activo')}
          className={`cursor-pointer bg-white p-5 rounded-xl shadow-sm border flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-md ${filterEstado === 'activo' ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-100'}`}
        >
          <div className="flex justify-between items-start">
            <div className={`p-2 rounded-lg ${filterEstado === 'activo' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Activos</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stats.activos}</p>
          </div>
        </div>

        {/* Inactivos */}
        <div 
          onClick={() => setFilterEstado(filterEstado === 'inactivo' ? '' : 'inactivo')}
          className={`cursor-pointer bg-white p-5 rounded-xl shadow-sm border flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-md ${filterEstado === 'inactivo' ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-100'}`}
        >
          <div className="flex justify-between items-start">
            <div className={`p-2 rounded-lg ${filterEstado === 'inactivo' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Inactivos</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stats.inactivos}</p>
          </div>
        </div>

        {/* Notarios */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-md">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-[#005ab4]/5 text-[#005ab4]">
              <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Notarios Titulares</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stats.notarios}</p>
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-widest font-bold">Nombre Completo</th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-widest font-bold">Dirección de Correo</th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-widest font-bold">Rol</th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-widest font-bold text-center">Estado</th>
                <th className="px-6 py-4 font-label text-[10px] uppercase tracking-widest font-bold text-right">Sueldo Asignado</th>
                {canEdit && <th className="px-6 py-4 font-label text-[10px] uppercase tracking-widest font-bold text-center">Acciones</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {editingId === 'new' && (
                <tr className="bg-[#005ab4]/5">
                  <td colSpan={6} className="p-6">
                    <form onSubmit={handleCreate} className="flex gap-4 flex-col lg:flex-row lg:items-end">
                      <div className="flex-1 min-w-[200px] space-y-2">
                        <label className="font-label text-xs font-bold uppercase tracking-widest text-[#005ab4]">Nombre Completo</label>
                        <input required name="nombre" className="w-full font-body text-sm text-slate-900 border border-slate-200 focus:border-[#005ab4] focus:ring-1 focus:ring-[#005ab4] rounded-xl px-4 py-2.5 transition-all" />
                      </div>
                      <div className="flex-1 min-w-[200px] space-y-2">
                        <label className="font-label text-xs font-bold uppercase tracking-widest text-[#005ab4]">Email Institucional</label>
                        <input required type="email" name="email" className="w-full font-body text-sm text-slate-900 border border-slate-200 focus:border-[#005ab4] focus:ring-1 focus:ring-[#005ab4] rounded-xl px-4 py-2.5 transition-all" />
                      </div>
                      <div className="w-full lg:w-48 space-y-2">
                        <label className="font-label text-xs font-bold uppercase tracking-widest text-[#005ab4]">Crear Contraseña</label>
                        <input required type="password" name="password" className="w-full font-body text-sm text-slate-900 border border-slate-200 focus:border-[#005ab4] focus:ring-1 focus:ring-[#005ab4] rounded-xl px-4 py-2.5 transition-all" />
                      </div>
                      <div className="w-full lg:w-48 space-y-2">
                        <label className="font-label text-xs font-bold uppercase tracking-widest text-[#005ab4]">Rol del Sistema</label>
                        <select name="rol" className="w-full font-body text-sm text-slate-900 border border-slate-200 focus:border-[#005ab4] focus:ring-1 focus:ring-[#005ab4] rounded-xl px-4 py-2.5 transition-all bg-white cursor-pointer hover:bg-slate-50">
                          <option value="empleado">Personal Regular</option>
                          <option value="notario">Notario Titular</option>
                          <option value="notario_suplente">Notario Suplente</option>
                          <option value="supervisor">Supervisor</option>
                        </select>
                      </div>
                      <div className="w-full lg:w-48 space-y-2">
                        <label className="font-label text-xs font-bold uppercase tracking-widest text-[#005ab4]">Sueldo Bruto ($)</label>
                        <input required type="number" name="sueldo" defaultValue={0} className="w-full font-body text-sm text-slate-900 border border-slate-200 focus:border-[#005ab4] focus:ring-1 focus:ring-[#005ab4] rounded-xl px-4 py-2.5 transition-all tabular-nums" />
                      </div>
                      <div className="flex gap-2 lg:mb-1 w-full lg:w-auto h-min mt-4 lg:mt-0 justify-end">
                        <button type="submit" disabled={loading} className="px-6 py-2.5 bg-[#005ab4] text-white text-sm font-label font-bold uppercase tracking-widest hover:bg-[#bd5700] transition-all shadow-md rounded-xl disabled:opacity-50">Registrar</button>
                        <button type="button" onClick={cancelEdit} className="px-6 py-2.5 text-sm font-label font-bold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 transition-colors rounded-xl shadow-sm">Cancelar</button>
                      </div>
                    </form>
                  </td>
                </tr>
              )}

              {currentItems.map((e) => (
                <tr key={e.id} className={`hover:bg-[#005ab4]/5 transition-colors group ${e.activo === false ? 'opacity-60' : ''}`}>
                  {editingId === e.id ? (
                    <td colSpan={6} className="p-6 bg-[#005ab4]/5">
                      <form onSubmit={handleSubmit} className="flex gap-4 flex-col lg:flex-row lg:items-center">
                        <input type="hidden" name="id" value={e.id} />
                        <div className="flex-1 min-w-[200px]">
                          <input required name="nombre" defaultValue={e.nombre} className="w-full font-body text-sm text-slate-900 border border-slate-200 focus:border-[#005ab4] focus:ring-1 focus:ring-[#005ab4] rounded-xl px-4 py-2.5 transition-all" placeholder="Nombre completo" />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <span className="font-body text-sm font-medium text-slate-500 bg-black/5 px-3 py-1.5 rounded-lg border border-black/5 block">{e.email}</span>
                        </div>
                        <div className="w-full lg:w-48">
                          <span className="font-label text-[11px] font-bold uppercase tracking-widest text-slate-500 bg-black/5 px-3 py-1.5 rounded-lg border border-black/5 inline-block">{e.rol === 'notario' ? 'Notario Titular' : 'Personal Regular'}</span>
                        </div>
                        <div className="w-full lg:w-48 relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                          <input required type="number" name="sueldo" defaultValue={e.sueldo} className="w-full pl-7 font-body text-sm text-slate-900 border border-slate-200 focus:border-[#005ab4] focus:ring-1 focus:ring-[#005ab4] rounded-xl px-4 py-2.5 transition-all tabular-nums" />
                        </div>
                        <div className="flex gap-2 lg:justify-end mt-4 lg:mt-0">
                          <button type="submit" disabled={loading} className="px-4 py-2 bg-[#005ab4] text-white text-xs font-label font-bold uppercase tracking-widest hover:bg-[#bd5700] transition-all shadow-md rounded-lg disabled:opacity-50">Guardar</button>
                          <button type="button" onClick={cancelEdit} className="px-4 py-2 text-xs font-label font-bold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 transition-colors rounded-lg shadow-sm">Cancelar</button>
                        </div>
                      </form>
                    </td>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <div className="font-headline font-bold text-lg text-slate-900 group-hover:text-[#005ab4] transition-colors">{e.nombre}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-body text-sm font-medium text-slate-600">{e.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter ${e.rol === 'notario' ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : e.rol === 'notario_suplente' ? 'text-purple-700 bg-purple-50 border border-purple-100' : e.rol === 'supervisor' ? 'text-amber-700 bg-amber-50 border border-amber-100' : 'text-[#005ab4] bg-[#005ab4]/5 border border-[#005ab4]/10'}`}>
                          {e.rol === 'notario' ? 'Notario Titular' : e.rol === 'notario_suplente' ? 'Notario Suplente' : e.rol === 'supervisor' ? 'Supervisor' : 'Regular'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                          e.activo === false
                            ? 'text-red-700 bg-red-50 border border-red-100'
                            : 'text-emerald-700 bg-emerald-50 border border-emerald-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${e.activo === false ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                          {e.activo === false ? 'Inactivo' : 'Activo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-label text-base font-bold tabular-nums text-slate-900">
                        ${e.sueldo?.toLocaleString('es-CL') || 0}
                      </td>
                      {canEdit && (
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button onClick={() => handleEdit(e.id)} className="bg-slate-100 text-[#005ab4] font-label text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-[#005ab4] hover:text-white transition-colors shadow-sm" title="Actualizar Datos">
                              Editar
                            </button>
                            <button 
                              onClick={() => handleToggleActivo(e.id, e.activo !== false)}
                              disabled={togglingId === e.id}
                              className={`font-label text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors shadow-sm disabled:opacity-50 ${
                                e.activo === false
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500'
                                  : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500'
                              }`}
                              title={e.activo === false ? 'Activar usuario' : 'Desactivar usuario'}
                            >
                              {togglingId === e.id ? '...' : (e.activo === false ? 'Activar' : 'Desactivar')}
                            </button>
                          </div>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Footer Table */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs font-medium text-slate-500">
            Mostrando {listFiltered.length === 0 ? 0 : indexOfFirstItem + 1} a {Math.min(indexOfLastItem, listFiltered.length)} de {listFiltered.length} funcionarios en total.
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => p - 1)} 
              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 disabled:opacity-50 transition-colors shadow-sm"
            >
              Anterior
            </button>
            <button 
              disabled={currentPage === totalPages || totalPages === 0} 
              onClick={() => setCurrentPage(p => p + 1)} 
              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 disabled:opacity-50 transition-colors shadow-sm"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
