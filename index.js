const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');

const shapeContainer = document.getElementById('shapes');
const dropdown = document.querySelector('.dropdown');
let shape = document.getElementById('choosedShape');
let strokeSize = document.getElementById('strokeSize');
let selectedShape = '';
strokeSize.defaultValue = "10";


const colorPicker = document.querySelector('#colorPicker input')
const palatte = document.getElementById('palatte')
const descriptions = document.getElementById('descriptions')
const editDesc = document.querySelectorAll('.desc')
let colors = document.querySelectorAll('.colors');
let currentColor = '#000000'


localStorage.setItem('#dae2be', 'Plain');
localStorage.setItem('#76d173', 'Grassy');


window.onload = () => {
    console.log(localStorage, localStorage.length);

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        let newColorDesc =
            ` 
                    <div class="description">
                        <div class="color" style="background-color: ${key};"> </div>
                        <p class="desc" onclick = edit()> ${value}</p>
                    </div> 
                `

        let newColor = `<div class="color colors" onclick = changeColor()  style="background-color: ${key};"></div> `

        descriptions.innerHTML += newColorDesc;
        palatte.innerHTML += newColor;
    }

}


const edit = (e) => {
    target = this.event.target;
    console.log(target);
    target.contentEditable = true;
    target.focus();
    target.classList.add('active');

    let key = target.previousElementSibling.style.backgroundColor;
    key  = key.replace("rgb(", "");
    key  = key.replace(")", "");

    let rgb = key.split(",");

    for (value in rgb) {   
        rgb[value] = parseInt(rgb[value]);
    }

    let hexR = parseInt(rgb[0]).toString(16);
    let hexG = parseInt(rgb[1]).toString(16);
    let hexB = parseInt(rgb[2]).toString(16);


    if (hexR.length == 1) {
        hexR = "0" + hexR;
    }

    if (hexG.length == 1) {
        hexG = "0" + hexG;
    }

    if (hexB.length == 1) {
        hexB = "0" + hexB;
    }

    key = "#" + hexR + hexG + hexB;
    console.log(key);

    target.addEventListener('blur', () => {
        localStorage.setItem(key, target.innerHTML);}
    )



}

const changeColor = () => {
    target = this.event.target;
    currentColor = target.style.backgroundColor;
    console.log(currentColor);
}


document.addEventListener('click', (e) => {

    if (!(e.target.classList.contains('desc'))) {
        let items = document.querySelectorAll('.desc');
        items.forEach((item) => {
            item.contentEditable = false;
            item.blur();
            item.classList.remove('active');
        })
    }
})


increaseBtn.addEventListener('click', () => {
    strokeSize.value = parseInt(strokeSize.value) + 1;
    strokeSize.focus();
});

decreaseBtn.addEventListener('click', () => {
    strokeSize.value = parseInt(strokeSize.value) - 1;
    strokeSize.focus();
});

dropdown.addEventListener('click', () => {
    shapeContainer.classList.toggle('active');
});

document.querySelectorAll('#shapeList li').forEach((item) => {
    item.addEventListener('click', () => {
        shape.innerHTML = item.id.charAt(0).toUpperCase() + item.id.slice(1);
        selectedShape = item.id;
        shapeContainer.classList.remove('active');
    });
});

colorPicker.onchange = function () {
    const color = colorPicker.value;
    localStorage.setItem(color, color)

    let newColorDesc =
        ` 
                <div class="description">
                    <div class="color" style="background-color: ${color};"> </div>
                    <p class="desc" onclick = edit()> ${color}</p>
                </div> 
            `

    let newColor = `<div class="color colors" onclick = changeColor()  style="background-color: ${color};"></div> `

    descriptions.innerHTML += newColorDesc;
    palatte.innerHTML += newColor;
}


// currentColor, strokeSize, selectedShape

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');


let painting = false;
let width = canvas.innerWidth;
let height = canvas.innerHeight;

console.log( currentColor, strokeSize.value, selectedShape);


function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = color;   
    ctx.fill();
}

function drawLine(x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeSize.value;
    ctx.stroke();
    ctx.closePath();
}

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}




