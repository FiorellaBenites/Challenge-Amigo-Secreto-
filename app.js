const nombres = [];

document.getElementById("botonAgregar").addEventListener("click", function () {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Debe ingresar un nombre válido");
        return;
    }

    nombres.push(nombre);
    input.value = ""; 
    actualizarLista();
});

function actualizarLista() {
    const listaNombres = document.getElementById("listaAmigos");
    listaNombres.innerHTML = "";

    nombres.forEach(nombre => {
        const li = document.createElement("li");
        li.textContent = nombre;
        listaNombres.appendChild(li);
    });
}

document.getElementById("botonSortear").addEventListener("click", function () {
    if (nombres.length < 2) {
        alert("Debe haber al menos 2 personas para realizar el sorteo.");
        return;
    }

    let nombresDisponibles = [...nombres];
    let resultado = {};

    nombres.forEach((nombre) => {
        let posiblesAmigos = nombresDisponibles.filter(n => n !== nombre);
        
        if (posiblesAmigos.length === 0) {
            alert("No se pudo realizar el sorteo correctamente. Inténtalo de nuevo.");
            return;
        }

        let amigoSecreto = posiblesAmigos[Math.floor(Math.random() * posiblesAmigos.length)];
        resultado[nombre] = amigoSecreto;
        
        nombresDisponibles = nombresDisponibles.filter(n => n !== amigoSecreto);
    });

    mostrarResultados(resultado);
});

function mostrarResultados(resultado) {
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = "";

    for (let [nombre, amigo] of Object.entries(resultado)) {
        const li = document.createElement("li");
        li.textContent = `${nombre} → ${amigo}`;
        listaResultado.appendChild(li);
    }
}
