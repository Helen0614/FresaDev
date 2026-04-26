document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projectsContainer");
  const SCROLL_AMOUNT = 180; // ancho aproximado imagen + gap
  const lightbox = createLightbox();

  if (!container) {
    console.error("No se encontró el contenedor de proyectos");
    return;
  }

  fetch("projects/index.json")
    .then(res => res.json())
    .then(fileList => {
      // Cargar cada archivo de proyecto desde /projects/data/
      const projectFetches = fileList.map(file =>
        fetch(`projects/data/${file}`).then(res => res.json())
      );
      return Promise.all(projectFetches);
    })
    .then(projects => {
      container.innerHTML = ''; // Limpiar contenedor
      
    projects.forEach(proj => {

      const techTags = proj.tech.map(tag =>
        `<span class="tech-tag">${tag}</span>`
      ).join("");

      const hasGalleryArrows = Array.isArray(proj.images) && proj.images.length > 3;
      const leftArrowHTML = hasGalleryArrows
        ? `<button class="gallery-btn left" type="button" data-direction="-1">‹</button>`
        : "";
      const rightArrowHTML = hasGalleryArrows
        ? `<button class="gallery-btn right" type="button" data-direction="1">›</button>`
        : "";

      const galleryHTML = `
        <div class="project-gallery-wrapper">
          
          ${leftArrowHTML}

          <div class="project-gallery">
            ${proj.images.map(img => `
              <img src="images/${proj.imagesFolder}/${img}" class="project-img" alt="${proj.name}" loading="lazy">
            `).join("")}
          </div>

          ${rightArrowHTML}

        </div>
      `;

      // -------------------------
      // BOTÓN GITHUB (OPCIONAL)
      // -------------------------
      let githubHTML = "";

      if (proj.link) {
        githubHTML = `
          <div class="project-links">
            <a href="${proj.link}" target="_blank" class="project-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387..."/>
              </svg>
              GitHub
            </a>
          </div>
        `;
      }

      // -------------------------
      // TARJETA COMPLETA
      // -------------------------
      const cardHTML = `
        <div class="project-card">

          <div class="project-header">
            <h3>${proj.name}</h3>
            <div class="project-tech">${techTags}</div>
          </div>

          <p class="project-description" data-translate="${proj.descriptionKey}"></p>

          ${galleryHTML}
          ${githubHTML}

        </div>
      `;

      container.innerHTML += cardHTML;
    });

    container.addEventListener("click", event => {
      const clickedImage = event.target.closest(".project-img");
      if (clickedImage) {
        lightbox.open(clickedImage.src, clickedImage.alt || "Imagen del proyecto");
        return;
      }

      const button = event.target.closest(".gallery-btn");
      if (!button) return;

      const wrapper = button.closest(".project-gallery-wrapper");
      const gallery = wrapper?.querySelector(".project-gallery");
      if (!gallery) return;

      const direction = Number(button.dataset.direction || 1);
      const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
      const edgeThreshold = 8;

      if (maxScrollLeft <= 0) return;

      if (direction > 0) {
        // Si estamos al final, vuelve al inicio (bucle)
        if (gallery.scrollLeft >= maxScrollLeft - edgeThreshold) {
          gallery.scrollTo({ left: 0, behavior: "smooth" });
          return;
        }

        gallery.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
        return;
      }

      // Si estamos al inicio y vamos a la izquierda, salta al final (bucle)
      if (gallery.scrollLeft <= edgeThreshold) {
        gallery.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
        return;
      }

      gallery.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    });

      // Aplicar traducciones si la función está disponible
      // Esperamos a que el idioma se cargue
      setTimeout(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
        if (typeof loadLanguage === "function") {
          loadLanguage(savedLanguage);
        }
      }, 100);
    })
    .catch(error => {
      console.error("Error al cargar los proyectos:", error);
      container.innerHTML = "<p>Error al cargar los proyectos.</p>";
    });

  function createLightbox() {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("aria-hidden", "true");

    overlay.innerHTML = `
      <button class="lightbox-close" type="button" aria-label="Cerrar imagen">✕</button>
      <img class="lightbox-image" alt="">
    `;

    const image = overlay.querySelector(".lightbox-image");
    const closeButton = overlay.querySelector(".lightbox-close");

    const close = () => {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      image.src = "";
      image.alt = "";
    };

    const open = (src, alt) => {
      image.src = src;
      image.alt = alt;
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
    };

    overlay.addEventListener("click", event => {
      if (event.target === overlay) {
        close();
      }
    });

    closeButton.addEventListener("click", close);

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && overlay.classList.contains("is-open")) {
        close();
      }
    });

    document.body.appendChild(overlay);

    return { open };
  }
});
