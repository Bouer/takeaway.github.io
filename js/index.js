const { createApp } = Vue;
const app1 = createApp({
  data() {
    return {
      productos: [],
      url: 'https://matiasouerd3d.pythonanywhere.com/productos',
      error: false,
      cargando: true,
      
      id:0,
      tipo: "",
      nombre: "",
      descripcion: "",
      precio: 0,
      imagen: "",
      
      usuarioId: 4, // Cambiar por el ID del usuario actual

      
      
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
      .then(response => response.json())
      .then(data => {

          this.productos = data;
          this.cargando=false;
          this.id = data.id;
          console.log('Valor de data.id:', this.id);
      })
      .catch(err => {
          console.error(err);
          this.error=true              
      })
},
    eliminar(id) {
      
      const url = this.url + '/' + id;
      console.log('Valor id:', this.id);
      var options = {
        method: 'DELETE',
    }
      fetch(url, options)
        .then(res => res.text()) // or res.json()
        .then(res => {
      alert('Registro Eliminado')
          location.reload(); // recarga el json luego de eliminado el registro
        })
        .catch(error => {
          
          alert('Error al eliminar el registro');
        });
    },
    
    grabar() {
      let producto = {
        tipo: this.tipo,
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        imagen: this.imagen,
      };
      var options = {
        body: JSON.stringify(producto),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
      };
      fetch(this.url, options)
        .then(function () {
          alert('Registro grabado');
          window.location.href = './index.html'; // recarga productos.html
        })
        .catch(err => {
          console.error(err);
          alert('Error al Grabar'); // puedo mostrar el error tambien
        });
    },
    agregarAlCarrito(productoId) {
      const producto = this.productos.find(p => p.id === productoId);
      if (!producto) {
        console.error('Producto no encontrado');
        return;
      }

      fetch(`https://matiasouerd3d.pythonanywhere.com/usuarios/${this.usuarioId}/carrito`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto_id: productoId }),
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          console.log(data)
          this.id = data.id
        })
        .catch(error => {
          console.error(error);
          alert("Error al Grabar")
        });
    },
  },

  created() {
    this.fetchData(this.url);

    this.tipo_usuario = localStorage.getItem('userType');
    this.logOut = !localStorage.getItem('loggedIn');

    console.log('tipo de usuario:', this.tipo_usuario);
    console.log('logOut:', this.logOut);
  },
}).mount('#menu-app');


//USUARIO - MOD
const app2 = createApp({
    data() {
      return {
        usuarios: [],
        url: 'https://matiasouerd3d.pythonanywhere.com/usuarios',
        error: false,
        cargando: true,
      };
    },
    methods: {
      fetchData(url) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.usuarios = data;
            this.cargando = false;
          })
          .catch(err => {
            console.error(err);
            this.error = true;
          });
      },
      eliminar(id) {
        const url = this.url + '/' + id;
        console.log('id: ', id);
        var options = {
          method: 'DELETE',
        };
        fetch(url, options)
          .then(res => res.text()) // or res.json()
          .then(res => {
            alert('Registro Eliminado');
            location.reload(); // recarga el json luego de eliminado el registro
          });
      },
    },
    created() {
      this.fetchData(this.url);
    },
  }).mount('#usuario-app');

// APLICACION PARA NAV BAR

  const app3 = createApp({
    data() {
        return {
            userType: "",
            loggedIn: "",
            username: "",
            logOut: "",
            userid: 0,
          };
        },
        created() {
          // Obtener los valores de userType, loggedIn y username de localStorage
          this.userType = localStorage.getItem('userType');
          this.userID = localStorage.getItem('userID');
          this.loggedIn = localStorage.getItem('loggedIn');
          this.username = localStorage.getItem('username');
          this.logOut   = localStorage.getItem('logOut');
          
      
          // Imprimir los valores en la consola
          console.log('userType:', this.userType);
          console.log('userID:', this.userType);
          console.log('loggedIn:', this.loggedIn);
          console.log('username:', this.username);
          
        },
        methods: {
          logout() {
            // Limpiar los valores del localStorage y redirigir a la página de logout
            localStorage.removeItem('userType');
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('logOut');
            
            window.location.href = './index.html';
          },
        },
      }).mount('#nav-menu-app');

const app4 = createApp({
  data() {
          return {
            usuarioId: 4, // Cambiar por el ID del usuario actual
            productos: [],
            pedidos: [], // Nuevo array para almacenar los productos agregados al carrito
            url: 'https://matiasouerd3d.pythonanywhere.com/productos',
            error: false,
            cargando: true,
          };
  },
  methods: {
    fetchData(url) {
            fetch(url)
              .then(response => response.json())
              .then(data => {
                this.productos = data;
                this.cargando = false;
              })
              .catch(err => {
                console.error(err);
                this.error = true;
              });
    },
    agregarAlCarrito(productoId) {
         // Guardar el ID del producto en sessionStorage
            sessionStorage.setItem('productoId', productoId);
            console.log('ID del producto guardado:', productoId);
      
            fetch(`https://matiasouerd3d.pythonanywhere.com/usuarios/${this.usuarioId}/carrito`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ producto_id: productoId }),
              
            })
              .then(response => response.json())
              .then(data => {
                
                alert(data.message);
                
              })
              .catch(error => {
                console.error(error);
              });
    },
        },
    created() {
          this.fetchData(this.url);
          
    },
}).mount('#pedido-app');
