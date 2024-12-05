window.addEventListener("scroll", function() {
  var navbar = document.getElementById("navbar");
  if (window.pageYOffset > 0) {
    navbar.classList.add("nav-visible");
  } else {
    navbar.classList.remove("nav-visible");
  }
});

window.addEventListener("scroll", function() {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

function scrollToTop() {
  var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentPosition > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, currentPosition - currentPosition / 10);
  }
}


window.addEventListener('DOMContentLoaded', function() {
  var buttons = document.querySelectorAll('.btn-add-cart');
  var popups = document.querySelectorAll('.popup');
  var mensajesEnviados = document.querySelectorAll('.mensaje-enviado');
  
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', mostrarPopup.bind(null, i));
  }
  
  function mostrarPopup(index) {
    mensajesEnviados[index].textContent = 'Producto agregado al carrito';
    popups[index].style.display = 'block'; // Mostrar el cuadro emergente
  
    setTimeout(function() {
      popups[index].style.display = 'none';
    }, 3000); // Ocultar el cuadro emergente después de 3 segundos (puedes ajustar el tiempo según tus preferencias)
  }
});