import { Router } from 'express';

// validations 
import { validateToken } from '../middlewares/validate-token.js';

// controller
import { confirmPayment, shoppingHistory } from './invoices.controller.js';

const router = Router();

router.get('/', validateToken, shoppingHistory)

router.post('/', validateToken, confirmPayment)

export default router;