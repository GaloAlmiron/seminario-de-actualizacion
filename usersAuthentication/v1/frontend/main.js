document.addEventListener('DOMContentLoaded', function() {
    // Manejar el formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evitar el envío del formulario por defecto

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Verificar las credenciales del usuario
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '../backend/login.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.status === 'success') {
                        // Redirigir al usuario a la página principal
                        window.location.href = 'main.html';
                    } else {
                        alert('Inicio de sesión fallido. Por favor, verifique sus credenciales.');
                    }
                } else {
                    alert('Error en la solicitud de inicio de sesión');
                }
            };
            xhr.send(`username=${username}&password=${password}`);
        });
    }

    // Manejar el botón de logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Realizar la solicitud de logout al backend
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '../backend/logout.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.status === 'success') {
                        // Redirigir al usuario a la página de inicio de sesión
                        window.location.href = 'index.html';
                    } else {
                        alert('Error al cerrar sesión: ' + response.message);
                    }
                } else {
                    alert('Error en la solicitud de cierre de sesión');
                }
            };
            xhr.send();
        });
    }
});
