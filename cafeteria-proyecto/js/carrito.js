const storage = localStorage.getItem( "carrito" );
const items = JSON.parse( storage );

for ( const item of items ) {
    const container = document.createElement( "div" );
    const name = document.createElement( "h1" );
    const precio = document.createElement( "h4" );

    name.textContent = item.producto;
    precio.textContent = item.precio;

    container.appendChild( name );
    container.appendChild( precio );
    document.body.appendChild( container ); 
}