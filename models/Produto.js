import conexao from '../config/conexao.js'

const Produto = conexao.Schema({
    nome: {
        type: String,
        required: true
    },

    foto: {
        type: Buffer
    },

    tipoFoto: {
        type: String
    },

    preco: {
        type: Number,
        required: false
    },

    disponivel: {
        type: Boolean,
        required: true
    }
})

export default conexao.model('Produto', Produto);
