//importar o Model
import Produto from '../models/Produto.js'
import Categoria from '../models/Categoria.js'

export default class ProdutoController{

    constructor(caminhoBase='produto/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            const resultado = await Categoria.find({});
            res.render(caminhoBase + "add", {Categorias: resultado})
        }
        
        this.add = async(req, res)=>{
            let fotoEnviada = null;
            let tipoFoto = null;

            if(req.file != null){
                fotoEnviada = req.file.buffer;
                tipoFoto = req.file.mimetype;
            }

            let pcategoria = null;

            if(req.body.categoria != null){
                pcategoria = await Categoria.findById(req.body.categoria)
            }
           
            await Produto.create({
                nome: req.body.nome,
                preco: req.body.preco,
                disponivel: req.body.disponivel === 'true',
                foto: req.file ? req.file.buffer : null,
                tipoFoto: req.file ? req.file.mimetype : null,
                categoria: pcategoria
            });
            res.redirect('/'+caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
            const resultado = await Produto.find({}).populate('categoria');
            res.render(caminhoBase + 'lst', {Produtos:resultado});
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
                const resultado = await Produto.findById(req.params.id)
                //busco a entidade relacionada
                const pcategorias = await Categoria.find({});
                //devolvo TAMBÉM a lista da entidade relacionada
                
                res.render(caminhoBase + "edt", 
                    {Produto:resultado, Categorias: pcategorias})
            }
    
    
            this.edt = async(req, res)=>{
                let pcategoria;
                if(req.body.categoria!=null)
                {
                    pcategoria = await Categoria.findById(req.body.categoria)
                }

                const dados = {
                nome: req.body.nome,
                preco: req.body.preco,
                disponivel: req.body.disponivel === 'true',
                categoria: pcategoria
                };

                if(req.file){
                    dados.foto = req.file.buffer;
                    dados.tipoFoto = req.file.mimetype;
                }

                await Produto.findByIdAndUpdate(req.params.id, dados);

                    res.redirect('/'+caminhoBase + 'lst');
            }
    
            this.del = async(req, res)=>{
                await Produto.findByIdAndDelete(req.params.id)
                res.redirect('/'+caminhoBase + 'lst');
            
            }
        

    }
}