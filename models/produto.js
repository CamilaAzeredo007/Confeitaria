import conexao from '../config/conexao.js'

const Produto = conexao.Schema({
    nome: {type:String, required:true},
    foto:{type:Buffer,
        get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }
    },
    preco:{type:Number, required:false},
    disponivel:{type:Boolean, required:true}
})

export default conexao.model('Produto',Produto);