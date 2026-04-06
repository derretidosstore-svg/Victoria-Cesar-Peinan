import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ServiciosManager from '@/components/admin/ServiciosManager';
import EmpleadosManager from '@/components/admin/EmpleadosManager';
import SolicitudesManager from '@/components/admin/SolicitudesManager';
import ReportesManager from '@/components/admin/ReportesManager';

export const revalidate = 0; // Ensure fresh data on Dashboard load

export default async function DashboardPage(props: { searchParams: Promise<{ tab?: string }> }) {
  const searchParams = await props.searchParams;
  const activeTab = searchParams.tab || 'solicitudes';
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/administracion');
  }

  // Obtener rol del usuario autenticado
  const { data: perfil } = await supabase.from('usuarios_cesar_peinan').select('rol').eq('auth_id', user.id).single();
  const rol = perfil?.rol || 'empleado';

  // Obtener Datos para CRUDs
  const [
    { data: servicios },
    { data: empleados },
    { data: solicitudes }
  ] = await Promise.all([
    supabase.from('servicios_cesar_peinan').select('*').order('titulo'),
    supabase.from('usuarios_cesar_peinan').select('*').order('rol', { ascending: false }).order('nombre'),
    supabase.from('solicitudes_cesar_peinan').select(`
      *,
      servicio:servicios_cesar_peinan(titulo, arancel),
      documentos_adjuntos_cesar_peinan(id, url_archivo, nombre_archivo)
    `).order('creado_en', { ascending: false })
  ]);

  // Filtrar solicitudes completadas para reportes (solo "listo")
  const solicitudesListas = (solicitudes || []).filter(
    (s: any) => s.estado_trabajo === 'listo'
  );

  return (
    <div className="flex-1 w-full bg-[#f9f9ff]">
      {activeTab === 'solicitudes' && <SolicitudesManager initialSolicitudes={solicitudes || []} servicios={servicios || []} />}
      
      {activeTab === 'servicios' && (
        <div className="p-8">
           <ServiciosManager initialServicios={servicios || []} userRole={rol} />
        </div>
      )}
      
      {activeTab === 'empleados' && (
        <div className="p-8">
           <EmpleadosManager initialEmpleados={empleados || []} userRole={rol} />
        </div>
      )}

      {activeTab === 'reportes' && rol === 'notario' && (
        <ReportesManager solicitudesListas={solicitudesListas} />
      )}

      {activeTab === 'reportes' && rol !== 'notario' && (
        <div className="p-8 text-center">
          <p className="text-slate-500 font-medium">No tiene permisos para acceder a esta sección.</p>
        </div>
      )}
    </div>
  );
}
