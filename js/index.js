const carrito = [];

const ordenarProductosMayor = () => {
    const stockMayor = stock.sort((a, b) => b.precio - a.precio)  
};

const ordenarProductosMenor = () => {
    const stockMenor = stock.sort((a, b) => a.precio - b.precio)
};

const cancelarCompra = () => {
    alert('Lamentamos que te vayas...\nPero te esperamos en tu próxima visita!');
    alert("Gracias por usar nuestro software\n\n©2022 Todos los derechos reservados by Juan Pablo García Martínez")
    itemNombre = '';
};


const mostrarProductos = () => {
    const lista = stock.map(stocks => {
        return `${stocks.id} - ${stocks.prod} $${stocks.precio}`;
    });
    alert('Estos son nuestros productos:'+'\n\n'+lista.join('\n'));
};

const saludoCliente = () => {
    let eleccion = prompt('Bienvenido\n\nCómo deseas ordenar nuestra lista de productos?\n\n\n1 - Ordenar por código\n\n2 - Ordenar por menor precio\n\n3 - Ordenar por mayor precio\n\n4 - Salir\n\n\nIngresa el número de la opción:\n\n\n');
    switch(eleccion){
        case '1':
            comprarProductos();
            break;
        case '2':
            ordenarProductosMenor();
            comprarProductos();
            break;
        case '3':
            ordenarProductosMayor();
            comprarProductos();
            break;
        case '4':
            let opcion = confirm('Quieres salir del programa?')
            if (opcion){
                cancelarCompra();
            } else {
                saludoCliente();
            }
            break;
        default:
            saludoCliente();
    }
};

const agregarAlCarrito = (existeItem, itemId, itemCantidad) => {
    const itemRepetido = carrito.find(existeItem => existeItem.id === itemId);
    if (itemRepetido) {
        itemRepetido.cantidad += itemCantidad
    } else {
        existeItem.cantidad += itemCantidad
        carrito.push(existeItem)
    }
};

const comprarProductos = () => {
    let itemNombre = '';
    let itemCantidad = 0;
    let seguirComprando = false;

    do{
        const lista = stock.map(stocks => {
            return `${stocks.id} - ${stocks.prod} $${stocks.precio}`;
        });
        let validar
        itemNombre = prompt('Nuestros Productos:'+'\n\n'+lista.join('\n')+'\n\nIngresa el nombre del producto a comprar:\n\n');
        if (itemNombre == null){
            menuCompra();
        }
        const existeItem = stock.find(item => item.prod.toLowerCase() === itemNombre.toLowerCase())
        if (existeItem) {
            itemCantidad = Number(prompt('¿Cuantas unidades quiere comprar?'));
            if (itemCantidad <= 0){
                alert('Por favor ingresa una cantidad, elige tu producto otra vez');
                comprarProductos();
            }
            agregarAlCarrito(existeItem, existeItem.id, itemCantidad)
        } else {
            alert('El producto no se encuentra en la lista')
        }

        seguirComprando = confirm('¿Desea agregar otro producto?')
         

    } while (seguirComprando);
    menuCompra();
};

const menuCompra = () => {
    let eleccion = prompt('Qué deseas hacer?\n\n\n1 - Seguir comprando\n\n2 - Ver el carrito\n\n3 - Finalizar la compra\n\n4 - Salir\n\n\nIngresa el número de la opción:\n\n\n');
    switch(eleccion){
        case '1':
            comprarProductos();
            break;
        case '2':
            verElCarrito();
            break;
        case '3':
            finalizarLaCompra();
            break;
        case '4':
            let opcion = confirm('Quieres salir del programa?')
            if (opcion){
                cancelarCompra();
                break;
            } else{
                menuCompra();
            }
            
        default:
            menuCompra();
    }
};

const verElCarrito = () => {
    const miCarrito = carrito.map(items => {
        return `${items.cantidad} unidades de ${items.prod} a $${items.precio} cada una`;
    });
    let opcion = prompt('Tu Carrito:'+'\n\n'+miCarrito.join('\n')+'\n\nQué deseas hacer?\n\n\n1 - Agregar Productos\n\n2 - Sacar Productos\n\n3 - Finalizar la compra\n\n\n\nIngresa el número de la opción:\n\n\n');
    switch(opcion){
        case '1':
            comprarProductos();
            break;
        case '2':
            sacarDelCarrito();
            break;
        case '3':
            finalizarLaCompra();
            break;
        default:
            menuCompra();
            break;
    }
};

const finalizarLaCompra = ()=> {
    const miCarritoFinal = carrito.map(items => {
        return `${items.cantidad} unidades de ${items.prod} a $${items.precio} cada una`
    });
    const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const pesoTotal = carrito.reduce((acc, item) => acc + (item.peso * item.cantidad), 0);
    let confirmacion = confirm("Este es tu pedido\n\n"+miCarritoFinal.join('\n')+"\n\n\nPeso total del pedido: "+pesoTotal+" Kg\n\nTotal a abonar: $"+precioTotal+"\n\nDeseas confirmar la compra?");
    if (confirmacion){
        alert("El pedido está terminado, gracias por tu compra!");
        cancelarCompra();
    } else {
        verElCarrito();
    }
};

const sacarDelCarrito = () => {
    const miCarrito = carrito.map(items => {
        return `${items.cantidad} unidades de ${items.prod} a $${items.precio} cada una`;
    });

    let itemNombreASacar ='';
    itemNombreASacar = prompt('Tu Carrito:'+'\n\n'+miCarrito.join('\n')+'\n\nQué producto quierese sacar del carrito?\n\n\nIngresa el nombre del producto\n\n\n');
    carrito.forEach((item, index) => {
        if (item.prod.toLowerCase() === itemNombreASacar.toLowerCase()) {
            if (item.cantidad > 1 && confirm('Usted quiere eliminar 1 unidad del producto '+item.prod+'\n\nEstá seguro?')) {
                item.cantidad--;
                alert('El producto ha sido eliminado del carrito con éxito');
            } else if (confirm('Usted quiere a eliminar del carrito todas las unidades del producto '+item.prod+'\n\nEstá seguro?' )){
                carrito.splice(index, 1);
                alert('El producto ha sido eliminado del carrito con éxito');
            } else {
                verElCarrito();
            }  
        }
    });
    verElCarrito();
};
    

const loguin = () => {
    let adminPassword = 123456; // esto obviamente estaría en la parte del servidor :)
    let userPassword = 0;
    userPassword = Number(prompt('Ingrese la contraseña de administrador: '));
    if (adminPassword===userPassword){
        menuAdmin();
    } else {
        let opcion = '';
        do {
            opcion = prompt('Password incorrecto, desea intentar nuevamente? (si/no):')
            switch (opcion){
                case 'si':
                    loguin();
                    break;
                case 'no':
                    inicio();
                default:
                    alert('Debes responder con si o no');
                    break;
            }
           
        } while(opcion != 'si' && opcion != 'no')
    }
};

const inicio = () => {
    let inicio = confirm('Bienvenido, visitas nuestra página como cliente?\n\nAceptar para entrar\nCancelar para modo ADMIN');
    if (inicio){
        saludoCliente();
    } else {
        loguin();
    }
};

const agregarAlStock = (nuevoItem) => {
    nuevoItem = {
        id: stock.length+1,
        prod: 'prodNombre',
        desc: 'prodDesc',
        peso: 0,
        precio: 0,
        cantidad: 0
    };
    nuevoItem.prod = prompt('Nombre del producto:');
    nuevoItem.desc = prompt('Descripción del producto:');
    do{
        nuevoItem.peso = Number(prompt('Peso del producto'));
        if(Number.isNaN(nuevoItem.peso) || nuevoItem.peso < 1){
            alert("Ingresa un peso válido")
        }
    } while (Number.isNaN(nuevoItem.peso) || nuevoItem.peso < 1)
    do{
        nuevoItem.precio = Number(prompt('Precio del producto'));
        if(Number.isNaN(nuevoItem.precio) || nuevoItem.precio < 1){
            alert("Ingresa un precio válido")
        }
    } while (Number.isNaN(nuevoItem.precio) || nuevoItem.precio < 1)
    stock.push(nuevoItem);
    alert("El producto se ha creado con éxito");
};

const eliminarDelStock = () => {
    
    const lista = stock.map(stocks => {
        return `${stocks.id} - ${stocks.prod} $${stocks.precio}`;
    });
    let itemNombreAEliminar ='';
    let itemAEliminar;
    itemNombreAEliminar = prompt('Qué producto deseas eliminar?\n\n'+lista.join('\n')+'\n\n\nIngresa el nombre del Producto:\n\n\n');
    if (stock.some(item => item.prod.toLowerCase() === itemNombreAEliminar.toLowerCase())){
        itemAEliminar = stock.find(item => item.prod.toLowerCase() === itemNombreAEliminar.toLowerCase());
        if(confirm('Usted va a eliminar del Stock el producto '+itemAEliminar.prod+'\n\nEstá seguro?' )){
            stock.splice(itemAEliminar.id-1, 1);
            alert('El producto ha sido eliminado del stock con éxito')
            menuAdmin();
        }
        menuAdmin();
    } else {
        alert('Debes ingresar un producto válido');
        eliminarDelStock();
    }
};

const modificarElStock = () => {
    let eleccion = prompt('\nQué deseas modificar?\n\n\n1 - Nombre de un producto\n\n2 - Descripción de un producto\n\n3 - Peso del producto\n\n4 - Precio del producto\n\n5 - Salir\n\n\nIngresa el número de la opción:\n\n\n');
    let itemElegido = 0;
    let lista;
    switch(eleccion){ 
        case '1':
            lista = stock.map(stocks => {
                return `${stocks.id} - ${stocks.prod} $${stocks.precio}`;
            });
            itemElegido = prompt('Qué producto deseas modificar?\n\n'+lista.join('\n')+'\n\n\nIngresa el número del producto:\n\n\n')
            if (itemElegido >= 0 && itemElegido <= stock.length){
                stock[itemElegido-1].prod = prompt('Ingrese el nuevo nombre para el producto');
            } 
            alert("El nombre se ha modificado con éxito");
            break;
        case '2':
            lista = stock.map(stocks => {
                return `${stocks.id} - ${stocks.prod} $${stocks.precio}`;
            });
            itemElegido = prompt('Qué producto deseas modificar?\n\n'+lista.join('\n')+'\n\n\nIngresa el número del producto:\n\n\n')
            if (itemElegido >= 0 && itemElegido <= stock.length){
                stock[itemElegido-1].desc = prompt('Ingrese la nueva descripción para el producto');
            }
            alert("La descripción se ha modificado con éxito");
            break;
        case '3':
            lista = stock.map(stocks => {
                return `${stocks.id} - ${stocks.prod} $${stocks.precio}`;
            });
            do{
                itemElegido = Number(prompt('Qué producto deseas modificar?\n\n'+lista.join('\n')+'\n\n\nIngresa el NÚMERO del producto:\n\n\n'));
            } while(itemElegido == null || itemElegido == 0);
            if (itemElegido >= 0 && itemElegido <= stock.length){
                do{
                    stock[itemElegido-1].peso = Number(prompt('Ingrese el nuevo peso para el producto'));
                    if(stock[itemElegido-1].peso< 1 || Number.isNaN(stock[itemElegido-1].peso)){
                        alert("Debes colocar un peso válido");
                    } else {
                        alert("El peso se ha modificado con éxito");
                    }
                } while (stock[itemElegido-1].peso< 1 || Number.isNaN(stock[itemElegido-1].peso));
            } 
            break;
        case '4':
            lista = stock.map(stocks => {
                return `${stocks.id} - ${stocks.prod} $${stocks.precio}`;
            });
            do{
                itemElegido = Number(prompt('Qué producto deseas modificar?\n\n'+lista.join('\n')+'\n\n\nIngresa el NÚMERO del producto:\n\n\n'));
            } while(itemElegido == null || itemElegido == 0);
            itemElegido = prompt('Qué producto deseas modificar?\n\n'+lista.join('\n')+'\n\n\nIngresa el NÚMERO del producto:\n\n\n')
            if (itemElegido >= 0 && itemElegido <= stock.length){
                do{
                    stock[itemElegido-1].precio = Number(prompt('Ingrese el nuevo precio para el producto'));
                    if(stock[itemElegido-1].precio < 1 || Number.isNaN(stock[itemElegido-1].precio)){
                        alert("Debes colocar un precio válido");
                    } else {
                        alert("El precio se ha modificado con éxito");
                    }
                } while (stock[itemElegido-1].precio < 1 || Number.isNaN(stock[itemElegido-1].precio));
            } 
            break;
        case '5':
            menuAdmin();
        default:
            modificarElStock();
    }
    modificarElStock();
};

const menuAdmin= () => {
    alert('Bienvenido ADMIN, a continuación te damos las opciones para modificar el stock');
    let eleccion = prompt('\nQué deseas modificar?\n\n\n1 - Agregar un producto\n\n2 - Eliminar un producto\n\n3 - Modificar un producto\n\n4 - Salir\n\n\nIngrese el número de la opción:\n\n\n');
    switch(eleccion){
        case '1':
            agregarAlStock();
            break;
        case '2':
            eliminarDelStock();
            break;
        case '3':
            modificarElStock();
            break;
        case '4':
            inicio();
        default:
            menuAdmin();
    }
    menuAdmin();
};
