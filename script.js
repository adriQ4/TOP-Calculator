// script.js
// Autor: Tu Nombre
// Descripción: Archivo principal de JavaScript para la funcionalidad de la calculadora
// Fecha: 13 de enero de 2025

//! ======== Variables ========
const display = document.querySelector(".display"); // Elemento del display
const buttons = document.querySelectorAll(".btns"); // Todos los botones

let currentDisplay = ""; // <--- Texto que se muestra en el display
let operationList = []; // <--- Almacena números y operadores para calcular
const maxInputLength = 10; // <--- Límite máximo de caracteres

//* ======== Funciones ========

//? Actualiza el contenido del display
function updateDisplay(value) {
  display.textContent = value || ""; // <--- Muestra "0" si está vacío
}

//? Calcula el resultado de la operación
function calculateResult() {
  try {
    const result = eval(operationList.join("")); // <--- Convierte a expresión matemática
    return result.toString().length > maxInputLength
      ? parseFloat(result.toPrecision(10)) // <--- Redondea si es demasiado largo
      : result;
  } catch {
    return currentDisplay("Error"); // <--- Muestra "Error" si hay un problema
  }
}

//? Gestiona las teclas pulsadas en el teclado
function handleKeyPress(event) {
  const key = event.key; // Caracter generado
  const shiftPressed = event.shiftKey; // Verifica si Shift está presionado

  //? === Si es Shift + 0 (correspondiente al botón =) ===
  if (key === "=" && shiftPressed) {
    if (currentDisplay) operationList.push(currentDisplay); // <--- Añade el último número
    currentDisplay = calculateResult(); // <--- Calcula el resultado
    operationList = []; // <--- Limpia la lista de operaciones
  }

  //? === Borrar último carácter con Backspace o Delete ===
  else if (key === "Backspace" || key === "Delete") {
    currentDisplay = currentDisplay.slice(0, -1); // <--- Borra el último carácter

    //? === Si es un operador (+, -, *, /, %) ===
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    if (currentDisplay) {
      operationList.push(currentDisplay); // <--- Añade el número actual
      operationList.push(key); // <--- Añade el operador
      currentDisplay = ""; // <--- Limpia el display
    }

    //? === Si es un punto decimal ===
  } else if (key === ".") {
    if (!currentDisplay.includes(".")) currentDisplay += "."; // <--- Añade un punto si no existe

    //? === Si es un número ===
  } else if (!isNaN(key)) {
    if (currentDisplay.length < maxInputLength) {
      currentDisplay += key; // <--- Añade el número si no excede el límite
    }
  }

  updateDisplay(currentDisplay); // <--- Actualiza el display en todos los casos
}

//! ======== Eventos ========

//* Evento para cada botón
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.textContent; // <--- Obtiene el texto del botón pulsado

    if (value === "AC") {
      currentDisplay = ""; // <--- Limpia el display
      operationList = []; // <--- Limpia la lista de operaciones
    } else if (value === "DEL") {
      currentDisplay = currentDisplay.slice(0, -1); // <--- Borra el último carácter
    } else if (["+", "-", "*", "/", "%"].includes(value)) {
      if (currentDisplay) {
        operationList.push(currentDisplay);
        operationList.push(value);
        currentDisplay = "";
      }
    } else if (value === "=") {
      if (currentDisplay) operationList.push(currentDisplay);
      currentDisplay = calculateResult();
      operationList = [];
    } else if (value === ".") {
      if (!currentDisplay.includes(".")) currentDisplay += ".";
    } else {
      if (currentDisplay.length < maxInputLength) {
        currentDisplay += value;
      }
    }

    updateDisplay(currentDisplay); // <--- Actualiza el display
  });
});

//* Evento para el teclado
document.addEventListener("keydown", handleKeyPress); // <--- Pasa el evento a la lógica
