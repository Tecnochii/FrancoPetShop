const app = {
    data() {
        return {
            articulos: [],
            juguete: [],
            medicamento: [],
            cart: [],
            contador: 0
        }
    },
    created() {
        fetch("https://apipetshop.herokuapp.com/api/articulos")
            .then(res => res.json())
            .then(data => {

                this.articulos = data.response
                this.juguete = data.response.filter(e => e.tipo == "Juguete")
                this.medicamento = data.response.filter(e => e.tipo == "Medicamento")
                console.log(this.medicamento)
                console.log(this.indexSeleccionado)
            })

    },
    mounted() {
        if (localStorage.getItem("carrito")) {
            this.cart = JSON.parse(localStorage.getItem("carrito"))
        }
        // if (localStorage.getItem("stock")) {
        //     this.medicamento.stock = JSON.parse(localStorage.getItem("stock"))
        // }

    },
    methods: {
        AlertaSubmit() {
            swal("Los datos se enviarion correctamente, en breve nos estaremos cotactando con usted. Gracias por escribirnos!");

        },
        Pagado() {
            swal("Pago Recibido!", "Gracias por su compra!", "success");
            localStorage.clear()
            this.cart.splice(0, this.cart.length)
        },

        // updateVariant(index) {
        //     this.indexSeleccionado = index
        //     console.log(index)
        // },
        agregarAlCarrito(articulo) {
            let jugueteria = document.getElementById("juguetes")
            let Farmacia = document.getElementById("medicamentos")


            if (jugueteria) {

                let juguetesIdInCart = this.cart.map(juguete => juguete.id)

                if (this.cart.length < 1) {
                    this.cart.push({
                        nombre: articulo.nombre,
                        cantidad: 1,
                        precio: articulo.precio,
                        imagen: articulo.imagen,
                        id: articulo._id
                    })
                } else if (!juguetesIdInCart.includes(articulo._id)) {
                    console.log("No lo incluye")

                    this.cart.push({
                        nombre: articulo.nombre,
                        cantidad: 1,
                        precio: articulo.precio,
                        imagen: articulo.imagen,
                        id: articulo._id
                    })

                } else {
                    this.cart.map(juguete => {
                        if (juguete.id == articulo._id) {
                            juguete.cantidad++
                        }
                    })

                }

                if (articulo.stock > 0) {
                    articulo.stock -= 1
                    console.log(this.cart)
                    localStorage.setItem("carrito", JSON.stringify(this.cart))
                }





            } else if (Farmacia) {

                let medicamentosIdInCart = this.cart.map(articulo => articulo.id)

                if (this.cart.length < 1) {
                    this.cart.push({
                        nombre: articulo.nombre,
                        cantidad: 1,
                        precio: articulo.precio,
                        imagen: articulo.imagen,
                        id: articulo._id
                    })
                } else if (!medicamentosIdInCart.includes(articulo._id)) {
                    console.log("No lo incluye")

                    this.cart.push({
                        nombre: articulo.nombre,
                        cantidad: 1,
                        precio: articulo.precio,
                        imagen: articulo.imagen,
                        id: articulo._id
                    })

                } else {

                    this.cart.map(e => {
                        if (e.id == articulo._id) {
                            e.cantidad++
                        }
                    })

                }

                if (articulo.stock > 0) {
                    articulo.stock -= 1
                    localStorage.setItem("carrito", JSON.stringify(this.cart))
                }


            }


        },
        remover(art) {
            let cart = this.cart.filter(articulo => articulo != art)

            localStorage.setItem("carrito", JSON.stringify(cart))

            this.cart = cart
        },
        vaciarCarrito() {
            localStorage.removeItem("carrito")
            this.cart = []
        }
    },


    computed: {

        contadorCarrito() {
            let cantidades = this.cart.map(articulo => articulo.cantidad)
            let contador = 0
            for (let i = 0; i < cantidades.length; i++) {
                contador += cantidades[i]
            }
            return contador
        },
        contadorDePrecio() {
            arrAuxCant = this.cart.map(articulo => articulo.cantidad * articulo.precio)

            contador = 0
            for (let i = 0; i < arrAuxCant.length; i++) {
                contador += arrAuxCant[i]
            }

            return contador
        },
    },
}


Vue.createApp(app).mount('#app')