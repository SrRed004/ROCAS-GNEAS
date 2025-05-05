// Base de datos de rocas ígneas (con imágenes PNG y ubicación)
const rocksDatabase = [
    {
        id: 1,
        image: "images/Granito.png",
        texture: "fanerítica",
        composition: "intermedia",
        location: "intrusiva",
        name: "Granito"
    },
    {
        id: 2,
        image: "images/02.png",
        texture: "afanítica",
        composition: "máfica",
        location: "extrusiva",
        name: "Basalto"
    },
    {
        id: 3,
        image: "images/03.png",
        texture: "afanítica",
        composition: "máfica",
        location: "extrusiva",
        name: "03"
    },
    {
        id: 4,
        image: "images/04.png",
        texture: "afanítica",
        composition: "intermedia",
        location: "extrusiva",
        name: "04"
    },
    {
        id: 5,
        image: "images/05.png",
        texture: "porfídica",
        composition: "intermedia",
        location: "intrusiva",
        name: "05"
    },
    {
        id: 6,
        image: "images/andesita.png",
        texture: "afanítica",
        composition: "intermedia",
        location: "extrusiva",
        name: "Andesita"
    },
    {
        id: 7,
        image: "images/pumita.png",
        texture: "vítrea",
        composition: "félsica",
        location: "extrusiva",
        name: "pumita" 
    },
    { 
        id: 8,
        image: "images/07.png",
        texture: "porfídica",
        composition: "félsica",
        location: "intrusiva",
        name: "granito" 
    },
    { 
        id: 9,
        image: "images/08.png",
        texture: "fanerítica",
        composition: "intermedia",
        location: "intrusiva",
        name: "Diorita" 
    },
    { 
        id: 10,
        image: "images/09.png",
        texture: "afanítica",
        composition: "félsica",
        location: "extrusiva",
        name: "Andesita" 
    },
    { 
        id: 11,
        image: "images/10.png",
        texture: "piroclástica",
        composition: "máfica",
        location: "extrusiva",
        name: "Piroxeno" 
    },
    { 
        id: 12,
        image: "images/11.png",
        texture: "fanerítica",
        composition: "ultramáfica",
        location: "intrusiva",
        name: "Peridiotita" 
    },
    { 
        id: 13,
        image: "images/12.png",
        texture: "piroclástica",
        composition: "félsica",
        location: "extrusiva",
        name: "12" 
    },
    { 
        id: 14,
        image: "images/13.png",
        texture: "pegmatítica",
        composition: "félsica",
        location: "intrusiva",
        name: "Cuarzo" 
    },
    { 
        id: 15,
        image: "images/14.png",
        texture: "fanerítica",
        composition: "intermedia",
        location: "intrusiva",
        name: "14" 
    },
    { 
        id: 16,
        image: "images/15.png",
        texture: "fanerítica",
        composition: "intermedia",
        location: "intrusiva",
        name: "Diorita" 
    },
    { 
        id: 17,
        image: "images/16.png",
        texture: "porfídica",
        composition: "intermedia",
        location: "intrusiva",
        name: "16" 
    },
    { 
        id: 18,
        image: "images/17.png",
        texture: "afanítica",
        composition: "félsica",
        location: "extrusiva",
        name: "17" 
    },
    { 
        id: 19,
        image: "images/18.png",
        texture: "porfídica",
        composition: "máfica",
        location: "intrusiva",
        name: "Basalto con olivino" 
    },
    { 
        id: 20,
        image: "images/19.png",
        texture: "afanítica",
        composition: "máfica",
        location: "extrusiva",
        name: "Basalto" 
    },
    { 
        id: 21,
        image: "images/20.png",
        texture: "fanerítica",
        composition: "máfica",
        location: "intrusiva",
        name: "Grabo, compuesto por silicatos Fe,Mg" 
    }
];

// Opciones de clasificación
const textureOptions = ["afanítica", "vítrea", "piroclástica", "fanerítica", "porfídica", "pegmatítica"];
const compositionOptions = ["félsica", "intermedia", "máfica", "ultramáfica"];
const locationOptions = ["extrusiva", "intrusiva"];

// Variables de estado
let currentRockIndex = 0;
let userSelections = {
    texture: null,
    composition: null,
    location: null
};
let score = 0;
let totalQuestions = 0;

// Elementos del DOM
const rockImageElement = document.getElementById('rock-image');
const rockNameElement = document.getElementById('rock-name');
const textureOptionsElement = document.getElementById('texture-options');
const compositionOptionsElement = document.getElementById('composition-options');
const locationOptionsElement = document.getElementById('location-options');
const checkAnswersButton = document.getElementById('check-answers');
const nextRockButton = document.getElementById('next-rock');
const resultsElement = document.getElementById('results');
const scoreMessageElement = document.getElementById('score-message');
const correctAnswersElement = document.getElementById('correct-answers');

// Inicializar la aplicación
function init() {
    createOptions();
    setupEventListeners();
    showRock(currentRockIndex);
}

// Crear opciones de clasificación
function createOptions() {
    // Opciones de textura
    textureOptions.forEach(option => {
        const optionElement = createOptionElement('texture', option);
        textureOptionsElement.appendChild(optionElement);
    });

    // Opciones de composición
    compositionOptions.forEach(option => {
        const optionElement = createOptionElement('composition', option);
        compositionOptionsElement.appendChild(optionElement);
    });

    // Opciones de ubicación
    locationOptions.forEach(option => {
        const optionElement = createOptionElement('location', option);
        locationOptionsElement.appendChild(optionElement);
    });
}

// Crear elemento de opción
function createOptionElement(type, option) {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = option;
    optionElement.addEventListener('click', () => selectOption(type, option, optionElement));
    return optionElement;
}

// Configurar event listeners
function setupEventListeners() {
    checkAnswersButton.addEventListener('click', checkAnswers);
    nextRockButton.addEventListener('click', nextRock);
}

// Mostrar una roca específica
function showRock(index) {
    if (index >= rocksDatabase.length) {
        showFinalResults();
        return;
    }

    const rock = rocksDatabase[index];
    rockImageElement.src = rock.image;
    rockImageElement.alt = `Imagen de ${rock.name}`;
    rockNameElement.textContent = "¿Qué roca es?";

    // Resetear selecciones
    resetSelections();

    // Ocultar resultados y habilitar botones
    resultsElement.classList.add('hidden');
    checkAnswersButton.disabled = false;
    nextRockButton.disabled = true;
}

// Resetear selecciones
function resetSelections() {
    userSelections.texture = null;
    userSelections.composition = null;
    userSelections.location = null;

    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
}

// Seleccionar una opción
function selectOption(type, value, element) {
    // Deseleccionar todas las opciones del mismo tipo
    const options = document.querySelectorAll(`#${type}-options .option`);
    options.forEach(option => {
        option.classList.remove('selected');
    });

    // Seleccionar la opción clickeada
    element.classList.add('selected');
    userSelections[type] = value;
}

// Verificar respuestas
function checkAnswers() {
    if (!userSelections.texture || !userSelections.composition || !userSelections.location) {
        alert("Por favor selecciona una opción en cada categoría");
        return;
    }

    const currentRock = rocksDatabase[currentRockIndex];
    const isTextureCorrect = userSelections.texture === currentRock.texture;
    const isCompositionCorrect = userSelections.composition === currentRock.composition;
    const isLocationCorrect = userSelections.location === currentRock.location;

    // Actualizar puntaje (1 punto por cada acierto)
    if (isTextureCorrect) score += 1;
    if (isCompositionCorrect) score += 1;
    if (isLocationCorrect) score += 1;
    totalQuestions += 3;

    // Mostrar resultados
    displayResults(currentRock, isTextureCorrect, isCompositionCorrect, isLocationCorrect);
}

// Mostrar resultados
function displayResults(rock, isTextureCorrect, isCompositionCorrect, isLocationCorrect) {
    resultsElement.classList.remove('hidden');
    scoreMessageElement.textContent = `Puntaje actual: ${score} de ${totalQuestions} (${Math.round((score/totalQuestions)*100)}%)`;
    
    let correctAnswersText = `<strong>${rock.name}</strong><br><br>`;
    correctAnswersText += `<span class="${isTextureCorrect ? 'correct' : 'incorrect'}">Textura: ${rock.texture}</span><br>`;
    correctAnswersText += `<span class="${isCompositionCorrect ? 'correct' : 'incorrect'}">Composición: ${rock.composition}</span><br>`;
    correctAnswersText += `<span class="${isLocationCorrect ? 'correct' : 'incorrect'}">Ubicación: ${rock.location}</span>`;
    
    correctAnswersElement.innerHTML = correctAnswersText;
    rockNameElement.textContent = rock.name;
    
    checkAnswersButton.disabled = true;
    nextRockButton.disabled = false;
}

// Siguiente roca
function nextRock() {
    currentRockIndex += 1;
    showRock(currentRockIndex);
}

// Mostrar resultados finales
function showFinalResults() {
    rockImageElement.src = "";
    rockImageElement.alt = "";
    rockNameElement.textContent = "¡Completado!";
    
    document.querySelector('.classification-section').innerHTML = "";
    checkAnswersButton.style.display = "none";
    nextRockButton.style.display = "none";
    
    resultsElement.classList.remove('hidden');
    scoreMessageElement.textContent = `¡Práctica completada! Puntaje final: ${score} de ${totalQuestions}`;
    correctAnswersElement.innerHTML = `
        <p>Porcentaje de aciertos: <strong>${Math.round((score/totalQuestions)*100)}%</strong></p>
        <p>Recarga la página para volver a intentarlo.</p>
    `;
}

// Iniciar la aplicación
window.addEventListener('DOMContentLoaded', init);
