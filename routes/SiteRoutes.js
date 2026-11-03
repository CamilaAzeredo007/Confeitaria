import express from 'express';
const router = express.Router();
//Busca o SiteController
import SiteController from '../controllers/SiteController.js'
const controle = new SiteController();

const caminhobase = 'site/'

router.get('/' + caminhobase, controle.home)
router.get('/' + caminhobase + 'login', controle.login)
router.get('/' + caminhobase + 'catalogo', controle.catalogo)
router.get('/' + caminhobase + 'carrinho', controle.carrinho)
router.get('/' + caminhobase + 'pedidos', controle.pedidos)

export default router;