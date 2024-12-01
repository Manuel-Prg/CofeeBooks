// metodoPago.js
document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            loadCartFromFirestore(user.uid);
        } else {
            window.location.href = 'registrarvista.html';
        }
    });
});

function loadCartFromFirestore(userId) {
    db.collection('carts').doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                const cart = doc.data().items;
                displayCart(cart);
            } else {
                displayEmptyCart();
            }
        })
        .catch((error) => {
            console.error("Error loading cart: ", error);
            displayError();
        });
}

function displayCart(cart) {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price}</span>
        `;
        cartItems.appendChild(itemElement);
        total += parseFloat(item.price.replace('$', ''));
    });

    cartTotal.innerHTML = `
        <span>Total a pagar:</span>
        <span>$${total.toFixed(2)}</span>
    `;
}

function displayEmptyCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '<div class="cart-item">No hay productos en el carrito</div>';
    document.getElementById('cart-total').innerHTML = '<span>Total: $0.00</span>';
}

function displayError() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '<div class="cart-item">Error al cargar el carrito. Por favor, intenta de nuevo.</div>';
}