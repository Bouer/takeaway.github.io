const { createApp } = Vue;
const app1 = createApp({
  data() {
    return {
      productos: [],
      url: 'https://matiasouerd3d.pythonanywhere.com/productos',
      error: false,
      cargando: true,
      tipo: 'burger',
      nombre: '',
      descripcion: '',
      precio: 0,
      imagen: '',
      usuarioId: 3, // Cambiar por el ID del usuario actual
    };
  },
  methods: {
    fetchData(url) {
      const filteredUrl = `${url}?tipo=${this.tipo}`;

      fetch(filteredUrl)
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
        })
        .catch(error => {
          console.error(error);
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
