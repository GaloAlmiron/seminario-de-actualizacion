function loadGroups() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../backend/get_group.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const groups = JSON.parse(xhr.responseText);
            let output = '<table border="1"><tr><th>ID</th><th>Nombre</th><th>Acción</th></tr>';
            groups.forEach(group => {
                output += `<tr><td>${group.id}</td><td>${group.group_name}</td><td>${group.action_name || 'N/A'}</td></tr>`;
            });
            output += '</table>';
            document.getElementById('groups').innerHTML = output;
        } else {
            document.getElementById('groups').innerHTML = 'Error al cargar los datos de grupos';
        }
    };
    xhr.onerror = function() {
        document.getElementById('groups').innerHTML = 'Error en la solicitud de grupos';
    };
    xhr.send();
}

window.addEventListener('load', loadGroups);
