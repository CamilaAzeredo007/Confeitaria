import conexao from '../config/conexao.js'

const Cliente = conexao.Schema({
    nome: {type:String, required:true},
    cpf:{type:String, required:true},
    telefone:{type:String, required:true},
    endereco:{type:String, required:true},
    cep:{type:String, required:true}
})

export default conexao.model('Cliente',Cliente)