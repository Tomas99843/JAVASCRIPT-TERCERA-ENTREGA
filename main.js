// DATOS INICIALES(simula una base de datos)
let alumnos = [
    { nombre: "Juan", apellido: "Perez", cursoTomado: "Javascript", estadoCurso: "en curso", estadoPago: "pago efectuado" },
    { nombre: "Mateo", apellido: "Garcia", cursoTomado: "ReactJS", estadoCurso: "aprobado", estadoPago: "pago efectuado" },
    { nombre: "Angel", apellido: "Marquez", cursoTomado: "Machine Learning", estadoCurso: "en curso", estadoPago: "pago pendiente" },
    { nombre: "Marta", apellido: "Lopez", cursoTomado: "Desarrollo web", estadoCurso: "aprobado", estadoPago: "pago pendiente" }
];

//LISTA DE CURSOS VALIDOS
const cursosValidos = [
    "Javascript",
    "ReactJS",
    "Machine Learning",
    "Desarrollo web",
    "Python",
    "Base de datos",
    "Inteligencia Artificial"
];

//CARGAR DATOS GUARDADOS
if (localStorage.getItem('alumnos')) {
    alumnos = JSON.parse(localStorage.getItem('alumnos'));
}

//ELEMENTOS DOM de:
const elementosDom = {
    // Búsqueda inicial
    busquedaInicial: document.getElementById('busquedaInicial'),
    nombre: document.getElementById('nombre'),
    apellido: document.getElementById('apellido'),
    botonBuscar: document.getElementById('botonBuscar'),
    
    // Resultados alumno encontrado
    alumnoEncontrado: document.getElementById('alumnoEncontrado'),
    infoAlumnoEncontrado: document.getElementById('infoAlumnoEncontrado'),
    botonVerPlanilla: document.getElementById('botonVerPlanilla'),
    botonNuevaBusqueda: document.getElementById('botonNuevaBusqueda'),
    
    // Resultados alumno no encontrado
    alumnoNoEncontrado: document.getElementById('alumnoNoEncontrado'),
    botonAgregarNuevoAlumno: document.getElementById('botonAgregarNuevoAlumno'),
    
    // Formulario de registro
    formularioRegistro: document.getElementById('formularioRegistro'),
    curso: document.getElementById('curso'),
    estadoCurso: document.getElementById('estadoCurso'),
    estadoPago: document.getElementById('estadoPago'),
    botonConfirmarRegistro: document.getElementById('botonConfirmarRegistro'),
    
    // Planilla completa
    planillaCompleta: document.getElementById('planillaCompleta')
};

//LIMPIAR FORMULARIO
function limpiarFormulario() {
    elementosDom.curso.value = '';
    elementosDom.estadoCurso.value = 'en curso';
    elementosDom.estadoPago.value = 'pago pendiente';
}

//FUNCION VALIDACION DE SI EL CURSO EXISTE
function validarCurso(cursoIngresado) {
    return cursosValidos.some(curso => 
        curso.toLowerCase() === cursoIngresado.toLowerCase()
    );
}

//FUNCION PRINCIPAL DE BUSQUEDA
function buscarAlumno() {
    const nombre = elementosDom.nombre.value.trim();
    const apellido = elementosDom.apellido.value.trim();
    
    if (!nombre || !apellido) {
        alert('Por favor ingrese nombre y apellido');
        return;
    }
    
    // Ocultar secciones
    elementosDom.alumnoEncontrado.style.display = 'none';
    elementosDom.alumnoNoEncontrado.style.display = 'none';
    elementosDom.formularioRegistro.style.display = 'none';
    elementosDom.planillaCompleta.style.display = 'none';
    
    // Buscar alumno
    const alumnoEncontrado = alumnos.find(x => 
        x.nombre.toLowerCase() === nombre.toLowerCase() && 
        x.apellido.toLowerCase() === apellido.toLowerCase()
    );
    
    if (alumnoEncontrado) {
        mostrarInformacionAlumno(alumnoEncontrado);
    } else {
        elementosDom.alumnoNoEncontrado.style.display = 'block';
    }
}

//FUNCION PARA MOSTRAR INFORMACION DEL ALUMNO
function mostrarInformacionAlumno(alumno) {
    const { nombre, apellido, cursoTomado, estadoCurso, estadoPago } = alumno;
    
    elementosDom.infoAlumnoEncontrado.innerHTML = `
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Curso:</strong> ${cursoTomado}</p>
        <p><strong>Estado del curso:</strong> ${estadoCurso}</p>
        <p><strong>Estado del pago:</strong> ${estadoPago}</p>
    `;
    
    elementosDom.alumnoEncontrado.style.display = 'block';
}

//FUNCION PARA MOSTRAR FORMULARIO DE REGISTRO
function mostrarFormularioRegistro() {
    limpiarFormulario();
    elementosDom.alumnoNoEncontrado.style.display = 'none';
    elementosDom.formularioRegistro.style.display = 'block';
}

//FUNCION PARA REGISTRAR NUEVO ALUMNO
function registrarNuevoAlumno() {
    const cursoIngresado = elementosDom.curso.value.trim();
    
    if (!cursoIngresado) {
        alert('El curso es obligatorio');
        return;
    }
    
    // Validar que el curso exista en la lista
    if (!validarCurso(cursoIngresado)) {
        alert(`Curso no válido. Los cursos disponibles son:\n\n${cursosValidos.join('\n')}`);
        return;
    }
    
    const nuevoAlumno = {
        nombre: elementosDom.nombre.value.trim(),
        apellido: elementosDom.apellido.value.trim(),
        cursoTomado: cursoIngresado, // Usamos el valor ya validado
        estadoCurso: elementosDom.estadoCurso.value,
        estadoPago: elementosDom.estadoPago.value
    };
    
    alumnos.push(nuevoAlumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    
    limpiarFormulario();
    elementosDom.formularioRegistro.style.display = 'none';
    mostrarInformacionAlumno(nuevoAlumno);
}

//FUNCION MOSTRAR PLANILLA
function mostrarPlanilla() {
    elementosDom.planillaCompleta.innerHTML = `
        <h3>Planilla Completa</h3>
        <table border="1" style="width: 100%;">
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Curso</th>
                <th>Estado</th>
                <th>Pago</th>
            </tr>
            ${alumnos.map(alumno => `
                <tr>
                    <td>${alumno.nombre}</td>
                    <td>${alumno.apellido}</td>
                    <td>${alumno.cursoTomado}</td>
                    <td>${alumno.estadoCurso}</td>
                    <td>${alumno.estadoPago}</td>
                </tr>
            `).join('')}
        </table>
    `;
    elementosDom.planillaCompleta.style.display = 'block';
}

//FUNCION NUEVA BUSQUEDA
function nuevaBusqueda() {
    elementosDom.nombre.value = '';
    elementosDom.apellido.value = '';
    elementosDom.alumnoEncontrado.style.display = 'none';
    elementosDom.alumnoNoEncontrado.style.display = 'none';
    elementosDom.formularioRegistro.style.display = 'none';
    elementosDom.planillaCompleta.style.display = 'none';
    elementosDom.busquedaInicial.style.display = 'block';
}

//EVENT LISTENER S
elementosDom.botonBuscar.addEventListener('click', buscarAlumno);
elementosDom.botonAgregarNuevoAlumno.addEventListener('click', mostrarFormularioRegistro);
elementosDom.botonConfirmarRegistro.addEventListener('click', registrarNuevoAlumno);
elementosDom.botonVerPlanilla.addEventListener('click', mostrarPlanilla);
elementosDom.botonNuevaBusqueda.addEventListener('click', nuevaBusqueda);

//INICIALIZACION DE LA PAGINA
limpiarFormulario();