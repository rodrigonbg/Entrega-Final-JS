
function retornarItemCarrito(prod){/* Lista de carrito */ 
    let saleTag
    let precioOriginalTachado
    let precioConDescuento = (((100-prod.descuento)*prod.precio)/100)*prod.cantiadadEnCarrito    
    if (prod.onSale===true){/* creo el item dependiendo de si el producto está en loquidación o no */
        saleTag = `<span id="saleTag"><i class="fa-solid fa-arrow-down"></i>${prod.descuento}%</span>`
        precioOriginalTachado = `<span id=precioOriginal>$${prod.precio}</span>`
    }else{
        saleTag=""
        precioOriginalTachado=""
    }
    return `\n<div class="prodCarrito">
                <div>
                    <img class="imgCarrito" src=../${prod.img} alt=${prod.alt}>
                    ${saleTag}
                </div>
                <p class="nombreProdCarrito">${prod.nombre}</p>
                <p class="precioProdCarrito">${precioOriginalTachado}$${((100-prod.descuento)*prod.precio)/100}</p>
                <div class="cantidadProdCarrito">
                    <div id="${prod.id}" class="btn decrementar" onclick="decrementarBtnCarrito(${prod.id})">-</div>
                    <span>${prod.cantiadadEnCarrito}</span>
                    <div id="${prod.id}" class="btn incrementar" onclick="incrementarBtnCarrito(${prod.id})">+</div>
                </div>
                <p class="subtotalProdCarrito">$${precioConDescuento.toFixed(2)}</p>
                <div><i id="${prod.id}" class="fa-solid fa-xmark fa-2x"></i></div>
            </div>\n`
}/* botones incrementar, decrementar y quitar del carrito con id del producto */

function cargarListaDeCarrito(carrito){
    cargarCuerpoDeListaCarrito(carrito)/* cargo la lista de items */
    cargarPieDeListaCarrito(carrito) /* cargo el precio total */
    activarItemCarritoBtnQuitar() /* activo los botones de quitar item nuevamente. */
}

function cargarCuerpoDeListaCarrito(carrito){
    let cuerpoListaCarrito = document.querySelector(".cuerpoLista") /* nodo de cuerpo de la lista */
    cuerpoListaCarrito.innerHTML ="" /* vacío el nodo */
    if (carrito.length == 0){ /* Si el carrito está vacío, agrego un mensaje */
        cuerpoListaCarrito.innerHTML=  `<div class="cardContainer">
                                            <div class="cardCarritoVacio">
                                                <img src="../Iconos/caraTriste.png" alt="">
                                                <p>El Carrito de compras se encuentra vacío.</p>
                                                <p>Agregue algunos productos antes de realizar la compra.</p>
                                            </div>
                                        </div>`
    }else{/* Si el carrito tiene productos, retorno los items */
        carrito.forEach(prod => {cuerpoListaCarrito.innerHTML += retornarItemCarrito(prod)});
    }
}

function cargarPieDeListaCarrito(carrito){
    let pieListaCarrito = document.querySelector(".pieLista") /* nodo de pie de lista */
    if(carrito.length>0){ /* si el carrito tiene items, muestro el total y un botón de vaciar */
        let total = 0 /* inicializo el total en 0 */
        carrito.forEach((prod)=>{ total += ((((100 - prod.descuento)*prod.precio)/100)*prod.cantiadadEnCarrito)}) /* acumulo el precio en el total (FullPrice y OnSale) */
        pieListaCarrito.innerHTML= `<button class="btnVaciarCarrito" onclick="btnVaciarCarrito()">Vaciar Carrito</button>\n<p class="importeTotal"> El importe total a abonar es de: <strong> $${total.toFixed(2)} </strong> </p>`
    }else{/* si el carrito no tiene items, no muestro nada */
        pieListaCarrito.innerHTML=""
    }

}

function vaciarCarrito(){
    localStorage.removeItem("carrito") /* limpio el carrito en local storage, queda vacío*/
    carrito = recuperarCarrito() /* retorna un array vacío */
    cargarListaDeCarrito(carrito) /* recargo items en ventana carrito */
    acutalizarContadorCarrito()
}

function btnVaciarCarrito(){
    Swal.fire({
        icon: 'question',
        title: '¿Seguro que desea vaciar el carrito?',
        showDenyButton: true,    
        confirmButtonText: 'Vaciar',
        denyButtonText: 'Cancelar',
        customClass: {
            confirmButton:"btnConfirm",
            denyButton: "btnDeny",
            icon: "iconQuestion",
            title: "titleQuestion",  
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Carrito vaciado',    
                showConfirmButton:false,
                timer: 2000,
                customClass: {
                    title: "titleSuccess",  
                }
            })
            vaciarCarrito()
            window.scroll({top: 0})
        }else if (result.isDenied) {
            Swal.fire({
                icon:'success',
                title: 'Genial',
                showConfirmButton: false,
                timer: 1000,
                customClass: {
                    title: "titleSuccess",  
                }
            })
        }
    })
}

function btnComprar(){
    if(carrito.length>0){
        Swal.fire({
            icon: 'question',
            title: '¿Desea confirmar su compra?',
            showDenyButton: true,    
            confirmButtonText: 'Comprar',
            denyButtonText: 'Cancelar',
            customClass: {
                confirmButton:"btnConfirm",
                denyButton: "btnDeny",
                icon: "iconQuestion",
                title: "titleQuestion",  
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Gracias por su compra!!!',
                    showDenyButton: false,    
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton:"btnConfirm",
                        title: "titleSuccess",  
                    }
                }).then(()=>{
                    location.href = '../index.html'
                    vaciarCarrito()
                })
            }

        })        
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Agregue productos al carrito primero',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                title: "titleError" 
            }
        })
    }
}

function incrementarBtnCarrito(id){ /* funcionalidad a botón de incremento en item-carrito (+) */
    let index = carrito.findIndex((el)=> el.id === parseInt(id)) /* cuardo el index en carrito del item a incrementar */
    if(carrito[index].cantiadadEnCarrito>=1 ){ /* si la cantidad es mayor o igual a 1, incremento */
        carrito[index].cantiadadEnCarrito+=1
        actualizarLocalStorageCarrito() /* actualizo local storage */
        cargarListaDeCarrito(carrito) /* recargo la lista de items */
    } 
}

function decrementarBtnCarrito(id){ /* funcionalidad a botón de Decremento en item-carrito (-) */
    let index = carrito.findIndex((el)=> el.id === parseInt(id)) /* cuardo el index en carrito del item a decrementar */
    if(carrito[index].cantiadadEnCarrito>1){/* si la cantidad es mayor o igual a 1, Decremento */
        carrito[index].cantiadadEnCarrito-=1
        actualizarLocalStorageCarrito() /* actualizo local storage */
        cargarListaDeCarrito(carrito) /* recargo la lista de items */
    } 
}

function activarItemCarritoBtnQuitar(){ /* funcion para activar a los iconos X de quitar en lista de items del carrito */
    const botonesDeCarritoQuitar = document.querySelectorAll('.fa-solid.fa-xmark.fa-2x') /* nodos de icons X en lista de carrito */
    botonesDeCarritoQuitar.forEach((boton)=>{
        boton.addEventListener("click", ()=>{ /* por cada botón, agrego el listener del click */
            quitarDeCarrito(boton.id) /* quito el item */
            console.table(carrito) /* veo en la canosola el table (para ir viendo el funcionamiento) */
            cargarListaDeCarrito(carrito) /* recaro la lista de items */
        })
    })
}

/* EJECUCIONES */
cargarListaDeCarrito(carrito)
acutalizarContadorCarrito()


