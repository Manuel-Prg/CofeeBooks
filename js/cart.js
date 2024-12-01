class CarritoCompras {
    static items = [];

    static obtenerItem(nombre) {
        return this.items.find(item => item.producto.toLowerCase() === nombre.toLowerCase()) || null;
    }

    static agregarItem(producto) {
        const existingItem = this.obtenerItem(producto.producto);
        if (existingItem) {
            existingItem.cantidad += 1;
        } else {
            this.items.push({ ...producto, cantidad: 1 });
        }
        this.guardarCarrito();
        this.actualizarUI();
    }

    static eliminarItem(nombre) {
        const index = this.items.findIndex(item => item.producto.toLowerCase() === nombre.toLowerCase());
        if (index !== -1) {
            this.items.splice(index, 1);
            this.guardarCarrito();
            this.actualizarUI();
        }
    }

    static guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    static cargarCarrito() {
        const storage = localStorage.getItem('carrito');
        this.items = storage ? JSON.parse(storage) : [];
        this.actualizarUI();
    }

    static obtenerTotal() {
        return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    static actualizarUI() {
        const cartProductsContainer = document.querySelector('.container-cart-products');
        const cartEmpty = document.querySelector('.cart-empty');
        const cartTotal = document.querySelector('.cart-total');
        const contadorProductos = document.getElementById('contador-productos');

        // Limpiar el contenedor de productos
        const productosContainer = cartProductsContainer.querySelector('.row-product');
        if (productosContainer) {
            productosContainer.innerHTML = '';
        }

        if (this.items.length === 0) {
            if (cartEmpty) cartEmpty.style.display = 'block';
            if (cartTotal) cartTotal.classList.add('hidden');
            if (productosContainer) productosContainer.classList.add('hidden');
        } else {
            if (cartEmpty) cartEmpty.style.display = 'none';
            if (cartTotal) cartTotal.classList.remove('hidden');
            if (productosContainer) {
                productosContainer.classList.remove('hidden');
                
                this.items.forEach(item => {
                    const cartProduct = document.createElement('div');
                    cartProduct.className = 'cart-product';
                    cartProduct.innerHTML = `
                        <div class="info-cart-product">
                            <span class="cantidad-producto-carrito">${item.cantidad}</span>
                            <p class="titulo-producto-carrito">${item.producto}</p>
                            <span class="precio-producto-carrito">$${item.precio}</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close" data-product="${item.producto}">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    `;
                    productosContainer.appendChild(cartProduct);
                });
            }
        }

        if (contadorProductos) {
            contadorProductos.textContent = this.items.reduce((total, item) => total + item.cantidad, 0);
        }

        const totalPagar = document.querySelector('.total-pagar');
        if (totalPagar) {
            totalPagar.textContent = `$${this.obtenerTotal().toFixed(2)}`;
        }
    }
}

// Inicializar carrito
document.addEventListener('DOMContentLoaded', () => {
    // Cargar carrito guardado
    CarritoCompras.cargarCarrito();

    // Toggle del carrito
    const cartIcon = document.querySelector('.container-cart-icon');
    const cartProducts = document.querySelector('.container-cart-products');

    if (cartIcon && cartProducts) {
        cartIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            cartProducts.classList.toggle('hidden-cart');
        });

        // Cerrar carrito al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!cartIcon.contains(e.target) && !cartProducts.contains(e.target)) {
                cartProducts.classList.add('hidden-cart');
            }
        });

        // Evitar que el click dentro del carrito lo cierre
        cartProducts.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Agregar productos al carrito
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.item');
            const productInfo = {
                producto: product.querySelector('h2').textContent,
                precio: parseFloat(product.querySelector('.price').textContent.replace('$', ''))
            };
            CarritoCompras.agregarItem(productInfo);
        });
    });

    // Eliminar productos del carrito
    document.querySelector('.container-cart-products').addEventListener('click', (e) => {
        if (e.target.closest('.icon-close')) {
            const productName = e.target.closest('.icon-close').dataset.product;
            CarritoCompras.eliminarItem(productName);
        }
    });
});
