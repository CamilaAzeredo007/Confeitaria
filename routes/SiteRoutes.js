import express from 'express';
const router = express.Router();
//Busca o SiteController
import SiteController from '../controllers/SiteController.js'
const controle = new SiteController();

const caminhobase = 'site/'

router.get('/' + caminhobase, controle.home)
router.get('/' + caminhobase + 'login', controle.login)

export default router