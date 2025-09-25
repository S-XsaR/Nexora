document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const mensajeError = document.getElementById('mensajeError');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuarioInput = document.getElementById('usuario').value.trim();
    const contrasenaInput = document.getElementById('contrasena').value.trim();

    fetch('../docs/data/usuarios.json')
      .then(response => {
        if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
        return response.json();
      })
      .then(data => {
        const usuarioValido = data.find(user =>
          user.usuario === usuarioInput && user.contrasena === contrasenaInput
        );

        if (usuarioValido) {
          window.location.href = '../docs/admin/IndexAdmin.html';
        } else {
          mensajeError.textContent = 'Credenciales incorrectas. Intente nuevamente.';
          mensajeError.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error al cargar usuarios:', error);
        mensajeError.textContent = 'Error del sistema. Contacte al administrador.';
        mensajeError.style.display = 'block';
      });
  });
});
