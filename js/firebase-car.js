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

let cart = [];
let userId = null;

function getCurrentUserId() {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            if (user) {
                resolve(user.uid);
            } else {
                resolve(null);
            }
        }, reject);
    });
}

function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.backgroundColor = isError ? '#f44336' : '#4CAF50';
    notification.textContent = message;
    document.body.appendChild(notification);
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
        notification.remove();
    }, 3000);
}

async function addToCart(product) {
    try {
        const user = firebase.auth().currentUser;
        if (!user) {
            showNotification('Por favor, inicia sesión para agregar productos al carrito', true);
            return;
        }

        userId = user.uid;
        cart.push(product);
        await updateFirestore();
        updateCartUI();
        showNotification('¡Producto agregado al carrito exitosamente!');
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        showNotification('Error al agregar el producto al carrito', true);
    }
}

async function removeFromCart(index) {
    userId = await getCurrentUserId();
    if (userId) {
        cart.splice(index, 1);
        await updateFirestore();
        updateCartUI();
    } else {
        console.log("No hay usuario conectado. No se puede eliminar del carrito.");
        // Aquí podrías mostrar un mensaje al usuario o redirigir a la página de inicio de sesión
    }
}

async function updateFirestore() {
    userId = await getCurrentUserId();
    if (userId) {
        try {
            await db.collection('carts').doc(userId).set({
                items: cart
            });
            console.log("Cart updated in Firestore");
        } catch (error) {
            console.error("Error updating cart: ", error);
        }
    } else {
        console.log("No hay usuario conectado. No se puede actualizar el carrito en Firestore.");
    }
}

async function loadCartFromFirestore() {
    try {
        const user = firebase.auth().currentUser;
        if (user) {
            userId = user.uid;
            const doc = await db.collection('carts').doc(userId).get();
            if (doc.exists) {
                cart = doc.data().items;
                updateCartUI();
            } else {
                console.log("No se encontró un carrito para este usuario.");
                cart = [];
                updateCartUI();
            }
        } else {
            console.log("No hay usuario conectado. El carrito estará vacío.");
            cart = [];
            updateCartUI();
        }
    } catch (error) {
        console.error("Error loading cart: ", error);
    }
}

function updateCartUI() {
    const cartContainer = document.querySelector('.container-cart-products');
    const cartItems = document.querySelector('.cart-product');
    const totalElement = document.querySelector('.total-pagar');
    const countElement = document.querySelector('#contador-productos');
    const emptyCartMessage = document.querySelector('.cart-empty');

    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        totalElement.parentElement.classList.add('hidden');
    } else {
        emptyCartMessage.style.display = 'none';
        totalElement.parentElement.classList.remove('hidden');

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-product');
            itemElement.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">1</span>
                    <p class="titulo-producto-carrito">${item.name}</p>
                    <span class="precio-producto-carrito">${item.price}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close" onclick="removeFromCart(${index})">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
            cartItems.appendChild(itemElement);
            total += parseFloat(item.price.replace('$', ''));
        });
    }

    totalElement.textContent = `$${total.toFixed(2)}`;
    countElement.textContent = cart.length;
}

// Load cart when page loads
document.addEventListener('DOMContentLoaded', loadCartFromFirestore);

// Update add to cart buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-add-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const product = {
                name: button.parentElement.querySelector('h2').textContent,
                price: button.parentElement.querySelector('.price').textContent
            };
            addToCart(product);
        });
    });
});

