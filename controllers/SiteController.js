import Produto from '../models/Produto.js'
import Categoria from '../models/Categoria.js'

export default class SiteController {
 
    constructor() {
        this.home = async (req, res) => {
          res.render('site/index')
        };

        this.login = (req, res) => {
          res.render('site/login');
        };

        this.catalogo = async (req, res) => {
          const produtos =  await Produto.find({});
          const categorias = await Categoria.find({})        
          res.render('site/catalogo', {Produtos: produtos, Categorias: categorias});
        };

        this.catalogoFiltro = async (req, res) => {
          const filtro = req.body.filtro;
          const produtos =  await Produto.find({nome: { $regex: filtro,
                    $options: "i" }}).populate('categoria');
          const categorias = await Categoria.find({})        
          res.render('site/catalogo', {Produtos: produtos, Categorias: categorias});
        };

        this.catalogoCategoria = async (req, res) => {
          const categoria = req.params.categoria;

          const produtos = await Produto.find({
           categoria: categoria
          });

          const categorias = await Categoria.find({})        
          res.render('site/catalogo/:categoria', {Produtos: produtos, 
            Categorias: categorias});
        };

        this.carrinho = (req, res) => {
          res.render('site/carrinho');
        };

        this.pedidos = (req, res) => {
          res.render('site/pedidos');
        };
    }
}

