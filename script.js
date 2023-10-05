const container = document.querySelector('.container');
const buttonsContainer = document.querySelector('.buttons');
const colorButtons = document.querySelectorAll('.btn--choice');
const userColorPicker = document.querySelector('#input-color');
const clearButton = document.querySelector('.btn--clear');
var slider = document.querySelector('#sizeRange');
var color = 'black';

function pixelSize() {
    let gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.remove());
    createGrid(slider.value);
}

function createGrid (gridNumber) { 
    let gridArea = gridNumber * gridNumber;
    for (let i = 1; i <= gridArea; i++) {
        let gridItem = document.createElement('div');
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
  if(!isBtn) {
    prevActiveBtn?.classList.remove('active');
    return;
  }
  activeBtn.classList.add('active');
  prevActiveBtn?.classList.remove('active');
  console.log(prevActiveBtn);
  prevActiveBtn = activeBtn;
}

function changeColorGrid(e) {
    colorGrid(e.target);
}

function colorGrid(gridPixel) {
    switch (color) {
        case 'rainbow':
            gridPixel.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            gridPixel.classList.remove('gray');
            break;  
        case 'gray':
           gridPixel.style.backgroundColor = `rgba(128,128,128,${Math.random()})`
            break;
        case 'eraser':
            gridPixel.style.backgroundColor = '#ffffff';
            gridPixel.classList.remove('gray');
            break;
        case 'black':
            gridPixel.style.backgroundColor = '#000000';
            gridPixel.classList.remove('gray');
            break;
        default:
            gridPixel.style.backgroundColor = color;
            gridPixel.classList.remove('gray');
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
container.addEventListener('mouseover', changeColorGrid);
buttonsContainer.addEventListener('click',setActiveBtn);
colorButtons.forEach(colorButton => colorButton.addEventListener('click', changeColor));
userColorPicker.addEventListener('change', userColorSelection, false);
userColorPicker.addEventListener('input', userColorSelection, false);
clearButton.addEventListener('click', eraseAllColor);