const { createApp } = Vue;
const app5 = createApp({
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
  
      agregarProductoAlCarrito(carritoId, productoId) {
        fetch(`https://matiasouerd3d.pythonanywhere.com/carritos/${carritoId}/productos`, {
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
      
      crearCarritoYAgregarProducto(productoId) {
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
      
      agregarAlCarrito(productoId) {
        fetch(`https://matiasouerd3d.pythonanywhere.com/usuarios/${this.usuarioId}/carrito`)
          .then(response => response.json())
          .then(data => {
            const carritoId = data.carrito_id;
            if (carritoId) {
              this.agregarProductoAlCarrito(carritoId, productoId);
            } else {
              this.crearCarritoYAgregarProducto(productoId);
            }
          })
          .catch(error => {
            console.error(error);
          });
      },
      
      fetchPedidoProductos(pedidoId) {
        fetch(`https://matiasouerd3d.pythonanywhere.com/pedido_productos/${pedidoId}`)
          .then(response => response.json())
          .then(data => {
            this.pedidos = data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      
      fetchPedido(pedidoId) {
        fetch(`https://matiasouerd3d.pythonanywhere.com/pedidos/${pedidoId}`)
          .then(response => response.json())
          .then(data => {
            this.pedidos = data;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    created() {
      this.fetchData(this.url);
      // Llama a fetchPedidoProductos con el pedidoId adecuado
      const pedidoId = 1; // Cambiar por el ID del pedido específico que desees obtener
      this.fetchPedidoProductos(pedidoId);
    },
  }).mount('#carrito-app');
  

  const app6 = createApp({
    data() {
      return {
        pedido: {},
        usuario: {},
        url: 'https://matiasouerd3d.pythonanywhere.com/pedidos',
        error: false,
        cargando: true,
      };
    },
    methods: {
      fetchData(url) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.pedido = data;
            this.fetchUsuario(this.pedido.usuario_id);
            this.cargando = false;
          })
          .catch(err => {
            console.error(err);
            this.error = true;
          });
      },
      fetchUsuario(usuarioId) {
        const usuarioUrl = `https://matiasouerd3d.pythonanywhere.com/usuarios/${usuarioId}`;
        fetch(usuarioUrl)
          .then(response => response.json())
          .then(data => {
            this.usuario = data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      agregarAlCarrito(productoId) {
        fetch(`https://matiasouerd3d.pythonanywhere.com/usuarios/${this.usuario.id}/carrito`, {
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
      borrarPedido() {
        const pedidoId = this.pedido.id;
        axios
          .delete(`https://matiasouerd3d.pythonanywhere.com/pedidos/${pedidoId}`)
          .then(() => {
            this.pedido = {};
            this.usuario = {};
            this.cargando = true;
            alert('Pedido borrado exitosamente');
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
    created() {
      const pedidoId = 1; // Cambiar por el ID del pedido específico que desees obtener
      this.fetchData(`${this.url}/${pedidoId}`);
    },
  }).mount('#datos-app');
  