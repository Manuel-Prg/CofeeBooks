function showNotification(message, type) {
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'cafe-notification';
    
    const content = document.createElement('div');
    content.className = 'cafe-notification-content';
    
    const icon = document.createElement('img');
    icon.className = 'cafe-notification-icon';
    icon.src = type === 'login' ? '/cafeteria-proyecto/img/favicon.ico' : '/cafeteria-proyecto/img/favicon.ico';
    icon.alt = type === 'login' ? 'Taza de café' : 'Marca de verificación';
    
    const text = document.createElement('p');
    text.className = 'cafe-notification-message';
    text.textContent = message;
    
    content.appendChild(icon);
    content.appendChild(text);
    
    const progressBar = document.createElement('div');
    progressBar.className = 'cafe-notification-progress';
    const progress = document.createElement('div');
    progress.className = 'cafe-notification-progress-bar';
    progressBar.appendChild(progress);
    
    notificationContainer.appendChild(content);
    notificationContainer.appendChild(progressBar);
    
    document.body.appendChild(notificationContainer);
    
    setTimeout(() => {
      notificationContainer.classList.add('show');
      progress.style.width = '100%';
    }, 100);
    
    setTimeout(() => {
      notificationContainer.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notificationContainer);
      }, 500);
    }, 5000);
  }
  
  // Modificar el comportamiento del formulario de login
  document.querySelector('.formulario').addEventListener('submit', function(e) {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    // Por ahora, simplemente mostraremos la notificación
    showNotification('¡Bienvenido de vuelta! Tu sesión ha sido iniciada exitosamente.', 'login');
  });
  
  // Si estamos en la página de registro, modificar ese formulario también
  if (document.querySelector('.formulario [name="btnregistrar"]')) {
    document.querySelector('.formulario').addEventListener('submit', function(e) {
      e.preventDefault();
      // Aquí iría la lógica de registro
      // Por ahora, simplemente mostraremos la notificación
      showNotification('¡Gracias por unirte! Tu cuenta ha sido creada exitosamente.', 'register');
    });
  }