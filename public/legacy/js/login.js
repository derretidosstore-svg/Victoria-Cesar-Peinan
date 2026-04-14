// Legacy Login - Uses env API to get Supabase credentials
document.addEventListener('DOMContentLoaded', async () => {
    
    // Step 1: Fetch Supabase config from the Next.js API
    let SUPABASE_URL, SUPABASE_ANON_KEY;
    
    try {
        const res = await fetch('/api/legacy/env.js');
        const script = await res.text();
        // Execute the script to get window.ENV
        eval(script);
        SUPABASE_URL = window.ENV.SUPABASE_URL;
        SUPABASE_ANON_KEY = window.ENV.SUPABASE_ANON_KEY;
    } catch (err) {
        console.error('Error cargando configuración:', err);
        alert('Error crítico: No se pudieron cargar las credenciales del sistema.');
        return;
    }

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        alert('Error crítico: Credenciales de Supabase no disponibles.');
        return;
    }

    // Step 2: Initialize Supabase client
    if (!window.supabase) {
        alert("Error crítico: La librería de Supabase no se cargó.");
        return;
    }
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            storageKey: 'sb-legacy-auth-token',
            autoRefreshToken: true,
            persistSession: true,
        }
    });

    const btnLogin = document.getElementById('btn-login');
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    const errorMessageContainer = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    // Login handler
    btnLogin.addEventListener('click', async () => {
        const email = emailEl.value;
        const password = passwordEl.value;

        showError(null);

        if (!email || !password) {
            showError("Por favor, ingrese email y contraseña.");
            return;
        }

        // Loading state
        const originalText = btnLogin.textContent;
        btnLogin.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Ingresando...`;
        btnLogin.disabled = true;

        // Authenticate with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error('Error de login:', error);
            
            const msg = (error.message || '').toLowerCase();
            let userMessage = 'Ocurrió un error al iniciar sesión.';
            
            if (msg.includes('invalid login credentials') || msg.includes('invalid login')) {
                userMessage = 'Correo o contraseña incorrectos.';
            } else if (msg.includes('email not confirmed')) {
                userMessage = 'El correo electrónico no ha sido confirmado.';
            } else if (msg.includes('too many requests')) {
                userMessage = 'Demasiados intentos. Intente más tarde.';
            } else if (error.message) {
                userMessage = `Error: ${error.message}`; 
            }

            showError(userMessage);
            btnLogin.innerHTML = "Iniciar Sesión (Admin)";
            btnLogin.disabled = false;
            return;
        }

        // Check if user is active and has privileged role
        const { data: perfil, error: perfilError } = await supabase
            .from('usuarios_cesar_peinan')
            .select('activo, nombre, rol')
            .eq('auth_id', data.user.id)
            .single();

        if (perfilError || !perfil) {
            await supabase.auth.signOut();
            showError('No se encontró un perfil de usuario asociado a esta cuenta.');
            btnLogin.innerHTML = "Iniciar Sesión (Admin)";
            btnLogin.disabled = false;
            return;
        }

        if (perfil.activo === false) {
            await supabase.auth.signOut();
            showError('Su cuenta está desactivada. Contacte al administrador.');
            btnLogin.innerHTML = "Iniciar Sesión (Admin)";
            btnLogin.disabled = false;
            return;
        }

        // Only privileged roles can access the legacy system
        const PRIVILEGED_ROLES = ['notario', 'notario_suplente', 'supervisor', 'empleado'];
        if (!PRIVILEGED_ROLES.includes(perfil.rol)) {
            await supabase.auth.signOut();
            showError('No tiene permisos para acceder a este sistema. Contacte al administrador.');
            btnLogin.innerHTML = "Iniciar Sesión (Admin)";
            btnLogin.disabled = false;
            return;
        }

        // Success — redirect to legacy app
        window.location.href = 'app.html';
    });


    // Show/hide error helper
    function showError(message) {
        if (message) {
            if (errorText) errorText.textContent = message;
            if (errorMessageContainer) {
                errorMessageContainer.classList.remove('hidden');
                errorMessageContainer.style.display = 'flex'; 
                errorMessageContainer.classList.add('animate-pulse');
                setTimeout(() => errorMessageContainer.classList.remove('animate-pulse'), 500);
            } else {
                alert(message);
            }
        } else {
            if (errorMessageContainer) {
                errorMessageContainer.classList.add('hidden');
                errorMessageContainer.style.display = 'none';
            }
            if (errorText) errorText.textContent = '';
        }
    }
    
    // Allow Enter key to submit
    if (passwordEl) {
        passwordEl.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') btnLogin.click();
        });
    }
});