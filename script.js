// openBlank
document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll("section a");
  for (var i = 0; i < links.length; i++) {
    links[i].setAttribute("target", "_blank");
  }
});

// viewToggler
document.addEventListener("DOMContentLoaded", function () {
  const views = document.querySelectorAll(".view");
  const viewLinks = document.querySelectorAll(".view-link");

  const viewShow = (id) => {
    views.forEach((view) => (view.style.display = "none"));
    document.getElementById(id).style.display = "block";
  };

  viewLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetViewId = this.getAttribute("href").substring(1);
      viewShow(targetViewId);
    });
  });

  viewShow(views[0].id);
});

// dataRender
fetch('./data.json')
.then(response => response.json())
.then(data => {
  const contenedorGrupos = document.getElementById('contenedor-clases');

  // Para cada grupo en el archivo JSON
  Object.entries(data).forEach(([nombreGrupo, archivos]) => {
    // Crea un section para el grupo
    const section = document.createElement('section');
    
    // Agrega un h4 con el nombre del grupo
    const h4 = document.createElement('h4');
    h4.textContent = nombreGrupo;
    section.appendChild(h4);
    
    // Crea un ul para los archivos del grupo
    const ul = document.createElement('ul');
    
    // Agrega un li por cada archivo del grupo
    archivos.forEach(archivo => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = archivo;
      a.href = `ruta/a/la/carpeta/${archivo}.pdf`; // Cambiar la ruta según la estructura de tu proyecto
      a.setAttribute('download', ''); // Añadir el atributo 'download' para que el enlace sea de descarga
      li.appendChild(a);
      ul.appendChild(li);
    });
    
    // Agrega el ul al section
    section.appendChild(ul);
    
    // Agrega el section al contenedor de grupos
    contenedorGrupos.appendChild(section);
  });
})
.catch(error => console.error('Error cargando el archivo JSON:', error));

// playListRender
// Función para hacer fetch y generar el HTML
function generarHTMLDesdeJSON() {
  fetch('./playlist.json') // Cambiar la ruta según la ubicación de tu archivo JSON
    .then(response => response.json())
    .then(data => {
      const section = generarHTML(data);
      const contenedorGrupos = document.getElementById('contenedor-videos');
      contenedorGrupos.appendChild(section);
    })
    .catch(error => console.error('Error cargando el archivo JSON:', error));
}

// Función para generar el HTML
function generarHTML(datos) {
  const section = document.createElement('section');
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');

  // Configurar título del grupo
  h2.textContent = datos.nombreGrupo;

  // Agregar elementos al DOM
  datos.archivos.forEach(archivo => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = archivo.url;
    a.textContent = archivo.titulo;

    li.appendChild(a);
    ul.appendChild(li);
  });

  section.appendChild(h2);
  section.appendChild(ul);

  return section;
}

// Llamar a la función para generar el HTML desde el JSON
generarHTMLDesdeJSON();
