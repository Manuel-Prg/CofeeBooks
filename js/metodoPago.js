// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBQm02Pm7cGb1U63diPdC9s9Z9hq6tQ6DQ",
    authDomain: "cofeebooks-224bb.firebaseapp.com",
    projectId: "cofeebooks-224bb",
    storageBucket: "cofeebooks-224bb.firebasestorage.app",
    messagingSenderId: "13027139989",
    appId: "1:13027139989:web:4f6eafc2a8e6b2bfbfd69c",
    measurementId: "G-KDP62TBVC6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            loadCartFromFirestore(user.uid);
        } else {
            window.location.href = 'registrarvista.html';
        }
    });

    document.getElementById('formulario-tarjeta').addEventListener('submit', function(e) {
        e.preventDefault();
        simulatePayment();
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

function showNotification(message) {
    // Crear el elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 16px;
        border-radius: 4px;
        z-index: 1001;
        animation: fadeInOut 3s ease-in-out;
    `;
    notification.textContent = message;

    // Agregar la notificación al body
    document.body.appendChild(notification);

    // Eliminar la notificación después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Agregar el estilo de la animación al head
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-20px); }
        15% { opacity: 1; transform: translateY(0); }
        85% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

function simulatePayment() {
    const paymentAnimation = document.querySelector('.payment-animation');
    paymentAnimation.style.display = 'flex';

    setTimeout(() => {
        paymentAnimation.style.display = 'none';
        showNotification('¡Pago procesado con éxito!');
        // Aquí normalmente limpiarías el carrito y redirigirías a una página de confirmación
        auth.onAuthStateChanged((user) => {
            if (user) {
                clearCart(user.uid);
            }
        });
    }, 3000);
}

function clearCart(userId) {
    db.collection('carts').doc(userId).set({
        items: []
    })
    .then(() => {
        console.log("Cart cleared successfully");
        window.location.href = 'index.html'; // Redirigir a la página de inicio o a la página de confirmación de pedido
    })
    .catch((error) => {
        console.error("Error clearing cart: ", error);
    });
}