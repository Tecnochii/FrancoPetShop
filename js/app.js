const app = {
    data() {
        return {
            juguete: [],
            medicamento: [],
        }
    },
    methods: {
        AlertaSubmit() {
            return alert("Los datos se enviarion correctamente, en breve nos estaremos cotactando con usted. Gracias por escribirnos!");

        },
    },
    created() {
        fetch("https://apipetshop.herokuapp.com/api/articulos")
            .then(res => res.json())
            .then(data => {
                console.log(data.response)
                this.juguete = data.response.filter(e => e.tipo == "Juguete")
                this.medicamento = data.response.filter(e => e.tipo == "Medicamento")
                console.log(this.medicamento)
            })
    },
    computed: {

    }
}

Vue.createApp(app).mount('#app')