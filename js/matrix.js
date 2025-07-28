const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Función para redimensionar el canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Inicializar el canvas
resizeCanvas();

const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

// Función para obtener los colores según el tema actual
function getMatrixColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  
  if (isDark) {
    // Modo oscuro - colores actuales (rosa/magenta)
    return {
      background: 'rgba(61, 2, 42, 0.07)',
      text: 'rgba(154, 66, 126, 1)'
    };
  } else {
    // Modo claro - colores más suaves y claros
    return {
      background: 'rgba(255, 240, 245, 0.1)',
      text: 'rgba(194, 24, 91, 0.3)'
    };
  }
}

function drawMatrix() {
  const colors = getMatrixColors();
  
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = colors.text;
  ctx.font = `${fontSize}px monospace`;

  // Actualizar columns si el canvas cambió de tamaño
  const currentColumns = Math.floor(canvas.width / fontSize);
  if (currentColumns !== columns) {
    columns = currentColumns;
    drops = Array(columns).fill(1);
  }

  for (let i = 0; i < drops.length; i++) {
    const text = Math.random() > 0.5 ? '1' : '0';
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 33);

// Escuchar cambios en el tema para actualizar colores
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
      // El tema ha cambiado, los colores se actualizarán automáticamente en el siguiente frame
    }
  });
});

// Observar cambios en el atributo data-theme del documentElement
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
});

window.addEventListener('resize', () => {
  resizeCanvas();
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});
