import express from 'express';
const router = express.Router();
//Busca o UsuarioController
import UsuarioController from '../controllers/UsuarioController.js'
const controle = new UsuarioController();

const caminhobase = 'usuario/'

router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
export default router