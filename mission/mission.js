
let selectElem = document.querySelector('select');
let logo = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        // code for changes to colors and logo
        document.body.style.backgroundColor = "black";
        const img = document.getElementById('logo');
        img.src = "images/byui-logo-white.png"
        document.body.classList.add("dark-mode");

    } else {
        // code for changes to colors and logo
        document.body.style.backgroundColor = "white";
        const img = document.getElementById('logo');
        img.src = "images/byui-logo-blue.webp"
        document.body.classList.remove("dark-mode");

    }
}           
                    