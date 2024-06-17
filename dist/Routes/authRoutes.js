"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../Controllers/authController");
const authMiddleware_1 = require("../Middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/register', authController_1.registerUser);
router.post('/login', authController_1.loginUser);
router.get('/users', authMiddleware_1.verifyToken, authMiddleware_1.isAdmin, authController_1.getUsers);
router.get('/users/:id', authMiddleware_1.verifyToken, authMiddleware_1.isUserOrAdmin, authController_1.getUserById);
router.put('/users/:id', authMiddleware_1.verifyToken, authMiddleware_1.isUserOrAdmin, authController_1.updateUser);
router.delete('/users/:id', authMiddleware_1.verifyToken, authMiddleware_1.isAdmin, authController_1.deleteUser);
exports.default = router;
