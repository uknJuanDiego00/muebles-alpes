/*=====================================
        MUEBLES LOS ALPES
        APP.JS
======================================*/

//==============================
// LOADER
//==============================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    setTimeout(() => {

        loader.style.display = "none";

    }, 700);

});

//==============================
// HEADER SCROLL
//==============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.background = "#111";

        header.style.padding = "15px 8%";

    } else {

        header.style.background = "rgba(17,17,17,.75)";

        header.style.padding = "18px 8%";

    }

});

//==============================
// CARRITO
//==============================

const carrito = [];

const botonesAgregar = document.querySelectorAll(".agregar");

const listaCarrito = document.getElementById("listaCarrito");

const contador = document.getElementById("contadorCarrito");

const totalTexto = document.querySelector(".carrito-footer h3");

let total = 0;

//==============================
// ABRIR CARRITO
//==============================

const botonCarrito = document.getElementById("cartBtn");

const panelCarrito = document.getElementById("carrito");

const cerrarCarrito = document.getElementById("cerrarCarrito");

botonCarrito.addEventListener("click", () => {

    panelCarrito.classList.add("activo");

});

cerrarCarrito.addEventListener("click", () => {

    panelCarrito.classList.remove("activo");

});

//==============================
// AGREGAR PRODUCTOS
//==============================

botonesAgregar.forEach((boton) => {

    boton.addEventListener("click", () => {

        const card = boton.closest(".card");

        const nombre = card.querySelector("h3").textContent;

        const precioTexto = card.querySelector("h4").textContent;

        const precio = Number(precioTexto.replace("$", "").replace(/\./g, ""));

        carrito.push({

            nombre,

            precio

        });

        actualizarCarrito();

        toast("Producto agregado al carrito");

    });

});

//==============================
// ACTUALIZAR CARRITO
//==============================

function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    total = 0;

    carrito.forEach((producto, index) => {

        total += producto.precio;

        listaCarrito.innerHTML += `

        <div class="item-carrito">

            <h4>${producto.nombre}</h4>

            <p>$${producto.precio.toLocaleString()}</p>

            <button onclick="eliminarProducto(${index})">

            Eliminar

            </button>

        </div>

        `;

    });

    contador.textContent = carrito.length;

    totalTexto.textContent =

        "Total: $" + total.toLocaleString();

}
//=====================================
// ELIMINAR PRODUCTOS
//=====================================

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();

    toast("Producto eliminado");

}

//=====================================
// TOAST
//=====================================

function toast(mensaje) {

    const aviso = document.createElement("div");

    aviso.className = "toast";

    aviso.innerHTML = `

        <i class="fa-solid fa-circle-check"></i>

        ${mensaje}

    `;

    document.body.appendChild(aviso);

    setTimeout(() => {

        aviso.classList.add("mostrar");

    },100);

    setTimeout(() => {

        aviso.classList.remove("mostrar");

        setTimeout(()=>{

            aviso.remove();

        },500);

    },2500);

}

//=====================================
// SCROLL SUAVE
//=====================================

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        const destino=document.querySelector(this.getAttribute("href"));

        destino.scrollIntoView({

            behavior:"smooth"

        });

    });

});

//=====================================
// ANIMACIONES AL HACER SCROLL
//=====================================

const elementos=document.querySelectorAll(

".card,.beneficio,.testimonio,.stat,.galeria img"

);

const mostrarElemento=()=>{

    elementos.forEach(el=>{

        const posicion=el.getBoundingClientRect().top;

        const pantalla=window.innerHeight;

        if(posicion< pantalla-100){

            el.classList.add("visible");

        }

    });

};

window.addEventListener("scroll",mostrarElemento);

mostrarElemento();

//=====================================
// CONTADOR ANIMADO
//=====================================

const numeros=document.querySelectorAll(".stat h2");

numeros.forEach(numero=>{

    const texto=numero.innerText;

    const valor=parseInt(texto.replace(/\D/g,""));

    let contador=0;

    const incremento=Math.ceil(valor/80);

    function actualizar(){

        contador+=incremento;

        if(contador>=valor){

            numero.innerText=texto;

        }else{

            if(texto.includes("%")){

                numero.innerText=contador+"%";

            }

            else if(texto.includes("+")){

                numero.innerText=contador+"+";

            }

            else{

                numero.innerText=contador;

            }

            requestAnimationFrame(actualizar);

        }

    }

    actualizar();

});

//=====================================
// BUSCADOR
//=====================================

const buscador=document.getElementById("searchBtn");

buscador.addEventListener("click",()=>{

    const texto=prompt("Buscar producto");

    if(!texto) return;

    const cards=document.querySelectorAll(".card");

    cards.forEach(card=>{

        const nombre=card.querySelector("h3").textContent.toLowerCase();

        if(nombre.includes(texto.toLowerCase())){

            card.scrollIntoView({

                behavior:"smooth",

                block:"center"

            });

            card.style.boxShadow="0 0 30px gold";

            setTimeout(()=>{

                card.style.boxShadow="";

            },2500);

        }

    });

});

//=====================================
// FORMULARIO
//=====================================

const formulario=document.querySelector(".formulario");

if(formulario){

formulario.addEventListener("submit",(e)=>{

e.preventDefault();

const inputs=formulario.querySelectorAll("input,textarea");

let valido=true;

inputs.forEach(input=>{

if(input.value.trim()==""){

input.style.border="2px solid red";

valido=false;

}else{

input.style.border="2px solid #ddd";

}

});

if(valido){

toast("Mensaje enviado correctamente");

formulario.reset();

}

});

}

//=====================================
// BOTÓN IR ARRIBA
//=====================================

const subir=document.createElement("button");

subir.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

subir.className="subir";

document.body.appendChild(subir);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

subir.classList.add("mostrar");

}else{

subir.classList.remove("mostrar");

}

});

subir.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};