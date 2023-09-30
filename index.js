const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');

const shapeContainer = document.getElementById('shapes');
const dropdown = document.querySelector('.dropdown');
let shape = document.getElementById('choosedShape');
let strokeSize = document.getElementById('strokeSize');
strokeSize.defaultValue = "10";


const colorPicker = document.querySelector('#colorPicker input')
const palatte = document.getElementById('palatte')
const descriptions = document.getElementById('descriptions')
const editDesc = document.querySelectorAll('.desc')
let colors = document.querySelectorAll('.colors');
let currentColor = '#000000'


localStorage.setItem('#dae2be', 'Plain');
localStorage.setItem('#76d173', 'Grassy');
console.log(palatte)



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
    target.contentEditable = true;
    target.focus();
    target.classList.add('active');
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
    console.log('clicked');
    shapeContainer.classList.toggle('active');
});

document.querySelectorAll('#shapeList li').forEach((item) => {
    item.addEventListener('click', () => {
        console.log(item.id);
        shape.innerHTML = item.id.charAt(0).toUpperCase() + item.id.slice(1);
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



