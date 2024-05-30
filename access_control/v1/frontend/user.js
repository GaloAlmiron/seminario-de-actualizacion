function loadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../backend/get_user.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const users = JSON.parse(xhr.responseText);
            let output = '<table border="1"><tr><th>ID</th><th>Username</th><th>Password</th><th>Grupo</th><th>Acción</th></tr>';
            users.forEach(user => {
                output += `<tr><td>${user.id}</td><td>${user.username}</td><td>${user.pass}</td><td>${user.group_name || 'N/A'}</td><td>${user.action_name || 'N/A'}</td></tr>`;
            });
            output += '</table>';
            document.getElementById('users').innerHTML = output;
        } else {
            document.getElementById('users').innerHTML = 'Error al cargar los datos de usuarios';
        }
    };
    xhr.onerror = function() {
        document.getElementById('users').innerHTML = 'Error en la solicitud de usuarios';
    };
    xhr.send();
}

function loadGroupsForForm() {
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
            console.error('Error al cargar los grupos para el formulario');
        }
    };
    xhr.onerror = function() {
        console.error('Error en la solicitud de grupos para el formulario');
    };
    xhr.send();
}

document.getElementById('addUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const group = document.getElementById('group').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../backend/create_user.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                loadUsers();
                document.getElementById('addUserForm').reset();
            } else {
                console.error('Error al agregar el usuario:', response.message);
            }
        } else {
            console.error('Error en la solicitud de agregar usuario');
        }
    };
    xhr.send(`username=${username}&password=${password}&group=${group}`);
});

window.addEventListener('load', function() {
    loadUsers();
    loadGroupsForForm();
});
