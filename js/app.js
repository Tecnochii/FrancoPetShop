const app = {
    data() {
        return {
            articulos: [],
            juguete: [],
            medicamento: [],
            cart: [],
            indexSeleccionado: 0,
            id: [],
        }
    },
    methods: {
        AlertaSubmit() {
            alert("Los datos se enviarion correctamente, en breve nos estaremos cotactando con usted. Gracias por escribirnos!");

        },
        // updateVariant(index) {
        //     this.indexSeleccionado = index
        //     console.log(index)
        // },
        agregarAlCarrito() {
            let jugueteria = document.getElementById("juguetes")
            let medicamento = document.getElementById("medicamentos")
            if (jugueteria) {
                this.cart.push(this.juguete)
            } else if (medicamento) {
                this.cart.push(this.medicamento)
            }
            console.log(this.cart)
        },

    },
    mounted() {
        if (localStorage.name) {
            this.name = localStorage.name;
        }
    },
    watch: {
        name(newName) {
            localStorage.name = newName;
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
    computed: {
        cantidadMedicamentos() {
            console.log(this.indexSeleccionado)
            return this.medicamento[this.indexSeleccionado].stock
        }

    }
}

Vue.createApp(app).mount('#app')