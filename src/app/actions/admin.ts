'use server'

import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Roles privilegiados: mismos permisos de gestión
const PRIVILEGED_ROLES = ['notario', 'notario_suplente', 'supervisor'];

function isPrivilegedRole(rol: string | null | undefined): boolean {
  return PRIVILEGED_ROLES.includes(rol || '');
}

// Reusable permission check
async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const { data: perfil } = await supabase.from('usuarios_cesar_peinan').select('rol').eq('auth_id', user.id).single();
  return perfil?.rol; // 'notario', 'notario_suplente', 'supervisor', or 'empleado'
}

// ==== SERVICIOS ====
export async function upsertServicio(formData: FormData) {
  const rol = await checkAdmin();
  if (!isPrivilegedRole(rol)) {
    return { success: false, error: "No tiene permisos para editar servicios." };
  }

  const supabase = await createClient();
  const id = formData.get('id');
  const titulo = formData.get('titulo') as string;
  const descripcion = formData.get('descripcion') as string;
  const arancel = parseInt(formData.get('arancel') as string);
  const activo = formData.get('activo') === 'on';
  const documentos_necesarios = formData.get('documentos_necesarios') as string;

  const payload = { titulo, descripcion, arancel, activo, documentos_necesarios };

  if (id) {
    const { error } = await supabase.from('servicios_cesar_peinan').update({
      ...payload,
      actualizado_en: new Date().toISOString()
    }).eq('id', id);
    if (error) return { success: false, error: error.message };
  } else {
    const { error } = await supabase.from('servicios_cesar_peinan').insert(payload);
    if (error) return { success: false, error: error.message };
  }

  revalidatePath('/administracion/dashboard');
  revalidatePath('/servicios');
  revalidatePath('/aranceles');
  return { success: true };
}

// ==== EMPLEADOS ====
export async function createEmpleado(formData: FormData) {
  const rol = await checkAdmin();
  if (!isPrivilegedRole(rol)) {
    return { success: false, error: "No tiene permisos para crear empleados." };
  }

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nombre = formData.get('nombre') as string;
  const rolNuevo = formData.get('rol') as string || 'empleado';
  const sueldo = parseInt(formData.get('sueldo') as string) || 0;

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { success: false, error: "Falta SUPABASE_SERVICE_ROLE_KEY en el servidor." };
  }

  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) return { success: false, error: error.message };

  if (data.user) {
    const { error: dbError } = await supabaseAdmin.from('usuarios_cesar_peinan').insert({
      auth_id: data.user.id,
      nombre,
      email,
      rol: rolNuevo,
      sueldo,
      activo: true
    });

    if (dbError) {
      await supabaseAdmin.auth.admin.deleteUser(data.user.id);
      return { success: false, error: dbError.message };
    }
  }

  revalidatePath('/administracion/dashboard');
  revalidatePath('/transparencia');
  return { success: true };
}

export async function updateEmpleado(formData: FormData) {
  const rol = await checkAdmin();
  if (!isPrivilegedRole(rol)) {
    return { success: false, error: "No tiene permisos para editar empleados." };
  }

  const supabase = await createClient();
  const id = formData.get('id');
  const sueldo = parseInt(formData.get('sueldo') as string);
  const nombre = formData.get('nombre') as string;

  const { error } = await supabase.from('usuarios_cesar_peinan').update({ sueldo, nombre }).eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/administracion/dashboard');
  revalidatePath('/transparencia');
  return { success: true };
}

export async function toggleEmpleadoActivo(empleadoId: string, nuevoEstado: boolean) {
  const rol = await checkAdmin();
  if (!isPrivilegedRole(rol)) {
    return { success: false, error: "No tiene permisos para activar/desactivar empleados." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('usuarios_cesar_peinan')
    .update({ activo: nuevoEstado })
    .eq('id', empleadoId);

  if (error) return { success: false, error: error.message };

  revalidatePath('/administracion/dashboard');
  revalidatePath('/transparencia');
  return { success: true };
}

// ==== SOLICITUDES ====
export async function updateSolicitud(solicitudId: string, statusType: 'trabajo' | 'boleta' | 'pago', value: string) {
  await checkAdmin(); // Both privileged and empleado can update statuses

  const supabase = await createClient();
  let payload: any = { actualizado_en: new Date().toISOString() };
  
  if (statusType === 'trabajo') {
    payload.estado_trabajo = value;

    // Regla de negocio: No se puede marcar como 'listo' si la boleta no está emitida
    if (value === 'listo') {
      const { data } = await supabase.from('solicitudes_cesar_peinan').select('estado_boleta').eq('id', solicitudId).single();
      if (data?.estado_boleta !== 'enviada') {
        return { success: false, error: 'No se puede marcar como LISTO sin emitir la boleta primero.' };
      }
    }
  } else if (statusType === 'boleta') {
    payload.estado_boleta = value;
  } else if (statusType === 'pago') {
    payload.estado_pago = value;
    // Auto-emisión de boleta para pagos Getnet y POS Físico
    if (value === 'pagado') {
      const { data } = await supabase.from('solicitudes_cesar_peinan').select('metodo_pago').eq('id', solicitudId).single();
      if (data?.metodo_pago === 'getnet' || data?.metodo_pago === 'pos_fisico') {
        payload.estado_boleta = 'enviada';
      }
    }
  }

  const { error } = await supabase.from('solicitudes_cesar_peinan').update(payload).eq('id', solicitudId);
  if (error) return { success: false, error: error.message };

  revalidatePath('/administracion/dashboard');
  return { success: true };
}

export async function createSolicitudManual(formData: FormData) {
  const rol = await checkAdmin();
  if (!rol) return { success: false, error: "No autenticado" };

  const supabase = await createClient();
  
  const nombre = formData.get('nombre') as string;
  const rut = formData.get('rut') as string;
  const email = formData.get('email') as string;
  const telefono = formData.get('telefono') as string;
  const direccion = formData.get('direccion') as string || '';
  const servicioId = formData.get('servicio_id') as string;
  const estadoPago = formData.get('estado_pago') as string;
  const metodoPago = formData.get('metodo_pago') as string;
  const codigoInput = formData.get('codigo') as string;

  if (!nombre || !rut || !email || !servicioId || !metodoPago) {
    return { success: false, error: 'Faltan campos obligatorios' };
  }

  const codigo = codigoInput || Math.random().toString(36).substring(2, 10).toUpperCase();

  // Auto-emisión de boleta si es POS físico y estado pagado
  let estadoBoleta = 'sin enviar';
  if (estadoPago === 'pagado' && (metodoPago === 'pos_fisico' || metodoPago === 'getnet')) {
    estadoBoleta = 'enviada';
  }

  const { error } = await supabase.from('solicitudes_cesar_peinan').insert({
    cliente_nombre: nombre,
    cliente_rut: rut,
    cliente_email: email,
    cliente_telefono: telefono,
    cliente_direccion: direccion,
    servicio_id: servicioId,
    estado_trabajo: 'pendiente',
    estado_pago: estadoPago,
    metodo_pago: metodoPago,
    estado_boleta: estadoBoleta,
    codigo: codigo
  });

  if (error) return { success: false, error: error.message };

  revalidatePath('/administracion/dashboard');
  return { success: true, codigo };
}
