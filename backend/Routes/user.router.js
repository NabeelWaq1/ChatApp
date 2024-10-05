import express from 'express';
import { getUsers } from '../Controllers/user.controller.js';
import { protectRoute } from '../Middlewares/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, getUsers )

export default router;