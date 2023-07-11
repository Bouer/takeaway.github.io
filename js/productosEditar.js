id= location.search.substr(4) // captura de la URL el id enviado desde productos.html

const { createApp } = Vue  //creo un objeto VUE llamdo createApp
createApp({
  data() {  // define los datos de VUE
    return {
      url: 'https://matiasouerd3d.pythonanywhere.com/productos/'+id,
      //datos: [],
       /*atributos para el guardar los valores del formulario */
        id:0,
        tipo:"",
        nombre:"", 
        descripcion:"", 
        precio:0,
        imagen:"",
    }
  },
  methods: {  // define los métodos o funciones
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.id = data.id
          this.tipo = data.tipo
          this.nombre = data.nombre
          this.descripcion = data.descripcion
          this.precio=data.precio
          this.imagen=data.imagen
        })
        .catch(error => alert("Ups... se produjo un error: " + error))
    },
   /* eliminar(id) {
      const url = this.url + "/" + id;
      var options = {
        method: 'DELETE',
      }
      fetch(url, options)
        .then(res => res.text()) // or res.json()
        .then(res => {
          alert("Registro Eliminado")
          location.reload();
        })


    },*/
    grabar() {
      let producto = {
        tipo:this.tipo,
        nombre:this.nombre,
        descripcion:this.descripcion,
        precio: this.precio,
        imagen:this.imagen
      }
      var options = {
        body: JSON.stringify(producto),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
      }
      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado")
          window.location.href = "../html/index.html";  // recarga productos.html
        })
        .catch(err => {
          console.error(err);
          alert("Error al Grabar")  // puedo mostrar el error tambien
        })
    }
  },
  created() {  // llama a los métodos que se tienen que ejecutar al inicio
    this.fetchData(this.url)
  }
}).mount('#app')
