//CREANDO UNA CUENTA

let btnLogin = document.getElementById('btnLogin');
let rememberMe = document.getElementById('rememberMe');


function saveUser(storage) {
    let mail = document.getElementById('emailAddress').value;
    let username = document.getElementById('nombre').value;
    let password = document.getElementById('password').value;
    const newUser = {
        'mail': mail,
        'username': username,
        'password': password
    }
    storage === 'sessionStorage' && sessionStorage.setItem('user', JSON.stringify(newUser));
    storage === 'localStorage' && localStorage.setItem('user', JSON.stringify(newUser));
}

function redirectHTML() {
    location.href = "../index.html";
}

btnLogin.addEventListener('click', () => {
    if (rememberMe.checked) {
        saveUser('localStorage');
        redirectHTML();
    } else {
        saveUser('sessionStorage');
        redirectHTML();
    }

})

