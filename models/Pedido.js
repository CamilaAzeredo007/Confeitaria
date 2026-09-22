import conexao from '../config/conexao.js'

const Pedido = conexao.Schema({
    cliente: { type: conexao.Types.ObjectId,
        ref: "Cliente",
        required: false},
    nome:{type:String, required:true},
    status:{type:String, required:true},
    valorTotal:{type:Number, required:true},
    formaPagamento:{type:String, required:true},
    dataPedido:{type:Date, required:true}
})

export default conexao.model('Pedido',Pedido)