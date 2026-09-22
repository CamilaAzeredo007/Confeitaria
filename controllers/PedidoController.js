import Pedido from '../models/Pedido.js'
import Cliente from '../models/Cliente.js'

export default class PedidoController{
    constructor(caminhoBase='pedido/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>{
                const resultado = await Pedido.find({});
                const pclientes = await Cliente.find({});

                 res.render(caminhoBase + "add", {Pedidos: resultado, Clientes: pclientes})
        }

        this.add = async(req, res)=>{
            let pcliente;
        
            if(req.body.cliente != null){
                 pcliente = await Cliente.findById(req.body.cliente)
            }
                await Pedido.create({
                    nome: req.body.nome,
                    status: req.body.status,
                    valorTotal: req.body.valorTotal,
                    formaPagamento: req.body.formaPagamento,
                    dataPedido: req.body.dataPedido,
                    cliente: pcliente
                });
                    res.redirect('/'+caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
                const resultado = await Pedido.find({}).populate('cliente');
                res.render(caminhoBase + 'lst', {Pedidos:resultado});
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Pedido.find({ status: { $regex: filtro,
                    $options: "i" }})
            res.render(caminhoBase + 'lst', {Pedidos:resultado})
        }

        this.openEdt = async(req, res)=>{
            //passar quem eu quero editar (só ID)
            const id = req.params.id;
            const resultado = await Pedido.findById(req.params.id)
            //busco a entidade relacionada
            const pclientes = await Cliente.find({});
            //devolvo TAMBÉM a lista da entidade relacionada
            res.render(caminhoBase + "edt", 
                {Pedido:resultado, Clientes:pclientes})
        }

        this.edt = async(req, res)=>{
            let pcliente;
        
            if(req.body.cliente != null){
                 pcliente = await Cliente.findById(req.body.cliente)
            }
            await Pedido.findByIdAndUpdate(req.params.id, {
                status: req.body.status,
                valorTotal: req.body.valorTotal,
                formaPagamento: req.body.formaPagamento,
                dataPedido: req.body.dataPedido,
                cliente: pcliente
            });
            res.redirect('/'+caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Pedido.findByIdAndDelete(req.params.id)
            res.redirect('/'+caminhoBase + 'lst');
        }
    }
}
