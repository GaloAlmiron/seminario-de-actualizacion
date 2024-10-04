document.addEventListener('DOMContentLoaded', function() {
  // Global Settings
  let edit = false;

  // Testing
  console.log('JavaScript is working!');
  fetchContacts();
  //document.getElementById('contact-result').style.display = 'none';

  
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let email = document.getElementById('email').value;
    let adress = document.getElementById('adress').value;
    let tel = document.getElementById('tel').value;
    let id = document.getElementById('contactId').value;

    // Validar campos
    if (!validateNotEmpty(name, surname, email, adress, tel)) {
      return;
    }

    // Validar correo electrónico
    if (!validateEmail(email)) {
      return;
    }

    // Validar longitud del teléfono
    if (!validatePhoneLength(tel)) {
      return;
    }

    let postData = 'name=' + encodeURIComponent(name) + '&surname=' + encodeURIComponent(surname)  + '&adress=' + encodeURIComponent(adress) + '&email=' + encodeURIComponent(email) + '&tel=' + encodeURIComponent(tel) + '&id=' + encodeURIComponent(id);
    let url = edit === false ? '../backend/contact-add.php' : '../backend/contact-edit.php';
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.responseText);
        document.getElementById('contact-form').reset();
        fetchContacts();
      } else {
        console.error('Request failed:', xhr.statusText);
      }
    };
    xhr.onerror = function() {
      console.error('Request failed.');
    };
    xhr.send(postData);
  });

  // Fetching Contacts
  function fetchContacts() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../backend/contact-list.php', true);
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        let contacts = JSON.parse(xhr.responseText);
        let template = '';
        contacts.forEach(contact => {
          template += '<tr contactId="' + contact.id + '"><td>' + contact.id + '</td><td><a href="#" class="contact-item">' + contact.name + '</a></td><td>' +  contact.surname + '</a></td><td>' + contact.adress + '</a></td><td>' + contact.email + '</a></td><td>' + contact.tel + '</td><td><button id="delete">Delete</button></td>' + '</td><td><button id="edit">Edit</button></td></tr>' ;
          
        });
        document.getElementById('contacts').innerHTML = template;
      } else {
        console.error('Request failed:', xhr.statusText);
      }
    };
    xhr.onerror = function() {
      console.error('Request failed.');
    };
    xhr.send();
  }


  // Delete a  contact
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('contact-delete')) {
      if (confirm('Are you sure you want to delete it?')) {
        const element = e.target.parentElement.parentElement;
        const id = element.getAttribute('contactId');
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../backend/contact-delete.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            fetchContacts();
          } else {
            console.error('Request failed:', xhr.statusText);
          }
        };
        xhr.onerror = function() {
          console.error('Request failed.');
        };
        xhr.send('id=' + id);
      }
    }
  });


// Evento de clic en el botón de editar
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('contact-edit')) {
    const element = e.target.parentElement.parentElement;
    const id = element.getAttribute('contactId');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../backend/contact-single.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        let contact = JSON.parse(xhr.responseText);
        document.getElementById('name').value = contact.name;
        document.getElementById('surname').value = contact.surname;
        document.getElementById('adress').value = contact.adress;
        document.getElementById('email').value = contact.email;
        document.getElementById('tel').value = contact.tel;
        document.getElementById('contactId').value = contact.id;
        edit = true;
      } else {
        console.error('Request failed:', xhr.statusText);
      }
    };
    xhr.onerror = function() {
      console.error('Request failed.');
    };
    xhr.send('id=' + id);
    e.preventDefault();
  }
});
});


  // Función para validar que los campos no estén vacíos
  function validateNotEmpty(...fields) {
    for (let field of fields) {
      if (field.trim() === '') {
        alert('Por favor, complete todos los campos.');
        return false;
      }
    }
    return true;
  }

  // Función para validar el formato de correo electrónico
  function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return false;
    }
    return true;
  }

  // Función para validar la longitud del teléfono
  function validatePhoneLength(tel) {
    if (tel.length > 11) {
      alert('La longitud del teléfono no puede ser superior a 11 caracteres.');
      return false;
    }
    return true;
  }