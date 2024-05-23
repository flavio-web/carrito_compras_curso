

const getProductos = () => {
    const productos = [
        {
            "id": 1,
            "nombre": "Computadora AZUS"
        },
        {
            "id": 2,
            "nombre": "Iphone 15"
        },
        {
            "id": 3,
            "nombre": "Apple Watch S9"
        },
        {
            "id": 4,
            "nombre": "Auriculares Sony"
        },
        {
            "id": 5,
            "nombre": "Microfono SURE Usb 3.0"
        },
        {
            "id": 6,
            "nombre": "Mackbook Pro"
        },
        {
            "id": 7,
            "nombre": "Mackbook Air"
        },
        {
            "id": 8,
            "nombre": "Ipad Pro"
        },
        {
            "id": 9,
            "nombre": "Computadora HP"
        },
        {
            "id": 10,
            "nombre": "Maimboard Azus"
        },
        {
            "id": 11,
            "nombre": "Xiomi Watch"
        },
        {
            "id": 12,
            "nombre": "Mouse Genius"
        },
        {
            "id": 13,
            "nombre": "Memoria RAM 32GB"
        },
        {
            "id": 14,
            "nombre": "SSD 1T SAMSUNG"
        },
        {
            "id": 15,
            "nombre": "Teclado Luminoso HP"
        }
    ];

    return productos;
}

const showProducto = ( id ) => {
    const productos = getProductos();
    const [ productoEncontrado ] = productos.filter( producto => Number(producto.id) === Number(id) );
    return productoEncontrado;
}


const cargarProductos = () => {
    
    const productos = getProductos();

    let optiosProductos = '';

    productos.forEach( ({ id, nombre }) => {
        optiosProductos += `<option value="${ id }">${ nombre }</option>`;
    });

    const elementoProducto = document.getElementById('producto');
    elementoProducto.innerHTML = optiosProductos;
}

cargarProductos();

const dataRegistroCompra = () => {
    const idProducto    = document.getElementById('producto').value;
    const producto      = showProducto( idProducto );      
    const cantidad      = document.getElementById('cantidad').value;
    const observacion   = document.getElementById('observacion').value;

    const nombre        = document.getElementById('nombre').value;
    const telefono      = document.getElementById('telefono').value;
    const email         = document.getElementById('email').value;
    const direccion     = document.getElementById('direccion').value;

    return {
        producto,
        cantidad,
        observacion,
        nombre,
        telefono,
        email,
        direccion
    };

}

const setRegistroCompra = () =>{   
    document.getElementById('cantidad').value = 1;
    document.getElementById('observacion').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('direccion').value = '';
}

const validarDatosCompra = ({ producto, cantidad, nombre, email }) => {

    const response = {
        status: true,
        message: ''
    }

    try {

        if( !producto ){
            throw new Error('Debe de seleccionar un producto.');
        }

        if( !producto.id ){
            throw new Error('El producto no tiene identificador.');
        }

        if( !producto.nombre ){
            throw new Error('El nombre del producto es obligatorio.');
        }

        if( cantidad <= 0 ){
            throw new Error('La cantidad del producto debe de ser mayor a cero.');
        }

        if( !nombre ){
            throw new Error('El nombre del usuario es obligatorio.');
        }

        if( !email ){
            throw new Error('El email del usuario es obligatorio.');
        }

        
    } catch ( error ) {
        response.status = false;
        response.message = error.message;
    }

    return response;

}

const btnComprar = document.getElementById('btnComprar');
btnComprar.addEventListener('click', () => {
    //1. Recolectar data formulario
    const datos = dataRegistroCompra();
    console.log( datos );

    //2.Validar Datos
    const validated = validarDatosCompra( datos );
    if( !validated.status ){
        const mensajeAlerta = {
            title:'Ooops!',
            text: validated.message,
            icon: 'error'
        };
        mostrarMensajeAlerta( mensajeAlerta );
        return;
    }

    //3.crear HtmlDinamico 
    const htmlCard = crearHtmlOrden( datos );
    console.log( htmlCard );

    //4. insertar html dinamico
    const carrito = document.getElementById('carrito');
    console.log( carrito );
    carrito.innerHTML += htmlCard;

    //5. reset formulario
    setRegistroCompra();

    //6.Mostrar alerta
    const mensajeAlerta = {
        title:'Bien Hecho!',
        text: 'Orden registrada correctamente',
        icon: 'success'
    };
    mostrarMensajeAlerta( mensajeAlerta );


});

const crearHtmlOrden = ({ producto, cantidad, observacion, nombre, email, telefono, direccion }) => {

    const codigo = generarNumeroOrden();

    return  `
        <div class="col-12" id="${codigo}">
            <div class="card border mb-3 shadow-sm">
                <div class="card-header bg-dark text-white">
                    <b>Orden #${ codigo }</b>
                </div>
                
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <b>Producto:</b>
                            <span>${ producto.nombre }</span>
                        </li>
                        <li class="list-group-item">
                            <b>Cantidad:</b>
                            <span>${ cantidad }</span>
                        </li>
                    </ul>

                    <p class="card-text">
                        <b>Observación:</b>
                        <span>${ observacion }</span>
                    </p>

                    <p class="d-inline-flex gap-1">
                        <a class="btn btn-secondary" data-bs-toggle="collapse" href="#${ codigo }-usuario" role="button" aria-expanded="false" aria-controls="orden123-usuario">
                        Usuario
                        </a>
                    
                    </p>
                    <div class="collapse" id="${ codigo }-usuario">
                        <div class="card card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <b>Nombre:</b>
                                    <span>${ nombre }</span>
                                </li>
                                <li class="list-group-item">
                                    <b>Email:</b>
                                    <span>${ email }</span>
                                </li>
                                <li class="list-group-item">
                                    <b>Teléfono:</b>
                                    <span>${ telefono }</span>
                                </li>
                                <li class="list-group-item">
                                    <b>Dirección:</b>
                                    <span>${ direccion }</span>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div class="card-footer bg-transparent">
                        <button type="button" class="btn btn-outline-danger" onclick="eliminarOrden('${codigo}')"  ><i class="fa-solid fa-trash"></i> Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

const generarNumeroOrden = () => btoa( Math.random() ).slice(0, 6);

const mostrarMensajeAlerta = ({ title, text, icon }) => {
    Swal.fire({
        title,
        text,
        icon
    })
}

const eliminarOrden = ( codigo ) => {
    Swal.fire({
        title: `Estas seguro de eliminar la orden #${ codigo }`,
        text: "La orden será eliminada para siempre!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
    }).then((result) => {
        if (result.isConfirmed) {
            
            document.getElementById( codigo ).remove();

            const mensajeAlerta = {
                title: 'Bien Hecho!',
                text: `Orden #${ codigo } eliminada correctamente.`,
                icon: 'success'
            }
            mostrarMensajeAlerta( mensajeAlerta );
        }
    });
}