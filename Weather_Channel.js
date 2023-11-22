/* Weather Channel
¡Te damos la bienvenida al último proyecto integrador de este curso!

En este proyecto armarás un sitio para mostrar las condiciones meteorológicas de cada ciudad. Para eso, interactuarás con la API del Weather Channel que viste en la sección anterior.

⚠️ Importante: En este proyecto trabajarás únicamente con el script de la página. Podés inspeccionar y usar este template para el HTML y el CSS.
Así se verá el proyecto terminado:


Como viste en el ejemplo, los elementos que mostrarás en tu página son:

    Ciudad.
    Temperatura actual.
    Un ícono que ilustre la condición climática.
    Una descripción breve del clima.

Para hacerlo, seguí este Paso a Paso:




1 Vinculá un archivo JavaScript a tu documento HTML y dentro del .js creá una Función llamada cargarCiudad.

2 Dentro de la Función hacé un pedido AJAX que traiga la información de la ciudad de Buenos Aires y la muestre en la consola


Pista: 🛎 Recordá: Usá $.getJSON para hacer un pedido AJAX.

3 Obtené la referencia al botón y agregá un eventListener para que, cuando el usuario haga click, se dispare un pedido AJAX con la información de la ciudad elegida.

🤓 Tip: Guardá en la Variable ciudad el valor de la ciudad ingresada en el input. Luego, concatená esta Variable a la URL de la API. Probá con alguna de las Keys (si no funciona una, probá con alguna de las otras):

KEY I
"https://api.openweathermap.org/data/2.5/weather?q=" + ciudad +"&appid=fdd533266e28101881f610f2b8f1ebe1"

KEY II
"https://api.openweathermap.org/data/2.5/weather?q=" + ciudad +"&appid=1a9b3670ada3ece0551373f7325e028d"

KEY III
"https://api.openweathermap.org/data/2.5/weather?q=" + ciudad +"&appid=dcec7df661b1e6b0edab51d796b7339c"

4 Por defecto, el CSS del proyecto no muestra el <div class="container">. Agregá la siguiente línea de código dentro de la Función para hacerlo visible, una vez que el usuario aprete el botón:
document.querySelector(".container").style.visibility = "visible"

5 Para mostrar en la pantalla el nombre de la ciudad (ingresado en el input), asignale al span con el id="ciudad" el valor de la Propiedad name de la respuesta recibida. Para eso, usá la Propiedad textContent.

Solucion: document.querySelector("#ciudad").textContent = data.name

6 Seguí el mismo criterio para tomar la temperatura actual de la ciudad.

Pista: 
¿Celsius o Fahrenheit?
La temperatura llega en la escala Celsius (°C). Podés verlo en la URL del Open Weather Map, en la expresión units=metric.

7 Para obtener el símbolo de Celsius (°C) al lado de la temperatura, concatená este String: <sup>°C</sup>.

🤓 Tip: Usá innerHTML.

   8 Agregá el ícono que ilustre la condición climática. Para eso, concatená la URL de la ubicación de la imagen con la del nombre de la imagen. Para acceder a la lista completa de condiciones climáticas, hacé click acá.

   9 Obtené la descripción del clima actual. Por ejemplo: "Few Clouds".

📛 Comprobá que todo funcione correctamente. Al ingresar una ciudad en el input, se deben agregar los datos en el <div>. Cuando se escriba una nueva ciudad, deben actualizarse los datos.

🚀 Ahora, pasá al Extra Credit para mejorar tu proyecto y desafiar tus habilidades.





🚀 Extra Credit

Si querés mejorar tu proyecto agregá estas características:

    Cuando el usuario haga click en el botón, se debe borrar el contenido del input.
    Agregá una validación en el input para que le muestre un alert al usuario si no ingresó texto al hacer click.
    Agregá una validación para que le muestre un alert al usuario si ingresa el nombre de una ciudad inexistente.



    Pista: Si la ciudad es inexistente, la API devolverá un Error 404.
🔍 Para aprender más, usá tus habilidades de developer y googleá la solución .fail.

📛 Comprobá que todo funcione correctamente y luego pasá a la siguiente sección.




*/

/* Conclusión

En este módulo aprendiste qué es una API y cómo se consume mediante jQuery. También realizaste pedidos con AJAX y JSON.

Por último, integraste todos estos conceptos en un proyecto útil de aplicación cotidiana.

En el Extra Credit aprendiste otro concepto importante como el "Error 404".



¡Felicitaciones! Terminaste todos tus proyectos 🥳.
Pasá a la siguiente sección para completar tu cursada.

🛎️ Recordá: Si algún aspecto de PLEDU no funciona como esperabas o merece revisión podés avisarle al equipo de Contenido por acá.



*/
document.addEventListener('DOMContentLoaded', function () {
  function cargarCiudad() {
    const inputCiudad = document.querySelector('input');
    const ciudad = inputCiudad.value.trim();

    if (ciudad === '') {
      alert('Por favor, ingrese el nombre de una ciudad.');
      return; // No realiza la carga si no se ingresó una ciudad
    }

    const apiKey = 'fdd533266e28101881f610f2b8f1ebe1'; // Key I
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${apiKey}`;

    $.getJSON(url)
      .done(function (data) {
        document.querySelector('.container').style.visibility = 'visible';
        document.querySelector('#ciudad').textContent = data.name;
        document.querySelector('#temperatura').innerHTML =
          data.main.temp + '<sup>°C</sup>';
        const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        document.querySelector('#wicon').src = iconUrl;
        document.querySelector('#descripcion').textContent =
          data.weather[0].description;
      })
      .fail(function (jqxhr, textStatus, error) {
        if (jqxhr.status === 404) {
          alert('Ciudad no encontrada. Por favor, ingrese una ciudad válida.');
        } else {
          console.error('Error en la solicitud:', textStatus, error);
        }
      });
  }

  const boton = document.querySelector('button');

  boton.addEventListener('click', function () {
    cargarCiudad(); // Llamada a cargarCiudad solo cuando se hace clic en el botón
    document.querySelector('input').value = ''; // Limpiar input después de hacer clic
  });
});
