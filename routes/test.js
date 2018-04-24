import Test from '../controller/test/test';
import express from 'express';
const router = express.Router();

router.get('/demo', Test.demo);
export default router;