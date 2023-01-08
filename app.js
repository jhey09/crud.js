let listaPersonas = [];

const objPersona = {
    id: '',
    nombres: '',
    cedula: '',

}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const cedulaInput = document.querySelector('#cedula');
const AgregarInput = document.querySelector('#Agregar');
const contenedor = document.querySelector('.contenedor')

const guardarDB = () =>{ 
    localStorage.setItem('datosp',JSON.stringify(objPersona));
 }


formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || cedulaInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarPersona();
        
    } else {
        objPersona.id = Date.now();
        objPersona.nombre = nombreInput.value;
        objPersona.cedula = cedulaInput.value;

        aggPersona();
    }
}

function aggPersona() {

    listaPersonas.push({...objPersona});

    mostrarPersona();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objPersona.id = '';
    objPersona.nombre = '';
    objPersona.cedula = '';
}

function mostrarPersona() {
    limpiarHTML();

    const divlista = document.querySelector('.lista');
     
    listaPersonas.forEach(persona => {
        const { id, nombre, cedula} = persona;
       
        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${cedula} - `;
        parrafo.dataset.id = id;

        divlista.appendChild(parrafo);

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarPersona(persona);
        editarBoton.textContent = 'editar';
        editarBoton.classList.add('submit', 'editar');
        divlista.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarPersona(id);
        eliminarBoton.textContent = 'eliminar';
        eliminarBoton.classList.add('submit', 'eliminar');
        divlista.append(eliminarBoton);

        const hr = document.createElement('hr');

        
        contenedor.appendChild(hr);

        guardarDB();

    });
}

function cargarPersona(persona) {
    const {id, nombre, cedula} = persona;

    nombreInput.value = nombre;
    cedulaInput.value = cedula;

    objPersona.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
   
}

function editarPersona() {

    objPersona.nombre = nombreInput.value;
    objPersona.cedula = cedulaInput.value;

    listaPersonas.map(persona => {

        if(persona.id === objPersona.id) {
            persona.id = objPersona.id;
            persona.nombre = objPersona.nombre;
            persona.cedula = objPersona.cedula;

        }

    });

    limpiarHTML();
    mostrarPersona();
    formulario.reset();
    guardarDB();
    

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarPersona(id) {

    listaPersonas = listaPersonas.filter(persona => persona.id !== id);

    limpiarHTML();
    mostrarPersona();
}

function limpiarHTML() {
    const divPersona = document.querySelector('.lista');
    while(divPersona.firstChild) {
        divPersona.removeChild(divPersona.firstChild);
    }
} 



