/* PLANTILLAS LITERALES */
function tarjetaItemOnSale(producto){/*items en liquidación */

    let boton = ""
    if (carrito.some((elemento)=> elemento.id === producto.id)){/* creo la variable botón segun corresponda por cada prod. (si está o no en el carrito) */
        boton = '<i class="fa-solid fa-xmark"></i>Quitar'
    }else{
        boton = '<i id="articles" class="fa-solid fa-cart-shopping"></i>Añadir'
    } 
    let precioConDescuento = ((100-producto.descuento)*producto.precio)/100
    return   `<div class="main__itemContainer col-lg-2 col-md-3 col-sm-4 col-6 ">
                 <div class="main__item"><!-- PRODUCTOS -->
                     <div class="item__innerBox"><!-- INTERIOR DE LA CAJA (ICONOS, IMG Y BOTON CARRITO) -->
                         <div class="icons"><!-- icons -->
                             <a class="text-decoration-none "><i class="fa-solid fa-heart"></i></a>
                             <a class="text-decoration-none "><i class="fa-solid fa-eye"></i></a>
                         </div>
                         <div class="saleTag"><!-- ETIQUETA DE DESCUENTO -->
                             <span class="badge rounded-0"><i class="fa-solid fa-arrow-down"></i>${producto.descuento}%</span>
                         </div>
                         <img src=${producto.img} alt=${producto.alt}><!-- IMAGEN DEL PRODUCTO -->
                         <div class=""><!-- BOTON DEL CARRRITO -->
                             <button id="${producto.id}" class="btn btn-white shadow-sm rounded-pill bg-white cart-btn">${boton}</button>
                         </div>
                     </div>
                     <div class="item__info"> <!-- INFO DEL PRODUCTO -->
                         <div class="item__name">
                             <p>${producto.nombre}</p>
                         </div>
                     <div class="item__price onSale">
                         <span id="precioOnSale">$${precioConDescuento.toFixed(2)}</span>
                         <span id="precioOriginal">$${producto.precio}</span>
                     </div>
                     </div>    
                 </div>     
             </div>`
}/* boton del carrito con id del producto */

function tarjetaItemDestacado(producto){/* items destacados */
    let boton = ""
    if (carrito.some((elemento)=> elemento.id === producto.id)){/* creo la variable botón segun corresponda por cada prod. (si está o no en el carrito) */
        boton = '<i class="fa-solid fa-xmark"></i>Quitar'
    }else{
        boton = '<i id="articles" class="fa-solid fa-cart-shopping"></i>Añadir'
    }
    return   `<div class="main__itemContainer col-lg-2 col-md-3 col-sm-4 col-6 ">
                 <div class="main__item "><!-- PRODUCTOS -->
                     <div class="item__innerBox"><!-- INTERIOR DE LA CAJA (ICONOS, IMG Y BOTON CARRITO) -->
                         <div class="icons"><!-- icons -->
                             <a class="text-decoration-none "><i class="fa-solid fa-heart"></i></a>
                             <a class="text-decoration-none "><i class="fa-solid fa-eye"></i></a>
                         </div>
                         <img src=${producto.img} alt=${producto.alt}><!-- IMAGEN DEL PRODUCTO -->
                         <div class=""><!-- BOTON DEL CARRRITO -->
                             <button id="${producto.id}" class="btn btn-white shadow-sm rounded-pill bg-white cart-btn">${boton}</button>
                         </div>
                     </div>
                     <div class="item__info"> <!-- INFO DEL PRODUCTO -->
                         <div class="item__name">
                             <p>${producto.nombre}</p>
                         </div>
                     <div class="item__price">
                         <span id="precioOriginal">$${producto.precio}</span>
                     </div>
                     </div>    
                 </div>     
             </div>`
}/* boton del carrito con id del producto */

/* FUNCIONES PARA TARJETAS DE INDEX */
function activarItemsBtnAdd(){ /* activar los botones de "agregar" y "Quitar" de las tarjetas de productos */
    const botonesDeCarritoAdd = document.querySelectorAll('.cart-btn') /* nodo de los botones */
    botonesDeCarritoAdd.forEach((boton)=>{ /* por cada botón, agrego el listener del click */
        boton.addEventListener("click", ()=>{
            if(boton.innerText.includes("Añadir")){ /* si está en "Añadir", al clickear se cambia a Quitar */
                agregarACarrito(parseInt(boton.id))
                boton.innerHTML = '<i class="fa-solid fa-xmark"></i>Quitar'
                console.table(carrito)                
            }else{  /* si está en "Quitar", al clickear se cambia a Añadir */
                quitarDeCarrito(boton.id)
                console.table(carrito)
                boton.innerHTML = '<i id="articles" class="fa-solid fa-cart-shopping"></i>Añadir'
            }
        })
    })
}

function crearItems(productos){ /* funcion que crea los items en index */
    const itemsOnSale = document.querySelector("#itemsOnSale") /* Nodo de container de OnSale */
    const itemsDestacados = document.querySelector("#itemsDestacados") /* Nodo de container de Destacados */
    itemsOnSale.innerHTML='' /* elimino las cards existentes */
    itemsDestacados.innerHTML=''
    productos.forEach(producto => {
        if(producto.onSale === true){ /* Creo las tarjeta de sale con la funcion y la agrego al nodo */
            itemsOnSale.innerHTML += tarjetaItemOnSale(producto)
        }else{/* Creo al tarjeta destacado con la funcion y la agrego alnodo */
            itemsDestacados.innerHTML += tarjetaItemDestacado(producto)
        }
    });
    activarItemsBtnAdd() /* Luego de creados las tarjetas, activo los botones */
}

function cargarProductos(){
    fetch(URL)
        .then((result)=> result.json())
        .then((items)=> productos.push(...items))
        .then(()=> crearItems(productos))
        .catch(()=>{
            let index = document.querySelector(".main__indexContainer")
            index.innerHTML = `<div class="cardSinCoindicencias">
                                    <div class="mensaje">
                                        <img src="Iconos/caraTriste.png" alt="">
                                        <p>Estamos teniendo problemas con el servidor.</p>
                                        <p>Por favor, vuelva a intentarlo a la brevedad.</p>
                                    </div>
                                </div>`
        })
}


/* EJECUCIONES */
cargarProductos()