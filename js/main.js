// DATOS INICIALES
let alumnos = [
    { nombre: "juan", apellido: "perez", cursoTomado: "Javascript", estadoCurso: "en curso", estadoPago: "pago efectuado" },
    { nombre: "mateo", apellido: "garcia", cursoTomado: "ReactJS", estadoCurso: "aprobado", estadoPago: "pago efectuado" },
    { nombre: "angel", apellido: "marquez", cursoTomado: "Machine Learning", estadoCurso: "en curso", estadoPago: "pago pendiente" },
    { nombre: "marta", apellido: "lopez", cursoTomado: "Desarrollo web", estadoCurso: "aprobado", estadoPago: "pago pendiente" }
];

// LISTA DE CURSOS VÁLIDOS
const cursosValidos = [
    "Javascript",
    "ReactJS",
    "Machine Learning",
    "Desarrollo web",
    "Python",
    "Base de datos",
    "Inteligencia Artificial"
];

// CARGAR DATOS GUARDADOS
if (localStorage.getItem('alumnos')) {
    alumnos = JSON.parse(localStorage.getItem('alumnos'));
}

// ELEMENTOS DOM
const elementosDom = {
    busquedaInicial: document.getElementById('busquedaInicial'),
    nombre: document.getElementById('nombre'),
    apellido: document.getElementById('apellido'),
    botonBuscar: document.getElementById('botonBuscar'),
    
    alumnoEncontrado: document.getElementById('alumnoEncontrado'),
    infoAlumnoEncontrado: document.getElementById('infoAlumnoEncontrado'),
    botonVerPlanillaHeader: document.getElementById('botonVerPlanillaHeader'), // Nuevo botón en header
    botonVerPlanilla: document.getElementById('botonVerPlanilla'), // Botón en sección alumno
    botonEditarAlumno: document.getElementById('botonEditarAlumno'),
    botonNuevaBusqueda: document.getElementById('botonNuevaBusqueda'),
    
    alumnoNoEncontrado: document.getElementById('alumnoNoEncontrado'),
    botonAgregarNuevoAlumno: document.getElementById('botonAgregarNuevoAlumno'),
    
    formularioRegistro: document.getElementById('formularioRegistro'),
    curso: document.getElementById('curso'),
    estadoCurso: document.getElementById('estadoCurso'),
    estadoPago: document.getElementById('estadoPago'),
    botonConfirmarRegistro: document.getElementById('botonConfirmarRegistro'),
    
    planillaCompleta: document.getElementById('planillaCompleta')
};

// FUNCIONES AUXILIARES
function capitalizarTexto(texto) {
    return texto.toLowerCase()
               .split(' ')
               .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
               .join(' ');
}

function validarNombreApellido(texto) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}

function validarCurso(cursoIngresado) {
    return cursosValidos.some(curso => 
        curso.toLowerCase() === cursoIngresado.toLowerCase()
    );
}

function limpiarFormulario() {
    elementosDom.curso.value = '';
    elementosDom.estadoCurso.value = 'en curso';
    elementosDom.estadoPago.value = 'pago pendiente';
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    // Asegurar que todo está oculto al inicio excepto el botón de ver planilla
    elementosDom.alumnoEncontrado.style.display = 'none';
    elementosDom.alumnoNoEncontrado.style.display = 'none';
    elementosDom.formularioRegistro.style.display = 'none';
    elementosDom.planillaCompleta.style.display = 'none';
    
    // Mostrar área de búsqueda
    elementosDom.busquedaInicial.style.display = 'block';
    limpiarFormulario();
});

// FUNCIONES PRINCIPALES
function buscarAlumno() {
    // 1. Ocultar todos los mensajes previos
    elementosDom.alumnoEncontrado.style.display = 'none';
    elementosDom.alumnoNoEncontrado.style.display = 'none';
    
    // 2. Validar campos
    const nombre = elementosDom.nombre.value.trim();
    const apellido = elementosDom.apellido.value.trim();
    
    if (!nombre || !apellido) {
        alert('Por favor ingrese nombre y apellido');
        return;
    }
    
    // 3. Buscar alumno
    const alumnoEncontrado = alumnos.find(alumno => 
        alumno.nombre.toLowerCase() === nombre.toLowerCase() && 
        alumno.apellido.toLowerCase() === apellido.toLowerCase()
    );
    
    // 4. Mostrar el resultado adecuado
    if (alumnoEncontrado) {
        mostrarInformacionAlumno(alumnoEncontrado);
        elementosDom.alumnoEncontrado.style.display = 'block';
    } else {
        elementosDom.alumnoNoEncontrado.style.display = 'block';
    }
}

function mostrarInformacionAlumno(alumno) {
    elementosDom.infoAlumnoEncontrado.innerHTML = `
        <p><strong>Nombre:</strong> ${capitalizarTexto(alumno.nombre)} ${capitalizarTexto(alumno.apellido)}</p>
        <p><strong>Curso:</strong> ${alumno.cursoTomado}</p>
        <p><strong>Estado del curso:</strong> ${alumno.estadoCurso}</p>
        <p><strong>Estado del pago:</strong> ${alumno.estadoPago}</p>
    `;
    
    // Configurar botón de edición
    elementosDom.botonEditarAlumno.onclick = () => prepararEdicionAlumno(alumno);
}

function prepararEdicionAlumno(alumno) {
    elementosDom.curso.value = alumno.cursoTomado;
    elementosDom.estadoCurso.value = alumno.estadoCurso;
    elementosDom.estadoPago.value = alumno.estadoPago;
    elementosDom.formularioRegistro.style.display = 'block';
    
    elementosDom.botonConfirmarRegistro.textContent = 'Guardar cambios';
    elementosDom.botonConfirmarRegistro.onclick = () => guardarCambios(alumno);
}

function guardarCambios(alumno) {
    const cursoIngresado = elementosDom.curso.value.trim();
    
    if (!validarCurso(cursoIngresado)) {
        alert(`Curso no válido. Los cursos disponibles son:\n\n${cursosValidos.join('\n')}`);
        return;
    }
    
    // Actualizar datos
    alumno.cursoTomado = cursoIngresado;
    alumno.estadoCurso = elementosDom.estadoCurso.value;
    alumno.estadoPago = elementosDom.estadoPago.value;
    
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    elementosDom.formularioRegistro.style.display = 'none';
    mostrarInformacionAlumno(alumno);
    
    // Mostrar confirmación
    alert(`Datos de ${capitalizarTexto(alumno.nombre)} ${capitalizarTexto(alumno.apellido)} actualizados correctamente`);
}

function mostrarFormularioRegistro() {
    limpiarFormulario();
    elementosDom.alumnoNoEncontrado.style.display = 'none';
    elementosDom.formularioRegistro.style.display = 'block';
    elementosDom.botonConfirmarRegistro.textContent = 'Agregar al sistema';
    elementosDom.botonConfirmarRegistro.onclick = registrarNuevoAlumno;
}

function registrarNuevoAlumno() {
    const nombre = elementosDom.nombre.value.trim().toLowerCase();
    const apellido = elementosDom.apellido.value.trim().toLowerCase();
    const cursoIngresado = elementosDom.curso.value.trim();
    
    // Validaciones
    if (!nombre || !apellido || !validarNombreApellido(nombre) || !validarNombreApellido(apellido)) {
        alert('Nombre y apellido son obligatorios y solo pueden contener letras.');
        return;
    }
    
    if (!validarCurso(cursoIngresado)) {
        alert(`Curso no válido. Los cursos disponibles son:\n\n${cursosValidos.join('\n')}`);
        return;
    }
    
    // Crear nuevo alumno
    const nuevoAlumno = {
        nombre: nombre,
        apellido: apellido,
        cursoTomado: cursoIngresado,
        estadoCurso: elementosDom.estadoCurso.value,
        estadoPago: elementosDom.estadoPago.value
    };
    
    alumnos.push(nuevoAlumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    
    // Mensaje de confirmación
    alert(`¡Has ingresado al alumno ${capitalizarTexto(nombre)} ${capitalizarTexto(apellido)} de forma correcta!`);
    
    limpiarFormulario();
    elementosDom.formularioRegistro.style.display = 'none';
    mostrarInformacionAlumno(nuevoAlumno);
}

function mostrarPlanilla() {
    elementosDom.planillaCompleta.innerHTML = `
        <h3>Planilla Completa</h3>
        <input type="text" id="filtroPlanilla" placeholder="Filtrar por nombre, curso o estado...">
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Curso</th>
                    <th>Estado</th>
                    <th>Pago</th>
                </tr>
            </thead>
            <tbody id="cuerpoTabla">
                ${alumnos.map(alumno => `
                    <tr>
                        <td>${capitalizarTexto(alumno.nombre)}</td>
                        <td>${capitalizarTexto(alumno.apellido)}</td>
                        <td>${alumno.cursoTomado}</td>
                        <td>${alumno.estadoCurso}</td>
                        <td>${alumno.estadoPago}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <button id="volverABusqueda" style="margin-top: 20px;">Volver a búsqueda</button>
    `;
    
    // Evento de filtrado
    document.getElementById('filtroPlanilla').addEventListener('input', (e) => {
        const filtro = e.target.value.toLowerCase();
        const filas = document.querySelectorAll('#cuerpoTabla tr');
        
        filas.forEach(fila => {
            const textoFila = fila.textContent.toLowerCase();
            fila.style.display = textoFila.includes(filtro) ? '' : 'none';
        });
    });
    
    // Evento para volver
    document.getElementById('volverABusqueda').addEventListener('click', nuevaBusqueda);
    
    elementosDom.planillaCompleta.style.display = 'block';
    // Ocultar otras secciones
    elementosDom.busquedaInicial.style.display = 'none';
    elementosDom.alumnoEncontrado.style.display = 'none';
    elementosDom.alumnoNoEncontrado.style.display = 'none';
}

function nuevaBusqueda() {
    elementosDom.nombre.value = '';
    elementosDom.apellido.value = '';
    
    // Ocultar todo excepto el área de búsqueda
    elementosDom.alumnoEncontrado.style.display = 'none';
    elementosDom.alumnoNoEncontrado.style.display = 'none';
    elementosDom.formularioRegistro.style.display = 'none';
    elementosDom.planillaCompleta.style.display = 'none';
    
    elementosDom.busquedaInicial.style.display = 'block';
}

// EVENT LISTENERS
elementosDom.botonBuscar.addEventListener('click', buscarAlumno);
elementosDom.botonAgregarNuevoAlumno.addEventListener('click', mostrarFormularioRegistro);
elementosDom.botonVerPlanilla.addEventListener('click', mostrarPlanilla);
elementosDom.botonVerPlanillaHeader.addEventListener('click', mostrarPlanilla); // Nuevo listener
elementosDom.botonNuevaBusqueda.addEventListener('click', nuevaBusqueda);