// ========================================
// MANEJO DEL TEMA CLARO/OSCURO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
    
    // Cargar tema guardado o detectar preferencia del sistema
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    } else {
        // Detectar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Manejar cambio de tema
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Solo cambiar automáticamente si el usuario no ha seleccionado manualmente un tema
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.checked = true;
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeToggle.checked = false;
            }
        }
    });
});
