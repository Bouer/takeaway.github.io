const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      usuarioId: 3, // Cambiar por el ID del usuario actual
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
    agregarAlCarrito(producto) { // Actualizado para recibir el objeto producto completo
      this.pedidos.push(producto); // Agregar el producto al array de pedidos
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount('#pedido-app');


