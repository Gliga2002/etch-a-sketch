const container = document.querySelector('.container');
const buttonsContainer = document.querySelector('.buttons');
const colorButtons = document.querySelectorAll('.btn--choice');
const pickerButton = document.querySelector('.btn--picker');
const userColorPicker = document.querySelector('#input-color');
const clearButton = document.querySelector('.btn--clear');
var slider = document.querySelector('#sizeRange');
var color = 'black';
var isDrawing = false;

function pixelSize() {
    let gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.remove());
    createGrid(slider.value);
}

function createGrid(gridNumber) {
    let gridArea = gridNumber * gridNumber;
    for (let i = 1; i <= gridArea; i++) {
        let gridItem = document.createElement('div');
        gridItem.style.transition = 'all 0.3s';
        container.insertAdjacentElement('beforeend', gridItem);
    }
    container.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`;
}

// On Page Load - default size
createGrid(10);

let prevActiveBtn = document.querySelector('.btn--black');

function setActiveBtn(event) {
    const isBtn = event.target.classList.contains('btn--choice');
    const activeBtn = event.target;
    if (!isBtn) return;
    activeBtn.classList.add('active');
    prevActiveBtn?.classList.remove('active');
    prevActiveBtn = activeBtn;
}

function openColorPicker(event) {
    const pickerButton = event.target.closest('.btn--picker');
    const inputColor = pickerButton.querySelector('#input-color');
    inputColor.click();
}

function changeColorGrid(e) {
    if (isDrawing) {
        colorGrid(e.target);
    }
}

function colorGrid(gridPixel) {
    switch (color) {
        case 'rainbow':
            gridPixel.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            break;
        case 'gray':
            gridPixel.style.backgroundColor = `rgba(128,128,128,${Math.random()})`
            break;
        case 'eraser':
            gridPixel.style.backgroundColor = '#ffffff';
            break;
        case 'black':
            gridPixel.style.backgroundColor = '#000000';
            break;
        default:
            gridPixel.style.backgroundColor = color;
            break;
    }
}

function changeColor(event) {
    switch (event.target.dataset.color) {
        case 'rainbow':
            color = 'rainbow';
            break;
        case 'gray':
            color = 'gray';
            break;
        case 'eraser':
            color = 'eraser';
            break;
        default:
            color = 'black';
            break;
    }
}

function userColorSelection(event) {
    color = event.target.value;
}

// Clear Button
function eraseAllColor() {
    var gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.style.backgroundColor = '#ffffff');
}

slider.addEventListener('mouseup', pixelSize);
container.addEventListener('mousedown', () => { isDrawing = true });
document.addEventListener('mouseup', () => { isDrawing = false });
container.addEventListener('mousemove', changeColorGrid);
container.addEventListener('mousedown', changeColorGrid);
buttonsContainer.addEventListener('click', setActiveBtn);
colorButtons.forEach(colorButton => colorButton.addEventListener('click', changeColor));
pickerButton.addEventListener('click', openColorPicker);
userColorPicker.addEventListener('change', userColorSelection, false);
userColorPicker.addEventListener('input', userColorSelection, false);
clearButton.addEventListener('click', eraseAllColor);

