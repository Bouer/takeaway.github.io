const { createApp } = Vue;

createApp({
  data() {
    return {
      username: '',
      password: '',
      
    };
  },
  methods: {
    submitForm() {
      axios.post('https://matiasouerd3d.pythonanywhere.com/login', {
        
        usuario: this.usuario,
        contrasenia: this.contraseña
      })
      .then(response => {
        if (response.data.success) {
          if (response.data.tipo) {

            // Guardar el tipo de usuario y el estado de inicio de sesión en localStorage
            
            localStorage.setItem('userType', response.data.tipo);
            localStorage.setItem('userName', response.data.usuario);
            localStorage.setItem('userID', response.data.id);
            localStorage.setItem('loggedIn', 'true');

            


            alert('Inicio de sesión exitoso. Bienvenido, ' + response.data.usuario);

               // Almacenar el nombre de usuario en el localStorage
      localStorage.setItem('username', response.data.usuario);

            setTimeout(() => {
                let userType = response.data.tipo;
                if (userType === 'empleado') {
                    window.location.href = 'pedidos.html';
                }else{
                    window.location.href = 'index.html';
              }
            }, 1000); // Redirige después de 5 segundos (5000 milisegundos)
          } else {
            alert('El tipo de usuario no está presente en la respuesta.');
          }
        } else {
          alert('Usuario o contraseña incorrectos.');
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error en la solicitud.');
      });
    },
  
  },
}).mount('#login_app');
