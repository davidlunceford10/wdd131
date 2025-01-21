let selectTheme = document.querySelector('#theme')

function changeTheme() {
    let selectedValue = selectTheme.value;
    let byuiLogo = document.getElementById('byui-logo')

    if (selectedValue === 'dark'){
        document.body.classList.add('dark');
        byuiLogo.src = 'byui-logo_white.png';
    } else {
        document.body.classList.remove('dark');
        
        byuiLogo.src = ''
        byuiLogo.onload = function() {
            byuiLogo.src = 'byui-logo.webp';
        };
        byuiLogo.src = 'byui-logo.webp';
    }
}

selectTheme.addEventListener('change', changeTheme);

