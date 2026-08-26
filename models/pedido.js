import conexao from '../config/conexao.js'

const Pedido = conexao.Schema({
    cliente: {type:String, required:true},
    id:{type:String, required:true},
    status:{type:String, required:true},
    valorTotal:{type:Decimal, required:true},
    formaPagamento:{type:String, required:true},
    dataPedido:{type:Date, required:true}
})

export default conexao.model('Pedido',Pedido)