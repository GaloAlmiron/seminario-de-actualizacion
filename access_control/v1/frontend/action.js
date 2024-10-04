function loadActions() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../backend/get_action.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const actions = JSON.parse(xhr.responseText);
            let output = '<table border="1"><tr><th>ID</th><th>Nombre</th></tr>';
            actions.forEach(action => {
                output += `<tr><td>${action.id}</td><td>${action.name}</td></tr>`;
            });
            output += '</table>';
            document.getElementById('actions').innerHTML = output;
        } else {
            document.getElementById('actions').innerHTML = 'Error al cargar los datos de acciones';
        }
    };
    xhr.onerror = function() {
        document.getElementById('actions').innerHTML = 'Error en la solicitud de acciones';
    };
    xhr.send();
}

window.addEventListener('load', loadActions);
