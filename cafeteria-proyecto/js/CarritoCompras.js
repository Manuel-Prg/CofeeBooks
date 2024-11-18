export default class CarritoCompras {

    static items = [];

    static obtenerItem( nombre ) {
        for ( const item of CarritoCompras.items ) {
            if ( item.producto.toLowerCase() === nombre.toLowerCase() ) return item;
        }
        return null;
    }

    static agregarItem( producto ) {
        CarritoCompras.items.push( producto );
    }
}