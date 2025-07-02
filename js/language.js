// Language translations
const translations = {
    es: {
        home: "Home",
        projects: "Proyectos",
        title: "FresaDev",
        // Home section //
        myName: "Helen Fiorella Medina",
        myRole: "Estudiante de Inteligencia Artificial",
        aboutMe: "Soy una estudiante apasionada por la Inteligencia Artificial. Me encanta aprender y enfrentar nuevos desafíos. En mi tiempo libre, disfruto explorar nuevas tecnologías y trabajar en proyectos que me permitan aplicar mis conocimientos.",
        connectLinkedIn: "Conecta conmigo",
        sendEmail: "Envíame un email",
        viewProjects: "Ve mis proyectos",
        // Projects and Roadmap section - general //
        projectsTitle: "Proyectos",
        roadmapTitle: "Roadmap de Aprendizaje",
        completed: "Completado",
        // Project - DigiNet
        digiNetDescription: "Este proyecto implementa una red neuronal multicapa en C puro para la clasificación de dígitos manuscritos del dataset MNIST.",
        // Project - Snake_C
        snakeCDescription: "Un proyecto de desarrollo de un juego clásico de Snake en C, mostrando habilidades en programación y lógica de juegos.",
        // Roadmap - Web Portfolio
        webPortfolio: "🌐 Web Personal y Portfolio",
        webPortfolioDesc: "HTML, CSS y JavaScript",
        // Roadmap - AI Degree
        aiDegree: "🎓 Grado en Inteligencia Artificial",
        firstYear: "Primero",
        secondYear: "Segundo",
        thirdYear: "Tercero",
        fourthYear: "Cuarto",
    },
    en: {
        home: "Home", 
        projects: "Projects",
        title: "FresaDev",
        // Home section
        myName: "Helen Fiorella Medina",
        myRole: "Artificial Intelligence Student",
        aboutMe: "I'm a passionate student of Artificial Intelligence. I love learning and facing new challenges. In my free time, I enjoy exploring new technologies and working on projects that allow me to apply my knowledge.",
        connectLinkedIn: "Connect with me",
        sendEmail: "Send me an email",
        viewProjects: "View my projects",
        // Projects and Roadmap section - general
        projectsTitle: "Projects",
        roadmapTitle: "Learning Roadmap",
        completed: "Completed",
        // Project - DigiNet
        digiNetDescription: "This project implements a multilayer neural network in pure C for classifying handwritten digits from the MNIST dataset.",
        // Project - Snake_C
        snakeCDescription: "A project developing a classic Snake game in C, showcasing programming skills and game logic.",
        // Roadmap - Web Portfolio
        webPortfolio: "🌐 Personal Web & Portfolio",
        webPortfolioDesc: "HTML, CSS and JavaScript",
        // Roadmap - AI Degree
        aiDegree: "🎓 Artificial Intelligence Degree",
        firstYear: "First Year",
        secondYear: "Second Year",
        thirdYear: "Third Year",
        fourthYear: "Fourth Year",
    },
    eu: {
        home: "Hasiera",
        projects: "Proiektuak", 
        title: "FresaDev",
        // Home section
        myName: "Helen Fiorella Medina",
        myRole: "Adimen Artifizialeko Ikaslea",
        aboutMe: "Adimen Artifizialaren inguruan grina duen ikaslea naiz. Ikasten eta erronka berriei aurre egiten maite dut. Nire libre denboran, teknologia berriak esploratzea eta nire ezagutzak aplikatzeko aukera ematen didaten proiektuetan lan egitea gustatzen zait.",
        connectLinkedIn: "Nirekin konektatu",
        sendEmail: "Bidali mezu elektronikoa",
        viewProjects: "Ikusi nire proiektuak",
        // Projects and Roadmap section - general
        projectsTitle: "Proiektuak",
        roadmapTitle: "Ikaskuntza Orria",
        completed: "Osatuta",
        // Project - DigiNet
        digiNetDescription: "Proiektu honek MNIST datu-sortako eskuz idatzitako zifrak sailkatzeko C hutsezko nodo anitzeko sare neuronal bat inplementatzen du.",
        // Project - Snake_C
        snakeCDescription: "C-n Snake joko klasiko bat garatzeko proiektua, programazio eta joko logikako trebetasunak erakusten dituena.",
        // Roadmap - Web Portfolio
        webPortfolio: "🌐 Web Pertsonala eta Portfolioa",
        webPortfolioDesc: "HTML, CSS eta JavaScript",
        // Roadmap - AI Degree
        aiDegree: "🎓 Adimen Artifizialeko Gradua",
        firstYear: "Lehen Urtea",
        secondYear: "Bigarren Urtea",
        thirdYear: "Hirugarren Urtea",
        fourthYear: "Laugarren Urtea",
    }
};

// Initialize language selector
document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('language-select');
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    languageSelect.value = savedLanguage;
    updateLanguage(savedLanguage);
    
    // Add event listener for language changes
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        localStorage.setItem('selectedLanguage', selectedLanguage);
        updateLanguage(selectedLanguage);
    });
    
    // Add smooth scrolling for navigation links
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
    
    // Add event listener for logo to clear URL hash
    const logo = document.querySelector('.logo h1');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove hash from URL
            history.pushState("", document.title, window.location.pathname + window.location.search);
            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Make logo clickable
        logo.style.cursor = 'pointer';
    }
});

// Update page language
function updateLanguage(language) {
    const trans = translations[language];
    
    // Update navigation links
    const homeLink = document.querySelector('a[href="#home"]');
    const projectsLink = document.querySelector('a[href="#projects"]');
    
    if (homeLink) homeLink.textContent = trans.home;
    if (projectsLink) projectsLink.textContent = trans.projects;
    
    // Update any element with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (trans[key]) {
            element.textContent = trans[key];
        }
    });
    
    console.log(`Language changed to: ${language}`);
}

// Función auxiliar para obtener texto traducido
function t(key) {
    const currentLanguage = localStorage.getItem('selectedLanguage') || 'es';
    return translations[currentLanguage][key] || key;
}
