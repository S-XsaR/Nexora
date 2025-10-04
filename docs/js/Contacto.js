// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    
    // Form submission handler
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Mensaje enviado! Te contactaremos pronto.');
        });
    }

    // Call button handler
    const callBtn = document.querySelector('.call-btn');
    if (callBtn) {
        callBtn.addEventListener('click', function() {
            window.open('tel:+573000000000');
        });
    }

    // Modal de Políticas - Event Listeners
    const btnVerPolitica = document.querySelector('.btn-secondary');
    const modalPoliticas = document.getElementById('modal-politicas');
    const btnCerrarPoliticas = document.getElementById('cerrar-modal-politicas');
    const btnAceptarPoliticas = document.getElementById('btn-aceptar-politicas');

    // Abrir modal de políticas
    if (btnVerPolitica) {
        btnVerPolitica.addEventListener('click', function() {
            abrirModalPoliticas();
        });
    }

    // Cerrar modal con botón X
    if (btnCerrarPoliticas) {
        btnCerrarPoliticas.addEventListener('click', function() {
            cerrarModalPoliticas();
        });
    }

    // Cerrar modal con botón Aceptar
    if (btnAceptarPoliticas) {
        btnAceptarPoliticas.addEventListener('click', function() {
            cerrarModalPoliticas();
        });
    }

    // Cerrar modal al hacer clic fuera
    if (modalPoliticas) {
        modalPoliticas.addEventListener('click', function(e) {
            if (e.target === modalPoliticas) {
                cerrarModalPoliticas();
            }
        });
    }

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalPoliticas?.classList.contains('show')) {
            cerrarModalPoliticas();
        }
    });
});

// Función para abrir el modal de políticas
function abrirModalPoliticas() {
    const modal = document.getElementById('modal-politicas');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Función para cerrar el modal de políticas
function cerrarModalPoliticas() {
    const modal = document.getElementById('modal-politicas');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}