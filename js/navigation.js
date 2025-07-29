/*
============================================
   NAVEGACIÓN SUAVE ENTRE SECCIONES
============================================
*/

document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    const mainElement = document.querySelector('main');
    
    // Función para hacer scroll suave a una sección específica
    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        
        if (targetSection && mainElement) {
            // Para la sección home, ir al inicio del main
            if (targetId === '#home') {
                mainElement.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Para otras secciones, calcular la posición relativa al main
                // No necesitamos restar el header porque el main ya tiene padding-top
                const targetPosition = targetSection.offsetTop - mainElement.offsetTop;
                
                mainElement.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    // Agregar event listeners a todos los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir el comportamiento por defecto
            
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    });
    
    // Manejar navegación inicial si hay hash en la URL
    if (window.location.hash) {
        // Esperar un poco para que la página se cargue completamente
        setTimeout(() => {
            scrollToSection(window.location.hash);
        }, 100);
    }
});
