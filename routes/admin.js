'use strict';

import express from 'express'
import Admin from '../controller/admin/admin'
const router = express.Router();
router.post('/login', Admin.login);
router.post('/register',Admin.register);
router.get('/getInfo',Admin.getInfo);
router.get('/singout',Admin.singout);
export default router