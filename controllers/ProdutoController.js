//importar o Model
import Produto from '../models/produto.js'

export default class ProdutoController{

    constructor(caminhoBase='produto/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        
        this.add = async(req, res)=>{
            //cria o Produto
            let fotoEnviada
           if(req.file!=null){
            console.log(" foi")
            fotoEnviada = req.file.buffer
           }
           else{
            console.log("nao foi")
            fotoEnviada = null
           }
           
            await Produto.create({
                nome: req.body.nome,
                preco:req.body.preco,
                disponivel:req.body.disponivel === 'true',
                foto:fotoEnviada
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Produto.find({})
            res.render(caminhoBase + 'lst', {Produtos:resultado})
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Produto.find({ nome: { $regex: filtro,
                    $options: "i" }})
            res.render(caminhoBase + 'lst', {Produtos:resultado})
        }
    
        this.openEdt = async(req, res)=>{
                //passar quem eu quero editar (só ID)
            const id = req.params.id;
            console.log(id)
            const produto = await Produto.findById(id) 
            console.log(produto)
            res.render(caminhoBase + "edt", 
                    {Produto:produto})
            }
    
    
            this.edt = async(req, res)=>{
                const dados = {
                nome: req.body.nome,
                preco: req.body.preco,
                disponivel: req.body.disponivel === 'true',
                foto: req.body.foto
            };

                await Produto.findByIdAndUpdate(req.params.id, dados);

                res.redirect('/'+caminhoBase + 'lst');
            }
    
            this.del = async(req, res)=>{
                await Produto.findByIdAndDelete(req.params.id)
                res.redirect('/'+caminhoBase + 'lst');
            
            }
        

    }
}