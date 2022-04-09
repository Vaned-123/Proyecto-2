class Carrito{
  comprarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
      const producto=e.target.parentElement.parentElement;
      this.leerDatosProducto(producto);
    }
  }

  leerDatosProducto(producto){
    const infoProducto={
      imagen : producto.querySelector('img').src,
      titulo : producto.querySelector('h5').textContent,
      precio : producto.querySelector('.precio span').textContent,
      id : producto.querySelector('a').getAttribute('data-id'),
      cantidad : 1
    }

    let productosSL;
    productosSL=this.obtenerProductosSL();
    productosSL.forEach(function(productoSL){
      if(productoSL.id===infoProducto.id){
        productosSL=productoSL.id;
      }
    });
    if(productosSL==infoProducto.id){
      this.insertCarrito(infoProducto);
    }else{
      this.insertCarrito(infoProducto);
    }

  }

  insertCarrito(producto){
    const row=document.createElement('tr');
    row.innerHTML=`
    <td>
    <img src="${producto.imagen}" width=60>
    </td>
    <td><div class="d-flex align-items-center">${producto.titulo}</div</td>
    <td ><div class="d-flex justify-content-between align-items-center">${producto.precio}</div></td>
    <td><div class="d-flex justify-content-between align-items-center">${producto.cantidad}</div></td>
    <th>${producto.precio*producto.cantidad}</th>
    <td>
    <a href="#" class="btn-close d-flex justify-content-between align-items-center borrar-producto" aria-label="Close" data-id="${producto.id}"></a>
    </td>`;
    listaProducto.appendChild(row);

    this.guardarProductoLocalStore(producto);
    this.comptotal();

  }

  eliminarProducto(e){
    e.preventDefault();
    let producto, productoID;
    if(e.target.classList.contains('borrar-producto')){
      e.target.parentElement.parentElement.remove();
      producto=e.target.parentElement.parentElement;
      productoID=producto.querySelector('a').getAttribute('data-id');
    }
    this.eliminarProdcutosSL(productoID);
    this.comptotal();
  }

  vaciarCarrito(e){
    e.preventDefault();
    while(listaProducto.firstChild){
      listaProducto.removeChild(listaProducto.firstChild);
    }
    this.vaciarLocalS();
    return false;
  }

  guardarProductoLocalStore(producto){
    let productos;
    productos=this.obtenerProductosSL();
    productos.push(producto);
    localStorage.setItem('productos',JSON.stringify(productos));
  }

  obtenerProductosSL(){
    let productoSL;
    if(localStorage.getItem('productos')===null){
      productoSL=[];
    }
    else{
      productoSL=JSON.parse(localStorage.getItem('productos'));
    }
    return productoSL;
  }
  
  eliminarProdcutosSL(productoID){
    let productosSL;
    productosSL=this.obtenerProductosSL();
    productosSL.forEach(function(productoSL, index){
      if(productoSL.id===productoID){
        productosSL.splice(index,1);
      }
    });
    localStorage.setItem('productos',JSON.stringify(productosSL));
  }

  leerLocalS(){
    let productosSL;
    productosSL=this.obtenerProductosSL();
    productosSL.forEach(function(producto){
      const row=document.createElement('tr');
      row.innerHTML=`
      <td>
      <img src="${producto.imagen}" width=60>
      </td>
      <td><div class="d-flex align-items-center">${producto.titulo}</div</td>
      <td ><div class="d-flex justify-content-between align-items-center">${producto.precio}</div></td>
      <td><div class="d-flex justify-content-between align-items-center">${producto.cantidad}</div></td>
      <td>${producto.precio*producto.cantidad}</td>
      <td>
      <a href="#" class="btn-close d-flex justify-content-between align-items-center borrar-producto" aria-label="Close" data-id="${producto.id}"></a>
      </td>`;
      listaProducto.appendChild(row);
      console.log(producto.cantidad);
    });
  }

  vaciarLocalS(){
    localStorage.clear();
  }

  procesarCompra(e){
    e.preventDefault();
    if(this.obtenerProductosSL().length===0){
      swal("Oops!", "Por favor seleccione un sabor", "error");
    }
    else{
      Swal.fire({
        title: 'Codigo Qr: Presentar en caja',
        imageUrl: './assets/qr-code.png',
        imageHeight: 500,
        imageAlt: 'A tall image'
      })
      while(listaProducto.firstChild){
        listaProducto.removeChild(listaProducto.firstChild);
      }
    }
    this.vaciarLocalS();
  }

  comptotal(){
    let productoSL;
    let total=0, subtotal=0, iva=0;
    productoSL=this.obtenerProductosSL();
    for(let i=0;i<productoSL.length;i++){
    //  const precioProductos=Number(productoSL[i].precio.textContent.replace('$',''));
    //  const cantidadProductos=Number(productoSL[i].cantidad.value);
     // let element=Number(productoSL[i].precio * productoSL[i].cantidad);

      total=total+(productoSL[i].precio * productoSL[i].cantidad);
    }
    iva=parseFloat(total*0.15).toFixed(2);
    subtotal=parseFloat(total-iva).toFixed(2)

    document.getElementById('subtotal').innerHTML="$"+total.toFixed(2);
    document.getElementById('total').innerHTML="$"+subtotal;
    }
  

}

{/* <div class="d-flex justify-content-between align-items-center h-50 ">
             <input class="cantidad" type="number" min="1" value=${producto.cantidad}>
           </div> */}