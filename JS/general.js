/* Lista de productos */
/* const productos=[ 
    {id:1, nombre:"Maceta", descripcion:"", img:"Imagenes/Productos/Ofertas/MacetasNegras.jpg", precio:1000, onSale:true, descuento:50, stock:10, alt:"Macetas negras", cantiadadEnCarrito:0},
    {id:2, nombre:"Maceta", descripcion:"", img:"Imagenes/Productos/Ofertas/MacetasBlancas.jpg", precio:1000, onSale:true, descuento:30, stock:10, alt:"Macetas blancas", cantiadadEnCarrito:0},
    {id:3, nombre:"Mesita", descripcion:"", img:"Imagenes/Productos/Ofertas/Mesita.jpg", precio:1699, onSale:true, descuento:29, stock:15, alt:"Mesita de madera", cantiadadEnCarrito:0},
    {id:4, nombre:"Biblioteca", descripcion:"", img:"Imagenes/Productos/Ofertas/Estantería.png", precio:1999, onSale:true, descuento:29, stock:10, alt:"biblioteca", cantiadadEnCarrito:0},
    {id:5, nombre:"Estantería", descripcion:"", img:"Imagenes/Productos/Ofertas/estanteria2.png", precio:1899, onSale:true, descuento:29, stock:10, alt:"Estantería", cantiadadEnCarrito:0},
    {id:6, nombre:"Sofa un cuerpo", descripcion:"", img:"Imagenes/Productos/Ofertas/Sofa.png", precio:6500, onSale:true, descuento:20, stock:10, alt:"Sofa de un cuerpo", cantiadadEnCarrito:0},
    {id:8, nombre:"Boxes decoración", descripcion:"", img:"Imagenes/Productos/Ofertas/Boxes.jpg", precio:2599, onSale:true, descuento:15, stock:10, alt:"Boxes de decoración", cantiadadEnCarrito:0},
    {id:7, nombre:"Lampara de pie", descripcion:"", img:"Imagenes/Productos/Ofertas/LamparaDePie.png", precio:1000, onSale:true, descuento:5, stock:10, alt:"Lampara de pie", cantiadadEnCarrito:0},
    {id:9, nombre:"Armario", descripcion:"", img:"Imagenes/Productos/Destacados/Armario.png", precio:8990, onSale:false, descuento:0, stock:10, alt:"Armario de madera", cantiadadEnCarrito:0},
    {id:10, nombre:"Butaca", descripcion:"", img:"Imagenes/Productos/Destacados/Butaca.png", precio:1000, onSale:false, descuento:0, stock:10, alt:"Butaca de madera", cantiadadEnCarrito:0},
    {id:11, nombre:"Monstera", descripcion:"", img:"Imagenes/Productos/Destacados/Monstera.png", precio:1299, onSale:false, descuento:0, stock:10, alt:"Planta monstera", cantiadadEnCarrito:0},
    {id:12, nombre:"Estantería", descripcion:"", img:"Imagenes/Productos/Destacados/Estanteria.png", precio:1999, onSale:false, descuento:0, stock:10, alt:"Estantería de madera", cantiadadEnCarrito:0},
    {id:13, nombre:"Mesita", descripcion:"", img:"Imagenes/Productos/Destacados/Mesita.png", precio:2599, onSale:false, descuento:0, stock:10, alt:"Mesita", cantiadadEnCarrito:0},
    {id:14, nombre:"Planta", descripcion:"", img:"Imagenes/Productos/Destacados/Planta.png", precio:999, onSale:false, descuento:0, stock:10, alt:"Planta"},
    {id:15, nombre:"Estantería", descripcion:"", img:"Imagenes/Productos/Destacados/Rack-estanteria.png", precio:2599, onSale:false, descuento:0, stock:10, alt:"Estantería", cantiadadEnCarrito:0},
    {id:16, nombre:"Mesa de madera", descripcion:"", img:"Imagenes/Productos/Destacados/Mesa.png", precio:15999, onSale:false, descuento:0, stock:10, alt:"Mesa de madera", cantiadadEnCarrito:0},
    {id:17, nombre:"Cajonera", descripcion:"", img:"Imagenes/Productos/Destacados/Cajonera.png", precio:3699, onSale:false, descuento:0, stock:10, alt:"Cajonera", cantiadadEnCarrito:0}
]; */



/* FUNCINES PARA FUNCIONALIDADES DEL CARRITO */
function irAlCarritoDesdePages(){
    location.href='Carrito.html'
}

function irAlCarritoDesdeIndex(){
    location.href='Pages/Carrito.html'
}

function agregarACarrito(id){
    let item = productos.find((producto) => { /* guardo el item a agregar, dependiendo el id ingresado, en una variable*/
        return producto.id === id
    })
    item.cantiadadEnCarrito = 1 /* aumento la cantidad del item */
    carrito.push(item) /* agrego el item al carrito  */
    actualizarLocalStorageCarrito()
    acutalizarContadorCarrito()
    Toastify({
        text: `producto "${item.nombre}" agregado al carrito`,
        duration: 3500,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "mensajeToastify agregado"
      }).showToast();
}

function quitarDeCarrito(id){
    let item = carrito.find((producto) => {/* guardo el item a agregar, dependiendo el id ingresado, en una variable*/
        return producto.id === parseInt(id)
    })
    if(item != -1){ /* si el item está en el carrito, obtengo su index en el carrito */
        let index=carrito.indexOf(item)
        carrito.splice(index, 1) /* elimino el item del array carrito */
        actualizarLocalStorageCarrito()
        acutalizarContadorCarrito()
        Toastify({
            text: `producto "${item.nombre}" quitado del carrito`,
            duration: 3500,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: "mensajeToastify quitado"
          }).showToast();
    }   
}

function actualizarLocalStorageCarrito(){
    localStorage.removeItem("carrito") /* limpio el carrito en local storage */
    let carritoJSON = JSON.stringify(carrito) /* creo el carrito a JSON */
    localStorage.setItem("carrito", carritoJSON) /* vuelvo a guardarlo en local storage */
}

function recuperarCarrito(){
    let carrito = localStorage.getItem("carrito") /* obtengo el carrito de localStorage */
    if (carrito){ 
        return JSON.parse(carrito)  /* si carrito está en el localStorage, retorno el objeto con JSON.parse */
    }else{
        return [] /* si carrito no está en el localStorage es porq está vacio. retorno un array vacío */
    }
}

function acutalizarContadorCarrito(){/* selecciono el nodo del icono car, y le agrego la longitud del carrtio*/
    let iconCarrito = document.querySelector('i#car span')
    if(carrito.length>0){
        iconCarrito.innerHTML = carrito.length
    }else{
        iconCarrito.innerHTML = ''
    }
}

function activarBuscadorHeader(){
    let searchBar = document.querySelector('.header__searchBar')/* Nodo de la barra de busqueda */
    if (document.querySelector('#index') !== null){ /* SE EJECUTA SOLO SI ESTAMOS EN INDEX */
        searchBar.addEventListener('keyup', (e)=>{
            let filtrados = productos.filter((el)=> el.nombre.toUpperCase().includes(searchBar.value.toUpperCase())) /* Filtro segun el valor de la barra de busueda */
            crearItems(filtrados)/* creo los items */
            let itemsOnSale = document.querySelector("#itemsOnSale") /* Nodo de container de OnSale */
            let itemsDestacados = document.querySelector("#itemsDestacados") /* Nodo de container de Destacados */
            if(itemsOnSale.innerHTML===''){ /* si el container de items on sale está vacío despues del filtrado, mustro un mensaje de No coincidencia */
                itemsOnSale.innerHTML =`<div class="cardSinCoindicencias">
                                            <div class="mensaje">
                                                <img src="Iconos/caraTriste.png" alt="carita triste">
                                                <p>No se han encontrado productos OnSale para su busqueda.</p>
                                            </div>
                                        </div>`
            }
            if(itemsDestacados.innerHTML===''){/* si el container de destacados está vacío despues del filtrado, mustro un mensaje de No coincidencia */
                itemsDestacados.innerHTML =`<div class="cardSinCoindicencias">
                                                <div class="mensaje">
                                                    <img src="Iconos/caraTriste.png" alt="carita triste">
                                                    <p>No se han encontrado productos Destacados para su busqueda.</p>
                                                </div>
                                            </div>`
            }
        })
    }else{/* SE EJECUTA SOLO SI NO ESTOY EN INDEX */
        searchBar.addEventListener('keyup', (eve)=>{
            if (eve.key==="Enter"){
                Swal.fire({
                    icon: 'info',
                    title: 'BUSCADOR NO HABILITADO',
                    text:'Utilice el buscador de la página principal por ahora.',   
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton:"btnConfirm",
                    }
                })
                searchBar.value=''
            }
        })
    }
}

function activarNewsLetterForm(){
    let form = document.getElementById('newsLetter')
    form.addEventListener('submit', (e)=>{/* evento al envío del form */
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'REGISTRADO CORRECTAMENTE!!',
            text:'Gracias por registrarte, comenzaras a recibir nuestras novedeades 😁',   
            confirmButtonText: 'OK',
            showDenyButton: false, 
            customClass: {
                confirmButton:"btnConfirm",
            }
        }).then(()=>{
            document.getElementById('email').value='' /* vacío el campo */
        })
    })
}

/* EN DESARROLLO */
function aunNoDesarrollado(){
    Swal.fire({
        icon: 'info',
        title: 'EN DESARROLLO',
        text:'Esta funcionalidad aún no se encuentra desarrollada :(',   
        confirmButtonText: 'OK',
        showDenyButton: false, 
        customClass: {
            confirmButton:"btnConfirm",
        }
    })
}




/* EJECUCIONES */
const URL = "JS/productos.json"
const productos = []
let carrito = recuperarCarrito()
acutalizarContadorCarrito()
activarBuscadorHeader()
activarNewsLetterForm()
