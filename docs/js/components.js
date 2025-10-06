// js/components.js

// Detectar si estamos en la raíz o en una subcarpeta
function obtenerRutaBase() {
    const path = window.location.pathname;
    // Si estamos en /html/ o cualquier subcarpeta
    if (path.includes('/html/')) {
        return '../';
    }
    // Si estamos en la raíz
    return './';
}

// Función para cargar el header
function cargarHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    
    if (!headerPlaceholder) {
        console.error('No se encontró el elemento #header-placeholder');
        return;
    }

    const rutaBase = obtenerRutaBase();
    
    fetch(`${rutaBase}components/header.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar header: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            headerPlaceholder.innerHTML = data;
            console.log('✅ Header cargado exitosamente');
            
            // Corregir las rutas de las imágenes y enlaces
            corregirRutas(rutaBase);
            
            // Marcar la página activa en el menú
            marcarPaginaActiva();
            
            // Esperar un poco más para asegurar que el DOM esté listo
            setTimeout(() => {
                // Verificar que el botón del carrito existe
                const btnCarrito = document.getElementById('btn-carrito');
                if (btnCarrito) {
                    console.log('✅ Botón carrito encontrado');
                    
                    // Inicializar el carrito si la función existe
                    if (typeof inicializarCarrito === 'function') {
                        inicializarCarrito();
                        console.log('✅ Carrito inicializado');
                    } else {
                        console.warn('⚠️ Función inicializarCarrito no encontrada - Asegúrate de cargar carrito.js');
                    }
                } else {
                    console.error('❌ Botón carrito no encontrado en el DOM');
                }
            }, 300);
        })
        .catch(error => {
            console.error('❌ Error cargando header:', error);
            console.error('Intentando cargar desde:', `${rutaBase}components/header.html`);
            // Mostrar header básico como fallback
            headerPlaceholder.innerHTML = `
                <header>
                    <nav class="navbar">
                        <div class="nav-container">
                            <div class="logo">
                                <img src="${rutaBase}img/logo ne.png" style="height:40px;">
                                <h2>Nexora Consulting</h2>
                            </div>
                        </div>
                    </nav>
                </header>
            `;
        });
}

// Función para cargar el footer
function cargarFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (!footerPlaceholder) {
        console.error('No se encontró el elemento #footer-placeholder');
        return;
    }

    const rutaBase = obtenerRutaBase();

    fetch(`${rutaBase}components/footer.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar footer: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            footerPlaceholder.innerHTML = data;
            console.log('✅ Footer cargado exitosamente');
            
            // Corregir rutas en el footer también
            corregirRutasFooter(rutaBase);
        })
        .catch(error => {
            console.error('❌ Error cargando footer:', error);
        });
}

// Función para corregir las rutas según la ubicación
function corregirRutas(rutaBase) {
    // Corregir ruta del logo
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.src = `${rutaBase}img/logo ne.png`;
    }
    
    // Corregir rutas de los enlaces del menú
    const enlaces = document.querySelectorAll('.nav-link');
    enlaces.forEach(enlace => {
        const page = enlace.getAttribute('data-page');
        if (page) {
            if (page === 'index.html') {
                enlace.href = `${rutaBase}index.html`;
            } else {
                enlace.href = `${rutaBase}html/${page}`;
            }
        }
    });
}

// Función para corregir rutas en el footer
function corregirRutasFooter(rutaBase) {
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
            // Si es un archivo HTML
            if (href.endsWith('.html')) {
                if (href === 'index.html') {
                    link.href = `${rutaBase}index.html`;
                } else {
                    link.href = `${rutaBase}html/${href}`;
                }
            }
        }
    });
}

// Función para marcar la página activa en el menú
function marcarPaginaActiva() {
    const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
    const enlaces = document.querySelectorAll('.nav-menu a, .nav-links a');
    
    enlaces.forEach(enlace => {
        const dataPage = enlace.getAttribute('data-page');
        
        if (dataPage === paginaActual || 
            (paginaActual === 'index.html' && dataPage === 'index.html') ||
            (paginaActual === '' && dataPage === 'index.html')) {
            enlace.classList.add('active');
        }
    });
}

// Cargar componentes cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 DOM cargado, iniciando carga de componentes...');
        console.log('📍 Ruta actual:', window.location.pathname);
        console.log('📂 Ruta base:', obtenerRutaBase());
        cargarHeader();
        cargarFooter();
    });
} else {
    console.log('🚀 DOM ya estaba listo, cargando componentes...');
    console.log('📍 Ruta actual:', window.location.pathname);
    console.log('📂 Ruta base:', obtenerRutaBase());
    cargarHeader();
    cargarFooter();
}