// Declaración del arreglo que almacenará la configuración actual de las imágenes
let arreglo = ["", "", ""];

// Función que evita que se abra como enlace al soltar el elemento
function allowDrop(ev) {
    ev.preventDefault();
}

// Función que se ejecuta cuando se arrastra el elemento
function drag(ev) {
    // Establece el tipo de dato que se va a arrastrar
    ev.dataTransfer.setData("text", ev.target.id);
}

// Función que se ejecuta cuando se suelta el elemento arrastrado
function drop(ev) {
    // Obtener el dato que se está arrastrando y almacenarlo en una variable
    var data = ev.dataTransfer.getData("text");
    // Agregar el dato al elemento donde se soltó
    ev.target.appendChild(document.getElementById(data));
    // Actualizar el arreglo con la posición del drop-area
    arreglo[parseInt(ev.target.id.replace('dropArea', '')) - 1] = data;
    // Eliminar la clase 'dragging' del elemento arrastrado
    document.getElementById(data).classList.remove('dragging');
}

// Función para validar la configuración de las imágenes
function validate() {
    var aciertos = 0; // Inicializar el contador de aciertos a 0
    // Verificar si todas las áreas de sujeción están ocupadas
    if (arreglo[0] !== "" && arreglo[1] !== "" && arreglo[2] !== "") {
        // Verificar si la configuración es la correcta
        if (arreglo[0] === "apple1" && arreglo[1] === "apple2" && arreglo[2] === "apple3") {
            document.querySelector("h1").innerHTML = "Felicidades has ganado";
            alert("Felicidades has ganado");
        } else {
            // Contar los aciertos si la configuración es incorrecta
            if (arreglo[0] === "apple1") aciertos++;
            if (arreglo[1] === "apple2") aciertos++;
            if (arreglo[2] === "apple3") aciertos++;
            document.querySelector("h1").innerHTML = "Inténtalo de nuevo";
            alert("Inténtalo de nuevo tienes " + aciertos + " aciertos");
        }
    } else {
        alert("Debes llenar todos los espacios"); // Alerta si hay áreas de sujeción vacías
    }
}

// Función para reiniciar el juego
function restart() {
    // Limpiar el contenido de los drop-areas
    var dropAreas = document.querySelectorAll('.drop-area');
    dropAreas.forEach(dropArea => {
        dropArea.innerHTML = '';
    });
    // Obtener las figuras del lado derecho del libro
    var rightPage = document.getElementById('rightPage');
    var figures = Array.from(rightPage.querySelectorAll('.figura'));
    // Mezclar aleatoriamente las figuras
    figures.sort(() => Math.random() - 0.5);
    // Restablecer los IDs de las áreas de sujeción y volver a agregar las figuras mezcladas
    figures.forEach((figure, index) => {
        figure.id = `dropArea${index + 1}`;
        rightPage.appendChild(figure);
    });
    // Restablecer el arreglo a su estado inicial vacío
    arreglo = ["", "", ""];
    // Limpiar el contenido del lado izquierdo del libro
    var leftPage = document.getElementById('leftPage');
    leftPage.innerHTML = '';
    // Crear y agregar las imágenes de nuevo al lado izquierdo del libro
    var images = [
        { src: './images/1_apple.png', id: 'apple1' },
        { src: './images/2_apple.png', id: 'apple2' },
        { src: './images/3_apples.png', id: 'apple3' }
    ];
    images.forEach(image => {
        var img = document.createElement('img');
        img.src = image.src;
        img.id = image.id;
        img.className = 'figure';
        img.draggable = true;
        img.ondragstart = drag;
        leftPage.appendChild(img);
    });
}




