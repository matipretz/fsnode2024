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

// clasesRender
fetch("./data/clases.json")
  .then((response) => response.json())
  .then((data) => {
    const contenedorGrupos = document.getElementById("contenedor-clases");

    // Para cada grupo en el archivo JSON
    Object.entries(data).forEach(([nombreGrupo, archivos]) => {
      // Crea un section para el grupo
      const section = document.createElement("section");

      // Agrega un h4 con el nombre del grupo
      const h4 = document.createElement("h4");
      h4.textContent = nombreGrupo;
      section.appendChild(h4);

      // Crea un ul para los archivos del grupo
      const ul = document.createElement("ul");

      // Agrega un li por cada archivo del grupo
      archivos.forEach((archivo) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = archivo;
        a.href = `./docs/${nombreGrupo}/${archivo}.pdf`; // Cambiar la ruta según la estructura de tu proyecto
        a.setAttribute("download", ""); // Añadir el atributo 'download' para que el enlace sea de descarga
        li.appendChild(a);
        ul.appendChild(li);
      });

      // Agrega el ul al section
      section.appendChild(ul);

      // Agrega el section al contenedor de grupos
      contenedorGrupos.appendChild(section);
    });
  })
  .catch((error) => console.error("Error cargando el archivo JSON:", error));
  function generarHTMLDesdeJSON(rutaArchivo, idContenedor) {
    fetch(rutaArchivo)
        .then(response => response.json())
        .then(data => {
            let contenedor = document.getElementById(idContenedor);
            if (Array.isArray(data)) {
                // Si los datos son un array, genera una sección para cada grupo
                data.forEach(grupo => {
                    let section = generarSeccion(grupo);
                    contenedor.appendChild(section);
                });
            } else {
                // Si los datos son un objeto, genera una sola sección
                let section = generarSeccion(data);
                contenedor.appendChild(section);
            }
        })
        .catch(error => console.error("Error cargando el archivo JSON:", error));
}

// clasesRender
fetch("./data/extras.json")
  .then((response) => response.json())
  .then((data) => {
    const contenedorGrupos = document.getElementById("contenedor-extras");

    // Para cada grupo en el archivo JSON
    Object.entries(data).forEach(([nombreGrupo, archivos]) => {
      // Crea un section para el grupo
      const section = document.createElement("section");

      // Agrega un h4 con el nombre del grupo
      const h4 = document.createElement("h4");
      h4.textContent = nombreGrupo;
      section.appendChild(h4);

      // Crea un ul para los archivos del grupo
      const ul = document.createElement("ul");

      // Agrega un li por cada archivo del grupo
      archivos.forEach((archivo) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = archivo;
        a.href = `./extras/${nombreGrupo}/${archivo}.pdf`; // Cambiar la ruta según la estructura de tu proyecto
        a.setAttribute("download", ""); // Añadir el atributo 'download' para que el enlace sea de descarga
        li.appendChild(a);
        ul.appendChild(li);
      });

      // Agrega el ul al section
      section.appendChild(ul);

      // Agrega el section al contenedor de grupos
      contenedorGrupos.appendChild(section);
    });
  })
  .catch((error) => console.error("Error cargando el archivo JSON:", error));
  function generarHTMLDesdeJSON(rutaArchivo, idContenedor) {
    fetch(rutaArchivo)
        .then(response => response.json())
        .then(data => {
            let contenedor = document.getElementById(idContenedor);
            if (Array.isArray(data)) {
                // Si los datos son un array, genera una sección para cada grupo
                data.forEach(grupo => {
                    let section = generarSeccion(grupo);
                    contenedor.appendChild(section);
                });
            } else {
                // Si los datos son un objeto, genera una sola sección
                let section = generarSeccion(data);
                contenedor.appendChild(section);
            }
        })
        .catch(error => console.error("Error cargando el archivo JSON:", error));
}

function generarSeccion(grupo) {
    let section = document.createElement("section");
    let h2 = document.createElement("h2");
    let ul = document.createElement("ul");

    h2.textContent = grupo.nombreGrupo;

    grupo.archivos.forEach(archivo => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = archivo.url;
        a.textContent = archivo.titulo;
        li.appendChild(a);
        ul.appendChild(li);
    });

    section.appendChild(h2);
    section.appendChild(ul);

    return section;
}

generarHTMLDesdeJSON("./data/playlist.json", "contenedor-videos");
generarHTMLDesdeJSON("./data/links.json", "contenedor-links");
generarHTMLDesdeJSON("./data/libros.json", "contenedor-libros");
generarHTMLDesdeJSON("./data/extras.json", "contenedor-extras");

