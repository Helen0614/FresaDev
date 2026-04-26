document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';

    languageSelect.value = savedLanguage;
    loadLanguage(savedLanguage);

    languageSelect.addEventListener('change', function () {
        const selectedLanguage = this.value;
        localStorage.setItem('selectedLanguage', selectedLanguage);
        loadLanguage(selectedLanguage);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const logo = document.querySelector('.logo h1');
    if (logo) {
        logo.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState("", document.title, window.location.pathname + window.location.search);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        logo.style.cursor = 'pointer';
    }
});

// Cargar archivo JSON y aplicar traducciones
async function loadLanguage(language) {
    try {
        const files = ["common", "home", "projects"];

        const responses = await Promise.all(
            files.map(file =>
                fetch(`./i18n/${language}/${file}.json`)
            )
        );

        const jsons = await Promise.all(
            responses.map(r => r.json())
        );

        const translations = Object.assign({}, ...jsons);

        applyTranslations(translations);

        console.log(`Idioma cargado: ${language}`);
    } catch (err) {
        console.error(`Error cargando idioma ${language}`, err);
    }
}

// Aplicar traducciones al DOM
function applyTranslations(trans) {

    // navegación
    document.querySelectorAll('a[href="#home"]').forEach(el => {
        if (trans.home) el.textContent = trans.home;
    });

    document.querySelectorAll('a[href="#projects"]').forEach(el => {
        if (trans.projects) el.textContent = trans.projects;
    });

    // elementos data-translate
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (trans[key]) {
            el.textContent = trans[key];
        }
    });
}