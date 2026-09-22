import Cliente from '../models/Cliente.js'

export default class ClienteController{
    constructor(caminhoBase='cliente/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }

        this.add = async(req, res)=>{
            await Cliente.create({
                nome: req.body.nome,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
                cpf: req.body.cpf,
                cep: req.body.cep
            });
            res.redirect('/'+caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
            const resultado = await Cliente.find({});
            res.render(caminhoBase + 'lst', {Clientes:resultado});
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Produto.find({ nome: { $regex: filtro,
                    $options: "i" }})
            res.render(caminhoBase + 'lst', {Clientes:resultado})
        }
    
            this.openEdt = async(req, res)=>{
                //passar quem eu quero editar (só ID)
                const id = req.params.id
                console.log(id);
                const resultado = await Cliente.findById(id)
                //busco a entidade relacionada
               console.log(resultado);
                res.render(caminhoBase + "edt", 
                    {Cliente:resultado})
            }
    
            this.edt = async(req, res)=>{
                const dados = {
                nome: req.body.nome,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
                cpf: req.body.cpf,
                cep: req.body.cep
                };

                await Cliente.findByIdAndUpdate(req.params.id, dados);
                    res.redirect('/'+caminhoBase + 'lst');
            }
    
            this.del = async(req, res)=>{
                await Cliente.findByIdAndDelete(req.params.id)
                res.redirect('/'+caminhoBase + 'lst');
            
            }

    }
}

