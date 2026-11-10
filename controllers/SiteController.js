
import Produto from '../models/Produto.js'

export default class SiteController {
 
    constructor() {
        this.home = async (req, res) => {
          res.render('site/index')
        };

        this.login = (req, res) => {
          res.render('site/login');
        };

        this.catalogo = async (req, res) => {
          const produtos =  await Produto.find()
          res.render('site/catalogo', {Produtos: produtos});
        };

        this.carrinho = (req, res) => {
          res.render('site/carrinho');
        };

        this.pedidos = (req, res) => {
          res.render('site/pedidos');
        };
    }
}

