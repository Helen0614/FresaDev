//###################//
// Funciones SideBar //
//###################//

// Función para cargar estilos dinámicos
function loadSidebarStyles() {
  const existingLink = document.getElementById('sidebar-stylesheet');
  if (!existingLink) {
    const link = document.createElement('link');
    link.id = 'sidebar-stylesheet';
    link.rel = 'stylesheet';
    link.href = 'css/sections/sidebar.css'; // Ruta al archivo sidebar.css
    document.head.appendChild(link);
  }
}

// Función para cargar el sidebar
function loadSidebar() {
  const sidebar = document.getElementById('sidebar');
  fetch('sections/sidebar.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el sidebar');
      }
      return response.text();
    })
   .then(html => {
      sidebar.innerHTML = html;
      loadSidebarStyles(); // Carga los estilos del sidebar

      // Reasignar eventos a los botones después de cargar el sidebar
      document.getElementById('btnHome').addEventListener('click', () => loadSection('home'));
      document.getElementById('btnProjects').addEventListener('click', () => loadSection('projects'));
    })
    .catch(error => {
      console.error(error);
      sidebar.innerHTML = `<p>Error al cargar el sidebar: ${error.message}</p>`;
    });
}

//#####################//
// Funciones Secciones //
//#####################//

// Función para cargar estilos dinámicos
function loadStylesheet(section) {
  const existingLink = document.getElementById('dynamic-stylesheet');
  if (existingLink) {
    existingLink.href = `css/sections/${section}.css`;
  } else {
    const link = document.createElement('link');
    link.id = 'dynamic-stylesheet';
    link.rel = 'stylesheet';
    link.href = `css/sections/${section}.css`;
    document.head.appendChild(link);
  }
}

// Modifica la función loadSection para cargar también los estilos
function loadSection(section) {
  const content = document.getElementById('content');
  let url = `sections/${section}.html`;
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Error en loadSection (1) al cargar la sección: ${section}`);
      return response.text();
    })
    .then(html => {
      content.innerHTML = html;
      loadStylesheet(section);
      if (section === 'projects') {
        // Dejar vacío, no cargar nada adicional para projects
      }
    })
    .catch(error => {
      console.error(error);
      content.innerHTML = `<p>Error en loadSection (2) al cargar la sección: ${error.message}</p>`;
    });
}

//##########################//
// Llamadas a las funciones //
//##########################//
// Cargar el sidebar al inicio
loadSidebar();

// Cargar la sección "home" por defecto
loadSection('home');

