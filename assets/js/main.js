
const cargarProductos = () => {
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


    let optiosProductos = '';

    productos.forEach( ({ id, nombre }) => {
        optiosProductos += `<option value="${ id }">${ nombre }</option>`;
    });

    const elementoProducto = document.getElementById('producto');
    elementoProducto.innerHTML = optiosProductos;
}

cargarProductos();

const dataRegistroCompra = () => {
    const producto      = document.getElementById('producto').value;
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

const btnComprar = document.getElementById('btnComprar');
btnComprar.addEventListener('click', () => {
    //1. Recolectar data formulario
    const datos = dataRegistroCompra();
    console.log( datos );

    //2.crear HtmlDinamico 
    const htmlCard = crearHtmlOrden( datos );
    console.log( htmlCard );

    //3. insertar html dinamico
    const carrito = document.getElementById('carrito');
    console.log( carrito );
    carrito.innerHTML = htmlCard;


});

const crearHtmlOrden = ( data ) => {

    return  `
        <div class="col-12">
            <div class="card border mb-3 shadow-sm">
                <div class="card-header bg-dark text-white">
                    <b>Orden #123</b>
                </div>
                
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <b>Producto:</b>
                            <span>Computadora</span>
                        </li>
                        <li class="list-group-item">
                            <b>Cantidad:</b>
                            <span>10</span>
                        </li>
                    </ul>

                    <p class="card-text">
                        <b>Observación:</b>
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda, recusandae. Ducimus animi quis rerum libero vero debitis nisi enim? Quam veniam exercitationem quidem, fugit impedit alias libero optio eaque modi?</span>
                    </p>

                    <p class="d-inline-flex gap-1">
                        <a class="btn btn-secondary" data-bs-toggle="collapse" href="#orden123-usuario" role="button" aria-expanded="false" aria-controls="orden123-usuario">
                        Usuario
                        </a>
                    
                    </p>
                    <div class="collapse" id="orden123-usuario">
                        <div class="card card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <b>Nombre:</b>
                                    <span>${ data.nombre }</span>
                                </li>
                                <li class="list-group-item">
                                    <b>Email:</b>
                                    <span>maria@google.com</span>
                                </li>
                                <li class="list-group-item">
                                    <b>Teléfono:</b>
                                    <span>2157841025</span>
                                </li>
                                <li class="list-group-item">
                                    <b>Dirección:</b>
                                    <span>Machala</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}