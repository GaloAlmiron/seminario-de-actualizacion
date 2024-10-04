document.addEventListener('DOMContentLoaded', function() {
    loadGroups();

    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const group = document.getElementById('group').value;
        const passwordErrorElement = document.getElementById('password-error');
        passwordErrorElement.classList.add('password-warning');
        passwordErrorElement.textContent = 'La contraseña debe tener entre 4 y 8 caracteres y contener al menos un número.';
        let passOk = true;
        

        // Verificación de la contraseña usando una expresión regular
        const passwordPattern = /^(?=.*\d).{4,8}$/;
        let found = password.match(passwordPattern) 
        while (found == null) {
            passwordErrorElement.remove();
            const passwordInput = document.getElementById('password');
            passwordInput.insertAdjacentElement('afterend', passwordErrorElement);

            passwordInput.style.borderColor = 'red';
            return; 
        }
        
        const warningMessage = document.querySelector('.password-warning');
        if (warningMessage) {
            warningMessage.remove();
        }
        document.getElementById('password').style.borderColor = '';


            const xhr = new XMLHttpRequest();
            xhr.open('POST', '../backend/create_user.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.status === 'success') {
                        alert('Usuario registrado con éxito');
                        document.getElementById('registerForm').reset();
                        window.location.href = 'index.html';
                    } else {
                        alert('Error al registrar el usuario: ' + response.message);
                    }
                } else {
                    alert('Error en la solicitud de registro');
                }
            };
            xhr.send(`username=${username}&password=${password}&group=${group}`);
    });
});


function loadGroups() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../backend/get_group.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const groups = JSON.parse(xhr.responseText);
            let options = '';
            groups.forEach(group => {
                options += `<option value="${group.id}">${group.group_name}</option>`;
            });
            document.getElementById('group').innerHTML = options;
        } else {
            console.error('Error al cargar los grupos');
        }
    };
    xhr.onerror = function() {
        console.error('Error en la solicitud de grupos');
    };
    xhr.send();
}
