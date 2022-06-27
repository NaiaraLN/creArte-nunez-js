let signIn = document.getElementById('signIn');
signIn.onclick = () => {
    location.href = "pages/login.html";
}
let logIn = document.getElementById('signIn');
let logOut = document.getElementById('logOut');
let userName = document.getElementById('userName');
let toggles = document.querySelectorAll('.login');
let newUser = JSON.parse(sessionStorage.getItem('user'));
let newUser2 = JSON.parse(localStorage.getItem('user'));

function clearData() {
    localStorage.clear();
    sessionStorage.clear();
}

function getUserName(storage) {
    let userStorage = JSON.parse(storage.getItem('user'));
    console.log(userStorage);
    return userStorage;
}

function greet(newUser) {
    userName.innerHTML = `Hola, ${newUser.username}`
}

function showInfo(a, clase) {
    a.forEach(element => {
        element.classList.toggle(clase);
    });
}
function isLogged(newUser) {

    if (newUser) {
        greet(newUser);
        showInfo(toggles, 'd-none');
    }
}
signIn.addEventListener('click', () => {
    showInfo(toggles, 'd-none');
    greet(newUser);
})
logOut.addEventListener('click', () =>{
    clearData();
    showInfo(toggles, 'd-none');
    window.location.reload();
})
// carrito
let openCart = document.querySelector('.cart-btn');
let modal = document.querySelector('.modals');
let closeCart = document.querySelector('.close-modal');
let cartContainer = document.getElementById('carrito-contenedor');
let buttonEmpty = document.getElementById('vaciarCarrito');
let totalCost = document.getElementById('precioTotal');
let buyProducts = document.getElementById('comprar');

openCart.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('modal--show');
}) 
closeCart.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modal--show');
}) 

const cartContent = [];

buyProducts.addEventListener('click', () => {
    if (cartContent.length != '') {
        Swal.fire(
            'Felicidades!',
            'Su compra se realizó con éxito',
            'success'
        )
        cartContent.length = 0;
        updateCart();
    }else{
        Swal.fire('Su carrito está vacío');
    }
})

buttonEmpty.addEventListener('click', () => {
    if (cartContent.length != '') {
        cartContent.length = 0;
        updateCart();
    }else{
        Swal.fire('Su carrito está vacío');
    }
})

const addProduct = (prodId, array) => {
    const item = array.find((prod) => prod.id == prodId);
    cartContent.push(item);
    updateCart();
    localStorage.setItem("carrito", JSON.stringify(cartContent));
    console.log("carrito: " + JSON.stringify(cartContent));

    let cartButton = document.getElementsByClassName('btn_close-cart');
    console.log(cartButton);
    for (let i = 0; i < cartButton.length; i++) {
        let element = document.getElementsByClassName('btn_close-cart')[i];
        element.addEventListener('click', () => {
            clearCart(element.id);
        })
    }
}

const updateCart = () =>{
    cartContainer.innerHTML = ""
    cartContent.forEach((prod) => {
        const div = document.createElement('div');
        div.className = ('productoCarrito');
        div.innerHTML = `
        <div class="linea"></div>
        <table class="modal-table">
            <tr>
                <td class="modal-margin"><img src="${prod.img}" class="img-modal" alt="${prod.nombre}"></td>
                <td class="modal-margin"><p>Nombre: ${prod.nombre}</p></td>
                <td class="modal-margin"><p>Precio: $${prod.precio}</p></td>
                <td class="modal-margin"><button id="${prod.id}" class="btn_close-cart"><span class="material-symbols-outlined">delete</span></button></td>
            </tr>
        </table>
        `
    cartContainer.appendChild(div);
    })

    totalCost.innerHTML = cartContent.reduce((acc, prod) => acc + prod.precio, 0);
}
const clearCart = (prodId) => {
    const item = cartContent.find((prod) => prod.id == prodId);
    const indice = cartContent.indexOf(item);
    cartContent.splice(indice, 1);
    updateCart();
}

const loadEvents = (user, array) => {
    let buttons = document.getElementsByClassName('button');
    console.log("load events");
    console.log(buttons);
    for (let i = 0; i < buttons.length; i++) {

        let item = document.getElementsByClassName('button')[i];
        item.addEventListener("click", () => {
            if (user) {
                addProduct(item.id, array);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se agregó el producto al carrito',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else{
                    Toastify({
                        text: "Para usar el carrito debe iniciar sesión",
                        duration: 3000,
                        destination: "../pages/login.html",
                        newWindow: true,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            color:"#000000",
                            background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(125,180,181,1) 60%)",
                        },
                    }).showToast();
                
            } 
            

        });

    }
}




// MOSTRAR CUADROS EN CARDS
let cardCuadros = document.getElementById('productos');
let cuadros = document.getElementsByClassName('productosNovedades');

function createProducts(array) {
    array.forEach((producto) => {
        const card = document.createElement('div')
        card.className = 'cardBg';
        card.innerHTML = `
                <div class="cardImg">
                    <img src=${producto.img}  alt="${producto.nombre}" class="imgMd"></img>
                </div>    
                <div>
                    <h2 class="titulo-center">${producto.nombre}</h2>
                    <p>$ ${producto.precio}</p>
                    <div>
                        <button id=${producto.id} class="button buttonText">Agregar al carrito</button>
                    </div>
                </div>
                `
        console.log(card);
        cardCuadros.append(card);
        
    
    })
    newUser ? loadEvents(newUser, array): loadEvents(newUser2, array);
    
}
let carrito = localStorage.getItem("carrito");
isLogged(getUserName(sessionStorage) || getUserName(localStorage));

fetch("data.json")
    .then((respuesta) => respuesta.json())
    .then((data) => {
        createProducts(data);
})

