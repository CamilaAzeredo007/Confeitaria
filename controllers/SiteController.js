export default class SiteController {
 
    constructor() {
        this.home = async (req, res) => {
          res.render('site/index')
        };

        this.login = (req, res) => {
          res.render('site/login');
        };

        this.catalogo = (req, res) => {
          res.render('site/catalogo');
        };

        this.carrinho = (req, res) => {
          res.render('site/carrinho');
        };

        this.pedidos = (req, res) => {
          res.render('site/pedidos');
        };
    }
}

