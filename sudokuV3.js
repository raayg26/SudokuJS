class Sudoku {
    constructor(mezclas = 30) {
        this.datos = [
            9,	2,	3,	8,	6,	1,	7,	4,	5,
            5,	4,	1,	2,	7,	9,	3,	8,	6,
            7,	6,	8,	4,	3,	5,	2,	9,	1,
            2,	8,	6,	7,	5,	3,	4,	1,	9,
            3,	7,	9,	6,	1,	4,	8,	5,	2,
            4,	1,	5,	9,	2,	8,	6,	3,	7,
            1,	9,	2,	3,	4,	7,	5,	6,	8,
            8,	3,	7,	5,	9,	6,	1,	2,	4,
            6,	5,	4,	1,	8,	2,	9,	7,	3 
        ];
        this.nuevo(mezclas);
    }
    intercambiaFila(i = 10) {
        switch (i) {
            case 0:
                this.cambiaFilas(1, 2);
                break;
            case 1:
                this.cambiaFilas(0, 2);
                break;
            case 2:
                this.cambiaFilas(0, 1);
                break;
            case 3:
                this.cambiaFilas(4, 5);
                break;
            case 4:
                this.cambiaFilas(3, 5);
                break;
            case 5:
                this.cambiaFilas(3, 4);
                break;
            case 6:
                this.cambiaFilas(7, 8);
                break;
            case 7:
                this.cambiaFilas(6, 8);
                break;
            case 8:
                this.cambiaFilas(6, 7);
                break;
            default:
                this.intercambiaFila(Math.floor(Math.random() * 9));
                break;
        }
    }

    cambiaFilas(a, b) 
    {
        const inicioA = a * 9;
        const inicioB = b * 9;
        for (let i = 0; i < 9; i++) 
        {
            const temp = this.datos[inicioA + i];
            this.datos[inicioA + i] = this.datos[inicioB + i];
            this.datos[inicioB + i] = temp;
        }
    }
    

    intercambiaColumna(i = 10) {
        switch (i) {
            case 0:
                this.cambiaColumnas(1, 2);
                break;
            case 1:
                this.cambiaColumnas(0, 2);
                break;
            case 2:
                this.cambiaColumnas(0, 1);
                break;
            case 3:
                this.cambiaColumnas(4, 5);
                break;
            case 4:
                this.cambiaColumnas(3, 5);
                break;
            case 5:
                this.cambiaColumnas(3, 4);
                break;
            case 6:
                this.cambiaColumnas(7, 8);
                break;
            case 7:
                this.cambiaColumnas(6, 8);
                break;
            case 8:
                this.cambiaColumnas(6, 7);
                break;
            default:
                this.intercambiaColumna(Math.floor(Math.random() * 9));
                break;
        }
    }

    cambiaColumnas(a, b) 
    {
        for (let i = 0; i < 9; i++) 
        {
            const inicioA = (a * 9) + i;
            const inicioB = (b * 9) + i;
            const temp = this.datos[inicioA];
            this.datos[inicioA] = this.datos[inicioB];
            this.datos[inicioB] = temp;
        }
    }
    

    nuevo(mezclas = 10) {
        for (let i = 0; i < mezclas; i++) {
            this.intercambiaFila();
            this.intercambiaColumna();
        }
        document.getElementById("nuevoSudoku").innerText="Haz un sudoku nuevo"
    }

    muestra(porcentaje = 1) 
    {
        for (let i = 0; i < 81; i++) 
        {
            const celda = document.getElementById('td' + i);
            const valor = this.datos[i];
            const esVisible = Math.random() < porcentaje;
            
            if (esVisible) 
            {
                celda.classList.add("iniciales");
                celda.innerText = valor;
            } else 
            {
                celda.innerText = '  ';
                celda.classList.remove('iniciales');
            }
        }
    }

    //Funcion que comprueba que el sudoku haya sido resuelto correctamente
    estaResuelto() //devuelve true o false
    {
        const contiene1a9 = (arr) => 
        {
            const numeros = new Set(arr);
            return numeros.size === 9 && !numeros.has(0);
        };
    
        // Verificamos filas
        for (let i = 1; i <= 9; i++) 
        {
            const filaActual = obtenerMapaFilas().get(i);
            if (!contiene1a9(filaActual)) 
            {
                return false;
            }
        }
    
        // Verificamos columnas
        for (let i = 1; i <= 9; i++) 
        {
            const columnaActual = obtenerMapaColumnas().get(i);
            if (!contiene1a9(columnaActual)) 
            {
                return false;
            }
        }
    
        // Verificamos bloques de 3x3
        for (let i = 1; i <= 9; i++) 
        {
            const miniSudokuActual = obtenerMapaMiniSudokus().get(i);
            if (!contiene1a9(miniSudokuActual)) 
            {
                return false;
            }
        }
    
        return true;
    }
    
}


const miSudoku = new Sudoku();
miSudoku.muestra(0.5);//Por defecto esta en nivel medio

const botonFacil = document.getElementById('nivelFacil');
const botonMedio = document.getElementById('nivelMedio');
const botonDificil = document.getElementById('nivelDificil');

botonFacil.addEventListener('click', () => {
    miSudoku.nuevo();
    miSudoku.muestra(0.65); // Mostrar el 35% del sudoku (ocultar el 65%)
});

botonMedio.addEventListener('click', () => {
    miSudoku.nuevo();
    miSudoku.muestra(0.5); // Mostrar el 50% del sudoku (ocultar el 50%)
});

botonDificil.addEventListener('click', () => {
    miSudoku.nuevo();
    miSudoku.muestra(0.25); // Mostrar el 75% del sudoku (ocultar el 25%)
});


function nuevoSudoku(evento) {
    evento.preventDefault();
    miSudoku.nuevo();
    miSudoku.muestra(0.5);//Si creamos uno nuevo, por defecto estara en nivel medio
}


let celdaUltimoFoco = -1;
let celdaActual;

function clickEnTabla(evento) {
    if (evento.target.id.charAt(0) != 't' || evento.target.id.charAt(1) != 'd')
        return;

    resetearColores();
    celdaActual=evento.target;

    filaSeleccionada = Math.floor(parseInt(evento.target.id.slice(2)) / 9);
    columnaSeleccionada = parseInt(evento.target.id.slice(2)) % 9;

    // Cambia el color de la fila, columna y miniSudoku
    cambiarColorFila(filaSeleccionada);
    cambiarColorColumna(columnaSeleccionada);
    cambiarColorMiniSudoku(filaSeleccionada, columnaSeleccionada);

    celdaActual.classList.add('resaltadoCelda');

    console.log(filaSeleccionada);
    console.log(columnaSeleccionada);
    const valoresPermitidos = obtenerValoresPermitidos(filaSeleccionada, columnaSeleccionada);
    

    // Ocultar botones que contienen valores no permitidos para la celda seleccionada
    const botonesValores = document.querySelectorAll('.valor');
    botonesValores.forEach((boton) => {
        if(esCeldaGenerada(celdaActual))
        {
            document.getElementById('valores').style.display = 'none';
        }
        else
        {
            document.getElementById('valores').style.display = 'flex';
            if (!valoresPermitidos.has(boton.value) && boton.value !== "0") 
            {
                boton.style.display = 'none';
            } else 
            {
                boton.style.display = 'inline-block'; // Mostrar botones válidos
            }
        }
        
        
    });
    if (celdaUltimoFoco != -1) {
        document.getElementById(celdaUltimoFoco).classList.remove("gamehighlighttd");
    }
    if(!esCeldaGenerada(evento.target))
    {
        evento.target.classList.add("gamehighlighttd");
        celdaUltimoFoco = evento.target.id;
    }
}
function esCeldaGenerada(celda) 
{
    return celda.classList.contains("iniciales");
}

document.getElementById('nuevoSudoku').addEventListener('click', nuevoSudoku);

document.getElementById('playtable').addEventListener('click', clickEnTabla);

const valores = document.getElementById('valores');
const celdas = document.querySelectorAll('.cellnormal');

valores.addEventListener('click', (event) => {
    const valor = event.target.value;

    if (celdaActual !== -1) 
    {
        const celda = document.getElementById(celdaActual.id);
        
        if (valor !== "0") 
        {
            // Verificar si el valor es permitido para la celda seleccionada
            const valoresPermitidos = obtenerValoresPermitidos(filaSeleccionada, columnaSeleccionada);
            if (valoresPermitidos.has(valor) && !esCeldaGenerada(celda)) 
            {
                celda.innerText = valor; // Asignar el valor permitido
            }
        }else if (valor === "0" && !esCeldaGenerada(celda) ) 
        {
            celda.innerText = '';
        }
        
        celda.classList.remove("gamehighlighttd");
        celdaActual = -1;
    }
});

function obtenerMapaFilas() 
{
    const mapaFilas = new Map();

    
    for (let i = 0; i < 9; i++) {
        const fila = [];
          
        
        for (let j = 0; j < 9; j++) {
            // Construimos el ID de la celda actual
            const idCelda = 'td' + (i * 9 + j);
            
            // Obtenemos el valor de la celda por su ID
            const valorCelda = document.getElementById(idCelda).textContent.trim();
            
            // Agregamos el valor de la celda a la fila actual
            fila.push(valorCelda);
        }
        
        // Agregamos la fila al mapa de filas
        mapaFilas.set(i + 1, fila);
    }

    return mapaFilas;
}
function obtenerMapaColumnas() {
    const mapaColumnas = new Map();

    
    for (let i = 0; i < 9; i++) {
        const columna = [];
        
        
        for (let j = 0; j < 9; j++) {
            // Construimos el ID de la celda actual
            const idCelda = 'td' + (j * 9 + i);
            
            // Obtenemos el valor de la celda por su ID
            const valorCelda = document.getElementById(idCelda).textContent.trim();
            
            // Agregamos el valor de la celda a la columna actual
            columna.push(valorCelda);
        }
        
        // Agregamos la columna al mapa de columnas
        mapaColumnas.set(i + 1, columna);
    }

    return mapaColumnas;
}
function obtenerMapaMiniSudokus() {
    const mapaMiniSudokus = new Map();

    
    for (let bloque = 1; bloque <= 9; bloque++) 
    {
        const miniSudoku = [];

        // Calculamos las coordenadas del bloque en base a su número (1-9)
        const filaInicio = Math.floor((bloque - 1) / 3) * 3;
        const columnaInicio = ((bloque - 1) % 3) * 3;
        //  estos cálculos ayudan a encontrar la esquina superior izquierda del bloque actual.

        // Recorremos cada celda dentro del bloque actual (3x3)
        for (let i = 0; i < 3; i++) 
        {
            for (let j = 0; j < 3; j++) 
            {
                // Calculamos las coordenadas de la celda dentro del bloque
                const fila = filaInicio + i;
                const col = columnaInicio + j;

                // Construimos el ID de la celda actual dentro del bloque
                const idCelda = 'td' + (fila * 9 + col);

                // Obtenemos el valor de la celda por su ID
                const valorCelda = document.getElementById(idCelda).textContent.trim();

                // Agregamos el valor de la celda al mini-sudoku actual
                miniSudoku.push(valorCelda);
            }
        }

        // Agregamos el mini-sudoku al mapa de mini-sudokus
        mapaMiniSudokus.set(bloque, miniSudoku);
    }

    return mapaMiniSudokus;
}
function obtenerValoresPermitidos(fila, columna) 
{
    const valoresPermitidos = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    
    // Obtenemos fila y columna existentes
    const filaActual = obtenerMapaFilas().get(fila + 1);
    const columnaActual = obtenerMapaColumnas().get(columna + 1);

    // Filtramos los valores existentes en la fila y columna actual
    filaActual.forEach((valor) => valoresPermitidos.delete(valor));
    columnaActual.forEach((valor) => valoresPermitidos.delete(valor));

    // Obtenemos el bloque de mini-sudoku al que pertenece la celda seleccionada
    const bloqueFila = Math.floor(fila / 3);
    const bloqueColumna = Math.floor(columna / 3);
    const bloque = bloqueFila * 3 + bloqueColumna + 1;
    const miniSudokuActual = obtenerMapaMiniSudokus().get(bloque);

    // Filtramos los valores existentes en el mini-sudoku actual
    miniSudokuActual.forEach((valor) => valoresPermitidos.delete(valor));

    return valoresPermitidos;
}

// Evento del botón de verificacion, para mostrar al usuario el mensaje de enhorabuena.
const botonVerificar = document.getElementById('verificarSudoku');
botonVerificar.addEventListener('click', () => {
    if (miSudoku.estaResuelto()) 
    {
        alert('¡El sudoku está resuelto correctamente!');
        document.getElementById("nuevoSudoku").innerText="¡Has ganado!, ¿OTRA?"
    } else 
    {
        alert('El sudoku aún no está resuelto correctamente.');
    }
});

//Funcion para el boton de rendicion, que muestra la solucion del sudoku
document.getElementById('botonRendicion').addEventListener('click', () => 
{
    miSudoku.muestra(1); 
    document.getElementById('valores').style.display = 'none';
    
});

//Funcion para introducir los numeros por teclado incluido el borrar.
document.addEventListener('keydown', (event) => {
    const teclas = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; // Teclado numérico

    if (teclas.includes(event.key) || (event.keyCode >= 96 && event.keyCode <= 105)) 
    {
        const valorTecla = event.key; // Obtenemos el valor numérico de la tecla presionada
        if (celdaActual && !esCeldaGenerada(celdaActual)) 
        {
            const valoresPermitidos = obtenerValoresPermitidos(filaSeleccionada, columnaSeleccionada);

            // Verificamos si el valor es permitido para la celda seleccionada
            if (valoresPermitidos.has(valorTecla)) 
            {
                celdaActual.innerText = valorTecla; 
            }
        }
    } else if (event.key === 'Delete' || event.key === 'Backspace') 
    {
        if (celdaActual && !esCeldaGenerada(celdaActual)) 
        {
            celdaActual.innerText = '';
        }
    }
});

function resetearColores() 
{
    const celdas = document.querySelectorAll('.cellnormal');
    celdas.forEach((celda) => {
        celda.classList.remove('filaSeleccionada', 'columnaSeleccionada', 'miniSudokuSeleccionado', 'resaltadoCelda');
    });
    
}

function cambiarColorFila(fila) 
{
    for (let i = 0; i < 9; i++) 
    {
        const idCelda = 'td' + (fila * 9 + i);
        const celda = document.getElementById(idCelda);
        celda.classList.add('filaSeleccionada');
    }
}

function cambiarColorColumna(columna) 
{
    for (let i = 0; i < 9; i++) 
    {
        const idCelda = 'td' + (i * 9 + columna);
        const celda = document.getElementById(idCelda);
        celda.classList.add('columnaSeleccionada');
    }
}

function cambiarColorMiniSudoku(fila, columna) 
{
    const bloqueFila = Math.floor(fila / 3) * 3;
    const bloqueColumna = Math.floor(columna / 3) * 3;

    for (let i = 0; i < 3; i++) 
    {
        for (let j = 0; j < 3; j++) 
        {
            const idCelda = 'td' + ((bloqueFila + i) * 9 + (bloqueColumna + j));
            const celda = document.getElementById(idCelda);
            celda.classList.add('miniSudokuSeleccionado');
        }
    }
}