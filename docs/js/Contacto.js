
        // Initialize map when page loads
        document.addEventListener('DOMContentLoaded', function() {
            new InteractiveMap();
        });

        // Form submission handler
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Mensaje enviado! Te contactaremos pronto.');
        });

        // Call button handler
        document.querySelector('.call-btn').addEventListener('click', function() {
            window.open('tel:+573000000000');
        });