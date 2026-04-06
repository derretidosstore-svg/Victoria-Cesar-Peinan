'use server'

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: 'Credenciales inválidas.' };
  }

  // Check if user is active
  const { data: perfil } = await supabase
    .from('usuarios_cesar_peinan')
    .select('activo, nombre')
    .eq('auth_id', data.user.id)
    .single();

  if (!perfil) {
    await supabase.auth.signOut();
    return { success: false, error: 'No se encontró un perfil de usuario para esta cuenta.' };
  }

  if (perfil.activo === false) {
    await supabase.auth.signOut();
    return { success: false, error: 'Su cuenta está desactivada. Contacte al administrador.' };
  }

  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/administracion');
}
