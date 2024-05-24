const fs = require('fs');
const path = require('path');

const rutaCarpetaSuperior = './extras'; // Ruta de la carpeta superior que deseas recorrer
const archivoJSON = 'data/extras.json'; // Nombre del archivo JSON a generar

// Lee el contenido de la carpeta superior
fs.readdir(rutaCarpetaSuperior, (err, carpetas) => {
  if (err) {
    console.error('Error al leer la carpeta superior:', err);
    return;
  }

  const grupos = {};

  // Para cada carpeta en la carpeta superior
  carpetas.forEach(carpeta => {
    const rutaCarpeta = path.join(rutaCarpetaSuperior, carpeta);

    // Verifica si es una carpeta
    if (fs.statSync(rutaCarpeta).isDirectory()) {
      // Lee el contenido de la carpeta
      const archivos = fs.readdirSync(rutaCarpeta)
        .filter(archivo => archivo.endsWith('.pdf'))
        .map(archivo => path.parse(archivo).name);

      // Almacena los archivos en el grupo correspondiente
      grupos[carpeta] = archivos;
    }
  });

  // Crea el objeto JSON
  const contenidoJSON = JSON.stringify(grupos, null, 2);

  // Escribe el archivo JSON
  fs.writeFile(archivoJSON, contenidoJSON, err => {
    if (err) {
      console.error('Error al escribir el archivo JSON:', err);
      return;
    }
    console.log(`Archivo JSON '${archivoJSON}' generado correctamente.`);
  });
});
