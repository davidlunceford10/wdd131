let selectTheme = document.querySelector('#theme')

function changeTheme() {
    let selectedValue = selectTheme.value;
    let byuiLogo = document.getElementById('byui-logo')

    if (selectedValue === 'dark'){
        document.body.classList.add('dark');
        byuiLogo.src = 'images/byui-logo_white.png';
    } else {
        document.body.classList.remove('dark');
        byuiLogo.src = 'images/byui-logo.webp';
    }
}

selectTheme.addEventListener('change', changeTheme);

