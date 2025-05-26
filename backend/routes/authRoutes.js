// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Importa o controlador

// Rota de teste para authRoutes
router.get('/test', (req, res) => {
    res.send('Auth routes estão funcionando!');
});

router.post('/register', authController.registerUser); // Rota para registro de usuário

module.exports = router;