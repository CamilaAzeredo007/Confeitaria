import Usuario from '../models/Usuario.js'

export default class UsuarioController{
    constructor(caminhoBase='usuario/'){
        this.caminhoBase = caminhoBase

        this.list = async(req, res)=>{
            const resultado = await Usuario.find({});
            res.render(caminhoBase + 'lst', {Usuarios:resultado});
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Usuario.find({ nome: { $regex: filtro,
                    $options: "i" }})
            res.render(caminhoBase + 'lst', {Usuarios:resultado})
        }

        this.del = async(req, res)=>{
            await Usuario.findByIdAndDelete(req.params.id)
            res.redirect('/'+caminhoBase + 'lst');
            
        }

    }
}

