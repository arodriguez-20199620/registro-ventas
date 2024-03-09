import { Router } from 'express';

// validations 
import { validateToken } from '../middlewares/validate-token.js';

// controller
import { confirmPayment } from './invoices.controller.js';

const router = Router();

router.get('/', validateToken, confirmPayment)

router.post('/', validateToken, confirmPayment)

export default router;