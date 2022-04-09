const carro=new Carrito();
const carrito=document.getElementById('Carrito');
const productos=document.getElementById('lista-productos')
const listaProducto=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBT=document.getElementById('vaciar-carrito');
const procesarPedidoBT=document.getElementById('procesar-pedido');

cargarEventos();

function cargarEventos(){
    productos.addEventListener('click',(e)=>{carro.comprarProducto(e)});

    carrito.addEventListener('click',(e)=>{carro.eliminarProducto(e)});

    vaciarCarritoBT.addEventListener('click',(e)=>{carro.vaciarCarrito(e)});

    document.addEventListener('DOMContentLoaded',carro.leerLocalS());

    procesarPedidoBT.addEventListener('click',(e)=>{carro.procesarCompra(e)});

    carro.comptotal();
}