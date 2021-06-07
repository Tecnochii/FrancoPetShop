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
        if (localStorage.getItem("stock")) {
            this.medicamento.stock = JSON.parse(localStorage.getItem("stock"))
        }

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
        agregarAlCarrito(articulos) {
            let jugueteria = document.getElementById("juguetes")
            let Farmacia = document.getElementById("medicamentos")


            if (jugueteria) {

                var JugueteFiltrado = this.medicamento.findIndex(e => e._id == articulos._id)

                let arrAux = this.cart.map(e => e.id)



                if (this.cart.length < 1) {
                    this.cart.push({
                        nombre: articulos.nombre,
                        cantidad: 1,
                        precio: articulos.precio,
                        imagen: articulos.imagen,
                        id: articulos._id
                    })
                } else if (!arrAux.includes(articulos._id)) {
                    console.log("hola")

                    this.cart.push({
                        nombre: articulos.nombre,
                        cantidad: 1,
                        precio: articulos.precio,
                        imagen: articulos.imagen,
                        id: articulos._id
                    })

                } else {
                    this.cart.map(e => {
                        if (e.id == articulos._id) {
                            e.cantidad++
                        }
                    })

                }

                if (articulos.stock > 0) {
                    articulos.stock -= 1
                    console.log(this.cart)
                    localStorage.setItem("carrito", JSON.stringify(this.cart))
                }





            } else if (Farmacia) {
                var articuloFiltrado = this.medicamento.findIndex(e => e._id == articulos._id)

                let arrAux = this.cart.map(e => e.id)



                if (this.cart.length < 1) {
                    this.cart.push({
                        nombre: articulos.nombre,
                        cantidad: 1,
                        precio: articulos.precio,
                        imagen: articulos.imagen,
                        id: articulos._id
                    })
                } else if (!arrAux.includes(articulos._id)) {
                    console.log("hola")

                    this.cart.push({
                        nombre: articulos.nombre,
                        cantidad: 1,
                        precio: articulos.precio,
                        imagen: articulos.imagen,
                        id: articulos._id
                    })

                } else {

                    this.cart.map(e => {
                        if (e.id == this.medicamento[articuloFiltrado]._id) {
                            e.cantidad++
                        }
                    })

                }

                if (this.medicamento[articuloFiltrado].stock > 0) {
                    this.medicamento[articuloFiltrado].stock -= 1
                    localStorage.setItem("stock", JSON.stringify(this.medicamento[articuloFiltrado].stock))
                    localStorage.setItem("carrito", JSON.stringify(this.cart))
                }

                this.cart = JSON.parse(localStorage.getItem("carrito"))
                this.medicamento.stock = JSON.parse(localStorage.getItem("stock"))
            }


        },
        remover(art) {
            let carrito = JSON.parse(localStorage.getItem("carrito"))
            let index = carrito.findIndex(e => e.id == art.id)
            localStorage.removeItem("carrito", index)
            localStorage.removeItem("stock", index)
            this.cart.splice(index, 1)

        },
        vaciarCarrito() {
            localStorage.removeItem("carrito")
            localStorage.removeItem("stock")
            this.cart.splice(0, this.cart.length)
        }
    },


    computed: {
        cantidadMedicamentos() {
            console.log(this.indexSeleccionado)
            return this.medicamento[this.indexSeleccionado].stock
        },
        contadorCarrito() {
            arrAux = this.cart.map(e => e.cantidad)
            let contador = 0
            for (let i = 0; i < arrAux.length; i++) {
                contador += arrAux[i]
            }
            return contador
        },
        contadorDePrecio() {
            arrAuxCant = this.cart.map(e => e.cantidad * e.precio)

            contador = 0
            for (let i = 0; i < arrAuxCant.length; i++) {
                contador += arrAuxCant[i]
            }

            return contador
        },
    },
}


Vue.createApp(app).mount('#app')